import React from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Link,
  CircularProgress,
  Skeleton,
  ButtonBase,
} from "@mui/material";
import { FaRegClock, FaRegEye, FaStar } from "react-icons/fa";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import nopreview from "../../../../images/nopreview.jpg";
import { Link as RouterLink } from "react-router-dom";
import { GalleryModal } from "./GalleryModal";
import { BannerModal } from "./BannerModal";

export function MissionBanner(props) {
  const Loading = () => {
    return (
      <Box sx={{ backgroundColor: "black", p: 6, pl: 16, pr: 16 }}>
        <Grid container mb={4}>
          <Grid item xs={6}>
            <Skeleton variant="text" sx={{ fontSize: "48pt", width: "80%" }} />
            <Skeleton varaint="text" sx={{ fontSize: "16pt", width: "40%" }} />
          </Grid>
          <Grid item xs={6} mt="auto" align="right">
            <Skeleton variant="text" sx={{ fontSize: "16pt", width: "30%" }} />
            <Skeleton varaint="text" sx={{ fontSize: "16pt", width: "40%" }} />
          </Grid>
        </Grid>
        <Grid container mb={4} spacing="1px">
          <Grid item xs={3}>
            <Skeleton
              variant="retangle"
              sx={{ aspectRatio: "2/3", width: "100%", height: "100%" }}
            />
          </Grid>
          <Grid item xs={7}>
            <Skeleton
              variant="retangle"
              sx={{ aspectRatio: "16/9", width: "100%", height: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Skeleton variant="retangle" sx={{ height: "100%" }} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Skeleton variant="retangle" width="72ch" height="6rem" mb={2} />
            <Skeleton varaint="rounded" width="12rem" height="6rem" />
          </Grid>
          <Grid item xs={6} align="right">
            <Skeleton
              variant="text"
              sx={{ fontSize: "16pt", width: "50%", mb: 2 }}
            />
            <Skeleton variant="text" sx={{ fontSize: "24pt", width: "50%" }} />
            <Skeleton variant="text" sx={{ fontSize: "24pt", width: "50%" }} />
          </Grid>
        </Grid>
      </Box>
    );
  };
  const Loaded = () => {
    const [openGalleryModal, setOpenGalleryModal] = React.useState(false);
    const [openBannerModal, setOpenBannerModal] = React.useState(false);

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
          pt: 2,
          "& *": { lineHeight: "1" },
        }}
      >
        <Grid container mb={4}>
          <Grid item xs={8}>
            <Typography variant="h1">{props.data.title}</Typography>
            <Typography variant="h3">
              Created by:
              <Link
                component={RouterLink}
                to="/"
                sx={{ ml: "1ch", display: "inline" }}
              >
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
            {props.data.banner ? (
              <ButtonBase
                onClick={() => setOpenBannerModal(true)}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flex: "1",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    flexGrow: "1",
                    aspectRatio: "2/3",
                    backgroundImage: () => getImageURL(props.data.banner),
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                />
              </ButtonBase>
            ) : null}
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
            {props.data.gallery?.length > 0 ? (
              <ButtonBase
                onClick={() => setOpenGalleryModal(true)}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flex: "1",
                  flexDirection: "column",
                }}
              >
                {props.data.gallery?.map((img) => (
                  <Box
                    sx={{
                      width: "100%",
                      flexGrow: "1",
                      backgroundImage: () => getImageURL(img),
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                    }}
                  />
                ))}
              </ButtonBase>
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
            <Button variant="download">Download</Button>
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
        <GalleryModal
          getImageURL={getImageURL}
          gallery={props.data.gallery}
          open={openGalleryModal}
          toggle={() => setOpenGalleryModal(!openGalleryModal)}
        />
        <BannerModal
          getImageURL={getImageURL}
          banner={props.data.banner}
          open={openBannerModal}
          toggle={() => setOpenBannerModal(!openBannerModal)}
        />
      </Box>
    );
  };

  return props.loading ? <Loading /> : <Loaded />;
}
