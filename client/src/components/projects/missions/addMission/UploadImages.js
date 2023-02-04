import React from "react";
import {
  Box,
  Button,
  ButtonBase,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import nopreview from "../../../../images/nopreview.jpg";

const iconButtonStyle = {
  color: "error.main",
  position: "absolute",
  zIndex: "9999",
  bgcolor: "white",
  p: 0.5,
  transform: "translate(-25%, -25%)",
  "&:hover": {
    opacity: "1",
    bgcolor: "error.main",
    color: "white",
  },
};

export function UploadImages(props) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <IconButton
          onClick={() => props.closeButton("banner")}
          sx={iconButtonStyle}
        >
          <CloseIcon />
        </IconButton>
        <ButtonBase
          component="label"
          sx={{
            mb: "0 !important",
            minHeight: "512px",
            minWidth: "320px",
            backgroundImage:
              "url(" +
              (!props.images.banner.preview
                ? nopreview
                : props.images.banner.preview) +
              ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <input
            onChange={(e) => props.changeBanner(e)}
            type="file"
            hidden
            accept="image/jpeg, image/png"
          />
        </ButtonBase>
      </Grid>
      <Grid item xs={3}>
        <IconButton
          onClick={() => props.closeButton("gallery")}
          sx={iconButtonStyle}
        >
          <CloseIcon />
        </IconButton>
        <ButtonBase
          component="label"
          sx={{
            mb: "0 !important",
            display: "flex",
            gap: 1,
            flexDirection: "column",
            height: "100%",
            flex: "1",
            "& div.MuiBox-root": {
              m: "0 !important",
              flexGrow: "1",
              width: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            },
          }}
        >
          {[0, 1, 2, 3, 4].map((element) => (
            <Box
              sx={{
                backgroundImage:
                  "url(" +
                  (props.images.gallery.preview
                    ? props.images.gallery.preview[element]
                      ? props.images.gallery.preview[element]
                      : nopreview
                    : nopreview) +
                  ")",
              }}
            />
          ))}
          <input
            onChange={(e) => props.changeGallery(e)}
            type="file"
            hidden
            multiple
            accept="image/jpeg, image/png"
          />
        </ButtonBase>
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
