import React from "react";
import { DYOMContent } from "../../../../styles/components/DYOMContainer";
import { Button, Grid, Typography } from "@mui/material";
import { UploadImages } from "./UploadImages";
import { MainInfo } from "./MainInfo";
import { Specs } from "./Specs";
import { Box } from "@mui/system";

export function AddMission() {
  return (
    <DYOMContent>
      <Typography variant="h3" align="center" mb="2rem">
        Add a new mission
      </Typography>
      <Grid container spacing={5} mb={5}>
        <Grid item xs={4}>
          <UploadImages />
        </Grid>
        <Grid item xs={8}>
          <MainInfo />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Specs />
        </Grid>
      </Grid>
      <Box mt={10} align="center">
        <Button>Add mission</Button>
      </Box>
    </DYOMContent>
  );
}
