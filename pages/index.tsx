import { Box, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, signOut } from "next-auth/react";
import * as React from "react";

// Export the `session` prop to use sessions with Server Side Rendering
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};

const Home: NextPage = ({ session }: any) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Next.js with TypeScript and Material-UI
      </Typography>
      {
        // If the user is logged in, show their name
        session && session.user && (
          <Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              textAlign="center"
            >
              You are logged in as {session.user.email}
            </Typography>
            <Typography
              variant="h4"
              onClick={() => {
                signOut();
              }}
            >
              LOgout
            </Typography>
          </Box>
        )
      }
    </Box>
  );
};

export default Home;
