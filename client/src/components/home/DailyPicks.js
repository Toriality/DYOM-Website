import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDaily } from "../../features/project/projectSlice";
import { DYOMBanner } from "../../styles/components/DYOMBanner";
export function DailyPicks() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getDaily());
  }, []);

  const { daily, loading } = useSelector((state) => state.project);

  return <DYOMBanner data={daily} title="Daily Picks" loading={loading} />;
}
