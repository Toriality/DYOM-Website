import { Box, Button, Grid, Pagination, Typography } from "@mui/material";
import React from "react";
import { DYOMContent } from "../../../styles/components/DYOMContainer";
import banner from "../../../images/single_mission.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SearchBox } from "../../../styles/components/SearchBox";
import { ProjectBox } from "../../../styles/components/ProjectBox";
import { ProjectTable } from "../../../styles/components/ProjectTable";
import { PagesBox } from "../../../styles/components/PagesBox";
import { FilterBox } from "../../../styles/components/FilterBox";
import { listProjects } from "../../../features/project/projectSlice";

const UploadProject = () => (
  <Box display="flex" justifyContent={"flex-end"}>
    <Button component={Link} to="add">
      Upload project
    </Button>
  </Box>
);

export function ListMissions() {
  const [offset, setOffset] = React.useState(0);
  const [pdata, setpData] = React.useState([]);
  const [perPage] = React.useState(20);
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);

  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.project);

  const handleChange = (event, value) => {
    setPage(value);
    dispatch(listProjects(["mission", `?page=${value}`]));
  };

  const getData = () => {
    dispatch(listProjects(["mission", `?page=${page}`]));
  };

  React.useEffect(() => {
    if (list.list) {
      setPageCount(Math.ceil(list.total / 20));
    } else return getData();
  }, [list]);

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
            <PagesBox count={pageCount} page={page} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <ProjectTable data={list} loading={loading} />
          </Grid>
          <Grid item xs={4}>
            <PagesBox count={pageCount} page={page} onChange={handleChange} />
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
