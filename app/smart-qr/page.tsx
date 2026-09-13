import type { Metadata } from "next";
import QRCode from "qrcode";
import { Brand } from "../site-shell";
import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import { qrCampaigns } from "../qr-campaigns";
import { getQrDashboard, isQrAdmin } from "../../db/qr";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Smart QR Dashboard",
  description: "Polaris Smart QR campaign codes, scans and student enquiries.",
  robots: { index: false, follow: false },
};

function whatsappNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("92")) return digits;
  if (digits.startsWith("0")) return `92${digits.slice(1)}`;
  return digits;
}

function pakistanDateTime(value: string) {
  const isoValue = `${value.trim().replace(" ", "T")}Z`;
  return new Date(isoValue).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Karachi" });
}

export default async function SmartQrDashboardPage() {
  const user = await requireChatGPTUser("/smart-qr");
  if (!isQrAdmin(user.email)) {
    return (
      <main className="qr-admin-access">
        <Brand />
        <section><span>RESTRICTED</span><h1>This account is not authorised.</h1><p>You are signed in as <strong>{user.email}</strong>. Ask the Polaris administrator to add this email.</p><a href={chatGPTSignOutPath("/smart-qr")}>Sign in with another account</a></section>
      </main>
    );
  }

  let data: Awaited<ReturnType<typeof getQrDashboard>> | null = null;
  let unavailable = false;
  try {
    data = await getQrDashboard();
  } catch (error) {
    console.error("QR dashboard unavailable", error);
    unavailable = true;
  }

  const qrCards = await Promise.all(qrCampaigns.map(async (campaign) => {
    const url = `https://polarisoverseasedu.com/connect?campaign=${campaign.slug}`;
    const svg = await QRCode.toString(url, { type: "svg", errorCorrectionLevel: "H", margin: 2, width: 640, color: { dark: "#031d39", light: "#ffffff" } });
    const downloadUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    const stats = data?.campaigns.find((item) => item.campaign === campaign.slug);
    return { ...campaign, url, svg, downloadUrl, stats };
  }));

  return (
    <main className="qr-admin-page">
      <header className="qr-admin-header"><Brand /><div><span>{user.displayName}</span><a href={chatGPTSignOutPath("/")}>Sign out</a></div></header>
      <section className="qr-admin-intro"><div><p>POLARIS SMART QR</p><h1>Campaign control centre.</h1><span>Create offline-to-online student journeys and see which touchpoints generate enquiries.</span></div><a href="/connect?campaign=master" target="_blank">Open scan experience ↗</a></section>

      {unavailable || !data ? <div className="qr-admin-notice"><strong>Analytics are temporarily unavailable.</strong><p>Your QR codes remain usable. Refresh after the database connection is ready.</p></div> : (
        <section className="qr-admin-summary" aria-label="Smart QR summary">
          <article><span>Total scans</span><strong>{data.summary.scans}</strong><small>{data.summary.scansLast7Days} in the last 7 days</small></article>
          <article><span>Unique devices</span><strong>{data.summary.uniqueVisitors}</strong><small>Anonymous browser IDs only</small></article>
          <article><span>Action clicks</span><strong>{data.summary.actions}</strong><small>Courses, WhatsApp, IELTS and more</small></article>
          <article><span>Student leads</span><strong>{data.summary.leads}</strong><small>Completed profile requests</small></article>
        </section>
      )}

      <section className="qr-admin-section">
        <div className="qr-admin-section-heading"><div><p>CAMPAIGN CODES</p><h2>Download, print and place.</h2></div><span>Every code opens the same live Smart Hub, while its campaign stays measurable.</span></div>
        <div className="qr-code-grid">
          {qrCards.map((campaign) => (
            <article key={campaign.slug}>
              <div className="qr-code-art" dangerouslySetInnerHTML={{ __html: campaign.svg }} />
              <div className="qr-code-copy"><small>{campaign.context}</small><h3>{campaign.name}</h3><p>{campaign.note}</p><dl><div><dt>Scans</dt><dd>{campaign.stats?.scans ?? 0}</dd></div><div><dt>Actions</dt><dd>{campaign.stats?.actions ?? 0}</dd></div><div><dt>Leads</dt><dd>{campaign.stats?.leads ?? 0}</dd></div></dl><div><a href={campaign.downloadUrl} download={`polaris-${campaign.slug}-qr.svg`}>Download SVG</a><a href={campaign.url} target="_blank">Test code ↗</a></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="qr-admin-section qr-lead-section">
        <div className="qr-admin-section-heading"><div><p>RECENT ENQUIRIES</p><h2>Student follow-up queue.</h2></div><span>Latest 30 profiles submitted from the QR experience.</span></div>
        {!data?.leads.length ? <div className="qr-empty"><strong>No QR leads yet.</strong><p>New student profiles will appear here after form submission.</p></div> : (
          <div className="qr-lead-table-wrap"><table><thead><tr><th>Student</th><th>Interest</th><th>Study plan</th><th>Campaign</th><th>Received</th><th>Contact</th></tr></thead><tbody>{data.leads.map((lead) => <tr key={lead.id}><td><strong>{lead.name}</strong><span>{lead.city}</span></td><td><strong>{lead.service}</strong><span>{lead.country}</span></td><td><strong>{lead.studyLevel} · {lead.discipline}</strong><span>{lead.intake} · {lead.ieltsStatus}</span></td><td>{lead.campaign}</td><td>{pakistanDateTime(lead.createdAt)}</td><td><a href={`https://wa.me/${whatsappNumber(lead.phone)}`} target="_blank">WhatsApp ↗</a></td></tr>)}</tbody></table></div>
        )}
      </section>
    </main>
  );
}
