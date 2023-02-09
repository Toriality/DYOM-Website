import React from "react";
import { AppBar, Toolbar, CircularProgress } from "@mui/material";
import { colors } from "../../styles/colors";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/user/userSlice";
import { useGetUserDetailsQuery } from "../../features/user/authService";
import { NavMenu } from "./NavMenu";
import { NavSearch } from "./NavSearch";
import { NavUser } from "./NavUser";
import DYOMBreadcumbs from "./DYOMBreadcumbs";
import { useLocation } from "react-router-dom";

export function Navbar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  React.useEffect(() => {
    console.log(isFetching);
    if (data) dispatch(setCredentials(data));
  }, [data, isFetching, dispatch]);

  return (
    <>
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
          {isFetching ? <CircularProgress /> : <NavUser />}
        </Toolbar>
      </AppBar>
      {pathname.length > 1 ? <DYOMBreadcumbs /> : null}
    </>
  );
}
