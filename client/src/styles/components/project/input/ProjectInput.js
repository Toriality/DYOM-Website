import React from "react";
import { DYOMContent } from "../../dyom/DYOMContainer";
import { Button, CircularProgress, Grid, Typography, Box } from "@mui/material";
import { UploadImages } from "./UploadImages";
import { MainInfo } from "./MainInfo";
import { Specs } from "./Specs";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  resetSingle,
} from "../../../../features/project/projectSlice";
import { useNavigate } from "react-router-dom";

export function ProjectInput(props) {
  const [reset, setReset] = React.useState(false);
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
    num: {
      input: props.type === "Mission" ? undefined : 0,
      error: props.type === "Mission" ? undefined : false,
    },
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

  const navigate = useNavigate();
  let previewArray = [];
  let date = new Date();
  date = date.toLocaleString("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const { userInfo } = useSelector((state) => state.user);
  const { single, loading } = useSelector((state) => state.project);
  let user = userInfo.username ? userInfo.username : "loading...";
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetSingle());
    setReset(true);
  }, [dispatch]);

  React.useEffect(() => {
    if (single._id && reset) {
      navigate(`/missions/${single._id}`);
    }
  }, [single, reset, navigate]);

  const changeBanner = (e) => {
    if (e.target.files.length !== 0) {
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

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const state = {
      type: props.type,
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

    dispatch(addProject(formData));
  };

  return (
    <DYOMContent>
      <Typography variant="h3" align="center" mb="2rem">
        Add a new {props.type === "Mission" ? "Mission" : "Mission-Pack"}
      </Typography>
      <Grid container spacing={5} mb={5}>
        <Grid item xs={4}>
          <UploadImages
            type={props.type}
            images={images}
            changeBanner={changeBanner}
            changeGallery={changeGallery}
            closeButton={closeButton}
            previewArray={previewArray}
          />
        </Grid>
        <Grid item xs={8}>
          <MainInfo
            type={props.type}
            changeInfo={changeInfo}
            info={info}
            user={user}
            date={date}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Specs changeSpecs={changeSpecs} type={props.type} />
        </Grid>
      </Grid>
      <Box mt={10} align="center">
        <Button disabled={loading} onClick={(e) => onSubmit(e)}>
          {loading ? <CircularProgress /> : "Add mission"}
        </Button>
      </Box>
    </DYOMContent>
  );
}
