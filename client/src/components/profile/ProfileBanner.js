import { Box, Grid, Typography } from "@mui/material";

export function ProfileBanner(props) {
  return (
    <Box sx={styles.profileBanner}>
      <Grid container spacing={10}>
        <Grid item xs={5}>
          <Box sx={styles.avatar} />
        </Grid>
        <Grid item xs={7}>
          <Box sx={styles.profileInfo}>
            <Box>
              <Typography variant="h1" color="primary">
                {props.profile.username}
              </Typography>
              <Typography variant="h2">Junior member</Typography>
            </Box>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h3">
                  Registered on:
                  <Typography component="span" variant="body1">
                    0
                  </Typography>
                </Typography>
                <Typography variant="h3">
                  Last visit:
                  <Typography component="span" variant="body1">
                    0
                  </Typography>
                </Typography>
                <Typography variant="h3">
                  Projects:
                  <Typography component="span" variant="body1">
                    0
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h3">
                  Tutorials:
                  <Typography component="span" variant="body1">
                    0
                  </Typography>
                </Typography>
                <Typography variant="h3">
                  Reviews:
                  <Typography component="span" variant="body1">
                    0
                  </Typography>
                </Typography>
                <Typography variant="h3">
                  Points:
                  <Typography component="span" variant="body1">
                    0
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const styles = {
  profileBanner: {
    px: 14,
    py: 8,
    bgcolor: "black",
  },

  avatar: {
    mt: 1,
    bgcolor: "primary.main",
    height: "100%",
    aspectRatio: "1/1",
    borderRadius: "100%",
  },

  profileInfo: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& span": {
      ml: 1,
    },
  },
};
