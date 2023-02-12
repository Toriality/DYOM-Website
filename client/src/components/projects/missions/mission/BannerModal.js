import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { ModalBox } from "../../../../styles/components/ModalBox";

export function BannerModal(props) {
  return (
    <Modal open={props.open} onClose={props.toggle}>
      <ModalBox title="Banner" size="big" toggle={props.toggle}>
        <Typography variant="h3">Misison Banner</Typography>
        <Box sx={styles.wrapper}>
          <Box
            sx={{
              ...styles.img,
              backgroundImage: () => props.getImageURL(props.banner),
            }}
          />
        </Box>
      </ModalBox>
    </Modal>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    flexGrow: "1",
    bgcolor: "black",
  },

  img: {
    aspectRatio: "2/3",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    transition: "80ms linear",
  },
};
