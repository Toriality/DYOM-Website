import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import { CssBaseline } from "@mui/material";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./components/home/Home";
import { Footer } from "./components/footer/Footer";
import { AddMission } from "./components/projects/missions/addMission/AddMission";
import { ListMissions } from "./components/projects/missions/listMissions/ListMissions";
import { FAQ } from "./components/faq/FAQ";
import { Register } from "./components/register/Register";

// Site
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutsWithNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/missions/add" element={<AddMission />} />
            <Route path="/missions" element={<ListMissions />} />
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
