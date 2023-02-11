import { Box, Link, Typography } from "@mui/material";
import {
  FaDiscord,
  FaTwitter,
  FaTiktok,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { MdForum } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

export function FooterLinks() {
  return (
    <Box sx={styles.footerLinks}>
      <Box>
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
      <Link component={RouterLink} to="report" variant="subtitle1">
        Report an issue
      </Link>
      <Typography variant="subtitle1">
        © 2008-2014 Dutchy3010 & PatrickW
      </Typography>
    </Box>
  );
}

const styles = {
  footerLinks: {
    p: 4,
    textAlign: "center",
    bgcolor: "#000",
    minHeight: "20vh",
    "& > .MuiBox-root": {
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
    },
  },
};
