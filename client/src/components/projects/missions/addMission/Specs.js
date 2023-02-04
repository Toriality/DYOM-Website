import React from "react";
import {
  Box,
  Checkbox,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export function Specs() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={12}>
            <InputLabel>Credits</InputLabel>
            <TextField fullWidth multiline rows={8} />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Trailer</InputLabel>
            <Input fullWidth />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid container height="100%" alignContent="space-between">
          <Grid item xs={12}>
            <InputLabel>Original Name</InputLabel>
            <Input fullWidth />
          </Grid>
          <Grid item xs={6}>
            <InputLabel>MOTTO</InputLabel>
            <Input />
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Music Theme</InputLabel>
            <Input />
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Difficulty</InputLabel>
            <Select defaultValue={"Unknown"}>
              <MenuItem value="Unknown">Unknown</MenuItem>
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
              <MenuItem value="Extreme">Extreme</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Mods required</InputLabel>
            <Checkbox />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
