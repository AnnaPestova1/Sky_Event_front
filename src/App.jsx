import { useEffect, useContext, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./utils/MyContext";
import MainPage from "./components/layout/MainPage";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";
import AllData from "./components/appData/AllData";
import EditData from "./components/appData/EditData";
import AddData from "./components/appData/AddData";
import NotFound from "./components/layout/NotFound";
import PrivateRoute from "./components/layout/PrivateRoute";
import Footer from "./components/layout/footer";
import { Alert, Box, Container, CssBaseline, Snackbar } from "@mui/material";
import { getNASAPictureOfTheDay } from "./utils/fetchData";

function App() {
  const { setIsRegistered } = useContext(AuthContext);
  const [img, setImg] = useState("");
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const userName = urlParams.get("name");
    if (token) {
      sessionStorage.setItem("jwtToken", token);
      sessionStorage.setItem("username", userName);
      setIsRegistered(true);
      window.location = "/";
    }
    if (sessionStorage.jwtToken) {
      setIsRegistered(true);
    }
  }, []);
  useEffect(() => {
    getNASAPictureOfTheDay()
      .then(response => {
        console.log(response.data.data);
        setImg(response.data.data.hdurl);
      })
      .catch(error => {
        console.error(error);
        setOpenError(true);
        setErrorMessage(
          error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.response?.data ||
            error.message ||
            "unknown error"
        );
      });
  }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Box
          display="flex"
          flexDirection="column"
          // alignItems="center"
          // justifyContent="center"
          flexGrow={1}
          overflow="auto"
          // height="100%"
          minHeight="calc(100vh - 64px)"
          sx={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0, 0.85), rgba(128, 128, 128, 0.85)), url(${img})`,
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat"
          }}>
          <Container
            maxWidth="lg"
            sx={{
              flexGrow: 1,
              minHeight: "calc(100%-40px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoute />}>
                <Route path="/data" element={<AllData />} />
                <Route path="/data/edit/:slug" element={<EditData />} />
                <Route path="/data/add" element={<AddData />} />
              </Route>
              <Route path="404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </BrowserRouter>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
