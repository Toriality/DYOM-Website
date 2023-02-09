import { Grid, Box, Typography, Button } from "@mui/material";
import { PagesBox } from "../../../../../styles/components/PagesBox";

export function UserReviews(props) {
  return (
    <>
      <Grid container alignItems="baseline">
        <Grid item xs={8}>
          <Typography variant="h2">User reviews</Typography>
        </Grid>
        <Grid item xs={4}>
          <PagesBox />
        </Grid>
      </Grid>
      {/* user review boxes */}
      <Grid container alignItems="baseline">
        <Grid item xs={8}>
          <Button>Write review</Button>
        </Grid>
        <Grid item xs={4}>
          <PagesBox />
        </Grid>
      </Grid>
    </>
  );
}
