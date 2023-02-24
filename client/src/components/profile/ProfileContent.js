import { DYOMBox } from "../../styles/components/dyom/DYOMBox";
import { DYOMButton } from "../../styles/components/dyom/DYOMButton";
import { DYOMContent } from "../../styles/components/dyom/DYOMContainer";
import React from "react";
import { Box, Typography } from "@mui/material";
import { ProjectTable } from "../../styles/components/project/list/ProjectTable";

export function ProfileContent(props) {
  const [value, setValue] = React.useState("0");
  const [projects, setProjects] = React.useState([{}]);

  const handleClick = (e) => {
    setValue(e.currentTarget.id);
  };

  React.useEffect(() => {
    function sortProjects() {
      if (props.profile.missions) {
        let missions = JSON.parse(JSON.stringify([...props.profile.missions]));
        let missionPacks = JSON.parse(
          JSON.stringify([...props.profile.missionPacks])
        );
        missions = missions.map((obj) => {
          obj.type = "Single Mission";
          return obj;
        });
        missionPacks = missionPacks.map((obj, k) => {
          obj.type = "Mission Pack";
          return obj;
        });
        let p = [...missions, ...missionPacks];
        p.sort((a, b) => {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
        setProjects(p);
      }
    }

    sortProjects();
  }, [props.profile]);

  return (
    <DYOMContent>
      <DYOMBox center>
        <DYOMButton componentId="0" onClick={handleClick} checked>
          About me
        </DYOMButton>
        <DYOMButton componentId="1" onClick={handleClick}>
          Projects
        </DYOMButton>
        <DYOMButton componentId="2" onClick={handleClick}>
          Comments
        </DYOMButton>
        <DYOMButton componentId="3" onClick={handleClick}>
          Activity
        </DYOMButton>
      </DYOMBox>
      <Content profile={props.profile} value={value} projects={projects} />
    </DYOMContent>
  );
}

function Content(props) {
  switch (props.value) {
    case "0":
      // About me
      return (
        <>
          <Typography variant="h2" align="center" mb={4}>
            {props.profile.username}'s About Me
          </Typography>
          <Box sx={styles.aboutMe}>
            <Typography variant="body1">{props.profile.aboutMe}</Typography>
          </Box>
        </>
      );
    case "1":
      // Projects
      return (
        <>
          <Typography variant="h2" align="center" mb={4}>
            {props.profile.username}'s Projects
          </Typography>
          <ProjectTable data={props.projects} custom={true} />
        </>
      );
    case "2":
      // Comments
      return null;
    case "3":
      // Activity
      return null;
    default:
      return null;
  }
}

const styles = {
  aboutMe: {
    maxWidth: "72ch",
    margin: "auto",
  },
};
