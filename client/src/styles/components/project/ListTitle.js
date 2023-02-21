import { Grid, Typography } from "@mui/material";
import { UploadProjectButton } from "./UploadProjectButton";
import banner from "../../../images/single_mission.jpg";

export function ListTitle(props) {
  return (
    <Grid
      mt={"auto"}
      container
      spacing={1}
      alignItems="center"
      sx={styles.titleGrid}
    >
      <Grid item xs={12}>
        <Typography variant="h2">
          {props.type === "Mission" ? "Single Missions" : "Mission-Packs"}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          {props.type === "Mission"
            ? "Share and play DYOM missions!"
            : "Mission packs contains more than one DYOM file, presenting a new GTA universe and telling big stories in form of chapters or epsodes!"}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <UploadProjectButton />
      </Grid>
    </Grid>
  );
}

const styles = {
  titleGrid: {
    px: 20,
    py: 4,
    backgroundImage: "url(" + banner + ")",
    backgroundSize: "cover",
  },
};
