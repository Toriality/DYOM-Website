import React from "react";
import { Typography } from "@mui/material";
import { DYOMBox } from "./DYOMBox";
import { DYOMButton } from "./DYOMButton";

export function PagesBox() {
  return (
    <DYOMBox>
      <Typography variant="h3">Page:</Typography>
      <DYOMButton page checked>
        1
      </DYOMButton>
      <DYOMButton page>2</DYOMButton>
      <DYOMButton page>3</DYOMButton>
      <Typography ml={2} variant="h3">
        ...
      </Typography>
      <DYOMButton page>777</DYOMButton>
    </DYOMBox>
  );
}
