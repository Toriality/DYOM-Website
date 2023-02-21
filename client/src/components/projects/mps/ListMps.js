import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { DYOMContent } from "../../../styles/components/DYOMContainer";
import banner from "../../../images/single_mission.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProjects } from "../../../features/project/projectSlice";
import { SearchBox } from "../../../styles/components/SearchBox";
import { FilterBox } from "../../../styles/components/FilterBox";
import { PagesBox } from "../../../styles/components/PagesBox";
import { ProjectTable } from "../../../styles/components/ProjectTable";
import { ProjectBox } from "../../../styles/components/ProjectBox";
import { ProjectList } from "../../../styles/components/project/ProjectList";

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

  return <ProjectList type="MissionPack" />;
}
