import React from "react";
import { Button, Grid, Input, InputLabel, TextField } from "@mui/material";

export function MainInfo(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <InputLabel>
          {props.type === "Mission" ? "Mission" : "Mission-Pack"} Title
        </InputLabel>
        <Input name="title" onChange={(e) => props.changeInfo(e)} fullWidth />
      </Grid>
      <Grid item xs={2}>
        <InputLabel>Author</InputLabel>
        <Input fullWidth disabled value={props.user} />
      </Grid>
      <Grid item xs={2}>
        <InputLabel>Date</InputLabel>
        <Input fullWidth disabled value={props.date} />
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
        <Button
          component="label"
          sx={{
            color: props.info.file.input ? "secondary.main" : "primary.main",
          }}
        >
          {props.info.file.input?.name
            ? props.info.file.input?.name
            : "Choose file"}
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
