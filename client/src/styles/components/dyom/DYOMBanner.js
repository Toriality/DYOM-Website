import React from "react";
import { Box } from "@mui/material";
import { ProjectBox } from "../ProjectBox";
import { TitleAndData } from "../TitleAndPages";
import trending_banner from "../../../images/trending_projects.jpg";
import daily_banner from "../../.././images/daily_picks.jpg";

export function DYOMBanner(props) {
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const banner =
    props.type === "Trending Projects" ? trending_banner : daily_banner;

  React.useEffect(() => {
    if (props.data) {
      setPages(props.data.length / 2);
    }
  }, [props.data]);

  const changePage = (event) => {
    const type = event.currentTarget.id;
    if (type === "previous") setPage(page - 1);
    if (type === "next") setPage(page + 1);
  };

  return props.loading ? null : (
    <Box
      align="center"
      sx={{ ...styles.banner, backgroundImage: `url(${banner})` }}
    >
      <TitleAndData
        title={props.type}
        page={page}
        pages={pages}
        changePage={changePage}
      />
      <Box sx={styles.projects}>
        <ProjectBox data={props.data[(page - 1) * 2]} />
        <ProjectBox data={props.data[(page - 1) * 2 + 1]} />
      </Box>
    </Box>
  );
}

const styles = {
  banner: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    px: 20,
    pt: 5,
    pb: 10,
  },

  projects: {
    display: "flex",
    gap: 3,
  },
};
