import React from "react";
import { Button, TextField, Box, Modal } from "@mui/material";
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
          </Box>
        </form>
      </ModalBox>
    </Modal>
  );
}
