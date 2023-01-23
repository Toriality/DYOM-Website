import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { colors } from "./colors";
import Pricedown from "./fonts/pricedown.ttf";
import { Navbar } from "./features/navbar/Navbar";

// Site main theme
const theme = createTheme({
  typography: {
    fontFamily: "Pricedown, Arial",
    allVariants: {
      color: colors.primaryText,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Priceodwn';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Pricedown'), url(${Pricedown}) format('ttf');
        }
      `,
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
      default: colors.backgroundColor,
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
            <Route path="/" element={null} />
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
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
