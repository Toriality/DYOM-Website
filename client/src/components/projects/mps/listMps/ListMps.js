import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { DYOMContent } from "../../../../styles/components/DYOMContainer";
import banner from "../../../../images/single_mission.jpg";
import { ProjectBox } from "../../../../styles/components/ProjectBox";
import { SearchBox } from "../../../../styles/components/SearchBox";
import { FilterBox } from "../../../../styles/components/FilterBox";
import { PagesBox } from "../../../../styles/components/PagesBox";
import { MissionTable } from "../../../../styles/components/MissionTable";
import { listProjects } from "../../../../features/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UploadProject = () => (
  <Box display="flex" justifyContent={"flex-end"}>
    <Button component={Link} to="add">
      Upload project
    </Button>
  </Box>
);

export function ListMps() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.project.list);

  React.useEffect(() => {
    dispatch(listProjects("mp"));
  }, [dispatch]);

  return (
    <>
      <Grid
        mt={"auto"}
        container
        spacing={1}
        alignItems="center"
        sx={styles.titleGrid}
      >
        <Grid item xs={12}>
          <Typography variant="h2">Mission-Packs</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            Mission packs contains more than one DYOM file, presenting a new GTA
            universe and telling big stories in form of chapters or epsodes!
          </Typography>
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
        <Grid container justifyContent="space-between" spacing={2} my={4}>
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
        <Grid container justifyContent="space-between" spacing={2} my={4}>
          <Grid item xs={12}>
            <Typography variant="h2">List of uploaded missions</Typography>
          </Grid>
          <Grid item xs={6}>
            <SearchBox searchString="search=" />
          </Grid>
          <Grid item xs={6}>
            <UploadProject />
          </Grid>
          <Grid item xs={6}>
            <FilterBox />
          </Grid>
          <Grid item xs={4}>
            <PagesBox />
          </Grid>
          <Grid item xs={12}>
            <MissionTable data={data} />
          </Grid>
          <Grid item xs={4}>
            <PagesBox />
          </Grid>
          <Grid item xs={6}>
            <UploadProject />
          </Grid>
        </Grid>
      </DYOMContent>
    </>
  );
}

const styles = {
  titleGrid: {
    px: 20,
    py: 4,
    backgroundImage: "url(" + banner + ")",
    backgroundSize: "cover",
  },
};
