import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { ModalBox } from "../../../../styles/components/ModalBox";

export function BannerModal(props) {
  return (
    <Modal open={props.open} onClose={props.toggle}>
      <ModalBox title="Banner" size="big">
        <Typography variant="h3">Misison Banner</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexGrow: "1",
            bgcolor: "black",
          }}
        >
          <Box
            sx={{
              aspectRatio: "2/3",
              backgroundImage: () => props.getImageURL(props.banner),
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              transition: "80ms linear",
            }}
          />
        </Box>
      </ModalBox>
    </Modal>
  );
}
