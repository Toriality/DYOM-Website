import { DYOMContent } from "../../dyom/DYOMContainer";
import { ProjectOfficialReviews } from "./ProjectOfficialReviews";
import { ProjectReviewsBanner } from "./ProjectReviewsBanner";
import { ProjectUserReviews } from "./ProjectUserReviews";

export function ProjectReviews(props) {
  return (
    <>
      <ProjectReviewsBanner loading={props.loading} data={props.data} />
      <ProjectOfficialReviews loading={props.loading} data={props.data} />
      <DYOMContent>
        <ProjectUserReviews
          loading={props.loading}
          data={props.data}
          userData={props.userInfo}
          loadingReview={props.loadingReview}
          reviewInfo={props.reviewInfo}
        />
      </DYOMContent>
    </>
  );
}
