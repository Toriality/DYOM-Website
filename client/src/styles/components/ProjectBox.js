import { Typography, Box, Link } from "@mui/material";
import nopreview from "../../images/nopreview.jpg";
import React from "react";

export function ProjectBox(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
      }}
    >
      <Box component={"img"} src={nopreview} borderRadius={"12px"} mr={3} />
      <Box sx={{ width: "100%", height: "100%" }}>
        <Link variant="h3">Project Name</Link>
        <Typography variant="h4">
          Created by:
          <Link sx={{ display: "inline", m: "1ch" }}>DYOM</Link>
        </Typography>
        <Typography variant="h4" color="text.primary">
          Mission Type
        </Typography>
        <Typography mt={5} variant="body1">
          Katabasis is the "card game" of a amnesiac Lawrence who has entered
          the journey to examine the questions left scattered; a stepping stone
          to his new job as a news reporter Lawrence meets the young Addilyn -
          who had different interests to share which pursued her to interfere in
          Lawrence's "affairs". However, someone different meddles into the
          action.
        </Typography>
      </Box>
    </Box>
  );
}
