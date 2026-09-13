import { env } from "cloudflare:workers";

export type QrEventInput = {
  eventType: "scan" | "action";
  campaign: string;
  action: string;
  visitorId: string;
  referrer: string;
  device: string;
};

export type QrLeadInput = {
  campaign: string;
  visitorId: string;
  name: string;
  phone: string;
  city: string;
  service: string;
  country: string;
  studyLevel: string;
  discipline: string;
  intake: string;
  ieltsStatus: string;
  consent: boolean;
};

export type QrCampaignSummary = {
  campaign: string;
  scans: number;
  actions: number;
  leads: number;
};

export type QrLeadRow = QrLeadInput & {
  id: number;
  createdAt: string;
};

function database(): D1Database {
  const db = env.DB;
  if (!db) throw new Error("QR analytics database is unavailable.");
  return db;
}

export async function recordQrEvent(input: QrEventInput) {
  return database().prepare(`
    INSERT INTO qr_events (event_type, campaign, action, visitor_id, referrer, device)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(
    input.eventType,
    input.campaign,
    input.action,
    input.visitorId,
    input.referrer,
    input.device,
  ).run();
}

export async function recordQrLead(input: QrLeadInput) {
  const db = database();
  const statements = [
    db.prepare(`
      INSERT INTO qr_leads (
        campaign, visitor_id, name, phone, city, service, country,
        study_level, discipline, intake, ielts_status, consent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      input.campaign,
      input.visitorId,
      input.name,
      input.phone,
      input.city,
      input.service,
      input.country,
      input.studyLevel,
      input.discipline,
      input.intake,
      input.ieltsStatus,
      input.consent ? 1 : 0,
    ),
    db.prepare(`
      INSERT INTO qr_events (event_type, campaign, action, visitor_id, referrer, device)
      VALUES ('action', ?, 'lead_submitted', ?, '', 'form')
    `).bind(input.campaign, input.visitorId),
  ];

  return db.batch(statements);
}

export async function getQrDashboard() {
  const db = database();
  const [summaryResult, campaignsResult, leadsResult] = await Promise.all([
    db.prepare(`
      SELECT
        COALESCE(SUM(CASE WHEN event_type = 'scan' THEN 1 ELSE 0 END), 0) AS scans,
        COALESCE(SUM(CASE WHEN event_type = 'action' THEN 1 ELSE 0 END), 0) AS actions,
        COUNT(DISTINCT CASE WHEN event_type = 'scan' AND visitor_id != '' THEN visitor_id END) AS unique_visitors,
        COALESCE(SUM(CASE WHEN event_type = 'scan' AND created_at >= datetime('now', '-7 days') THEN 1 ELSE 0 END), 0) AS scans_last_7_days,
        (SELECT COUNT(*) FROM qr_leads) AS leads
      FROM qr_events
    `).first<{ scans: number; actions: number; unique_visitors: number; scans_last_7_days: number; leads: number }>(),
    db.prepare(`
      SELECT
        campaign,
        SUM(CASE WHEN event_type = 'scan' THEN 1 ELSE 0 END) AS scans,
        SUM(CASE WHEN event_type = 'action' THEN 1 ELSE 0 END) AS actions,
        (SELECT COUNT(*) FROM qr_leads ql WHERE ql.campaign = qe.campaign) AS leads
      FROM qr_events qe
      GROUP BY campaign
      ORDER BY scans DESC, campaign ASC
    `).all<QrCampaignSummary>(),
    db.prepare(`
      SELECT
        id,
        campaign,
        visitor_id AS visitorId,
        name,
        phone,
        city,
        service,
        country,
        study_level AS studyLevel,
        discipline,
        intake,
        ielts_status AS ieltsStatus,
        consent,
        created_at AS createdAt
      FROM qr_leads
      ORDER BY created_at DESC, id DESC
      LIMIT 30
    `).all<QrLeadRow>(),
  ]);

  return {
    summary: {
      scans: Number(summaryResult?.scans ?? 0),
      actions: Number(summaryResult?.actions ?? 0),
      uniqueVisitors: Number(summaryResult?.unique_visitors ?? 0),
      scansLast7Days: Number(summaryResult?.scans_last_7_days ?? 0),
      leads: Number(summaryResult?.leads ?? 0),
    },
    campaigns: (campaignsResult.results ?? []).map((row) => ({
      ...row,
      scans: Number(row.scans ?? 0),
      actions: Number(row.actions ?? 0),
      leads: Number(row.leads ?? 0),
    })),
    leads: leadsResult.results ?? [],
  };
}

export function isQrAdmin(email: string) {
  const runtimeEnv = env as unknown as { QR_ADMIN_EMAILS?: string };
  const allowed = (runtimeEnv.QR_ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}
