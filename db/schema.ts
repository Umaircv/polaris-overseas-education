import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const qrEvents = sqliteTable("qr_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventType: text("event_type").notNull(),
  campaign: text("campaign").notNull().default("master"),
  action: text("action").notNull().default(""),
  visitorId: text("visitor_id").notNull().default(""),
  referrer: text("referrer").notNull().default(""),
  device: text("device").notNull().default("unknown"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("idx_qr_events_type_created").on(table.eventType, table.createdAt),
  index("idx_qr_events_campaign_created").on(table.campaign, table.createdAt),
]);

export const qrLeads = sqliteTable("qr_leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  campaign: text("campaign").notNull().default("master"),
  visitorId: text("visitor_id").notNull().default(""),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  service: text("service").notNull(),
  country: text("country").notNull().default("Not decided"),
  studyLevel: text("study_level").notNull().default("Not specified"),
  discipline: text("discipline").notNull().default("Not specified"),
  intake: text("intake").notNull().default("Not decided"),
  ieltsStatus: text("ielts_status").notNull().default("Not specified"),
  consent: integer("consent", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("idx_qr_leads_created").on(table.createdAt),
  index("idx_qr_leads_campaign_created").on(table.campaign, table.createdAt),
]);
