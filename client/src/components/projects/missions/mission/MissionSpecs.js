import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Skeleton,
} from "@mui/material";
import React from "react";

export function MissionSpecs(props) {
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
            <Box
              display="flex"
              alignItems="center"
              borderBottom="2px solid"
              borderColor="stroke.default"
            >
              <Typography variant="h3" mr={8} width="33%">
                Original name:
              </Typography>
              <Typography variant="body1">{props.data.original}</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              borderBottom="2px solid"
              borderColor="stroke.default"
            >
              <Typography variant="h3" mr={8} width="33%">
                MOTTO:
              </Typography>
              <Typography variant="body1">{props.data.motto}</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              borderBottom="2px solid"
              borderColor="stroke.default"
            >
              <Typography variant="h3" mr={8} width="33%">
                Music Theme:
              </Typography>
              <Typography variant="body1">{props.data.music}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              display="flex"
              alignItems="center"
              borderBottom="2px solid"
              borderColor="stroke.default"
            >
              <Typography variant="h3" mr={8} width="33%">
                Difficulty:
              </Typography>
              <Typography variant="body1">{props.data.difficulty}</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              borderBottom="2px solid"
              borderColor="stroke.default"
            >
              <Typography variant="h3" mr={8} width="33%">
                Mods Required:
              </Typography>
              <Typography variant="body1">
                {props.data.mods ? "Yes" : "No"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  return props.loading ? <Loading /> : <Loaded />;
}
