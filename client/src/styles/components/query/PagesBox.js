import React from "react";
import { Pagination, Typography } from "@mui/material";
import { DYOMBox } from "../dyom/DYOMBox";

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
