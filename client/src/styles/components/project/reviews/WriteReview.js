import {
  Box,
  Button,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ModalBox } from "../../ModalBox";
import { FaStar } from "react-icons/fa";
import { writeReview } from "../../../../features/project/projectSlice";
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
  const [disabled, setDisabled] = React.useState(false);
  const [state, setState] = React.useState({
    mode: "userReview",
    mission: pathnames[0] === "missions" ? id : undefined,
    mp: pathnames[0] === "mps" ? id : undefined,
    content: "",
    overallRating: "",
  });
  const changeData = (e) => {
    let { value, name } = e.target;
    if (e.target.type === "number")
      value = (
        Math.round(Math.max(0, Math.min(10, Number(e.target.value))) * 10) / 10
      )
        .toString()
        .replace(/^0-9/, "");
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    setState((prevState) => ({
      ...prevState,
      content: "",
      overallRating: "",
    }));
    dispatch(writeReview(state));
    props.toggle();
    setDisabled(false);
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
            type="number"
            inputProps={{
              step: ".1",
            }}
            value={state.overallRating}
            onChange={(e) => changeData(e)}
            name="overallRating"
            sx={{ ...inputStyle, width: "8ch" }}
          />
        </Box>
        <Typography variant="h3" mb={1}>
          Commentary
        </Typography>
        <TextField
          inputProps={{
            maxLength: "5000",
          }}
          value={state.content}
          onChange={(e) => changeData(e)}
          name="content"
          sx={{ ...inputStyle, mb: 4 }}
          multiline
          rows={10}
        />
        <Box>
          <Button disabled={disabled} onClick={(e) => onSubmit(e)}>
            Send Review
          </Button>
        </Box>
      </ModalBox>
    </Modal>
  );
}
