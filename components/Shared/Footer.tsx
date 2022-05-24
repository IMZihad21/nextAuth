import { Box, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box component="footer">
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
        }}
      >
        This is a demo footer @2022
      </Typography>
    </Box>
  );
}
