import { mkdir, writeFile } from "node:fs/promises";

const UNIVERSITALY_API = "https://universitaly-backend.cineca.it/api";
const USTAT_INSTITUTIONS = "https://ustat.mur.gov.it/dati/didattica/italia/atenei";
const OUTPUT_DIR = new URL("../public/data/", import.meta.url);
const CONCURRENCY = 10;
const RETRIES = 4;

const ownershipOverrides = [
  [/BARI ALDO MORO/i, "State"],
  [/Alma Mater Studiorum/i, "State"],
  [/Kore di ENNA|UKE - Università Kore/i, "Non-state"],
  [/Telematica degli Studi IUL/i, "Non-state"],
  [/LEONARDO da VINCI/i, "Non-state"],
  [/CASD - Scuola Superiore/i, "State"],
  [/Neuromed Mediterranean University/i, "Non-state"],
  [/Institute of Advanced Science for Agriculture/i, "Non-state"],
  [/INSUBRIA Varese-Como/i, "State"],
  [/UnitelmaSapienza/i, "Non-state"],
];

const disciplineNames = {
  "01": "Mathematics & Computer Science",
  "02": "Physical Sciences",
  "03": "Chemical Sciences",
  "04": "Earth Sciences",
  "05": "Biological Sciences",
  "06": "Medical Sciences",
  "07": "Agricultural & Veterinary Sciences",
  "08": "Civil Engineering, Architecture & Design",
  "09": "Industrial & Information Engineering",
  "10": "Humanities",
  "11": "History, Philosophy, Pedagogy & Psychology",
  "12": "Law",
  "13": "Economics & Statistics",
  "14": "Political & Social Sciences",
  "15": "Music",
};

const regionNames = {
  "01": "Piedmont",
  "02": "Aosta Valley",
  "03": "Lombardy",
  "04": "Trentino-Alto Adige",
  "05": "Veneto",
  "06": "Friuli-Venezia Giulia",
  "07": "Liguria",
  "08": "Emilia-Romagna",
  "09": "Tuscany",
  "10": "Umbria",
  "11": "Marche",
  "12": "Lazio",
  "13": "Abruzzo",
  "14": "Molise",
  "15": "Campania",
  "16": "Apulia",
  "17": "Basilicata",
  "18": "Calabria",
  "19": "Sicily",
  "20": "Sardinia",
};

function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function titleCase(value) {
  return clean(value).toLocaleLowerCase("it-IT").replace(/(^|[\s'-])\p{L}/gu, (letter) => letter.toLocaleUpperCase("it-IT"));
}

function normalizeName(value) {
  return clean(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(universita|universita degli studi|degli studi|studi|di|del|della|delle|the|university|libera)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&agrave;/g, "à")
    .replace(/&egrave;/g, "è")
    .replace(/&igrave;/g, "ì")
    .replace(/&ograve;/g, "ò")
    .replace(/&ugrave;/g, "ù")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function parseUstatInstitutions(html) {
  const rows = [];
  const rowPattern = /<tr><td><a[^>]*>(.*?)<\/a><\/td><td>(.*?)<\/td><td>(Statale|Non statale)<\/td><\/tr>/g;
  for (const match of html.matchAll(rowPattern)) {
    rows.push({
      name: clean(decodeHtml(match[1])),
      region: clean(decodeHtml(match[2])),
      ownership: match[3] === "Statale" ? "State" : "Non-state",
    });
  }
  return rows;
}

function tokenScore(left, right) {
  const a = new Set(normalizeName(left).split(" ").filter((token) => token.length > 2));
  const b = new Set(normalizeName(right).split(" ").filter((token) => token.length > 2));
  const intersection = [...a].filter((token) => b.has(token)).length;
  const union = new Set([...a, ...b]).size;
  return union ? intersection / union : 0;
}

function findUstatMatch(name, rows) {
  const normalized = normalizeName(name);
  const exact = rows.find((row) => normalizeName(row.name) === normalized);
  if (exact) return exact;

  const ranked = rows
    .map((row) => ({ row, score: tokenScore(name, row.name) }))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.score >= 0.46 ? ranked[0].row : null;
}

async function fetchWithRetry(url, responseType = "json") {
  let lastError;
  for (let attempt = 0; attempt < RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { "User-Agent": "Polaris Overseas Education course catalogue sync" } });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return responseType === "text" ? response.text() : response.json();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 600 * 2 ** attempt));
    }
  }
  throw lastError;
}

async function mapWithConcurrency(items, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, run));
  return results;
}

function getCityAndProvince(address) {
  const parts = clean(address).split(",").map(clean).filter(Boolean);
  if (parts.length < 3) return { city: "", province: "" };
  return {
    city: titleCase(parts.at(-3)?.replace(/^\d{5}\s*/, "") ?? ""),
    province: parts.at(-2) ?? "",
  };
}

function normalizeCourse(course, institution) {
  const institutionLocation = getCityAndProvince(institution?.indirizzoEn || institution?.indirizzo || "");
  const courseLocation = course.sede
    ? {
        city: titleCase(course.sede.comuneDescrizione || course.sede.comune || course.sede.citta),
        province: clean(course.sede.provinciaSigla || course.sede.provincia),
      }
    : { city: "", province: "" };
  const city = courseLocation.city || institutionLocation.city;
  const province = courseLocation.province || institutionLocation.province;
  const titleIt = clean(course.nomeCorso);
  const titleEn = clean(course.nomeCorsoEn) || titleIt;

  return {
    id: course.id,
    academicYear: clean(course.anno?.descrizione),
    title: titleEn,
    titleIt,
    universityId: course.idStrutture,
    universityCode: clean(course.codeUn),
    university: clean(course.nomeStruttura),
    universityUrl: institution?.url || "",
    institutionType: institution?.ownership || "Unclassified",
    region: institution?.regionEn || "",
    city,
    province,
    disciplineCode: clean(course.area),
    discipline: disciplineNames[course.area] || "Other",
    degreeTypeId: course.tipoLaurea?.id ?? null,
    qualification: clean(course.tipoLaurea?.descrizioneEn).replace(/^EN\s+/i, "") || clean(course.tipoLaurea?.descrizione),
    degreeClassId: course.classe?.id ?? null,
    degreeClassCode: clean(course.classe?.codice),
    degreeClass: clean(course.classe?.descrizione),
    durationYears: course.durataAnni ?? null,
    language: course.lingua === "EN" ? "English" : course.lingua === "IT" ? "Italian" : clean(course.lingua),
    accessType: clean(course.programmazione?.descrizioneEn).replace(/^EN\s+/i, "") || clean(course.programmazione?.descrizione),
    deliveryMode: clean(course.modalitaErogazione?.descrizioneEn) || clean(course.modalitaErogazione?.descrizione),
    interUniversity: Boolean(course.interateneo),
    programmeUrl: course.url || "",
    lastSourceUpdate: course.dataInserimento || null,
  };
}

async function main() {
  const [institutionsPayload, provincesPayload, classes, ustatHtml] = await Promise.all([
    fetchWithRetry(`${UNIVERSITALY_API}/usocomune/universita-afam`),
    fetchWithRetry(`${UNIVERSITALY_API}/usocomune/province`),
    fetchWithRetry(`${UNIVERSITALY_API}/offerta-formativa/lista-classi`),
    fetchWithRetry(USTAT_INSTITUTIONS, "text"),
  ]);

  const ustatInstitutions = parseUstatInstitutions(ustatHtml);
  const institutions = institutionsPayload.universita.map((institution) => {
    const official = findUstatMatch(institution.nome, ustatInstitutions);
    const ownershipOverride = ownershipOverrides.find(([pattern]) => pattern.test(institution.nome));
    const location = getCityAndProvince(institution.indirizzoEn || institution.indirizzo || "");
    return {
      ...institution,
      city: location.city,
      province: location.province,
      ownership: ownershipOverride?.[1] || official?.ownership || "Unclassified",
      region: official?.region || "",
      regionEn: regionNames[institution.codeReg] || official?.region || "",
      ustatName: official?.name || "",
    };
  });
  const institutionById = new Map(institutions.map((institution) => [institution.idStrutture, institution]));

  const first = await fetchWithRetry(`${UNIVERSITALY_API}/offerta-formativa/cerca-corsi?searchType=u&page=1&order=ALF`);
  const pages = Array.from({ length: first.totalPages - 1 }, (_, index) => index + 2);
  const remaining = await mapWithConcurrency(pages, async (page, index) => {
    const payload = await fetchWithRetry(`${UNIVERSITALY_API}/offerta-formativa/cerca-corsi?searchType=u&page=${page}&order=ALF`);
    if ((index + 1) % 50 === 0) process.stdout.write(`Fetched ${index + 1}/${pages.length} remaining pages\n`);
    return payload.corsi;
  });

  const rawCourses = [...first.corsi, ...remaining.flat()];
  const deduplicated = [...new Map(rawCourses.map((course) => [course.id, course])).values()];
  const courses = deduplicated
    .map((course) => normalizeCourse(course, institutionById.get(course.idStrutture)))
    .sort((a, b) => a.title.localeCompare(b.title) || a.university.localeCompare(b.university));

  const generatedAt = new Date().toISOString();
  const metadata = {
    source: "Universitaly / Italian Ministry of University and Research",
    sourceUrl: "https://www.universitaly.it/en/cerca-corsi",
    institutionClassificationSource: "MUR USTAT",
    institutionClassificationUrl: USTAT_INSTITUTIONS,
    generatedAt,
    academicYears: [...new Set(courses.map((course) => course.academicYear).filter(Boolean))].sort(),
    totalCourses: courses.length,
    totalInstitutions: new Set(courses.map((course) => course.universityId)).size,
    unclassifiedInstitutions: institutions.filter((institution) => institution.ownership === "Unclassified").map((institution) => institution.nome),
  };

  const facets = {
    disciplines: Object.entries(disciplineNames).map(([code, label]) => ({ code, label })),
    degreeClasses: classes.map((item) => ({ id: item.id, code: clean(item.codice), label: clean(item.descrizione), disciplineCode: String(item.areaCun).padStart(2, "0") })),
    provinces: provincesPayload.data.map((item) => ({ code: item.istat_code_provincia_storico, abbreviation: item.motorizzazione_sigla_automobilistica, name: item.istat_nome, regionCode: item.istat_code_regione })),
    institutions: institutions.map((item) => ({ id: item.idStrutture, code: item.codeUn, name: clean(item.nome), url: item.url, city: item.city, province: item.province, region: item.regionEn, institutionType: item.ownership })),
  };

  await mkdir(OUTPUT_DIR, { recursive: true });
  await Promise.all([
    writeFile(new URL("italy-courses.json", OUTPUT_DIR), `${JSON.stringify({ metadata, courses })}\n`),
    writeFile(new URL("italy-course-facets.json", OUTPUT_DIR), `${JSON.stringify({ metadata, ...facets })}\n`),
  ]);
  process.stdout.write(`${JSON.stringify(metadata, null, 2)}\n`);
}

await main();
