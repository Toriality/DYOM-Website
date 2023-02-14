import { Box, Grid, Link, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React from "react";
import { DYOMContent } from "../../../../styles/components/DYOMContainer";
import { MissionBanner } from "./MissionBanner";
import { MissionLeftPanel } from "./MissionLeftPanel";
import { MissionRightPanel } from "./MissionRightPanel";
import { MissionSpecs } from "./MissionSpecs";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../../../features/project/projectSlice";
import { FaEdit } from "react-icons/fa";

export function Mission() {
  const { single, loading } = useSelector((state) => state.project);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const isAuthor = userInfo?._id === single?.author?._id;

  React.useEffect(() => {
    dispatch(getProject(["mission", id]));
  }, []);

  return (
    <>
      <MissionBanner loading={loading} data={single} />
      <DYOMContent>
        <Grid container mb={8}>
          <MissionLeftPanel loading={loading} data={single} />
          <MissionRightPanel loading={loading} data={single} />
        </Grid>
        <Grid container>
          <MissionSpecs loading={loading} data={single} />
        </Grid>
        {isAuthor ? (
          <Box mt={14} mb={4} sx={styles.editMission}>
            <Link>
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

const styles = {
  editMission: {
    display: "flex",
    justifyContent: "center",
    "& svg": { mr: 1 },
    "& a": { display: "flex", alignItems: "center" },
  },
};
