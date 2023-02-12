import React from "react";
import { Box, Typography, Button } from "@mui/material";
import img from "../../images/image.jpg";

export function Banner() {
  return (
    <Box sx={styles.banner}>
      <Box sx={styles.bannerGradient} />
      <Box sx={styles.bannerContent}>
        <Box mb={5}>
          <Typography variant="h2" lineHeight={"1"}>
            Design Your Own Mission
          </Typography>
          <Typography variant="h3" color={"secondary"} lineHeight={"0.8"}>
            Create, Play, Share!
          </Typography>
        </Box>

        <Box mb={5} maxWidth={"55ch"}>
          <Typography variant="body1">
            Unleash your creativity and bring your best ideas to life with this
            powerful and intuitive mission editor for GTA San Andreas!
          </Typography>
        </Box>

        <Typography variant="subtitle1" mb={"2px"}>
          Latest version: DYOM 8.1
        </Typography>
        <Box>
          <Button
            href="https://www.gtagarage.com/mods/show.php?id=5038"
            target="_blank"
            variant="contained"
          >
            Download Mod
          </Button>
        </Box>
      </Box>
      <Box sx={styles.bannerImage} />
    </Box>
  );
}

const styles = {
  banner: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000",
    height: "88vh",
  },

  bannerGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,212,255,0) 100%)",
  },

  bannerContent: {
    zIndex: "1",
    ml: "12%",
    mr: 0,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  bannerImage: {
    width: "60%",
    backgroundImage: "url(" + img + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
};
