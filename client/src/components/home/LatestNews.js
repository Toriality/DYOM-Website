import React from "react";
import { Typography, Box } from "@mui/material";

export function LatestNews() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" mb={5}>
        Latest News
      </Typography>
      <Box
        sx={{
          minHeight: "40rem",
        }}
      >
        {/* 2 project boxes */}
      </Box>
    </Box>
  );
}
