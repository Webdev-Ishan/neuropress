import { Authoptions } from "@/lib/AuthOptions";
import NextAuth from "next-auth";

const handler = NextAuth(Authoptions);

export { handler as GET, handler as POST };
