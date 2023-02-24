import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProject } from "../../../features/project/projectSlice";
import { ProjectReviews } from "../../../styles/components/project/reviews/ProjectReviews";

export function Reviews(props) {
  const { single, loading, loadingReview, reviewInfo } = useSelector(
    (state) => state.project
  );
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getProject(["mission", id, "?reviews"]));
  }, [dispatch, id]);

  return (
    <ProjectReviews
      loading={loading}
      data={single}
      userData={userInfo}
      loadingReview={loadingReview}
      reviewInfo={reviewInfo}
    />
  );
}
