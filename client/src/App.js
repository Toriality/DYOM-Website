import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import { CssBaseline } from "@mui/material";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./components/home/Home";
import { Footer } from "./components/footer/Footer";
import { FAQ } from "./components/faq/FAQ";
import { Register } from "./components/register/Register";
import { useLocation } from "react-router-dom";
import React from "react";
import { ListMissions } from "./components/projects/missions/ListMissions";
import { AddMission } from "./components/projects/missions/AddMission";
import { Mission } from "./components/projects/missions/Mission";
import { Reviews } from "./components/projects/missions/Reviews";
import { Comments } from "./components/projects/missions/Comments";
import { ListMps } from "./components/projects/mps/ListMps";
import { AddMp } from "./components/projects/mps/AddMp";
import { Mp } from "./components/projects/mps/Mp";
import { Profile } from "./components/profile/Profile";

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

// Site
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LayoutsWithNavbar />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="missions">
              <Route index element={<ListMissions />} />
              <Route path="add" element={<AddMission />} />
              <Route path=":id">
                <Route index element={<Mission />} />
                <Route path="reviews">
                  <Route index element={<Reviews />} />
                  <Route path=":reviewId" element={<Comments />} />
                </Route>
              </Route>
            </Route>
            <Route path="mps">
              <Route index element={<ListMps />} />
              <Route path="add" element={<AddMp />} />
              <Route path=":id">
                <Route index element={<Mp />} />
              </Route>
            </Route>
            <Route path="profile">
              <Route path=":id">
                <Route index element={<Profile />} />
              </Route>
            </Route>
            <Route path="/faq" element={<FAQ />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

// Pages with navbar
function LayoutsWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
