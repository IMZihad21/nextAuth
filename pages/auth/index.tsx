import { Box, Button, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";

const Authentication: NextPage = () => {
  const [newUser, setNewUser] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const handleAuthentication = async (mode: string, data: Object) => {
    setError(null);
    const result = await signIn<"credentials">(mode, {
      redirect: false,
      ...data,
    });
    if (result?.error) {
      setError(result.error);
      return;
    }
    router.push("/");
  };

  const onSubmit = async (data: Object) => {
    if (newUser) {
      handleAuthentication("signup", data);
    } else {
      handleAuthentication("signin", data);
    }
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
        {error && (
          <Typography
            variant="body1"
            color="error"
            sx={{
              textAlign: "center",
            }}
          >
            Authentication failed. Check the details you provided are correct.
          </Typography>
        )}
        {newUser && (
          <TextField
            label="Name"
            error={Boolean(errors.name)}
            helperText={errors.name && "Name is required"}
            {...register("name", { required: true })}
          />
        )}
        <TextField
          label="Email"
          variant="outlined"
          error={Boolean(errors.email)}
          helperText={
            (errors.email && errors.email.message) || "Email is required"
          }
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
          helperText={
            (errors.password && errors.password.message) ||
            "Password is required"
          }
          {...register("password", {
            required: true,
            pattern: {
              value: newUser
                ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                : /^.{8,50}$/,
              message: newUser
                ? "Password must contain at least one uppercase, one lowercase, one number and one special character"
                : "Password should be at least 8 characters long and not more than 50 characters long",
            },
          })}
        />
        {newUser && (
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            error={Boolean(errors.confirmPassword)}
            helperText={
              (errors.confirmPassword && errors.confirmPassword.message) ||
              "Confirm Password is required"
            }
            {...register("confirmPassword", {
              required: true,
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{
            py: "10px",
          }}
        >
          {newUser ? "Sign Up" : "Sign In"}
        </Button>
        <Button
          onClick={() => {
            setNewUser(!newUser);
            setError(null);
          }}
          sx={{
            color: "black",
            fontSize: "0.9rem",
          }}
        >
          {newUser ? "Already have an account?" : "Create an account"}
        </Button>
      </Box>
    </Box>
  );
};

export default Authentication;
