import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export function DYOMBreadcumbs() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumbs separator=">">
      <Link variant="h6" onClick={() => navigate("/")}>
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography variant="h6" key={name}>
            {name}
          </Typography>
        ) : (
          <Link variant="h6" key={name} onClick={() => navigate(routeTo)}>
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default DYOMBreadcumbs;
