import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          This is a demo header
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
