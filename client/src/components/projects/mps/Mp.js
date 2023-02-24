import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProject } from "../../../features/project/projectSlice";
import { Project } from "../../../styles/components/project/view/Project";

export function Mp() {
  const { single, loading } = useSelector((state) => state.project);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const isAuthor = userInfo?._id === single?.author?._id;

  React.useEffect(() => {
    dispatch(getProject(["mp", id]));
  }, []);

  return (
    <Project type="mp" loading={loading} data={single} isAuthor={isAuthor} />
  );
}
