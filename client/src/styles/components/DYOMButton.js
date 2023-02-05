import { ButtonBase, Typography } from "@mui/material";
import React from "react";

export function DYOMButton(props) {
  return (
    <ButtonBase
      sx={{
        p: 1,
        pr: props.page ? 2 : 3,
        pl: props.page ? 2 : 3,
        borderRadius: "30px",
        backgroundColor: props.checked ? "background.light" : "inherit",
        "&:hover": {
          filter: "brightness(200%)",
        },
      }}
    >
      <Typography color={props.checked ? "white" : "primary.main"} variant="h3">
        {props.children}
      </Typography>
    </ButtonBase>
  );
}
