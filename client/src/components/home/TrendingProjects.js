import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDaily, getTrending } from "../../features/project/projectSlice";
import { DYOMBanner } from "../../styles/components/DYOMBanner";
export function TrendingProjects() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTrending());
  }, []);

  const { trending, loading } = useSelector((state) => state.project);

  return (
    <DYOMBanner data={trending} title="Trending Projects" loading={loading} />
  );
}
