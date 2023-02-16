import React from "react";
import { Box } from "@mui/material";

export function DYOMBox(props) {
  return (
    <Box
      sx={{
        p: 2,
        pl: 4,
        pr: 4,
        borderRadius: "30px",
        backgroundColor: "background.default",
        border: "1px solid",
        borderColor: "stroke.default",
        display: "flex",
        alignItems: "center",
        justifyContent: props.center ? "center" : "normal",
        "& *": {
          lineHeight: "1",
        },
        "& > h3": {
          mr: 3,
        },
      }}
    >
      {props.children}
    </Box>
  );
}
