import { Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { ModalBox } from "../../../../styles/components/ModalBox";

export function GalleryModal(props) {
  const [index, setIndex] = React.useState(0);
  const previousIndex = () => {
    if (index === 0) return;
    else setIndex(index - 1);
  };
  const nextIndex = () => {
    if (index === props.gallery.length - 1) return;
    else setIndex(index + 1);
  };

  return (
    <Modal open={props.open} onClose={props.toggle}>
      <ModalBox title="Gallery" size="big" toggle={props.toggle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& svg": { color: "primary.main" },
          }}
        >
          <Typography variant="h3">Misison Gallery</Typography>
          <Box sx={{ display: "flex" }}>
            <IconButton onClick={previousIndex}>
              <AiOutlineLeft />
            </IconButton>
            <Typography variant="h3">
              {index + 1}/{props.gallery?.length}
            </Typography>
            <IconButton>
              <AiOutlineRight onClick={nextIndex} />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            bgcolor: "black",
          }}
        >
          <Box
            sx={{
              width: "100%",
              backgroundImage: () => props.getImageURL(props.gallery[index]),
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center center",
              transition: "80ms linear",
            }}
          />
        </Box>
      </ModalBox>
    </Modal>
  );
}
