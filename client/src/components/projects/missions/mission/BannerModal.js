import { Box, Modal } from "@mui/material";
import { ModalBox } from "../../../../styles/components/ModalBox";

export function BannerModal(props) {
  return (
    <Modal open={props.open} toggle={props.toggle}>
      <ModalBox title="Banner">
        <Box>dawdwwaw</Box>
      </ModalBox>
    </Modal>
  );
}
