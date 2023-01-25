import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../images/logo.png";

export function NavMenu() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        sx={{
          height: 45,
        }}
        alt="DYOM Logo"
        src={logo}
      />
      <IconButton
        size="large"
        edge="start"
        color="primary"
        aria-label="menu"
        sx={{ ml: 4 }}
      >
        <MenuIcon />
        <Typography variant="h4" component="div" color="primary" sx={{ ml: 1 }}>
          Menu
        </Typography>
      </IconButton>
    </Box>
  );
}
