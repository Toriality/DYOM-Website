import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import nopreview from "../../../../images/nopreview.jpg";

export function UploadImages() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <Box
          sx={{
            mb: "0 !important",
            minHeight: "512px",
            minWidth: "320px",
            backgroundImage: "url(" + nopreview + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Box
          sx={{
            mb: "0 !important",
            display: "flex",
            gap: 1,
            flexDirection: "column",
            height: "100%",
            flex: "1",
            "& *": {
              m: "0 !important",
              flexGrow: "1",
              backgroundImage: "url(" + nopreview + ")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            },
          }}
        >
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" align="center">
          Insert up to one banner and five different images for your mission's
          gallery. Click in the images above to upload/replace a image. (Maximum
          of 2 MB per image upload)
        </Typography>
      </Grid>
    </Grid>
  );
}
