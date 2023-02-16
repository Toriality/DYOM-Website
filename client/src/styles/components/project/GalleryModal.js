import { Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { ModalBox } from "../ModalBox";

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
        <Box sx={styles.wrapper}>
          <Typography variant="h3">Misison Gallery</Typography>
          <Box>
            <IconButton onClick={previousIndex}>
              <AiOutlineLeft />
            </IconButton>
            <Typography variant="h3">
              {index + 1}/{props.gallery?.length}
            </Typography>
            <IconButton onClick={nextIndex}>
              <AiOutlineRight />
            </IconButton>
          </Box>
        </Box>
        <Box sx={styles.img}>
          <Box
            sx={{
              backgroundImage: () => props.getImageURL(props.gallery[index]),
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
    justifyContent: "space-between",
    "& svg": { color: "primary.main" },
    "& div": { display: "flex" },
  },

  img: {
    display: "flex",
    flexGrow: "1",
    bgcolor: "black",
    "& div": {
      width: "100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center center",
      transition: "80ms linear",
    },
  },
};
