import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "../../features/project/projectSlice";
import { DYOMBanner } from "../../styles/components/dyom/DYOMBanner";
import banner from "../../images/trending_projects.jpg";

export function TrendingProjects() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTrending());
  }, [dispatch]);

  const { trending, loading } = useSelector((state) => state.project);

  return (
    <DYOMBanner
      banner={banner}
      data={trending}
      type="Trending Projects"
      loading={loading}
    />
  );
}
