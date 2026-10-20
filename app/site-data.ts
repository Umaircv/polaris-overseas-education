export const WHATSAPP_URL =
  "https://wa.me/923000756932?text=Hello%20Polaris%20Global%20Education%20Center%2C%20I%20would%20like%20a%20free%20counselling%20session.";

export const IELTS_DEMO_URL = "/book-ielts-demo";

export const TRACKING_WHATSAPP_URL =
  "https://wa.me/923416934362?text=Hello%20Polaris%20Global%20Education%20Center%2C%20I%20would%20like%20an%20update%20on%20my%20application.";

export const destinations = [
  {
    country: "Italy",
    code: "IT",
    flag: "🇮🇹",
    flagImage: "/polaris/flags/it.png",
    image: "/polaris/landmarks/italy.webp",
    landmark: "Rome · The Colosseum",
    note: "Historic universities, diverse programmes and scholarship possibilities.",
  },
  {
    country: "France",
    code: "FR",
    flag: "🇫🇷",
    flagImage: "/polaris/flags/fr.png",
    image: "/polaris/landmarks/france.webp",
    landmark: "Paris · Eiffel Tower",
    note: "Globally respected education, cultural depth and English-taught options.",
  },
  {
    country: "Germany",
    code: "DE",
    flag: "🇩🇪",
    flagImage: "/polaris/flags/de.png",
    image: "/polaris/landmarks/germany.webp",
    landmark: "Berlin · Brandenburg Gate",
    note: "Research-driven universities and career-focused study opportunities.",
  },
  {
    country: "Türkiye",
    code: "TR",
    flag: "🇹🇷",
    flagImage: "/polaris/flags/tr.png",
    image: "/polaris/landmarks/turkiye.webp",
    landmark: "Istanbul · Hagia Sophia",
    note: "A welcoming student experience at the meeting point of Europe and Asia.",
  },
  {
    country: "China",
    code: "CN",
    flag: "🇨🇳",
    flagImage: "/polaris/flags/cn.png",
    image: "/polaris/landmarks/china.webp",
    landmark: "Beijing · Great Wall",
    note: "Modern campuses, varied programmes and developing scholarship routes.",
  },
  {
    country: "Sweden",
    code: "SE",
    flag: "🇸🇪",
    flagImage: "/polaris/flags/se.png",
    image: "/polaris/landmarks/sweden.webp",
    landmark: "Stockholm · Gamla Stan",
    note: "Innovation-led education, English-taught degrees and a strong student culture.",
  },
  {
    country: "Austria",
    code: "AT",
    flag: "🇦🇹",
    flagImage: "/polaris/flags/at.png",
    image: "/polaris/landmarks/austria.webp",
    landmark: "Vienna · Schönbrunn Palace",
    note: "High-quality universities, central European access and diverse programme routes.",
  },
  {
    country: "Cyprus",
    code: "CY",
    flag: "🇨🇾",
    flagImage: "/polaris/flags/cy.png",
    image: "/polaris/landmarks/cyprus.webp",
    landmark: "Paphos · Harbour",
    note: "English-friendly study options, Mediterranean life and accredited degree routes.",
  },
  {
    country: "Malaysia",
    code: "MY",
    flag: "🇲🇾",
    flagImage: "/polaris/flags/my.png",
    image: "/polaris/landmarks/malaysia.webp",
    landmark: "Kuala Lumpur · Petronas Towers",
    note: "International campuses, broad English-medium options and competitive study costs.",
  },
  {
    country: "Finland",
    code: "FI",
    flag: "🇫🇮",
    flagImage: "/polaris/flags/fi.png",
    image: "/polaris/landmarks/finland.webp",
    landmark: "Helsinki · Cathedral",
    note: "Research-driven learning, student-centred teaching and modern degree programmes.",
  },
];

export function countrySlug(country: string) {
  return country.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const officialCatalogues = [
  {
    country: "Italy", flagImage: "/polaris/flags/it.png", source: "Universitaly",
    owner: "Italian Ministry of University and Research", coverage: "National universities, institutions and degree programmes",
    stat: "Official national catalogue", url: "https://www.universitaly.it/en/cerca-corsi",
  },
  {
    country: "France", flagImage: "/polaris/flags/fr.png", source: "Campus France",
    owner: "France's national higher-education agency", coverage: "English-taught programmes across French institutions",
    stat: "1,600+ English-taught programmes", url: "https://taughtie.campusfrance.org/tiesearch/",
  },
  {
    country: "Germany", flagImage: "/polaris/flags/de.png", source: "DAAD",
    owner: "German Academic Exchange Service", coverage: "Bachelor's, Master's, doctoral and international programmes",
    stat: "22,000+ degree programmes", url: "https://www.daad.de/en/studying-in-germany/universities/all-degree-programmes/",
  },
  {
    country: "Türkiye", flagImage: "/polaris/flags/tr.png", source: "Study in Türkiye",
    owner: "Council of Higher Education (YÖK)", coverage: "Associate, Bachelor's, Master's and doctoral programmes",
    stat: "Official national programme finder", url: "https://www.studyinturkiye.gov.tr/StudySearch/List",
  },
  {
    country: "China", flagImage: "/polaris/flags/cn.png", source: "Study in China",
    owner: "Official national education portal", coverage: "Degree, non-degree and scholarship programme routes",
    stat: "Official national catalogue", url: "https://www.studyinchina.edu.cn/",
  },
  {
    country: "Sweden", flagImage: "/polaris/flags/se.png", source: "UniversityAdmissions.se",
    owner: "Swedish Council for Higher Education", coverage: "Swedish university courses and programmes open to international applicants",
    stat: "Official national admissions catalogue", url: "https://www.universityadmissions.se/intl/search",
  },
  {
    country: "Austria", flagImage: "/polaris/flags/at.png", source: "Studienwahl.at",
    owner: "OeAD — Austria's Agency for Education and Internationalisation", coverage: "Degree programmes at Austrian higher-education institutions",
    stat: "2,500+ programmes", url: "https://www.studienwahl.at/en",
  },
  {
    country: "Cyprus", flagImage: "/polaris/flags/cy.png", source: "CYQAA",
    owner: "Cyprus Agency of Quality Assurance and Accreditation in Higher Education", coverage: "Accredited institutions and Bachelor's, Master's and doctoral programmes",
    stat: "Accredited national listings", url: "https://www.dipae.ac.cy/en/accreditation-en/accredited-institutions-en",
  },
  {
    country: "Malaysia", flagImage: "/polaris/flags/my.png", source: "Education Malaysia",
    owner: "Education Malaysia Global Services under the Ministry of Higher Education", coverage: "Programmes and courses offered by Malaysian institutions",
    stat: "Official programme directory", url: "https://educationmalaysia.gov.my/plan-your-studies/choose-what-to-study/programme-courses",
  },
  {
    country: "Finland", flagImage: "/polaris/flags/fi.png", source: "Studyinfo.fi",
    owner: "Finnish National Agency for Education", coverage: "Finnish degrees, qualifications and higher-education institutions",
    stat: "National programme database", url: "https://studyinfo.fi/",
  },
] as const;

export const services = [
  { symbol: "01", title: "Counselling", text: "A personal study plan shaped around your profile, goals and budget." },
  { symbol: "02", title: "Course & university selection", text: "A practical shortlist with clear reasons behind every recommendation." },
  { symbol: "03", title: "Application support", text: "Guidance for forms, statements, documents, deadlines and submissions." },
  { symbol: "04", title: "Scholarship guidance", text: "Support finding suitable funding routes and preparing complete applications." },
  { symbol: "05", title: "Visa assistance", text: "Structured student-visa and documentation guidance for your destination." },
  { symbol: "06", title: "IELTS & language training", text: "IELTS, English, spoken English and other language-learning programmes." },
  { symbol: "07", title: "Pre-departure support", text: "Help with travel preparation, accommodation planning and arrival readiness." },
  { symbol: "08", title: "Application tracking", text: "A clear view of your next steps from shortlist to departure." },
];

export type Course = {
  id: number;
  university: string;
  title: string;
  country: string;
  city: string;
  discipline: string;
  level: string;
  duration: string;
  language: string;
  intake: string;
  mode: string;
  featured?: boolean;
};

export const courses: Course[] = [
  { id: 1, university: "University of Bologna", title: "MSc Artificial Intelligence", country: "Italy", city: "Bologna", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus", featured: true },
  { id: 2, university: "Politecnico di Milano", title: "MSc Computer Science and Engineering", country: "Italy", city: "Milan", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 3, university: "University of Padua", title: "MSc Data Science", country: "Italy", city: "Padua", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 4, university: "Sapienza University of Rome", title: "BSc Applied Computer Science and Artificial Intelligence", country: "Italy", city: "Rome", discipline: "Computer & IT", level: "Bachelor's", duration: "3 years", language: "English", intake: "September", mode: "On campus" },
  { id: 5, university: "Université Paris-Saclay", title: "Master in Artificial Intelligence", country: "France", city: "Paris", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus", featured: true },
  { id: 6, university: "École Polytechnique", title: "MSc Data Science for Business", country: "France", city: "Palaiseau", discipline: "Business & Management", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 7, university: "Sciences Po", title: "Master in International Management and Sustainability", country: "France", city: "Paris", discipline: "Business & Management", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 8, university: "Technical University of Munich", title: "MSc Informatics", country: "Germany", city: "Munich", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "October", mode: "On campus", featured: true },
  { id: 9, university: "RWTH Aachen University", title: "MSc Data Science", country: "Germany", city: "Aachen", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "October", mode: "On campus" },
  { id: 10, university: "Technische Universität Berlin", title: "MSc Computer Science", country: "Germany", city: "Berlin", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "October", mode: "On campus" },
  { id: 11, university: "Middle East Technical University", title: "MSc Computer Engineering", country: "Türkiye", city: "Ankara", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus", featured: true },
  { id: 12, university: "Istanbul Technical University", title: "BSc Computer Engineering", country: "Türkiye", city: "Istanbul", discipline: "Computer & IT", level: "Bachelor's", duration: "4 years", language: "English", intake: "September", mode: "On campus" },
  { id: 13, university: "Bilkent University", title: "MSc Computer Science", country: "Türkiye", city: "Ankara", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 14, university: "Tsinghua University", title: "Master in Computer Science and Technology", country: "China", city: "Beijing", discipline: "Computer & IT", level: "Master's", duration: "3 years", language: "English", intake: "September", mode: "On campus", featured: true },
  { id: 15, university: "Zhejiang University", title: "Master in Data Science", country: "China", city: "Hangzhou", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 16, university: "Shanghai Jiao Tong University", title: "BSc Computer Science and Technology", country: "China", city: "Shanghai", discipline: "Computer & IT", level: "Bachelor's", duration: "4 years", language: "English", intake: "September", mode: "On campus" },
  { id: 17, university: "Politecnico di Torino", title: "MSc Mechanical Engineering", country: "Italy", city: "Turin", discipline: "Engineering & Technology", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 18, university: "Technical University of Munich", title: "MSc Biomedical Engineering", country: "Germany", city: "Munich", discipline: "Health & Medicine", level: "Master's", duration: "2 years", language: "English", intake: "October", mode: "On campus" },
];
