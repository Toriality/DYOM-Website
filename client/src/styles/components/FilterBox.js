import React from "react";
import { Typography } from "@mui/material";
import { DYOMBox } from "./DYOMBox";
import { DYOMButton } from "./DYOMButton";

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
