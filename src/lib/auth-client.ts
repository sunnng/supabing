import { createAuthClient } from "better-auth/react";

export const client = createAuthClient({});
export const { signIn, signUp, signOut, useSession } = client;
