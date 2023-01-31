import { Typography, Box } from "@mui/material";
import { ProjectBox } from "../../styles/components/ProjectBox";
import React from "react";

export function TrendingProjects() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" mb={5}>
        Trending Projects
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 10,
        }}
      >
        <ProjectBox />
        <ProjectBox />
      </Box>
    </Box>
  );
}
