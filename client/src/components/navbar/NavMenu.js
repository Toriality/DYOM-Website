import React from "react";
import { Box, IconButton, Link, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../images/logo.png";
import { Menu } from "./Menu";
import { Link as RouterLink } from "react-router-dom";

export function NavMenu() {
  const [open, setOpen] = React.useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Link component={RouterLink} to="/">
        <Box
          component="img"
          sx={{
            height: 45,
            mt: "5px",
          }}
          alt="DYOM Logo"
          src={logo}
        />
      </Link>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
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
      <Menu open={open} toggle={toggle} />
    </Box>
  );
}
