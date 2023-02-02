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

export function MainInfo() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <InputLabel>Mission Title</InputLabel>
        <Input fullWidth />
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
        <Input fullWidth />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Description</InputLabel>
        <TextField fullWidth multiline rows={12} />
      </Grid>
      <Grid item xs={8}>
        <InputLabel>Tags</InputLabel>
        <Input />
        <Input />
        <Input />
      </Grid>
      <Grid item xs={4}>
        <Button>Choose file</Button>
      </Grid>
    </Grid>
  );
}
