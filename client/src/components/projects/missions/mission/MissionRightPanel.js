import {
  Box,
  CircularProgress,
  Grid,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";

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
          mb="1rem !important"
          width="100%"
          height="4rem"
          bgcolor="background.default"
          borderRadius="20px"
          border="1px solid"
          borderColor="stroke.default"
        />
        <Link sx={{ display: "inline" }} href="reviews">
          See all awards and reviews
        </Link>
        <br />
        <Link sx={{ display: "inline" }}>Write a review</Link>
      </Grid>
    );
  };

  return props.loading ? <Loading /> : <Loaded />;
}
