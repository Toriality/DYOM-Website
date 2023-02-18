import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { ProjectBox } from "../../styles/components/ProjectBox";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import bannerimg from "../../images/single_mission.jpg";

export function TitleAndData(props) {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h3">{props.title}</Typography>
      <Box>
        <IconButton>
          <AiOutlineLeft />
        </IconButton>
        <Typography variant="h3">
          {page}/{pages}
        </Typography>
        <IconButton>
          <AiOutlineRight />
        </IconButton>
      </Box>
    </Box>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    "& svg": { color: "primary.main" },
    "& div": { display: "flex" },
  },
};
