import dbConnect from "@utils/dbConnect";
import { compare, hash } from "bcryptjs";
import Users from "models/Users";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "signin",
      name: "Sign In",

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
          throw new Error("No credentials provided");
        }
        await dbConnect();
        const user = await Users.findOne({ email: credentials.email });
        const verified = await compare(credentials.password, user?.password);
        if (user && verified) {
          return user;
        }
        throw new Error("Invalid Credentials");
      },
    }),
    CredentialsProvider({
      id: "signup",
      name: "Sign Up",

      credentials: {
        name: {
          label: "name",
          type: "text",
          placeholder: "Your Name",
        },
        email: {
          label: "email",
          type: "email",
          placeholder: "Your Password",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        await dbConnect();
        const user = await Users.findOne({ email: credentials.email });
        if (!user) {
          const passwordHash = await hash(credentials.password, 10);
          const user = Users.create({ ...credentials, password: passwordHash });
          return user;
        }
        throw new Error("This email is already in use");
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
