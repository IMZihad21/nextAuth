import { Box, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getCsrfToken, getSession } from "next-auth/react";
import * as React from "react";

// Export the `session` prop to use sessions with Server Side Rendering
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    context.res.writeHead(302, {
      Location: "/",
    });
    context.res.end();
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

const Authentication: NextPage = ({ csrfToken }: any) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Next.js with TypeScript and Material-UI
      </Typography>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email
          <input name="email" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </Box>
  );
};

export default Authentication;
