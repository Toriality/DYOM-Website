import React from "react";
import { Pagination, Typography } from "@mui/material";
import { DYOMBox } from "./DYOMBox";
import { DYOMButton } from "./DYOMButton";

export function PagesBox(props) {
  return (
    <DYOMBox>
      <Typography variant="h3">Page:</Typography>
      <Pagination
        count={props.count}
        page={props.page}
        onChange={props.onChange}
        hideNextButton
        hidePrevButton
      />
    </DYOMBox>
  );
}
