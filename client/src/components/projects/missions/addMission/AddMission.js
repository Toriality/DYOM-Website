import React from "react";
import { DYOMContent } from "../../../../styles/components/DYOMContainer";
import { Button, Grid, Typography } from "@mui/material";
import { UploadImages } from "./UploadImages";
import { MainInfo } from "./MainInfo";
import { Specs } from "./Specs";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addMission } from "../../../../features/mission/missionSlice";

export function AddMission() {
  const [info, setInfo] = React.useState({
    title: { input: null, error: false },
    author: { input: null, error: false },
    date: { input: null, error: false },
    summary: { input: null, error: false },
    description: { input: null, error: false },
    tags: { input: [], error: false },
    file: { input: null, error: false },
  });

  const [specs, setSpecs] = React.useState({
    credits: { input: null, error: false },
    trailer: { input: null, error: false },
    original: { input: null, error: false },
    motto: { input: null, error: false },
    music: { input: null, error: false },
    difficulty: { input: null, error: false },
    mods: { input: false, error: false },
  });

  const [images, setImages] = React.useState({
    banner: {
      input: null,
      error: false,
      preview: undefined,
    },
    gallery: {
      input: [],
      error: false,
      preview: undefined,
    },
  });

  let previewArray = [];
  let date = new Date();
  date = date.toLocaleString("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const { userInfo, loading } = useSelector((state) => state.user);
  let user = userInfo.username ? userInfo.username : "loading...";
  const dispatch = useDispatch();

  const changeInfo = (e) => {
    if (e.target.type === "file") {
      setInfo((prevState) => ({
        ...prevState,
        file: {
          input: e.target.files[0],
          error: false,
        },
      }));
    } else {
      if (e.target.name === "tags") {
        let index = e.target.id.substring(3, e.target.id.length);
        let tagsArray = info.tags.input.slice();
        tagsArray[index] = e.target.value;
        setInfo((prevState) => ({
          ...prevState,
          tags: { ...prevState.tags, input: tagsArray, error: false },
        }));
        console.log(info);
      } else {
        setInfo((prevState) => ({
          ...prevState,
          [e.target.name]: {
            ...prevState[e.target.name],
            input: e.target.value,
          },
        }));
      }
    }
  };

  const changeBanner = (e) => {
    if (e.target.files.length != 0) {
      if (e.target.files[0].size >= 8 * 1024 * 1024) {
        setImages((prevState) => ({
          ...prevState,
          banner: {
            ...prevState.banner,
            error: true,
            input: null,
            preview: undefined,
          },
        }));
        return;
      }
    } else return;

    const objectURL = URL.createObjectURL(e.target.files[0]);
    setImages((prevState) => ({
      ...prevState,
      banner: {
        ...prevState.banner,
        error: false,
        input: e.target.files[0],
        preview: objectURL,
      },
    }));
  };

  const changeGallery = (e) => {
    if (!images.gallery.preview) {
      setImages((prevState) => ({
        ...prevState,
        gallery: {
          ...prevState.gallery,
          preview: [],
        },
      }));
      if (e.target.files.length > 5) {
        setImages((prevState) => ({
          ...prevState,
          gallery: {
            ...prevState.gallery,
            error: true,
          },
        }));
        return;
      }
    } else {
      if (e.target.files.length + images.gallery.preview.length > 5) {
        setImages((prevState) => ({
          ...prevState,
          gallery: {
            ...prevState.gallery,
            error: true,
          },
        }));
        return;
      }
    }

    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 8 * 1024 * 1024) {
        setImages((prevState) => ({
          ...prevState,
          gallery: {
            ...prevState.gallery,
            error: true,
          },
        }));
        return;
      }
    }

    Array.from(e.target.files).forEach((file) => {
      const objectURL = URL.createObjectURL(file);
      previewArray.push(objectURL);
    });

    setImages((prevState) => ({
      ...prevState,
      gallery: {
        ...prevState.gallery,
        input: e.target.files,
        error: false,
        preview: [...prevState.gallery.preview, ...previewArray],
      },
    }));
  };

  const closeButton = (type) => {
    if (type === "banner") {
      setImages((prevState) => ({
        ...prevState,
        banner: {
          ...prevState.banner,
          input: null,
          preview: undefined,
        },
      }));
    }
    if (type === "gallery") {
      previewArray = [];
      setImages((prevState) => ({
        ...prevState,
        gallery: {
          ...prevState.gallery,
          input: [],
          preview: undefined,
        },
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const state = {
      type: "missions",
      ...info,
      ...specs,
      ...images,
    };

    console.log(state);

    Object.keys(state).forEach((key) => {
      if (key !== "type") {
        if (key === "gallery") {
          for (var x = 0; x < state.gallery.input.length; x++) {
            formData.append("gallery", state[key].input[x]);
          }
        } else formData.append(key, state[key].input);
      } else formData.append("type", state.type);
    });

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    dispatch(addMission(formData));
  };

  const changeSpecs = (e) => {
    if (e.target.type === "checkbox") {
      setSpecs((prevState) => ({
        ...prevState,
        [e.target.name]: {
          ...prevState[e.target.name],
          input: e.target.checked,
        },
      }));
    } else {
      setSpecs((prevState) => ({
        ...prevState,
        [e.target.name]: { ...prevState[e.target.name], input: e.target.value },
      }));
    }
  };

  return (
    <DYOMContent>
      <Typography variant="h3" align="center" mb="2rem">
        Add a new mission
      </Typography>
      <Grid container spacing={5} mb={5}>
        <Grid item xs={4}>
          <UploadImages
            images={images}
            changeBanner={changeBanner}
            changeGallery={changeGallery}
            closeButton={closeButton}
            previewArray={previewArray}
          />
        </Grid>
        <Grid item xs={8}>
          <MainInfo
            changeInfo={changeInfo}
            info={info}
            user={user}
            date={date}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Specs changeSpecs={changeSpecs} />
        </Grid>
      </Grid>
      <Box mt={10} align="center">
        <Button onClick={(e) => onSubmit(e)}>Add mission</Button>
      </Box>
    </DYOMContent>
  );
}
