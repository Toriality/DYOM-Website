import React from "react";
import { Button, TextField, Box, Modal, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import { ModalBox } from "../../styles/components/ModalBox";

export function LoginModal(props) {
  const [disabled, setDisabled] = React.useState(false);
  const [state, setState] = React.useState({ username: "", password: "" });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    const { username, password } = state;
    const user = {
      username,
      password,
    };
    dispatch(loginUser(user));
    props.toggle();
    setDisabled(false);
  };

  return (
    <Modal open={props.open} onClose={props.toggle}>
      <ModalBox title="Log in...">
        <TextField
          required
          name="username"
          label="Username"
          placeholder="Your username"
          onChange={onChange}
          sx={{ mb: 2 }}
        />
        <TextField
          required
          name="password"
          label="Password"
          type="password"
          placeholder="Your password"
          onChange={onChange}
          sx={{ mb: 4 }}
        />
        <Box>
          <Button
            disabled={disabled}
            variant="contained"
            onClick={(e) => onSubmit(e)}
          >
            Log in
          </Button>
        </Box>
        <Typography mt={2} variant="body1">
          Don't have an account?
          <Link
            component={RouterLink}
            sx={{ ml: "1ch", display: "inline" }}
            to="register"
          >
            Register here!
          </Link>
        </Typography>
      </ModalBox>
    </Modal>
  );
}
