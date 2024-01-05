import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { connection, db } from './db';

async function migration() {
  await migrate(db, { migrationsFolder: "./drizzle" });

  await connection.close();
}

migration();