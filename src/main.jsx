import React from "react";
import ContextWrapper from "./utils/MyContext";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";

import App from "./App.jsx";
import "./index.css";
import { theme } from "../theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextWrapper>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ContextWrapper>
  </React.StrictMode>
);
