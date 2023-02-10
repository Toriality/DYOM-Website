import React from "react";
import { ButtonBase, Typography, Avatar } from "@mui/material";
import { LoginModal } from "./LoginModal";
import { useSelector } from "react-redux";

export function NavUser() {
  let [openModal, setOpenModal] = React.useState(false);
  const { userInfo, token, loading } = useSelector((state) => state.user);

  function Guest() {
    return (
      <>
        <ButtonBase
          onClick={() => {
            setOpenModal(true);
          }}
          sx={{ display: "flex" }}
        >
          <Typography variant="h4" color="primary" mr={2}>
            Log In
          </Typography>
          <Avatar alt="Profile Avatar" />
        </ButtonBase>
        <LoginModal toggle={() => setOpenModal(!openModal)} open={openModal} />
      </>
    );
  }

  function Logged() {
    return (
      <ButtonBase>
        <Typography variant="h4" color="primary" mr={2}>
          {userInfo?.username}
        </Typography>
        <Avatar
          src={
            userInfo?.hasAvatar
              ? `http://localhost:5000/${userInfo._id}/avatar.jpg`
              : null
          }
          alt="Profile Avatar"
        />
      </ButtonBase>
    );
  }

  return <>{token && !loading ? <Logged /> : <Guest />}</>;
}
