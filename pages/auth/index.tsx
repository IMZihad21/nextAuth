import { Box, Button, TextField, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import * as React from "react";
import { useForm } from "react-hook-form";

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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const { email, password } = data;
    signIn("credentials", { email, password });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Next.js with TypeScript and Material-UI
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          px: "20rem",
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email.message}
          {...register("email", {
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid Email Address",
            },
          })}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password.message}
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain at least one uppercase, one lowercase, one number and one special character",
            },
          })}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            py: "10px",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Authentication;
