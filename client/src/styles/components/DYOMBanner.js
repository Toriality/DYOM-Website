import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { ProjectBox } from "../../styles/components/ProjectBox";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import bannerimg from "../../images/single_mission.jpg";
import { TitleAndData } from "./TitleAndPages";

export function DYOMBanner(props) {
  return (
    <Box align="center" sx={styles.banner}>
      <TitleAndData title={props.title} data={props.data} />
    </Box>
  );
}

const styles = {
  banner: {
    backgroundImage: `url(${bannerimg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    minHeight: "45rem",
    px: 20,
    py: 3,
  },
};
