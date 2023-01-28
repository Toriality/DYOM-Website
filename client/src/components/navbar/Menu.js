import React from "react";
import { Box, Grid, Typography, Link, Drawer } from "@mui/material";

export function Menu(props) {
  return (
    <Drawer
      anchor={"top"}
      open={props.open}
      ModalProps={{
        onBackdropClick: props.toggle,
        sx: {},
      }}
      PaperProps={{
        sx: {
          backgroundColor: "background.darker",
          opacity: "0.95",
        },
      }}
    >
      <Grid
        container
        sx={{
          p: 14,
          pt: 4,
          pb: 6,
          borderBottom: "2px solid",
          borderColor: "primary.main",
        }}
      >
        <Grid
          container
          sx={{
            "& *": {
              pb: 1,
            },
          }}
        >
          <Grid item xs={2.5}>
            <Typography variant="h2">General</Typography>
            <Link href="/" variant="body1">
              Homepage
            </Link>
            <Link href="/news" variant="body1">
              News
            </Link>
            <Link href="/hall-of-fame" variant="body1">
              Hall of Fame
            </Link>
            <Link href="/members" variant="body1">
              Member List
            </Link>
            <Link href="/faq" variant="body1">
              F.A.Q.
            </Link>
          </Grid>
          <Grid item xs={2.5}>
            <Typography variant="h2">Projects</Typography>
            <Link href="/missions" variant="body1">
              Single Missions
            </Link>
            <Link href="/mission-packs" variant="body1">
              Mission Packs
            </Link>
            <Link href="/dumping-grounds" variant="body1">
              Dumping Grounds
            </Link>
          </Grid>
          <Grid item xs={2.5}>
            <Typography variant="h2">Tutorials</Typography>
            <Link href="/video-tutorials" variant="body1">
              Video Tutorials
            </Link>
            <Link href="/text-tutorials" variant="body1">
              Text Tutorials
            </Link>
          </Grid>
          <Grid item xs={4.5} sx={{ textAlign: "right" }}>
            <Typography variant="h2">User</Typography>
            <Typography variant="body1">Logged in as: {}</Typography>
            <Link href="/profile" variant="body1">
              View Profile
            </Link>
            <Link href="/profile/inbox" variant="body1">
              Inbox
            </Link>
            <Link href="/profile/settings" variant="body1">
              Account Settings
            </Link>
            <Link href="/profile/logout" variant="body1">
              Log Out
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
}
