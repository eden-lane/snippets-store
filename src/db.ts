import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import Database from "better-sqlite3";

export const connection = new Database("snippets.db");

export const db = drizzle(connection, { schema });