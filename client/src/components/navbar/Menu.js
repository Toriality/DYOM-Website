import React from "react";
import { Grid, Typography, Link, Drawer } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function Menu(props) {
  const handleLinkClick = () => {
    props.toggle();
  };
  const CustomLink = (props) => {
    return (
      <Link component={RouterLink} to={props.to} onClick={handleLinkClick}>
        {props.children}
      </Link>
    );
  };

  return (
    <Drawer
      onClose={props.toggle}
      anchor={"top"}
      open={props.open}
      ModalProps={{ onBackdropClick: props.toggle }}
      PaperProps={{ sx: styles.drawerPaper }}
    >
      <Grid container sx={styles.drawerGrid}>
        <Grid container>
          <Grid item xs={2.5}>
            <Typography variant="h2">General</Typography>
            <CustomLink to="/">Homepage</CustomLink>
            <CustomLink to="/news">News</CustomLink>
            <CustomLink to="/hall">Hall of Fame</CustomLink>
            <CustomLink to="/members">Member List</CustomLink>
            <CustomLink to="/faq">FAQ</CustomLink>
          </Grid>
          <Grid item xs={2.5}>
            <Typography variant="h2">Projects</Typography>
            <CustomLink to="/missions">Single Missions</CustomLink>
            <CustomLink to="/mps">Mission Packs</CustomLink>
            <CustomLink to="/dump">Dump Projects</CustomLink>
          </Grid>
          <Grid item xs={2.5}>
            <Typography variant="h2">Tutorials</Typography>
            <CustomLink to="/video_tutorials">Video Tutorials</CustomLink>
            <CustomLink to="/text_tutorials">Text Tutorials</CustomLink>
          </Grid>
          <Grid item xs={4.5} align="right">
            <Typography variant="h2">User</Typography>
            <Typography variant="body1">Logged in as: {}</Typography>
            <CustomLink to="/profile">My Profile</CustomLink>
            <CustomLink to="/profile/inbox">Inbox</CustomLink>
            <CustomLink to="/profile/settings">Profile Settings</CustomLink>
            <CustomLink to="/profile/logout">Logout</CustomLink>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
}

const styles = {
  drawerPaper: {
    backgroundColor: "background.default",
    opacity: "0.95",
  },

  drawerGrid: {
    p: 14,
    pt: 4,
    pb: 6,
    borderBottom: "2px solid",
    borderColor: "primary.main",
    "& *": {
      pb: 1,
    },
  },
};
