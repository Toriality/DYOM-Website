import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Link } from "@mui/material";
import { getStats } from "../../features/stats/statsSlice";
import { Link as RouterLink } from "react-router-dom";

export function SiteStatistics() {
  const { stats } = useSelector((state) => state.stats);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  return (
    <Box sx={styles.siteStatistics}>
      <Box>
        <Typography variant="h3">Statistics</Typography>
        <Box sx={styles.statisticsTexts}>
          <Box>
            <Typography variant="subtitle1">
              Missions:
              <Link component={RouterLink} to="/missions">
                {stats.missions}
              </Link>
            </Typography>
            <Typography variant="subtitle1">
              Mission Packs:
              <Link component={RouterLink} to="/mps">
                {stats.missionPacks}
              </Link>
            </Typography>
            <Typography variant="subtitle1">Dump Projects: {}</Typography>
            <Typography variant="subtitle1">Video Tutorials: {}</Typography>
            <Typography variant="subtitle1">Text Tutorials: {}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Members: {stats.users}</Typography>
            <Typography variant="subtitle1">
              Newest Member:
              <Link
                component={RouterLink}
                to={`/profile/${stats.newestUser?._id}`}
              >
                {stats.newestUser?.username}
              </Link>
            </Typography>
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
    "& .MuiLink-root": { display: "inline", ml: "1ch" },
  },
};
