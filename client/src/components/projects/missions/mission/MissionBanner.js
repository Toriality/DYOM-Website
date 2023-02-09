import React from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import { FaRegClock, FaRegEye, FaStar } from "react-icons/fa";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import nopreview from "../../../../images/nopreview.jpg";

export function MissionBanner(props) {
  const Loading = () => {
    return <CircularProgress />;
  };
  const Loaded = () => {
    const changeUpdate = (e) => {
      let date = new Date(e);
      date = date.toLocaleString("en", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      return date;
    };

    const getImageURL = (img) => {
      if (img)
        return `url(http://localhost:5000/${props.data.author?._id}/missions/${props.data._id}/${img})`;
      else return `url(${nopreview})`;
    };

    const TagBox = (props) => {
      return (
        <Box
          sx={{
            mr: 2,
            borderRadius: "20px",
            border: "1px solid",
            borderColor: "primary.main",
            p: "0.7rem",
            pr: 3,
            pl: 3,
            textAlign: "center",
            backgroundColor: "background.default",
            "& *": {
              color: "primary.main",
            },
          }}
        >
          <Typography variant="body1">{props.children}</Typography>
        </Box>
      );
    };

    return (
      <Box
        sx={{
          backgroundColor: "black",
          p: 6,
          pl: 16,
          pr: 16,
          "& *": { lineHeight: "1" },
        }}
      >
        <Grid container mb={4}>
          <Grid item xs={8}>
            <Typography variant="h1">{props.data.title}</Typography>
            <Typography variant="h3">
              Created by:
              <Link href="/" sx={{ ml: "1ch", display: "inline" }}>
                {props.data.author?.username}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={4} textAlign="right" mt="auto">
            <Typography variant="h3">Single Mission</Typography>
            <Box
              display="flex"
              gap={3}
              sx={{
                justifyContent: "flex-end",
                "& .MuiBox-root": {
                  display: "flex",
                  alignItems: "center",
                  "& svg": {
                    mr: 1,
                    color: "secondary.main",
                  },
                  "& .MuiTypography-root": {
                    color: "text.primary",
                  },
                },
              }}
            >
              <Box>
                <FaRegClock fontSize="16pt" />
                <Typography variant="h3">
                  {changeUpdate(props.data.updatedAt)}
                </Typography>
              </Box>
              <Box>
                <FaRegEye fontSize="16pt" />
                <Typography variant="h3">{props.data.views}</Typography>
              </Box>
              <Box>
                <MdOutlineDownloadForOffline fontSize="16pt" />
                <Typography variant="h3">{props.data.downloads}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          mb={4}
          spacing="1px"
          sx={{
            "& .MuiGrid-item": {
              transition: "200ms ease-out",
            },
            "& .MuiGrid-item:hover": {
              transform: "scale(1.02, 1.02)",
              transition: "200ms ease-in",
            },
            "& > *:nth-child(1):hover": {
              zIndex: 1,
              boxShadow: "50px 0 30px rgba(0,0,0,0.5)",
            },
            "& > *:nth-child(2):hover": {
              zIndex: 1,
              boxShadow:
                "50px 0 100px rgba(0,0,0,0.5), -50px 0 100px rgba(0,0,0,0.5) ",
            },
            "& > *:nth-child(3):hover": {
              zIndex: 1,
              boxShadow: "-50px 0 30px rgba(0,0,0,0.5)",
            },
          }}
        >
          <Grid item xs={3}>
            <Box
              sx={{
                aspectRatio: "2/3",
                backgroundImage: () => getImageURL(props.data.banner),
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Box
              sx={{
                aspectRatio: "16/9",
              }}
            >
              {props.data.trailer !== "null" ? (
                <iframe
                  src={props.data.trailer}
                  height="100%"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Trailer"
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${nopreview})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                height: "100%",
              }}
            >
              {props.data.gallery?.length > 0 ? (
                props.data.gallery?.map((img) => (
                  <Box
                    sx={{
                      flexGrow: "1",
                      backgroundImage: () => getImageURL(img),
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                    }}
                  />
                ))
              ) : (
                <Box
                  sx={{
                    flexGrow: "1",
                    backgroundImage: `url(${nopreview})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <Box display="flex" mb={4}>
              {props.data.tags?.map((tag) => (
                <TagBox>{tag}</TagBox>
              ))}
            </Box>
            <Typography variant="body1" maxWidth="72ch" mb={4}>
              {props.data.summary}
            </Typography>
            <Button variant="contained">Download</Button>
          </Grid>
          <Grid item xs={4}>
            <Typography align="right" variant="h3" mb={4}>
              Rating and Reviews
            </Typography>
            <Box
              display="flex"
              justifyContent="end"
              alignItems="center"
              mb={1}
              sx={{ "& svg": { color: "secondary.main" } }}
            >
              <Typography variant="h3" mr={4} sx={{ color: "primary.main" }}>
                Official Reviews:
              </Typography>
              <FaStar fontSize="24pt" />
              <Typography ml={2} variant="h2">
                --
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="end"
              alignItems="center"
              mb={2}
              sx={{ "& svg": { color: "secondary.main" } }}
            >
              <Typography variant="h3" mr={4} sx={{ color: "primary.main" }}>
                User Reviews:
              </Typography>
              <FaStar fontSize="24pt" />
              <Typography ml={2} variant="h2">
                --
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return props.loading ? <Loading /> : <Loaded />;
}
