import { Box, Typography } from "@mui/material";
import React from "react";
import { DYOMSearch } from "./DYOMSearch";

export function SearchBox(props) {
  return (
    <Box
      sx={{
        p: 3,
        pl: 4,
        pr: 4,
        borderRadius: "30px",
        backgroundColor: "background.default",
        border: "1px solid",
        borderColor: "stroke.default",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography lineHeight="1" variant="h3">
        Search:
      </Typography>
      <DYOMSearch searchString={props.searchString} />
    </Box>
  );
}
