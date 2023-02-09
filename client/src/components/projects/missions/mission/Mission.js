import { Box, Grid, Link, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React from "react";
import { DYOMContent } from "../../../../styles/components/DYOMContainer";
import { MissionBanner } from "./MissionBanner";
import { MissionLeftPanel } from "./MissionLeftPanel";
import { MissionRightPanel } from "./MissionRightPanel";
import { MissionSpecs } from "./MissionSpecs";
import { useDispatch, useSelector } from "react-redux";
import { getMission } from "../../../../features/mission/missionSlice";
import { FaEdit } from "react-icons/fa";

export function Mission() {
  const { missionInfo, loading } = useSelector((state) => state.mission);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const isAuthor = userInfo?._id === missionInfo?.author?._id;

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
        {isAuthor ? (
          <Box
            mt={14}
            mb={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              "& svg": { mr: 1 },
            }}
          >
            <Link sx={{ display: "flex", alignItems: "center" }}>
              <FaEdit />
              Edit mission
            </Link>
          </Box>
        ) : (
          <Box mt={8} />
        )}
      </DYOMContent>
    </>
  );
}
