CREATE TABLE `snippets` (
	`id` text,
	`title` text NOT NULL,
	`prefix` text NOT NULL,
	`description` text,
	`body` text NOT NULL,
	`languages` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
