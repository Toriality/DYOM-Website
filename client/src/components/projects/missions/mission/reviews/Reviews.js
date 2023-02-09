import { Box, Button, Grid, Link, Typography } from "@mui/material";
import nopreview from "../../../../../images/nopreview.jpg";
import { DYOMContent } from "../../../../../styles/components/DYOMContainer";
import { PagesBox } from "../../../../../styles/components/PagesBox";

export function Reviews(props) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "black",
          p: 6,
          pl: 16,
          pr: 16,
          "& *": { lineHeight: "1" },
        }}
      >
        <Typography variant="h1">PARAM_TITLE</Typography>
        <Typography variant="h3">
          Created by:
          <Link href="/" sx={{ ml: "1ch", display: "inline" }}>
            PARAM_AUTHOR
          </Link>
        </Typography>
        {/* {
 <Grid container mt={4}>
        <Grid item xs={3}>
          <Box
            sx={{
              aspectRatio: "2/3",
              backgroundImage: `url(${nopreview})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <Box p={8}></Box>
          </Grid>
          </Grid>
      } */}
      </Box>
      <DYOMContent>
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
      </DYOMContent>
    </>
  );
}
