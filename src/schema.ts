import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const snippets = sqliteTable("snippets", {
  id: text("id"),
  title: text("title").notNull(),
  prefix: text("prefix").notNull(),
  description: text("description"),
  body: text("body").notNull(),
  languages: text("languages", { mode: "json" }).notNull().$type<string[]>(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});