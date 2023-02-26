import React from "react";
import { ButtonBase, Typography, Avatar, Box } from "@mui/material";
import { LoginModal } from "./LoginModal";
import { useSelector } from "react-redux";
import nopreview from "../../images/nopreview.jpg";

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
      <ButtonBase href={`/profile/${userInfo._id}`}>
        <Typography variant="h4" color="primary" mr={2}>
          {userInfo?.username}
        </Typography>
        <Box
          sx={{
            ...styles.avatar,
            backgroundImage: userInfo.banner
              ? `url(${userInfo.banner})`
              : `url(${nopreview})`,
          }}
          alt="Profile Avatar"
        />
      </ButtonBase>
    );
  }

  return <>{token && !loading ? <Logged /> : <Guest />}</>;
}

const styles = {
  avatar: {
    width: 42,
    height: 42,
    borderRadius: "8px",
    backgroundSize: "cover",
    backgroundrepeat: "no-repeat",
    backgroundPosition: "center center",
  },
};
