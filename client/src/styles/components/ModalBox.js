import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

export const ModalBox = React.forwardRef((props, ref) => (
  <Box
    sx={{
      position: "absolute",
      p: "2rem 4rem",
      display: "flex",
      flexDirection: "column",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: props.size === "big" ? "90%" : "50%",
      [props.size === "big" ? "height" : "maxHeight"]: "90%",
      bgcolor: "background.default",
      borderRadius: "16px",
      border: "1px solid",
      borderColor: "stroke.default",
      boxShadow: 24,
    }}
  >
    <Box
      mb={4}
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h2" component="div">
        {props.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "& *": { color: "primary.main" },
          "& svg": { mr: "1ch" },
        }}
      >
        <IconButton onClick={props.toggle}>
          <AiOutlineClose />
          <Typography variant="h3">Close</Typography>
        </IconButton>
      </Box>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        flexGrow: "1",
        height: "100%",
      }}
    >
      {props.children}
    </Box>
  </Box>
));
