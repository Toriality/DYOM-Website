import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { ProjectBox } from "../../styles/components/ProjectBox";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import bannerimg from "../../images/single_mission.jpg";

export function TrendingProjects() {
  return (
    <Box align="center" sx={styles.trendingProjects}>
      <Box sx={styles.wrapper}>
        <Typography variant="h3">Trending Projects</Typography>
        <Box>
          <IconButton>
            <AiOutlineLeft />
          </IconButton>
          <Typography variant="h3">x/x</Typography>
          <IconButton>
            <AiOutlineRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  trendingProjects: {
    backgroundImage: `url(${bannerimg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    minHeight: "45rem",
    px: 20,
    py: 3,
  },

  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    "& svg": { color: "primary.main" },
    "& div": { display: "flex" },
  },
};
