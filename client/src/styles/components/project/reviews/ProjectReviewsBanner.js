import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function ProjectReviewsBanner(props) {
  return (
    <Box sx={styles.reviewBanner}>
      <Typography variant="h1">{props.data.title}</Typography>
      <Typography variant="h3">
        Created by:
        <Link component={RouterLink} to="/">
          {props.data.author?.username}
        </Link>
      </Typography>
    </Box>
  );
}

const styles = {
  reviewBanner: {
    backgroundColor: "black",
    py: 6,
    px: 16,
    "& *": { lineHeight: "1" },
    "& a": {
      ml: "1ch",
      display: "inline",
    },
  },
};
