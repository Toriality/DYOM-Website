import React from "react";
import { ButtonBase, Typography } from "@mui/material";
import nopreview from "../../images/nopreview.jpg";
import { ImageResetButton } from "../../styles/components/ImageResetButton";

export function UploadPic(props) {
  return (
    <>
      <ImageResetButton onClick={props.closeButton} />
      <ButtonBase
        component="label"
        sx={{
          ...styles.pic,
          backgroundImage:
            "url(" + (props.preview ? props.preview : nopreview) + ")",
        }}
      >
        <input
          hidden
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => props.changeImage(e)}
        />
      </ButtonBase>
      <Typography mt={3} variant="subtitle1">
        Insert a image above to set up your profile picture. (Maximum file size
        of 8 MB)
      </Typography>
    </>
  );
}

const styles = {
  pic: {
    aspectRatio: "1/1",
    width: "400px",
    borderRadius: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
};
