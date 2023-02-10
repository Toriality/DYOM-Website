import React from "react";
import { Box, IconButton, Link, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../images/logo.png";
import { Menu } from "./Menu";
import { Link as RouterLink } from "react-router-dom";

export function NavMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={styles.navMenu}>
      <Link component={RouterLink} to="/">
        <Box sx={styles.iconBox} component="img" alt="DYOM Logo" src={logo} />
      </Link>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        size="large"
        edge="start"
        color="primary"
      >
        <MenuIcon />
        <Typography variant="h4" component="div" color="primary">
          Menu
        </Typography>
      </IconButton>
      <Menu open={open} toggle={() => setOpen(!open)} />
    </Box>
  );
}

const styles = {
  navMenu: {
    display: "flex",
    alignItems: "center",
    "& > .MuiIconButton-root": { ml: 4, "& > .MuiTypography-root": { ml: 1 } },
  },
  iconBox: {
    height: 45,
    mt: "5px",
  },
};
