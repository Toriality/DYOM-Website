import React from "react";
import { ButtonBase, Typography, IconButton, Avatar } from "@mui/material";
import { LoginModal } from "./LoginModal";
import { useSelector } from "react-redux";

export function NavUser() {
  let [openModal, setOpenModal] = React.useState(false);
  const { userInfo, token, loading } = useSelector((state) => state.user);

  function Guest() {
    return (
      <ButtonBase
        onClick={(e) => {
          setOpenModal(true);
        }}
        sx={{ display: "flex" }}
      >
        <Typography variant="h4" color="primary" mr={2}>
          Log In
        </Typography>
        <IconButton sx={{ p: 0 }}>
          <Avatar alt="Profile Avatar" />
        </IconButton>
        <LoginModal toggle={() => setOpenModal(openModal)} open={openModal} />
      </ButtonBase>
    );
  }

  function Logged() {
    return (
      <ButtonBase>
        <Typography variant="h4" color="primary" mr={2}>
          {userInfo.data.username}
        </Typography>
        <IconButton sx={{ p: 0 }}>
          <Avatar alt="Profile Avatar" />
        </IconButton>
      </ButtonBase>
    );
  }

  return <>{token && !loading ? <Logged /> : <Guest />}</>;
}
