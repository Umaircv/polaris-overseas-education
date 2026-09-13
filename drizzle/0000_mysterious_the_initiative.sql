CREATE TABLE `qr_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_type` text NOT NULL,
	`campaign` text DEFAULT 'master' NOT NULL,
	`action` text DEFAULT '' NOT NULL,
	`visitor_id` text DEFAULT '' NOT NULL,
	`referrer` text DEFAULT '' NOT NULL,
	`device` text DEFAULT 'unknown' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_qr_events_type_created` ON `qr_events` (`event_type`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_qr_events_campaign_created` ON `qr_events` (`campaign`,`created_at`);--> statement-breakpoint
CREATE TABLE `qr_leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`campaign` text DEFAULT 'master' NOT NULL,
	`visitor_id` text DEFAULT '' NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`city` text NOT NULL,
	`service` text NOT NULL,
	`country` text DEFAULT 'Not decided' NOT NULL,
	`study_level` text DEFAULT 'Not specified' NOT NULL,
	`discipline` text DEFAULT 'Not specified' NOT NULL,
	`intake` text DEFAULT 'Not decided' NOT NULL,
	`ielts_status` text DEFAULT 'Not specified' NOT NULL,
	`consent` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_qr_leads_created` ON `qr_leads` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_qr_leads_campaign_created` ON `qr_leads` (`campaign`,`created_at`);--> statement-breakpoint
PRAGMA optimize;
