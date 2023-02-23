import { Grid, Typography } from "@mui/material";
import { FilterBox } from "../FilterBox";
import { PagesBox } from "../PagesBox";
import { ProjectTable } from "../ProjectTable";
import { SearchBox } from "../SearchBox";
import { UploadProjectButton } from "./UploadProjectButton";

export function ListTable(props) {
  <Grid container justifyContent="space-between" spacing={2} my={4}>
    <Grid item xs={12}>
      <Typography variant="h2">
        List of uploaded
        {props.type === "Mission" ? "Missions" : "Mission-Packs"}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <SearchBox searchString="search=" />
    </Grid>
    <Grid item xs={6}>
      <UploadProjectButton />
    </Grid>
    <Grid item xs={6}>
      <FilterBox />
    </Grid>
    <Grid item xs={4}>
      <PagesBox />
    </Grid>
    <Grid item xs={12}>
      <ProjectTable data={props.data} />
    </Grid>
    <Grid item xs={4}>
      <PagesBox />
    </Grid>
    <Grid item xs={6}>
      <UploadProjectButton />
    </Grid>
  </Grid>;
}