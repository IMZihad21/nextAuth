import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        return payload;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
