import { Box, Typography } from "@mui/material";

export function SiteStatistics() {
  return (
    <Box sx={styles.siteStatistics}>
      <Box>
        <Typography variant="h3">Statistics</Typography>
        <Box sx={styles.statisticsTexts}>
          <Box>
            <Typography variant="subtitle1">Missions: {}</Typography>
            <Typography variant="subtitle1">Mission Packs: {}</Typography>
            <Typography variant="subtitle1">Dump Projects: {}</Typography>
            <Typography variant="subtitle1">Video Tutorials: {}</Typography>
            <Typography variant="subtitle1">Text Tutorials: {}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Members: {}</Typography>
            <Typography variant="subtitle1">Newest Member: {}</Typography>
            <Typography variant="subtitle1">Members Online: {}</Typography>
            <Typography variant="subtitle1">Guests Online: {}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  siteStatistics: {
    py: 4,
    bgcolor: "#070707",
    minHeight: "10rem",
    maxHeight: "14rem",
    "& > .MuiBox-root": {
      width: "70%",
      m: "auto",
    },
  },

  statisticsTexts: {
    display: "flex",
    gap: "50%",
    "& *": { flexGrow: "1" },
  },
};
