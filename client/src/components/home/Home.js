import { Box } from "@mui/material";
import { Banner } from "./Banner";
import { LatestNews } from "./LatestNews";
import { TrendingProjects } from "./TrendingProjects";

export function Home() {
  return (
    <>
      <Banner />
      <Box
        sx={{
          margin: "0.8rem auto",
          maxWidth: "1600px",
          bgcolor: "background.box",
          p: "2rem 4rem",
          "& .MuiBox-root": { mb: "2rem" },
        }}
      >
        <TrendingProjects />
        <LatestNews />
      </Box>
    </>
  );
}
