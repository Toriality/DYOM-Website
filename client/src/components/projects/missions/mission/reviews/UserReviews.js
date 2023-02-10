import { Grid, Box, Typography, Button, Avatar } from "@mui/material";
import { PagesBox } from "../../../../../styles/components/PagesBox";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { HiChatAlt } from "react-icons/hi";
import { WriteReview } from "../../../../../styles/components/WriteReview";
import React from "react";

export function UserReviews(props) {
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <>
      <Grid container alignItems="baseline">
        <Grid item xs={8}>
          <Typography variant="h2">User reviews</Typography>
        </Grid>
        <Grid item xs={4}>
          <PagesBox />
        </Grid>
      </Grid>
      {!props.loading
        ? props.data.reviews?.map((review) => (
            <Box
              sx={{
                p: 4,
                backgroundColor: "background.default",
                borderRadius: "20px",
                border: "1px solid",
                borderColor: "stroke.default",
              }}
            >
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      aspectRatio: "1/1",
                    }}
                    src={
                      review.author?.hasAvatar
                        ? `http://localhost:5000/${review.author?._id}/avatar.jpg`
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={10}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                      borderBottom: "2px solid",
                      borderColor: "stroke.default",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "primary.main",
                      }}
                      variant="h3"
                    >
                      {review.author?.username}
                    </Typography>
                    <Typography variant="h3">{review.updatedAt}</Typography>
                  </Box>
                  <Typography
                    sx={{
                      minHeight: "5rem",
                      borderBottom: "2px solid",
                      borderColor: "stroke.default",
                      mb: 1,
                    }}
                    variant="body1"
                  >
                    {review.content}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      "& *": { mr: 2 },
                      "& svg": { fontSize: "24pt" },
                    }}
                  >
                    <AiFillLike />
                    <Typography variant="h3">{review.likes}</Typography>
                    <AiFillDislike />
                    <Typography variant="h3">{review.dislikes}</Typography>
                    <HiChatAlt />
                    <Typography variant="h3">0</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))
        : null}
      <Grid container alignItems="baseline">
        <Grid item xs={8}>
          <Button onClick={() => setOpenModal(true)}>Write review</Button>
        </Grid>
        <Grid item xs={4}>
          <PagesBox />
        </Grid>
      </Grid>
      <WriteReview toggle={() => setOpenModal(!openModal)} open={openModal} />
    </>
  );
}
