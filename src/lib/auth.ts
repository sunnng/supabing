import { db } from "@/server/db"; // your drizzle instance
import * as schema from "@/server/db/schema/auth-schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql", // or "pg", "sqlite"
    schema: {
      ...schema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});
