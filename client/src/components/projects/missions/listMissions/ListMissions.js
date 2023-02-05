import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { DYOMContent } from "../../../../styles/components/DYOMContainer";
import banner from "../../../../images/single_mission.jpg";
import { ProjectBox } from "../../../../styles/components/ProjectBox";

const UploadProject = () => (
  <Box display="flex" justifyContent={"flex-end"}>
    <Button href="add">Upload project</Button>
  </Box>
);

export function ListMissions() {
  return (
    <>
      <Grid
        mt={"auto"}
        container
        spacing={1}
        alignItems="center"
        pt={4}
        pb={4}
        pr={20}
        pl={20}
        sx={{
          backgroundSize: "cover",
          backgroundImage: "url(" + banner + ")",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h2">Single Missions</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Share and play DYOM missions!</Typography>
        </Grid>
        <Grid item xs={6}>
          <UploadProject />
        </Grid>
      </Grid>
      <DYOMContent>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item xs={12}>
            <Typography mb={4} variant="h2">
              Daily Picks
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <ProjectBox />
          </Grid>
          <Grid item xs={5}>
            <Box width="100%" height="100%" bgcolor="background.default" />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          spacing={2}
          mt={4}
          mb={4}
        >
          <Grid item xs={10}>
            <Typography mb={4} variant="h2">
              Pinned Projects
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography align="right" mb={4} variant="h2">
              (...)
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ProjectBox />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          spacing={2}
          mt={4}
          mb={4}
        >
          <Grid item xs={12}>
            <Typography variant="h2">List of uploaded missions</Typography>
          </Grid>
          <Grid item xs={8}>
            {/* Search box */}
          </Grid>
          <Grid item xs={4}>
            <UploadProject />
          </Grid>
          <Grid item xs={8}>
            {/* Filter box */}
          </Grid>
          <Grid item xs={4}>
            {/* Page picker box */}
          </Grid>
          <Grid item xs={12}>
            {/* Missions table */}
          </Grid>
          <Grid item xs={8}>
            {/* Page picker */}
          </Grid>
          <Grid item xs={4}>
            <UploadProject />
          </Grid>
        </Grid>
      </DYOMContent>
    </>
  );
}