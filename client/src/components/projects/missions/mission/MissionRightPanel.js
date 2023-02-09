import { Box, CircularProgress, Grid, Skeleton } from "@mui/material";

export function MissionRightPanel(props) {
  const Loading = () => {
    return (
      <Grid item xs={4} align="right">
        <Skeleton
          variant="rounded"
          width="100%"
          height="10rem"
          sx={{ mt: 2, borderRadius: "20px", mb: 2 }}
        />
        <Skeleton variant="text" sx={{ fontSize: "16pt", width: "50%" }} />
        <Skeleton variant="text" sx={{ fontSize: "16pt", width: "50%" }} />
      </Grid>
    );
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
