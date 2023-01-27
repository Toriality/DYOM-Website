import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";

export function Menu(props) {
  return (
    <Box
      sx={{
        visibility: props.open ? "visible" : "hidden",
        zIndex: "999",
        position: "fixed",
        padding: "2rem 10rem",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "background.darker",
      }}
    >
      <Grid container height="100%">
        <Grid container xs={12} height={"5%"}>
          <Typography
            color="primary"
            onClick={() => {
              props.toggle();
            }}
            m={"auto"}
          >
            Clsoe
          </Typography>
        </Grid>
        <Grid container xs={12} height="90%" sx={{ "& *": { pb: 1 } }}>
          <Grid container xs={8}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <Typography variant="h2">Tutorials</Typography>
              <Link href="/video-tutorials" variant="body1">
                Video Tutorials
              </Link>
              <Link href="/text-tutorials" variant="body1">
                Text Tutorials
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h2">Statistics</Typography>
            <Typography variant="body1">Missions: {}</Typography>
            <Typography variant="body1">Mission Packs: {}</Typography>
            <Typography variant="body1">Dump Projects: {}</Typography>
            <Typography variant="body1">Video Tutorials: {}</Typography>
            <Typography variant="body1">Text Tutorials: {}</Typography>
            <Typography variant="body1">Members: {}</Typography>
            <Typography variant="body1">Newest Member: {}</Typography>
            <Typography variant="body1">Members Online: {}</Typography>
            <Typography variant="body1">Guests Online: {}</Typography>
          </Grid>
        </Grid>
        <Grid container xs={12} height={"5%"}>
          <Link href="/report" m={"auto"}>
            Report an issue
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
