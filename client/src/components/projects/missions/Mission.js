import { useParams } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../../features/project/projectSlice";
import { Project } from "../../../styles/components/project/Project";

export function Mission() {
  const { single, loading } = useSelector((state) => state.project);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const isAuthor = userInfo?._id === single?.author?._id;

  React.useEffect(() => {
    dispatch(getProject(["mission", id]));
  }, []);

  return (
    <Project
      type="mission"
      loading={loading}
      data={single}
      isAuthor={isAuthor}
    />
  );
}
