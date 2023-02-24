import React from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import { DYOMContent } from "../../styles/components/dyom/DYOMContainer";
import { UploadPic } from "./UploadPic";
import { ProfileInfo } from "./ProfileInfo";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [profileInfo, setProfileInfo] = React.useState({
    username: null,
    password: null,
    email: null,
    location: null,
    aboutme: null,
  });

  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const data = {
      ...profileInfo,
      image,
    };

    formData.append("type", "register");

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    dispatch(registerUser(formData));
    navigate("/");
  };

  const changeInfo = (e) => {
    setProfileInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changeImage = (e) => {
    if (e.target.files.length !== 0) {
      if (e.target.files[0].size >= 8 * 1024 * 1024) {
        setImage(null);
        return;
      }
    } else return;

    const objectURL = URL.createObjectURL(e.target.files[0]);

    setImage(e.target.files[0]);
    setPreview(objectURL);
  };

  const closeButton = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <DYOMContent>
      {token ? navigate("/") : null}
      <Typography align="center" variant="h3" mb="2rem">
        Register a new account
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4} textAlign="center">
          <UploadPic
            changeImage={changeImage}
            preview={preview}
            closeButton={closeButton}
          />
        </Grid>
        <Grid item xs={8}>
          <ProfileInfo changeInfo={changeInfo} />
        </Grid>
      </Grid>
      <Box align="center" mt={8}>
        <Button onClick={(e) => onSubmit(e)} variant="contained">
          Create Account
        </Button>
      </Box>
    </DYOMContent>
  );
}

/*
Username
Password
About me
Profile pic
Location
*/
