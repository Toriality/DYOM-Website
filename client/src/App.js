import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Box } from "@mui/material";
import { colors } from "./styles/colors";
import Pricedown from "./fonts/pricedown.ttf";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./components/home/Home";
import { Footer } from "./components/footer/Footer";
import { Debug_AddMission } from "./components/debug/AddMission";
import { AddMission } from "./components/projects/missions/addMission/AddMission";
import { ListMissions } from "./components/projects/missions/listMissions/ListMissions";

// Site main theme
const theme = createTheme({
  typography: {
    fontFamily: "Pricedown, Verdana",
    allVariants: {
      color: colors.primaryText,
    },
    h1: { fontSize: "48pt", color: "white" },
    h2: { fontSize: "32pt", color: "white" },
    h3: { fontSize: "24pt", color: "white" },
    h4: { fontSize: "16pt", color: "white" },
    body1: { fontFamily: "Verdana", fontSize: "12pt" },
    body2: { fontFamily: "Verdana", fontSize: "8pt" },
    subtitle1: { fontFamily: "Verdana", fontSize: "8pt" },
    subtitle2: { fontFamily: "Verdana", fontSize: "6pt" },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          display: "block",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          lineHeight: "1",
          color: colors.primaryColor,
          backgroundColor: colors.backgroundColor,
          border: "2px solid " + colors.primaryColor,
          borderRadius: 20,
          fontSize: "32pt",
          padding: "1rem 2rem",
          "&:hover": {
            color: "#000",
            backgroundColor: colors.primaryColor,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          "font-family": "Priceodwn",
          "font-style": "normal",
          "font-display": "swap",
          "font-weight": "400",
          src: `local('Pricedown'), url(${Pricedown}) format('ttf')`,
        },
        body: {
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#070707",
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundColor: colors.primaryColor,
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: colors.secondaryColor,
            },
        },
      },
    },
  },
  palette: {
    primary: {
      main: colors.primaryColor,
    },
    secondary: {
      main: colors.secondaryColor,
    },
    background: {
      default: colors.backgroundDarker,
      box: colors.backgroundColor,
    },
    stroke: {
      default: colors.stroke,
    },
    text: {
      primary: colors.primaryText,
      secondary: "#fff",
    },
  },
});

// Site
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutsWithNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/debug/add_mission" element={<Debug_AddMission />} />
            <Route path="/missions/add" element={<AddMission />} />
            <Route path="/missions" element={<ListMissions />} />
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
