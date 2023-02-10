import {
  Box,
  Button,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ModalBox } from "./ModalBox";
import { FaStar } from "react-icons/fa";

const inputStyle = {
  border: "1px solid",
  borderColor: "stroke.default",
};

export function WriteReview(props) {
  return (
    <Modal open={props.open} onClose={props.toggle}>
      <ModalBox title="Write a review">
        <Typography variant="h3" mb={1}>
          Rating
        </Typography>
        <Box
          mb={4}
          display="flex"
          alignItems="center"
          sx={{ "& svg": { mr: 2, fontSize: "24pt", color: "primary.main" } }}
        >
          <FaStar />
          <TextField sx={{ ...inputStyle, width: "7ch" }} />
        </Box>
        <Typography variant="h3" mb={1}>
          Commentary
        </Typography>
        <TextField sx={{ ...inputStyle, mb: 4 }} multiline rows={10} />
        <Box>
          <Button>Send Review</Button>
        </Box>
      </ModalBox>
    </Modal>
  );
}
