import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  Button,
  FormLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMission } from "../../features/mission/missionSlice";

const YT_REGEX =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

export function Debug_AddMission() {
  const [state, setState] = React.useState({
    type: "missions",
    title: {
      input: "",
      error: false,
      errorMsg: "Title cannot be longer than 64 characters!",
      msg: "Insert the mission title",
    },
    author: {
      input: "",
      error: false,
      errorMsg: "You cannot edit the author. Log in with a different user!",
      msg: "You are logged in as XXX",
    },
    date: {
      input: "",
      error: false,
      errorMsg: "You can't travel in time!",
      msg: "Current time",
    },
    summary: {
      input: "",
      error: false,
      errorMsg: "Mission summary cannot be longer than 256 characters!",
      msg: "Insert a short description for this mission",
    },
    description: {
      input: "",
      error: false,
      errorMsg: "Mission description cannot be longer than 5,000 characters!",
      msg: "Enter a full description of the mission here",
    },
    banner: {
      input: null,
      error: false,
      errorMsg: "Invalid image! The maximum size for a banner is 8 MB",
      msg: "Enter a banner image for your mission",
    },
    trailer: {
      input: "",
      error: false,
      errorMsg: "Only YouTube links are currently supported!",
      msg: "Enter a YouTube video for showcasing your mission gameplay",
    },
    images: {
      input: [],
      error: false,
      errorMsg:
        "One or more images cannot be added because they cannot exceed 8 MB of size!",
      msg: "Enter images for the mission gallery",
    },
    file: {
      input: null,
      error: false,
      errorMsg: "File cannot be bigger than 8 MB!",
      msg: "Insert your mission file here",
    },
    credits: {
      input: "",
      error: false,
      errorMsg: "Cannot be longer than 128 characters!",
      msg: "Credit more people that helped to create this mission",
    },
    tags: {
      input: ["", "", ""],
      error: false,
      errorMsg: "Cannot add more than 3 tags!",
      msg: "Insert up to tags",
    },
    originalName: {
      input: "",
      error: false,
      errorMsg: "This field cannot contain more than 86 characters!",
      msg: "Use this field to inform a more detailed name about the mission, or the full name of it if it is too long for the title field",
    },
    motto: {
      input: "",
      error: false,
      errorMsg: "This field cannot contain more than 86 characters!",
      msg: "A slogan or a short text which serves to associate the plot of the mission or suggest the experience you'll have as a player",
    },
    musicTheme: {
      input: "",
      error: false,
      errorMsg: "Cannot insert more than 86 characters in here!",
      msg: "The title of the mission's original music theme if any",
    },
    difficulty: {
      input: "Unknown",
      error: false,
      errorMsg: "Invalid difficulty string!",
      msg: "Enter the difficulty of the mission",
    },
    modsRequired: {
      input: false,
      error: false,
      errorMsg: "Something went wrong. Try reloading the page!",
      msg: "Check it if your missions require mods in order to play it properly (without crashes)",
    },
  });
  const { userInfo, loading } = useSelector((state) => state.user);
  let date = new Date();
  date = date.toLocaleString("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSummaryChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      summary: { ...prevState.summary, input: e.target.value },
    }));
  };

  const handleTitleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      title: { ...prevState.title, input: e.target.value },
    }));
  };

  const handleBannerChange = (e) => {
    if (e.target.files[0].size > 8 * 1024 * 1024) {
      setState((prevState) => ({
        ...prevState,
        banner: { ...prevState.banner, input: null, error: true },
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      banner: { ...prevState.banner, input: e.target.files[0], error: false },
    }));
  };

  const handleTrailerChange = (e) => {
    if (e.target.value !== "" && !YT_REGEX.test(e.target.value)) {
      setState((prevState) => ({
        ...prevState,
        trailer: { ...prevState.trailer, input: "", error: true },
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      trailer: { ...prevState.trailer, input: e.target.value, error: false },
    }));
  };

  const handleDescChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      description: { ...prevState.description, input: e.target.value },
    }));
  };

  const handleChangeImages = (e) => {
    if (e.target.files.length > 5) {
      setState((prevState) => ({
        ...prevState,
        images: {
          ...prevState.images,
          input: null,
          error: true,
          errorMsg: "You cannot insert more than 5 images on the gallery! ",
        },
      }));
    }
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 8 * 1024 * 1024) {
        setState((prevState) => ({
          ...prevState,
          images: { ...prevState.images, input: null, error: true },
        }));
        return;
      }
    }
    setState((prevState) => ({
      ...prevState,
      images: { ...prevState.images, input: e.target.files, error: false },
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0].size > 8 * 1024 * 1024) {
      setState((prevState) => ({
        ...prevState,
        file: { ...prevState.file, input: null, error: true },
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      file: { ...prevState.file, input: e.target.files[0], error: false },
    }));
  };

  const handleCreditsChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      credits: { ...prevState.credits, input: e.target.value },
    }));
  };

  const handleOriginalNameChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      originalName: { ...prevState.originalName, input: e.target.value },
    }));
  };

  const handleTagsChange = (e) => {
    let index = e.target.id.substring(4, e.target.id.length) - 1;
    let newArray = state.tags.input.slice();
    newArray[index] = e.target.value;
    setState((prevState) => ({
      ...prevState,
      tags: { ...prevState.tags, input: newArray },
    }));
  };

  const handleThemeChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      musicTheme: { ...prevState.musicTheme, input: e.target.value },
    }));
  };

  const handleMottoChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      motto: { ...prevState.motto, input: e.target.value },
    }));
  };

  const handleDifficultyChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      difficulty: { ...prevState.difficulty, input: e.target.value },
    }));
  };

  const handleModsChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      modsRequired: { ...prevState.modsRequired, input: e.target.checked },
    }));
  };

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(state).forEach((key) => {
      if (key !== "type") {
        if (key === "images") {
          for (var x = 0; x < state.images.input.length; x++) {
            formData.append("images", state[key].input[x]);
          }
        } else formData.append(key, state[key].input);
      } else formData.append("type", state.type);
    });
    // Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(addMission(formData));
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        m: 14,
        mt: 8,
      }}
    >
      <InputLabel htmlFor="mission-name">Mission Name</InputLabel>
      <Input
        onBlur={() => console.log("lost focus of")}
        id="mission-name"
        onChange={(e) => handleTitleChange(e)}
        inputProps={{ maxLength: 64 }}
      />

      <InputLabel htmlFor="mission-author">Mission Author</InputLabel>
      <Input disabled id="mission-author" value={userInfo.username} />
      <InputLabel htmlFor="mission-date">Mission Date</InputLabel>
      <Input disabled id="mission-date" value={date} />

      <InputLabel htmlFor="mission-summary">Mission Summary</InputLabel>
      <Input
        fullWidth
        id="mission-summary"
        onChange={(e) => {
          handleSummaryChange(e);
        }}
        inputProps={{
          maxLength: 256,
        }}
      />

      <InputLabel htmlFor="mission-description">Mission Description</InputLabel>
      <TextField
        multiline
        fullWidth
        id="mission-description"
        rows={12}
        onChange={(e) => handleDescChange(e)}
        inputProps={{
          maxLength: 5000,
        }}
      />

      <InputLabel htmlFor="mission-banner">Mission Banner</InputLabel>
      <Button variant="contained" component="label" id="mission-banner">
        Upload Banner
        <input
          type="file"
          hidden
          accept="image/png, image/jpeg"
          onChange={(e) => handleBannerChange(e)}
        />
      </Button>
      <Typography variant="subtitle1" color="error">
        {state.banner.error ? state.banner.errorMsg : null}
      </Typography>

      <InputLabel htmlFor="mission-trailer">Mission Trailer</InputLabel>
      <Input
        id="mission-trailer"
        onChange={(e) => {
          handleTrailerChange(e);
        }}
        inputProps={{
          maxLength: 72,
        }}
      />
      <Typography variant="subtitle1" color="error">
        {state.trailer.error ? state.trailer.errorMsg : null}
      </Typography>

      <InputLabel htmlFor="mission-images">Mission Images</InputLabel>
      <Button variant="contained" component="label" id="mission-images">
        Upload Images
        <input
          type="file"
          hidden
          multiple
          accept="image/png, image/jpeg"
          onChange={(e) => handleChangeImages(e)}
        />
      </Button>
      <Typography variant="subtitle1" color="error">
        {state.images.error ? state.images.errorMsg : null}
      </Typography>

      <InputLabel htmlFor="mission-file">Mission File</InputLabel>
      <Button variant="contained" component="label" id="mission-file">
        Upload File
        <input
          name="file"
          type="file"
          hidden
          accept=".zip, .rar, .dat"
          onChange={(e) => handleFileChange(e)}
        />
      </Button>
      <Typography variant="subtitle1" color="error">
        {state.file.error ? state.file.errorMsg : null}
      </Typography>

      <InputLabel htmlFor="credits">Credits</InputLabel>
      <Input
        id="credits"
        onChange={(e) => handleCreditsChange(e)}
        inputProps={{ maxLength: 256 }}
      />

      <InputLabel htmlFor="tags">Tags</InputLabel>
      <Input
        id="tags1"
        onBlur={(e) => handleTagsChange(e)}
        inputProps={{ maxLength: 16 }}
      />
      <Input
        id="tags2"
        onBlur={(e) => handleTagsChange(e)}
        inputProps={{ maxLength: 16 }}
      />
      <Input
        id="tags3"
        onBlur={(e) => handleTagsChange(e)}
        inputProps={{ maxLength: 16 }}
      />

      <InputLabel htmlFor="original-name">Original name</InputLabel>
      <Input
        id="original-name"
        onChange={(e) => handleOriginalNameChange(e)}
        inputProps={{ maxLength: 72 }}
      />

      <InputLabel htmlFor="motto">MOTTO</InputLabel>
      <Input
        id="motto"
        onChange={(e) => handleMottoChange(e)}
        inputProps={{ maxLength: 72 }}
      />

      <InputLabel htmlFor="main-theme">Music theme</InputLabel>
      <Input
        id="main-theme"
        onChange={(e) => handleThemeChange(e)}
        inputProps={{ maxLength: 86 }}
      />

      <InputLabel htmlFor="difficulty">Difficulty</InputLabel>
      <Select
        id="difficulty"
        value={state.difficulty.input}
        label="difficulty"
        onChange={(e) => handleDifficultyChange(e)}
      >
        <MenuItem value="Unknown">Unknown</MenuItem>
        <MenuItem value="Easy">Easy</MenuItem>
        <MenuItem value="Normal">Normal</MenuItem>
        <MenuItem value="Hard">Hard</MenuItem>
        <MenuItem value="Extreme">Extreme</MenuItem>
      </Select>

      <InputLabel htmlFor="mods-required">Mods Required</InputLabel>
      <Checkbox id="mods-required" onChange={(e) => handleModsChange(e)} />

      <br />
      <br />

      <Button variant="contained" onClick={(e) => onSubmit(e)}>
        Add mission
      </Button>
    </Box>
  );
}
