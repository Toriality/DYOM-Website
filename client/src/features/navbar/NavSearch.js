import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export function NavSearch() {
  let [query, setQuery] = React.useState("");
  const navigate = useNavigate();

  return (
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
  );
}

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
