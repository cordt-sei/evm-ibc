import NextAuth from "next-auth";
import CredentialsProvider from "@auth/core/providers/credentials";
import { validateJWT } from "./authHelpers";
import type { JwtPayload } from "jsonwebtoken";

interface User {
  id: string;
  name: string;
  email: string;
  scopes?: string[];
  // add anything else you need
}

export const config = {
  providers: [
    CredentialsProvider({
      name: "DynamicCredentials",
      credentials: {
        token: { label: "JWT", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.token) {
          throw new Error("Token is required");
        }
        const jwtPayload: JwtPayload | null = await validateJWT(credentials.token);
        if (jwtPayload) {
          return {
            id: jwtPayload.sub ?? "unknown",
            name: jwtPayload.name ?? "",
            email: jwtPayload.email ?? "",
            scopes: jwtPayload.scopes ?? [],
          } as User;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If a user was returned by authorize, attach user data to JWT
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.scopes = user.scopes;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose token fields on session object
      session.user = {
        ...session.user,
        id: token.id,
        scopes: token.scopes,
      };
      return session;
    },
  },
  // etc. (theme, pages, etc.)
};

const handler = NextAuth(config);
export { handler as GET, handler as POST };
