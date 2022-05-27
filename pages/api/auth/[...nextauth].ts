import axiosClient from "@utils/axiosClient";
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
        const res = await axiosClient.post("/", {
          query: `
          mutation Mutation($email: String, $password: String) {
            signin(email: $email, password: $password) {
              firstName
              lastName
              email
              password
            }
          }
          `,
          variables: {
            email: credentials.email,
            password: credentials.password,
          },
        });
        console.log(res);
        if (res?.data?.errors?.length > 0) {
          throw new Error(
            res.data.errors.map((e: any) => e.message).join("\n")
          );
        }
        const user = { ...res.data.data.signin };
        delete user?.password;

        return user;
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

        const res = await axiosClient.post("/", {
          query: `
          mutation Mutation($firstName: String, $lastName: String, $email: String, $password: String) {
            signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
              id
              firstName
              lastName
              email
            }
          }
          `,
          variables: {
            email: credentials.email,
            password: credentials.password,
            firstName: credentials.name.split(" ")[0],
            lastName: credentials.name.split(" ")[1],
          },
        });
        if (res?.data?.errors?.length > 0) {
          throw new Error(
            res.data.errors.map((e: any) => e.message).join("\n")
          );
        }
        const user = { ...res.data.data.signup };
        delete user?.password;

        return user;
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
