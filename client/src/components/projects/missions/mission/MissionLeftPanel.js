import { CircularProgress, Grid, Skeleton, Typography } from "@mui/material";

export function MissionLeftPanel(props) {
  const Loading = () => {
    return (
      <Grid item xs={8}>
        <Skeleton
          variant="text"
          sx={{ fontSize: "32pt", width: "50%", mb: 2 }}
        />
        <Skeleton
          variant="retangle"
          width="80%"
          height="25rem"
          sx={{ mb: 4 }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "32pt", width: "50%", mb: 2 }}
        />
        <Skeleton variant="retangle" width="80%" height="12rem" />
      </Grid>
    );
  };
  const Loaded = () => {
    return (
      <Grid item xs={8}>
        <Typography variant="h2" mb={2}>
          Full Description
        </Typography>
        <Typography variant="body1" maxWidth="72ch" mb={8}>
          {props.data.description}
        </Typography>
        <Typography variant="h2" mb={2}>
          Credits
        </Typography>
        <Typography variant="body1">{props.data.credits}</Typography>
      </Grid>
    );
  };

  return props.loading ? <Loading /> : <Loaded />;
}
