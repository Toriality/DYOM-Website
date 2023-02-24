import React from "react";
import { Box } from "@mui/material";
import { ProjectBox } from "../ProjectBox";
import bannerimg from "../../../images/single_mission.jpg";
import { TitleAndData } from "../TitleAndPages";

export function DYOMBanner(props) {
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);

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
    <Box align="center" sx={styles.banner}>
      <TitleAndData
        title={props.title}
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
    backgroundImage: `url(${bannerimg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    minHeight: "45rem",
    px: 20,
    py: 3,
  },

  projects: {
    display: "flex",
    gap: 3,
  },
};
