import { recordQrLead } from "../../../../db/qr";

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as Record<string, unknown>;
    if (text(payload.website, 100)) return Response.json({ ok: true }, { status: 201 });

    const name = text(payload.name, 100);
    const phone = text(payload.phone, 30);
    const city = text(payload.city, 80);
    const service = text(payload.service, 80);
    const consent = payload.consent === true;

    if (!name || phone.length < 7 || !city || !service || !consent) {
      return Response.json({ error: "Please complete the required details and consent." }, { status: 400 });
    }

    await recordQrLead({
      campaign: text(payload.campaign, 80) || "master",
      visitorId: text(payload.visitorId, 80),
      name,
      phone,
      city,
      service,
      country: text(payload.country, 50) || "Not decided",
      studyLevel: text(payload.studyLevel, 50) || "Not specified",
      discipline: text(payload.discipline, 80) || "Not specified",
      intake: text(payload.intake, 50) || "Not decided",
      ieltsStatus: text(payload.ieltsStatus, 80) || "Not specified",
      consent,
    });

    return Response.json({ ok: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("QR lead recording failed", error);
    return Response.json({ error: "We could not save your request right now." }, { status: 503 });
  }
}
