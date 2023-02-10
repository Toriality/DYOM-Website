import React from "react";
import { Button, TextField, Box, Modal, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import { ModalBox } from "../../styles/components/ModalBox";

export function LoginModal(props) {
  const [state, setState] = React.useState({ username: "", password: "" });
  const [shouldClose, setClose] = React.useState(false);
  const { toggle } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (shouldClose) {
      toggle();
      setClose(false);
    }
  }, [shouldClose, toggle]);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = state;
    const user = {
      username,
      password,
    };
    dispatch(loginUser(user));
    setClose(true);
  };

  return (
    <Modal open={props.open} onClose={props.toggle}>
      <ModalBox title="Log in..." desc="Welcome back!">
        <form onSubmit={onSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              "& .MuiTextField-root": {
                mb: 2,
              },
            }}
          >
            <TextField
              required
              name="username"
              label="Username"
              placeholder="Your username"
              onChange={onChange}
            />
            <TextField
              required
              name="password"
              label="Password"
              type="password"
              placeholder="Your password"
              onChange={onChange}
            />
            <Button variant="contained" type="submit">
              Log in
            </Button>
            <Typography align="center" mt={2} variant="body1">
              Don't have an account?
              <Link
                component={RouterLink}
                sx={{ display: "inline" }}
                to="register"
              >
                Register here!
              </Link>
            </Typography>
          </Box>
        </form>
      </ModalBox>
    </Modal>
  );
}
