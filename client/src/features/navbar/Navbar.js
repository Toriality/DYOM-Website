import React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  InputBase,
  ButtonBase,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { colors } from "../../colors";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ModalBox } from "../../styles/components/ModalBox";
import { loginUser } from "../user/userSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(0),
  marginleft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginleft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "72ch",
    },
  },
}));

export function Navbar(props) {
  let [query, setQuery] = React.useState("");
  let [openModal, setOpenModal] = React.useState(false);

  //const count = useSelector((state) => state.user.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        p: 12,
        pb: 0,
        pt: 0,
        bgcolor: colors.backgroundDarker,
        borderBottom: "2px " + colors.primaryColor + " solid",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo and Menu Button */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            sx={{
              height: 45,
            }}
            alt="DYOM Logo"
            src={logo}
          />
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ ml: 4 }}
          >
            <MenuIcon />
            <Typography
              variant="h4"
              component="div"
              color="primary"
              sx={{ ml: 1 }}
            >
              Menu
            </Typography>
          </IconButton>
        </Box>
        {/* Search Button */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? navigate("/search/query=" + query) : null
            }
          />
        </Search>
        {/* Profile Avatar and Name */}
        <ButtonBase
          onClick={(e) => {
            setOpenModal(true);
          }}
          sx={{ display: "flex" }}
        >
          <Typography variant="h4" color="primary" mr={2}>
            Toriality
          </Typography>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Profile Avatar" />
          </IconButton>
        </ButtonBase>
      </Toolbar>
      <LoginModal toggle={() => setOpenModal(openModal)} open={openModal} />
    </AppBar>
  );
}

function LoginModal(props) {
  const [state, setState] = React.useState({ username: "", password: "" });
  const [shouldClose, setClose] = React.useState(false);
  const { toggle } = props;
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  //const { register, handleSubmit } = useForm()

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
