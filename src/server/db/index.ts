import { env } from "@/env";

import { mysqlTableCreator } from "drizzle-orm/mysql-core";
import { drizzle } from "drizzle-orm/mysql2";
import { type Pool, createPool } from "mysql2/promise";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  poolConnection: Pool | undefined;
};

const poolConnection =
  globalForDb.poolConnection ?? createPool({ uri: env.DATABASE_URL });
if (env.NODE_ENV !== "production") globalForDb.poolConnection = poolConnection;

export const db = drizzle({ client: poolConnection });

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `supabing_${name}`);
