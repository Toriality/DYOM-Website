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
          Honestly I think it really is effictively just a more roundabout form
          of your second example. It's easy to see when it's like that, but it
          gets more difficult to diagnose when you have used 3 or 4 HOCs on top
          of otherwise unrelated components that then happen to call each other.
          <br />
          <br />I guess what I'm requesting here is really just some sort of
          measure to detect this and throw an error, and break out of that loop
          somehow, so recursive issues such as this can be diagnosed easier,
          much like how you handle too many setState calls occurring too close
          together.
        </Typography>
        <Typography variant="h2" mb={2}>
          Credits
        </Typography>
        <Typography variant="body1">@M316: Skins</Typography>
      </Grid>
    );
  };

  return props.loading ? <Loading /> : <Loaded />;
}
