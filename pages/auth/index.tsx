import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";

const Authentication: NextPage = () => {
  const [newUser, setNewUser] = React.useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [profilePicture, setProfilePicture] = React.useState<
    File | undefined
  >();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const handleAuthentication = async (mode: string, data: Object) => {
    setError(null);
    setSubmitStatus(true);
    const result = await signIn<"credentials">(mode, {
      redirect: false,
      ...data,
    });
    if (result?.error) {
      setError(result.error);
      setSubmitStatus(false);
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
          px: { xs: "2rem", md: "20rem" },
        }}
      >
        {error && (
          <Typography
            variant="h6"
            color="error"
            sx={{
              textAlign: "center",
            }}
          >
            {/* Authentication failed. Check the details you provided are correct. */}
            {error}
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
            errors.email && (errors.email.message || "Email is required")
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
            errors.password &&
            (errors.password.message || "Password is required")
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
              errors.confirmPassword &&
              (errors.confirmPassword.message || "Confirm Password is required")
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
        {newUser && (
          // <TextField
          //   variant="outlined"
          //   type="file"
          //   error={Boolean(errors.profilePicture)}
          //   helperText={
          //     errors.profilePicture &&
          //     (errors.profilePicture.message || "Profile Picture is required")
          //   }
          //   {...register("profilePicture")}
          // />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "1rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              minHeight: "55px",
              px: 2,
              py: 1,
            }}
          >
            <Typography
              component="label"
              htmlFor="profilePicture"
              sx={{
                display: "block",
                flexGrow: 1,
                textAlign: "left",
                fontSize: "1rem",
                fontWeight: "300",
                color: "#585858",
              }}
            >
              {profilePicture
                ? profilePicture.name.length > 40
                  ? "..." +
                    profilePicture?.name.substring(
                      profilePicture?.name.length - 40
                    )
                  : profilePicture.name
                : "Choose a profile picture"}
            </Typography>
            <input
              type="file"
              accept="image/*"
              hidden
              id="profilePicture"
              {...register("profilePicture", {
                onChange: (e) => setProfilePicture(e?.currentTarget?.files[0]),
              })}
            />
            {profilePicture && (
              <Avatar
                src={URL.createObjectURL(profilePicture)}
                sx={{
                  width: "3rem",
                  height: "3rem",
                  mr: "1rem",
                }}
              />
            )}
          </Box>
        )}
        <LoadingButton
          loading={submitStatus}
          type="submit"
          variant="contained"
          sx={{
            py: "10px",
          }}
        >
          {newUser ? "Sign Up" : "Sign In"}
        </LoadingButton>
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
