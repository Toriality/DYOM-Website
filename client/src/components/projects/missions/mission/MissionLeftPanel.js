import { CircularProgress, Grid, Typography } from "@mui/material";

export function MissionLeftPanel(props) {
  const Loading = () => {
    return <CircularProgress />;
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
