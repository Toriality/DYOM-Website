import React from "react";
import { useDispatch } from "react-redux";
import { getDaily } from "../../features/project/projectSlice";
export function DailyPicks() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getDaily());
  }, []);
  return;
}
