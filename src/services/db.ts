import path from "path";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import Database from "better-sqlite3";
import { Snippet } from "../types";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const root =
  import.meta.env.VITE_COMMAND === "serve"
    ? import.meta.env.VITE_DEV_ROOT
    : path.join(__dirname, "..");

const sqlite = new Database("snippets.db", {
  nativeBinding: path.join(root, import.meta.env.VITE_BETTER_SQLITE3_BINDING),
});
const db = drizzle(sqlite);

export class Db {
  static async migrate() {
    await migrate(db, { migrationsFolder: "./drizzle" });
  }

  static async getSnippets() {
    return await db.select().from(snippets);
  }

  static async addSnippet(snippet: Snippet) {
    return await db.insert(snippets).values(snippet);
  }
}

const snippets = sqliteTable("snippets", {
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

Db.migrate();