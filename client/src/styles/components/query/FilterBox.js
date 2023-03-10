import React from "react";
import { Typography } from "@mui/material";
import { DYOMBox } from "../dyom/DYOMBox";
import { DYOMButton } from "../dyom/DYOMButton";

export function FilterBox() {
  return (
    <DYOMBox>
      <Typography variant="h3">Filter by:</Typography>
      <DYOMButton checked>Latest</DYOMButton>
      <DYOMButton>Featured</DYOMButton>
      <DYOMButton>Best ratings</DYOMButton>
    </DYOMBox>
  );
}
