import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export function UploadProjectButton() {
  return (
    <Box display="flex" justifyContent={"flex-end"}>
      <Button component={Link} to="add">
        Upload project
      </Button>
    </Box>
  );
}
