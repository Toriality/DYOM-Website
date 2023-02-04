import React from "react";
import {
  Box,
  Button,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

export function MainInfo(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <InputLabel>Mission Title</InputLabel>
        <Input name="title" onChange={(e) => props.changeInfo(e)} fullWidth />
      </Grid>
      <Grid item xs={2}>
        <InputLabel>Author</InputLabel>
        <Input fullWidth disabled />
      </Grid>
      <Grid item xs={2}>
        <InputLabel>Date</InputLabel>
        <Input fullWidth disabled />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Summary</InputLabel>
        <Input name="summary" onChange={(e) => props.changeInfo(e)} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Description</InputLabel>
        <TextField
          name="description"
          onChange={(e) => props.changeInfo(e)}
          fullWidth
          multiline
          rows={12}
        />
      </Grid>
      <Grid item xs={8}>
        <InputLabel>Tags</InputLabel>
        <Input name="tags" id="tag0" onChange={(e) => props.changeInfo(e)} />
        <Input name="tags" id="tag1" onChange={(e) => props.changeInfo(e)} />
        <Input name="tags" id="tag2" onChange={(e) => props.changeInfo(e)} />
      </Grid>
      <Grid item xs={4}>
        <Button component="label">
          Choose file
          <input
            hidden
            type="file"
            name="file"
            onChange={(e) => props.changeInfo(e)}
            accept=".zip, .rar, .dat"
          />
        </Button>
      </Grid>
    </Grid>
  );
}
