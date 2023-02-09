import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import React from "react";
import { DYOMContent } from "../../../../styles/components/DYOMContainer";
import { MissionBanner } from "./MissionBanner";
import { MissionLeftPanel } from "./MissionLeftPanel";
import { MissionRightPanel } from "./MissionRightPanel";
import { MissionSpecs } from "./MissionSpecs";
import { useDispatch, useSelector } from "react-redux";
import { getMission } from "../../../../features/mission/missionSlice";

export function Mission() {
  const { missionInfo, loading } = useSelector((state) => state.mission);
  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getMission(id));
  }, []);

  return (
    <>
      <MissionBanner loading={loading} data={missionInfo} />
      <DYOMContent>
        <Grid container mb={8}>
          <MissionLeftPanel loading={loading} data={missionInfo} />
          <MissionRightPanel loading={loading} data={missionInfo} />
        </Grid>
        <Grid container>
          <MissionSpecs loading={loading} data={missionInfo} />
        </Grid>
      </DYOMContent>
    </>
  );
}
