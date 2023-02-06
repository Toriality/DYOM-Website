import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { colors } from "../../styles/colors";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/user/userSlice";
import { useGetUserDetailsQuery } from "../../features/user/authService";
import { NavMenu } from "./NavMenu";
import { NavSearch } from "./NavSearch";
import { NavUser } from "./NavUser";

export function Navbar() {
  const dispatch = useDispatch();

  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  React.useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

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
        <NavMenu />
        <NavSearch />
        <NavUser />
      </Toolbar>
    </AppBar>
  );
}
