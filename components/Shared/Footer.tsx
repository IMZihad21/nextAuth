import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box>
      <Typography
        variant="subtitle1"
        component="div"
        sx={{
          textAlign: "center",
        }}
      >
        This is a demo footer @2022
      </Typography>
    </Box>
  );
}
