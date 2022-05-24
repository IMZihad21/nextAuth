import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Navbar() {
  return (
    <AppBar position="static" component="nav">
      <Toolbar>
        <Typography variant="h6" component="div">
          This is a demo header
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
