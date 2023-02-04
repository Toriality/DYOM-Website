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

export function UploadImages() {
  const [state, setState] = React.useState({
    banner: {
      input: null,
      error: false,
      preview: undefined,
    },
    gallery: {
      input: null,
      error: false,
      preview: undefined,
    },
  });

  let previewArray = [];

  const uploadBanner = (e) => {
    if (e.target.files[0].size >= 8 * 1024 * 1024) {
      setState((prevState) => ({
        ...prevState,
        banner: {
          ...prevState.banner,
          error: true,
          input: null,
          preview: undefined,
        },
      }));
      return;
    }
    const objectURL = URL.createObjectURL(e.target.files[0]);
    setState((prevState) => ({
      ...prevState,
      banner: {
        ...prevState.banner,
        error: false,
        input: e.target.files[0],
        preview: objectURL,
      },
    }));
  };

  const uploadGallery = (e) => {
    if (!state.gallery.preview) {
      setState((prevState) => ({
        ...prevState,
        gallery: {
          ...prevState.gallery,
          preview: [],
        },
      }));
    }
    if (state.gallery.preview) {
      if (e.target.files.length + state.gallery.preview.length > 5) {
        setState((prevState) => ({
          ...prevState,
          gallery: {
            ...prevState.gallery,
            error: true,
          },
        }));
        return;
      }
    } else {
      if (e.target.files.length > 5) {
        setState((prevState) => ({
          ...prevState,
          gallery: {
            ...prevState.gallery,
            error: true,
          },
        }));
        return;
      }
    }
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 8 * 1024 * 1024) {
        setState((prevState) => ({
          ...prevState,
          gallery: {
            ...prevState.gallery,
            error: true,
          },
        }));
        return;
      }
    }
    Array.from(e.target.files).forEach((file) => {
      const objectURL = URL.createObjectURL(file);
      previewArray.push(objectURL);
    });
    setState((prevState) => ({
      ...prevState,
      gallery: {
        ...prevState.gallery,
        input: e.target.files,
        error: false,
        preview: [...prevState.gallery.preview, ...previewArray],
      },
    }));
    console.log(state.gallery);
  };

  const closeButton = (type) => {
    setState((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        input: null,
        error: null,
        preview: undefined,
      },
    }));
    if (type === "gallery") previewArray = [];
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <IconButton
          onClick={() => closeButton("banner")}
          sx={{
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
          }}
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
              (!state.banner.preview ? nopreview : state.banner.preview) +
              ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <input
            onChange={(e) => uploadBanner(e)}
            type="file"
            hidden
            accept="image/jpeg, image/png"
          />
        </ButtonBase>
      </Grid>
      <Grid item xs={3}>
        <IconButton
          onClick={() => closeButton("gallery")}
          sx={{
            color: "error.main",
            position: "absolute",
            zIndex: "1",
            bgcolor: "white",
            p: 0.5,
            transform: "translate(-25%, -25%)",
            "&:hover": {
              opacity: "1",
              bgcolor: "error.main",
              color: "white",
            },
          }}
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
                  (state.gallery.preview
                    ? state.gallery.preview[element]
                      ? state.gallery.preview[element]
                      : nopreview
                    : nopreview) +
                  ")",
              }}
            />
          ))}
          <input
            onChange={(e) => uploadGallery(e)}
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
