import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export function TitleAndData(props) {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h3">{props.title}</Typography>
      <Box>
        <IconButton
          id="previous"
          onClick={props.changePage}
          disabled={props.page === 1}
        >
          <AiOutlineLeft />
        </IconButton>
        <Typography variant="h3">
          {props.page}/{props.pages}
        </Typography>
        <IconButton
          id="next"
          onClick={props.changePage}
          disabled={props.page === props.pages}
        >
          <AiOutlineRight />
        </IconButton>
      </Box>
    </Box>
  );
}

const styles = {
  wrapper: {
    mb: 4,
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      color: "primary.main",
      "&[disabled]": {
        color: "primary.dark",
      },
    },
    "& div": { display: "flex" },
  },
};
