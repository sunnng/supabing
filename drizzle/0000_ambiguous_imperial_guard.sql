CREATE TABLE `supabing_account` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp,
	`refresh_token_expires_at` timestamp,
	`scope` text,
	`password` text,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `supabing_account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `supabing_session` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` varchar(36) NOT NULL,
	CONSTRAINT `supabing_session_id` PRIMARY KEY(`id`),
	CONSTRAINT `supabing_session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `supabing_user` (
	`id` varchar(36) NOT NULL,
	`name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL,
	`image` text,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `supabing_user_id` PRIMARY KEY(`id`),
	CONSTRAINT `supabing_user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `supabing_verification` (
	`id` varchar(36) NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `supabing_verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `supabing_account` ADD CONSTRAINT `supabing_account_user_id_supabing_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `supabing_user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `supabing_session` ADD CONSTRAINT `supabing_session_user_id_supabing_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `supabing_user`(`id`) ON DELETE cascade ON UPDATE no action;