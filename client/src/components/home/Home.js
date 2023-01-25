import React from "react";
import { Box, Typography, Button } from "@mui/material";
import img from "../../images/image.jpg";

export function Home() {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#000",
        height: "88vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,212,255,0) 100%)",
        }}
      />
      <Box
        sx={{
          zIndex: "1",
          ml: 14,
          mr: 6,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box mb={5}>
          <Typography variant="h2" lineHeight={"1"}>
            Design Your Own Mission
          </Typography>
          <Typography variant="h3" color={"secondary"} lineHeight={"0.8"}>
            Create, Play, Share!
          </Typography>
        </Box>

        <Box mb={5} maxWidth={"55ch"}>
          <Typography variant="body1">
            Unleash your creativity and bring your best ideas to life with this
            powerful and intuitive mission editor for GTA San Andreas!
          </Typography>
        </Box>

        <Typography variant="subtitle1" mb={"2px"}>
          Latest version: DYOM 8.1
        </Typography>
        <Box sx={{ display: "block" }}>
          <Button variant="contained">Download Mod</Button>
        </Box>
      </Box>
      <Box
        bgcolor={"blue"}
        sx={{
          width: "60%",
          backgroundImage: "url(" + img + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Box>
    </Box>
  );
}
