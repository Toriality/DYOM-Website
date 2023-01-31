import React from "react";
import { DYOMContent } from "../../../../styles/components/DYOMContainer";
import { Grid, Typography } from "@mui/material";
import { UploadImages } from "./UploadImages";
import { MainInfo } from "./MainInfo";
import { Description } from "./Description";
import { Specs } from "./Specs";

export function AddMission() {
  return (
    <DYOMContent>
      <Typography variant="h3" align="center" mb="2rem">
        Add a new mission
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <UploadImages />
        </Grid>
        <Grid item xs={6}>
          <MainInfo />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Description />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Specs />
        </Grid>
      </Grid>
    </DYOMContent>
  );
}
