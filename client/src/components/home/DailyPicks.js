import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDaily } from "../../features/project/projectSlice";
import { DYOMBanner } from "../../styles/components/dyom/DYOMBanner";
import banner from "../../images/daily_picks.jpg";

export function DailyPicks() {
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  const { daily, loading } = useSelector((state) => state.project);

  React.useEffect(() => {
    if (Array.isArray(daily)) {
      const projects = daily.map((dailypick) => {
        return dailypick.project;
      });
      setData(projects);
    } else {
      dispatch(getDaily());
    }
  }, [daily, dispatch]);

  return (
    <DYOMBanner
      banner={banner}
      data={data}
      type="Daily Picks"
      loading={loading}
    />
  );
}
