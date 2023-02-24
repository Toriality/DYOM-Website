import React from "react";
import { Box } from "@mui/material";

export const DYOMContent = React.forwardRef((props, ref) => (
  <Box
    sx={{
      margin: "0.8rem auto",
      maxWidth: "1600px",
      bgcolor: "background.box",
      p: "2rem 4rem",
      "& .MuiBox-root": { mb: "2rem" },
    }}
  >
    {props.children}
  </Box>
));
