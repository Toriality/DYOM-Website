import { Box, Button, Grid, Link, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProject } from "../../../../../features/project/projectSlice";
import nopreview from "../../../../../images/nopreview.jpg";
import { DYOMContent } from "../../../../../styles/components/DYOMContainer";
import { PagesBox } from "../../../../../styles/components/PagesBox";
import { OfficialReviews } from "./OfficialReviews";
import { ReviewsBanner } from "./ReviewsBanner";
import { UserReviews } from "./UserReviews";

export function Reviews(props) {
  const { single, loading, loadingReview, reviewInfo } = useSelector(
    (state) => state.project
  );
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getProject(["mission", id, "?reviews"]));
  }, []);

  return (
    <>
      <ReviewsBanner loading={loading} data={single} />
      <OfficialReviews loading={loading} data={single} />
      <DYOMContent>
        <UserReviews
          loading={loading}
          data={single}
          userData={userInfo}
          loadingReview={loadingReview}
          reviewInfo={reviewInfo}
        />
      </DYOMContent>
    </>
  );
}
