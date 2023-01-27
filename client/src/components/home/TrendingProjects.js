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
        m: "2rem 10rem",
      }}
    >
      <Typography variant="h3" mb={5}>
        Trending Projects
      </Typography>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "background.darker",
          border: "2px solid",
          borderColor: "stroke.default",
          borderRadius: "40px",
          width: "100%",
          minHeight: "40rem",
          p: "2rem 4rem",
          gap: 10,
        }}
      >
        <ProjectBox />
        <ProjectBox />
      </Box>
    </Box>
  );
}
