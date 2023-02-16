import { Box } from "@mui/material";

export function ProfilePins() {
  return <Box sx={styles.pinsBox}></Box>;
}

const styles = {
  pinsBox: {
    minHeight: "30rem",
    bgcolor: "secondary.main",
  },
};
