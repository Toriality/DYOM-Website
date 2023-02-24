import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDaily,
  listProjects,
  resetList,
} from "../../../features/project/projectSlice";
import { DYOMBanner } from "../DYOMBanner";
import { DYOMContent } from "../DYOMContainer";
import { ListTable } from "./ListTable";
import { ListTitle } from "./ListTitle";

export function ProjectList(props) {
  const [filteredDaily, setFilteredDaily] = React.useState({});
  //const [pinned, setPinned] = React.useState({});
  const [data, setData] = React.useState({});
  const [reset, setReset] = React.useState(false);

  const dispatch = useDispatch();
  const { daily, list, loading } = useSelector((state) => state.project);

  React.useEffect(() => {
    dispatch(resetList());
    dispatch(listProjects([props.type]));
    dispatch(getDaily());
    setReset(true);
  }, []);

  React.useEffect(() => {
    if (reset) {
      if (Object.keys(list).length > 0) {
        setData(list);
      }
      if (Object.keys(daily).length > 0) {
        const projects = daily.map((dailypick) => {
          return dailypick.project;
        });
        const filtered = projects.filter((el) => el.type === props.type);
        setFilteredDaily(filtered);
      }
    }
  }, [daily, list, reset]);

  return Object.keys(data).length === 0 ? null : (
    <>
      <ListTitle type={props.type} />
      <DYOMBanner data={filteredDaily} title="Daily Picks" loading={loading} />
      {/* <DYOMBanner data={pinned} title="Pinned Projects" loading={loading} /> */}
      <DYOMContent>
        <ListTable type={props.type} data={data} />
      </DYOMContent>
    </>
  );
}
