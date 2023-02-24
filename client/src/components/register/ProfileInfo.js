import React from "react";
import { Grid, Input, InputLabel, TextField } from "@mui/material";

export function ProfileInfo(props) {
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <InputLabel htmlFor="username">Username *</InputLabel>
          <Input
            id="username"
            name="username"
            onChange={(e) => props.changeInfo(e)}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel htmlFor="password">Password *</InputLabel>
          <Input
            id="password"
            name="password"
            onChange={(e) => props.changeInfo(e)}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <InputLabel htmlFor="email">E-mail *</InputLabel>
          <Input
            id="email"
            name="email"
            onChange={(e) => props.changeInfo(e)}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel htmlFor="location">Location</InputLabel>
          <Input
            id="location"
            name="location"
            onChange={(e) => props.changeInfo(e)}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <InputLabel htmlFor="aboutme">About Me</InputLabel>
          <TextField
            id="aboutme"
            name="aboutme"
            onChange={(e) => props.changeInfo(e)}
            multiline
            fullWidth
            rows={12}
          />
        </Grid>
      </Grid>
    </>
  );
}
