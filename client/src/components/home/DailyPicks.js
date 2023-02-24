import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDaily } from "../../features/project/projectSlice";
import { DYOMBanner } from "../../styles/components/dyom/DYOMBanner";
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
      console.log(data);
    } else {
      dispatch(getDaily());
    }
  }, [daily]);

  return <DYOMBanner data={data} title="Daily Picks" loading={loading} />;
}
