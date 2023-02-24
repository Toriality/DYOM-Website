import { Box, Grid, Link } from "@mui/material";
import React from "react";
import { DYOMContent } from "../../dyom/DYOMContainer";
import { ProjectBanner } from "./ProjectBanner";
import { ProjectLeftPanel } from "./ProjectLeftPanel";
import { ProjectRightPanel } from "./ProjectRightPanel";
import { ProjectSpecs } from "./ProjectSpecs";
import { FaEdit } from "react-icons/fa";

export function Project(props) {
  return (
    <>
      <ProjectBanner
        type={props.type}
        loading={props.loading}
        data={props.data}
      />
      <DYOMContent>
        <Grid container mb={8}>
          <ProjectLeftPanel loading={props.loading} data={props.data} />
          <ProjectRightPanel loading={props.loading} data={props.data} />
        </Grid>
        <Grid container>
          <ProjectSpecs
            type={props.type}
            loading={props.loading}
            data={props.data}
          />
        </Grid>
        {props.isAuthor ? (
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
