import React from "react";
import { Grid, Typography, Link, Drawer } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function Menu(props) {
  return (
    <Drawer
      anchor={"top"}
      open={props.open}
      ModalProps={{ onBackdropClick: props.toggle }}
      PaperProps={{ sx: styles.drawerPaper }}
    >
      <Grid container sx={styles.drawerGrid}>
        <Grid container>
          <Grid item xs={2.5}>
            <Typography variant="h2">General</Typography>
            <Link component={RouterLink} to="/" variant="body1">
              Homepage
            </Link>
            <Link component={RouterLink} to="news" variant="body1">
              News
            </Link>
            <Link component={RouterLink} to="hall-of-fame" variant="body1">
              Hall of Fame
            </Link>
            <Link component={RouterLink} to="members" variant="body1">
              Member List
            </Link>
            <Link component={RouterLink} to="faq" variant="body1">
              F.A.Q.
            </Link>
          </Grid>
          <Grid item xs={2.5}>
            <Typography variant="h2">Projects</Typography>
            <Link component={RouterLink} to="missions" variant="body1">
              Single Missions
            </Link>
            <Link component={RouterLink} to="mps" variant="body1">
              Mission Packs
            </Link>
            <Link component={RouterLink} to="dumping-grounds" variant="body1">
              Dumping Grounds
            </Link>
          </Grid>
          <Grid item xs={2.5}>
            <Typography variant="h2">Tutorials</Typography>
            <Link component={RouterLink} to="video-tutorials" variant="body1">
              Video Tutorials
            </Link>
            <Link component={RouterLink} to="/text-tutorials" variant="body1">
              Text Tutorials
            </Link>
          </Grid>
          <Grid item xs={4.5} align="right">
            <Typography variant="h2">User</Typography>
            <Typography variant="body1">Logged in as: {}</Typography>
            <Link component={RouterLink} to="profile" variant="body1">
              View Profile
            </Link>
            <Link component={RouterLink} to="profile/inbox" variant="body1">
              Inbox
            </Link>
            <Link component={RouterLink} to="profile/settings" variant="body1">
              Account Settings
            </Link>
            <Link component={RouterLink} to="profile/logout" variant="body1">
              Log Out
            </Link>
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
