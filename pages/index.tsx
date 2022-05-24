import { Box, Typography } from "@mui/material";
import type { NextPage, NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import * as React from "react";

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps({ req }: NextPageContext) {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
}

const Home: NextPage = ({ session }: any) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Next.js with TypeScript and Material-UI
      </Typography>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        {JSON.stringify(session)}
      </Typography>
      {
        // If the user is logged in, show their name
        session && session.user && (
          <Typography
            variant="h4"
            onClick={() => {
              signOut();
            }}
          >
            LOgout
          </Typography>
        )
      }
    </Box>
  );
};

export default Home;
