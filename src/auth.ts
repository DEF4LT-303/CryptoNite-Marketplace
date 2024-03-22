import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"
import { getUserById } from "./data/user"
import { db } from "./lib/db"

// **Extending the Session to include Role**
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id)

      // Prevent signin without email verification
      if (!existingUser?.emailVerified) return false;

      return true
    },

    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role
      return token
    },

    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole // Extend
      }
      return session
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})