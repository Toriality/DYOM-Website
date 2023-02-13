import { Box, Button, Grid, Link, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMission } from "../../../../../features/mission/missionSlice";
import nopreview from "../../../../../images/nopreview.jpg";
import { DYOMContent } from "../../../../../styles/components/DYOMContainer";
import { PagesBox } from "../../../../../styles/components/PagesBox";
import { OfficialReviews } from "./OfficialReviews";
import { ReviewsBanner } from "./ReviewsBanner";
import { UserReviews } from "./UserReviews";

export function Reviews(props) {
  const { missionInfo, loading, loadingReview, reviewInfo } = useSelector(
    (state) => state.mission
  );
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getMission([id, "?reviews"]));
  }, []);

  return (
    <>
      <ReviewsBanner loading={loading} data={missionInfo} />
      <OfficialReviews loading={loading} data={missionInfo} />
      <DYOMContent>
        <UserReviews
          loading={loading}
          data={missionInfo}
          userData={userInfo}
          loadingReview={loadingReview}
          reviewInfo={reviewInfo}
        />
      </DYOMContent>
    </>
  );
}
