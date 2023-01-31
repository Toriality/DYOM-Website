import { Box, Grid, Link, Typography } from "@mui/material";
import React from "react";
import {
  FaDiscord,
  FaTwitter,
  FaTiktok,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { MdForum } from "react-icons/md";
export function Footer() {
  return (
    <>
      <Box
        bgcolor="#070707"
        sx={{
          pt: 4,
          pb: 4,
          minHeight: "10rem",
          maxHeight: "14rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            m: "auto",
          }}
        >
          <Typography variant="h3" sx={{ display: "block", width: "100%" }}>
            Statistics
          </Typography>
          <Box sx={{ display: "flex", gap: "50%", "& *": { flexGrow: "1" } }}>
            <Box>
              <Typography variant="subtitle1">Missions: {}</Typography>
              <Typography variant="subtitle1">Mission Packs: {}</Typography>
              <Typography variant="subtitle1">Dump Projects: {}</Typography>
              <Typography variant="subtitle1">Video Tutorials: {}</Typography>
              <Typography variant="subtitle1">Text Tutorials: {}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">Members: {}</Typography>
              <Typography variant="subtitle1">Newest Member: {}</Typography>
              <Typography variant="subtitle1">Members Online: {}</Typography>
              <Typography variant="subtitle1">Guests Online: {}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          p: 4,
          textAlign: "center",
          bgcolor: "#000",
          minHeight: "20vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            mt: 2,
            mb: 6,
            justifyContent: "center",
            fontSize: "2rem",
            "& *": {
              color: "white",
            },
            "& *:hover": {
              color: "primary.main",
            },
            "& *:not(:last-child)": {
              mr: 6,
            },
          }}
        >
          <Link href="https://discordapp.com/invite/XzqxyV7" target="_blank">
            <FaDiscord />
          </Link>
          <Link href="https://twitter.com/OfficialDYOM" target="_blank">
            <FaTwitter />
          </Link>
          <Link href="https://www.tiktok.com/@officialdyom" target="_blank">
            <FaTiktok />
          </Link>
          <Link href="https://www.youtube.com/@dyom5505" target="_blank">
            <FaYoutube />
          </Link>
          <Link
            href="https://www.facebook.com/designyourownmission"
            target="_blank"
          >
            <FaFacebook />
          </Link>
          <Link
            href="https://gtaforums.com/forum/263-design-your-own-mission/"
            target="_blank"
          >
            <MdForum />
          </Link>
        </Box>
        <Link href="/report" variant="subtitle1">
          Report an issue
        </Link>
        <Typography variant="subtitle1">
          © 2008-2014 Dutchy3010 & PatrickW
        </Typography>
      </Box>
    </>
  );
}
