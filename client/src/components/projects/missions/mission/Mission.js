import { Box, Grid, Link, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React from "react";
import { FaRegClock, FaRegEye } from "react-icons/fa";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import nopreview from "../../../../images/nopreview.jpg";

export function Mission() {
  const { id } = useParams();

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
          <Typography variant="h1">Mission Title</Typography>
          <Typography variant="h3">
            Created by:
            <Link href="/" sx={{ ml: "1ch", display: "inline" }}>
              Username
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
              <Typography variant="h3">03.03.2023</Typography>
            </Box>
            <Box>
              <FaRegEye fontSize="16pt" />
              <Typography variant="h3">214</Typography>
            </Box>
            <Box>
              <MdOutlineDownloadForOffline fontSize="16pt" />
              <Typography variant="h3">100</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
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
              backgroundImage: "url(" + nopreview + ")",
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
            <iframe
              src="https://www.youtube.com/embed/q3Yg5WdQr0I"
              height="100%"
              width="100%"
              frameBorder="0"
              allowFullScreen
              title="Trailer"
            />
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
            <Box
              sx={{
                flexGrow: "1",
                backgroundImage: "url(" + nopreview + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            />
            <Box
              sx={{
                flexGrow: "1",
                backgroundImage: "url(" + nopreview + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            />
            <Box
              sx={{
                flexGrow: "1",
                backgroundImage: "url(" + nopreview + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            />
            <Box
              sx={{
                flexGrow: "1",
                backgroundImage: "url(" + nopreview + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            />
            <Box
              sx={{
                flexGrow: "1",
                backgroundImage: "url(" + nopreview + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
