import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
        <Link
          component={RouterLink}
          to="/"
          sx={{ ml: "1ch", display: "inline" }}
        >
          {props.data.author?.username}
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
