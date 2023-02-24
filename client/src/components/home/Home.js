import { DYOMContent } from "../../styles/components/dyom/DYOMContainer";
import { Banner } from "./Banner";
import { DailyPicks } from "./DailyPicks";
import { LatestNews } from "./LatestNews";
import { TrendingProjects } from "./TrendingProjects";

export function Home() {
  return (
    <>
      <Banner />
      <DailyPicks />
      <TrendingProjects />

      <DYOMContent>
        <LatestNews />
      </DYOMContent>
    </>
  );
}
