import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export function DYOMBreadcumbs() {
  // Get list of routes by separating the "/"
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumbs separator=">">
      {/* Homepage link */}
      <Link variant="h6" onClick={() => navigate("/")}>
        Home
      </Link>

      {/* Other routes links */}
      {pathnames.map((name, index) => {
        // Link to specific route
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        // Returns true if we are currently in that route page
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          // We're currently on that page, therefore there's no need to have a link to it
          <Typography variant="h6" key={name}>
            {name}
          </Typography>
        ) : (
          // Link to other routes
          <Link variant="h6" key={name} onClick={() => navigate(routeTo)}>
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default DYOMBreadcumbs;
