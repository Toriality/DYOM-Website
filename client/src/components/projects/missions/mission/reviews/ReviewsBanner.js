import { Box, Button, Grid, Link, Typography } from "@mui/material";

export function ReviewsBanner(props) {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        p: 6,
        pl: 16,
        pr: 16,
        "& *": { lineHeight: "1" },
      }}
    >
      <Typography variant="h1">{props.data.title}</Typography>
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
  );
}
