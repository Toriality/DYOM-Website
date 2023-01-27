import { Banner } from "./Banner";
import { LatestNews } from "./LatestNews";
import { TrendingProjects } from "./TrendingProjects";

export function Home() {
  return (
    <>
      <Banner />
      <TrendingProjects />
      <LatestNews />
    </>
  );
}
