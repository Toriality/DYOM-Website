import React from "react";
import { Typography, Box } from "@mui/material";

export function LatestNews() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        m: "2rem 10rem",
      }}
    >
      <Typography variant="h3" mb={5}>
        Latest News
      </Typography>
      <Box
        sx={{
          backgroundColor: "background.darker",
          border: "2px solid",
          borderColor: "stroke.default",
          borderRadius: "40px",
          width: "100%",
          minHeight: "40rem",
        }}
      >
        {/* 2 project boxes */}
      </Box>
    </Box>
  );
}
