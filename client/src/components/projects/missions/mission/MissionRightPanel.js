import { Box, CircularProgress, Grid } from "@mui/material";

export function MissionRightPanel(props) {
  const Loading = () => {
    return <CircularProgress />;
  };
  const Loaded = () => {
    return (
      <Grid item xs={4} textAlign="right">
        <Box
          mt={2}
          width="100%"
          height="4rem"
          bgcolor="background.default"
          borderRadius="20px"
          border="1px solid"
          borderColor="stroke.default"
        />
      </Grid>
    );
  };

  return props.loading ? <Loading /> : <Loaded />;
}
