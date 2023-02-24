import { Box, Grid, Typography, Skeleton } from "@mui/material";
import React from "react";

export function ProjectSpecs(props) {
  const Loading = () => {
    return (
      <>
        <Skeleton
          variant="text"
          sx={{ fontSize: "32pt", width: "20%", mb: 2 }}
        />
        <Grid container spacing={12}>
          <Grid item xs={6} sx={{ "& *": { mb: 2 } }}>
            <Skeleton variant="retangle" width="100%" height="3rem" />
            <Skeleton variant="retangle" width="100%" height="3rem" />
            <Skeleton variant="retangle" width="100%" height="3rem" />
          </Grid>
          <Grid item xs={6} sx={{ "& *": { mb: 2 } }}>
            <Skeleton variant="retangle" width="100%" height="3rem" />
            <Skeleton variant="retangle" width="100%" height="3rem" />
            <Skeleton variant="retangle" width="100%" height="3rem" />
          </Grid>
        </Grid>
      </>
    );
  };
  const Loaded = () => {
    return (
      <>
        <Typography variant="h2" mb={2}>
          Specs
        </Typography>
        <Grid container spacing={12}>
          <Grid item xs={6}>
            <Box sx={styles.specs}>
              <Box>
                <Typography variant="h3">Original name:</Typography>
                <Typography variant="body1">{props.data.original}</Typography>
              </Box>
              <Box>
                <Typography variant="h3">MOTTO:</Typography>
                <Typography variant="body1">{props.data.motto}</Typography>
              </Box>
              <Box>
                <Typography variant="h3">Music Theme:</Typography>
                <Typography variant="body1">{props.data.music}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles.specs}>
              <Box>
                <Typography variant="h3">Difficulty:</Typography>
                <Typography variant="body1">{props.data.difficulty}</Typography>
              </Box>
              <Box>
                <Typography variant="h3">Mods Required:</Typography>
                <Typography variant="body1">
                  {props.data.mods ? "Yes" : "No"}
                </Typography>
              </Box>
              {props.type === "MissionPack" ? (
                <Box>
                  <Typography variant="h3">Number of Missions:</Typography>
                  <Typography variant="body1">{props.data.num}</Typography>
                </Box>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  return props.loading ? <Loading /> : <Loaded />;
}

const styles = {
  specs: {
    "& div": {
      display: "flex",
      alignItems: "center",
      borderBottom: "2px solid",
      borderColor: "stroke.default",
      "& .MuiTypography-root:first-of-type": {
        mr: 8,
        width: "33%",
      },
    },
  },
};
