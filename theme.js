import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ""
  },

  palette: {
    primary: {
      main: "#3a4c7a"
    },
    secondary: {
      main: "#9da5bd"
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
