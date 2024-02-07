import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    Github({
      clientId: "8a1aa9738df9fcdd6879",
      clientSecret: "688dd77033f6e755cdf4a4bd780920b3aa0bf283",
    }),
  ],
});

export { handler as GET, handler as POST };
