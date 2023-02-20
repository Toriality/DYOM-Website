import React from "react";
import { Typography, Box, Link, Grid } from "@mui/material";
import nopreview from "../../images/nopreview.jpg";
import { Link as RouteLink } from "react-router-dom";

export function ProjectBox(props) {
  const [project, setProject] = React.useState({});

  const getProject = () => {
    setProject((prevState) => ({
      ...prevState,
      type:
        props.data.projectType === "Mission"
          ? "Single Mission"
          : "Mission Pack",
      typeURL: props.data.projectType === "Mission" ? "missions" : "mps",
      banner: props.data.project.banner
        ? `url(
        http://localhost:5000/api/
        ${props.data.projectType === "Mission" ? "missions" : "mps"}/
        ${props.data.project._id}/
        ${props.data.project.banner}
        )`
        : `url(${nopreview})`,
    }));
  };

  React.useEffect(() => {
    if (props.data) getProject();
  }, [props.data]);

  return props.loading ? null : (
    <Grid container>
      <Grid item xs={5}>
        <Box
          sx={{
            ...styles.projectBanner,
            backgroundImage: project.banner,
          }}
        />
      </Grid>
      <Grid item xs={7}>
        <Box textAlign={"left"}>
          <Link
            component={RouteLink}
            to={`/${project.typeURL}/${props.data?.project._id}`}
            variant="h3"
          >
            {props.data?.project.title}
          </Link>
          <Typography variant="h4">
            Created by:
            <Link sx={styles.author}>
              {props.data?.project.author.username}
            </Link>
          </Typography>
          <Typography variant="h4" color="text.primary">
            {project.type}
          </Typography>
          <Box>
            <Typography mt={5} variant="body1">
              {props.data?.project.summary}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

const styles = {
  projectBanner: {
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "8px",
    mr: 3,
    aspectRatio: "2/3",
  },

  author: {
    display: "inline",
    m: "1ch",
  },
};
