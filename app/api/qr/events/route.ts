import { recordQrEvent } from "../../../../db/qr";

const eventTypes = new Set(["scan", "action"]);

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as Record<string, unknown>;
    const eventType = text(payload.eventType, 20);
    if (!eventTypes.has(eventType)) {
      return Response.json({ error: "Invalid event type." }, { status: 400 });
    }

    await recordQrEvent({
      eventType: eventType as "scan" | "action",
      campaign: text(payload.campaign, 80) || "master",
      action: text(payload.action, 80),
      visitorId: text(payload.visitorId, 80),
      referrer: text(payload.referrer, 300),
      device: text(payload.device, 30) || "unknown",
    });

    return Response.json({ ok: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("QR event recording failed", error);
    return Response.json({ error: "Analytics are temporarily unavailable." }, { status: 503 });
  }
}
