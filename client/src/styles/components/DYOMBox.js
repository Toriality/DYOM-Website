import { Box } from "@mui/material";
import React from "react";

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
        //justifyContent: "space-between",
        alignItems: "center",
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
