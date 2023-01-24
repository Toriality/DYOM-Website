import React from "react";

import { Box, Typography } from "@mui/material";

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
      width: "50%",
      minHeight: "50%",
      bgcolor: "background.default",
      borderRadius: "16px",
      border: "1px solid",
      borderColor: "stroke.default",
      boxShadow: 24,
    }}
  >
    <Box mb={4}>
      <Typography variant="h2" component="div">
        {props.title}
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        flexGrow: "1",
        height: "100%",
      }}
    >
      <Typography variant="body1" component="div" mb="2rem">
        {props.desc}
      </Typography>
      {props.children}
    </Box>
  </Box>
));
