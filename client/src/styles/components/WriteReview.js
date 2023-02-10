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
import { writeReview } from "../../features/mission/missionSlice";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const inputStyle = {
  border: "1px solid",
  borderColor: "stroke.default",
};

export function WriteReview(props) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter(Boolean);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    mode: "userReview",
    mission: pathnames[0] === "missions" ? id : undefined,
    mp: pathnames[0] === "mps" ? id : undefined,
  });
  const changeData = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(writeReview(state));
  };

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
          <TextField
            onChange={(e) => changeData(e)}
            name="overallRating"
            sx={{ ...inputStyle, width: "7ch" }}
          />
        </Box>
        <Typography variant="h3" mb={1}>
          Commentary
        </Typography>
        <TextField
          onChange={(e) => changeData(e)}
          name="content"
          sx={{ ...inputStyle, mb: 4 }}
          multiline
          rows={10}
        />
        <Box>
          <Button onClick={(e) => onSubmit(e)}>Send Review</Button>
        </Box>
      </ModalBox>
    </Modal>
  );
}
