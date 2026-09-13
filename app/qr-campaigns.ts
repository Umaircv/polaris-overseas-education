export const qrCampaigns = [
  { slug: "master", name: "Master QR", context: "General use", note: "Use anywhere a campaign-specific code is not required." },
  { slug: "office", name: "Office reception", context: "Lahore office", note: "Place at the front desk and counselling tables." },
  { slug: "business-card", name: "Business cards", context: "Team networking", note: "Add to counsellor and company business cards." },
  { slug: "brochure", name: "Printed brochures", context: "Study-abroad material", note: "Use on brochures, flyers and destination guides." },
  { slug: "education-event", name: "Education events", context: "Expos and seminars", note: "Track students arriving through exhibitions and seminars." },
  { slug: "social-poster", name: "Social posters", context: "Instagram and Facebook", note: "Use on social creatives and downloadable posters." },
] as const;

export function campaignName(slug: string) {
  return qrCampaigns.find((campaign) => campaign.slug === slug)?.name ?? "Polaris Smart QR";
}
