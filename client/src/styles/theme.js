import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";
import Pricedown from "../fonts/pricedown.ttf";

// Site main theme
export const theme = createTheme({
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
    MuiInput: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid " + colors.backgroundLighter,
          backgroundColor: colors.backgroundInput,
          paddingLeft: ".8rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: colors.backgroundInput,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          marginBottom: "1rem",
          borderRadius: "20px !important",
          backgroundColor: colors.backgroundDarker,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          padding: "0.7rem 4rem",
          backgroundColor: colors.backgroundLighter,
          "& .MuiTypography-root": {
            fontWeight: "bolder",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "2rem 4rem",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& > .MuiTableRow-root > .MuiTableCell-root": {
            fontWeight: "bolder",
            backgroundColor: colors.backgroundLighter,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-child(even)": {
            filter: "brightness(125%)",
            backgroundColor: colors.backgroundColor,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "0.8rem",
          fontSize: "12pt",
          border: "1px solid",
          borderColor: colors.stroke,
          backgroundColor: colors.backgroundColor,
          filter: "brightness(125%)",
          textAlign: "center",
        },
      },
    },
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
      variants: [
        {
          props: { variant: "download" },
          style: {
            color: colors.successColor,
            border: "2px solid " + colors.successColor,
          },
        },
      ],
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
      light: colors.backgroundLighter,
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
