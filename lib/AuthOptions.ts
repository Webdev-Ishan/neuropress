import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import { prisma } from "./DB";
import bcrypt from "bcrypt";

export const Authoptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("email or password is missing");
        }

        try {
          const existUser = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!existUser) {
            throw new Error("User does not exist");
          }

          const samePassword = await bcrypt.compare(
            credentials.password,
            existUser.password
          );

          if (!samePassword) {
            throw new Error("Email or PAssword is wrong.");
          }

          return {
            id: existUser.id.toString(),
            email: existUser.email,
            username: existUser.username || "",
            createdAt: existUser.createdAt,
            success: true,
          } as User;
        } catch (error) {
          if (error instanceof Error) {
            console.log("Auth Error:", error.message);
            return null;
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/signin",
    signOut: "signout",
    error: "/error", // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });

        if (!dbUser) {
          // Add a custom flag to token
          token.registerRedirect = true;
          return token;
        }

        token.id = dbUser.id.toString();
        token.name = dbUser.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.name as string;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
