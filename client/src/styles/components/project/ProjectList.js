import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDaily } from "../../../features/project/projectSlice";
import { DYOMBanner } from "../DYOMBanner";
import { ListTable } from "./ListTable";
import { ListTitle } from "./ListTitle";

export function ProjectList(props) {
  const [filteredDaily, setFilteredDaily] = React.useState({});
  const [pinned, setPinned] = React.useState({});
  const [data, setData] = React.useState({});

  const dispatch = useDispatch();
  const { daily, loading } = useSelector((state) => state.project);

  React.useEffect(() => {
    if (!Array.isArray(daily)) {
      dispatch(getDaily());
    } else {
      const filtered = daily.filter((el) => el.project.type === props.type);
      setFilteredDaily(filtered);
    }
  }, [daily]);

  console.log(filteredDaily);

  return (
    <>
      <ListTitle type={props.type} />
      <DYOMBanner data={filteredDaily} title="Daily Picks" loading={loading} />
      {/* <DYOMBanner data={pinned} title="Pinned Projects" loading={loading} /> */}
      <ListTable data={data} />
    </>
  );
}
