import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    // BODY TEXT (Inter)
    fontFamily: "var(--font-body)",

    body1: {
      fontFamily: "var(--font-body)",
      fontSize: "1.125rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },

    body2: {
      fontFamily: "var(--font-body)",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },

    // HEADINGS (Atma)
    h1: {
      fontFamily: "var(--font-heading)",
      fontWeight: 400,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },

    h2: {
      fontFamily: "var(--font-heading)",
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.3,
      "@media (max-width:600px)": {
        fontSize: "1.5rem", 
      },
    },

    h3: {
      fontFamily: "var(--font-heading)",
      fontWeight: 500,
      fontSize: "1.375rem",
      lineHeight: 1.3,
      "@media (max-width:600px)": {
        fontSize: "1.5rem", 
      },
    },

    // BUTTONS
    button: {
      fontFamily: "var(--font-body)",
      fontSize: "1.125rem",
      fontWeight: 500,
      textTransform: "none",
    },
  },
});

export default theme;