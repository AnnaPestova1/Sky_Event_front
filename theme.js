import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "",
    h1: {
      fontFamily: "Sixtyfour"
    },
    h2: {
      fontFamily: "Sixtyfour"
    },
    h3: {
      fontFamily: "Sixtyfour"
    },
    h4: {
      fontFamily: "Sixtyfour"
    },
    h5: {
      fontFamily: "Sixtyfour"
    },
    h6: {
      fontFamily: "Sixtyfour"
    }
  },

  palette: {
    mode: "dark",
    primary: {
      main: "#dee4f4"
    },
    secondary: {
      main: "#5c657d"
    },
    background: {
      paper: "#2b3347"
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 4
      }
    },
    MuiButton: {
      defaultProps: {
        // variant: ""
      },
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    }
  }
});
