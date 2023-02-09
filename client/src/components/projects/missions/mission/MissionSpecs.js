import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import React from "react";

export function MissionSpecs(props) {
  const Loading = () => {
    return <CircularProgress />;
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
              <Typography variant="body1">Mission original name</Typography>
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
              <Typography variant="body1">Mission MOTTO</Typography>
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
              <Typography variant="body1">Music Theme</Typography>
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
              <Typography variant="body1">Extreme</Typography>
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
              <Typography variant="body1">No</Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  return props.loading ? <Loading /> : <Loaded />;
}
