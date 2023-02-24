import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "../../features/project/projectSlice";
import { DYOMBanner } from "../../styles/components/dyom/DYOMBanner";
export function TrendingProjects() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTrending());
  }, [dispatch]);

  const { trending, loading } = useSelector((state) => state.project);

  return (
    <DYOMBanner data={trending} title="Trending Projects" loading={loading} />
  );
}
