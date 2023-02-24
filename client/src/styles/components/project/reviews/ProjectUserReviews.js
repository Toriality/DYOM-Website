import {
  Grid,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import { PagesBox } from "../../query/PagesBox";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { HiChatAlt } from "react-icons/hi";
import { WriteReview } from "../reviews/WriteReview";
import React from "react";
import { useDispatch } from "react-redux";
import { likeReview } from "../../../../features/project/projectSlice";

export function ProjectUserReviews(props) {
  const [openModal, setOpenModal] = React.useState(false);
  const dispatch = useDispatch();
  const like = (id) => {
    dispatch(likeReview(id));
  };
  const dislike = () => {};
  const comments = () => {};

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
        ? props.data.reviews?.map((review) =>
            review._id === props.reviewInfo?._id ? (
              <Box sx={styles.reviewBox}>
                <Grid container alignItems="start">
                  <Grid item xs={2}>
                    <Avatar
                      sx={styles.avatar}
                      src={
                        review.author?.hasAvatar
                          ? `http://localhost:5000/${review.author?._id}/avatar.jpg`
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Box sx={styles.upper}>
                      <Typography color="primary" variant="h3">
                        {review.author?.username}
                      </Typography>
                      <Typography variant="h3">{review.updatedAt}</Typography>
                    </Box>
                    <Typography sx={styles.content} variant="body1">
                      {review.content}
                    </Typography>
                    {props.loadingReview ? null : (
                      <Box sx={styles.bottom}>
                        <IconButton
                          onClick={() => like(review._id)}
                          sx={{
                            "& *": {
                              color: props.reviewInfo.likes.includes(
                                props.userData._id
                              )
                                ? "primary.main"
                                : "white",
                            },
                          }}
                        >
                          <AiFillLike />
                          <Typography variant="h3">
                            {props.reviewInfo.likes.length}
                          </Typography>
                        </IconButton>
                        <IconButton onClick={dislike}>
                          <AiFillDislike />
                          <Typography variant="h3">
                            {props.reviewInfo.dislikes}
                          </Typography>
                        </IconButton>
                        <IconButton onClick={comments}>
                          <HiChatAlt />
                          <Typography variant="h3">0</Typography>
                        </IconButton>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box sx={styles.reviewBox}>
                <Grid container alignItems="start">
                  <Grid item xs={2}>
                    <Avatar
                      sx={styles.avatar}
                      src={
                        review.author?.hasAvatar
                          ? `http://localhost:5000/${review.author?._id}/avatar.jpg`
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Box sx={styles.upper}>
                      <Typography color="primary" variant="h3">
                        {review.author?.username}
                      </Typography>
                      <Typography variant="h3">{review.updatedAt}</Typography>
                    </Box>
                    <Typography sx={styles.content} variant="body1">
                      {review.content}
                    </Typography>
                    {props.loadingReview ? null : (
                      <Box sx={styles.bottom}>
                        <IconButton
                          onClick={() => like(review._id)}
                          sx={{
                            "& *": {
                              color: review.likes.includes(props.userData._id)
                                ? "primary.main"
                                : "white",
                            },
                          }}
                        >
                          <AiFillLike />
                          <Typography variant="h3">
                            {review.likes.length}
                          </Typography>
                        </IconButton>
                        <IconButton onClick={dislike}>
                          <AiFillDislike />
                          <Typography variant="h3">
                            {review.dislikes}
                          </Typography>
                        </IconButton>
                        <IconButton onClick={comments}>
                          <HiChatAlt />
                          <Typography variant="h3">0</Typography>
                        </IconButton>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            )
          )
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

const styles = {
  reviewBox: {
    p: 4,
    backgroundColor: "background.default",
    borderRadius: "20px",
    border: "1px solid",
    borderColor: "stroke.default",
  },

  avatar: {
    width: "80%",
    height: "80%",
    aspectRatio: "1/1",
    mt: 1,
  },

  upper: {
    display: "flex",
    justifyContent: "space-between",
    mb: 2,
    borderBottom: "2px solid",
    borderColor: "stroke.default",
  },

  content: {
    minHeight: "15rem",
    borderBottom: "2px solid",
    borderColor: "stroke.default",
    mb: 1,
    pb: 4,
  },

  bottom: {
    m: "0 !important",
    display: "flex",
    alignItems: "center",
    "& *": { mr: 2 },
    "& svg": { fontSize: "24pt", color: "white" },
  },
};
