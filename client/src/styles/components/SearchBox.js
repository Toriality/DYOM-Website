import { Box, Typography } from "@mui/material";
import React from "react";
import { DYOMBox } from "./DYOMBox";
import { DYOMSearch } from "./DYOMSearch";

export function SearchBox(props) {
  return (
    <DYOMBox>
      <Typography lineHeight="1" variant="h3">
        Search:
      </Typography>
      <DYOMSearch searchString={props.searchString} />
    </DYOMBox>
  );
}
