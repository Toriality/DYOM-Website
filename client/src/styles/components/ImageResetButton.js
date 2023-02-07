import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const iconButtonStyle = {
  color: "error.main",
  position: "absolute",
  zIndex: "999",
  bgcolor: "white",
  p: 0.5,
  transform: "translate(-25%, -25%)",
  "&:hover": {
    opacity: "1",
    bgcolor: "error.main",
    color: "white",
  },
};

export function ImageResetButton(props) {
  return (
    <IconButton onClick={props.onClick} sx={iconButtonStyle}>
      <CloseIcon />
    </IconButton>
  );
}
