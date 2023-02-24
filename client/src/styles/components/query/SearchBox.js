import React from "react";
import { Typography } from "@mui/material";
import { DYOMBox } from "../dyom/DYOMBox";
import { DYOMSearch } from "../dyom/DYOMSearch";

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
