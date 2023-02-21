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
import { ProjectList } from "../../../styles/components/project/ProjectList";

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

  return <ProjectList type="Mission" />;
}
