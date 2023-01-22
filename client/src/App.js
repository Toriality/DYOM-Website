import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";

// Site main theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#FFD066",
    },
    secondary: {
      main: "#f44336",
    },
    background: {
      default: "#252525",
    },
    text: {
      primary: "#DDD",
      secondary: "#FFF",
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
      {/*<Navbar />*/}
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
