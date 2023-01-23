import React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Icon,
  Avatar,
  InputBase,
  MenuItem,
  Menu,
  FormControl,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { colors } from "../../colors";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

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

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export function Navbar() {
  let [query, setQuery] = React.useState("");
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
        <Box sx={{ display: "flex" }}>
          <Typography variant="h4" color="primary" mr={2}>
            Toriality
          </Typography>
          <IconButton
            //onClick={handleOpenUserMenu}
            sx={{ p: 0 }}
          >
            <Avatar alt="Profile Avatar" />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            //anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            //open={Boolean(anchorElUser)}
            //onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                //onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
