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
import { Box, Container, CssBaseline } from "@mui/material";
import { getNASAPictureOfTheDay } from "./utils/fetchData";

function App() {
  const { setIsRegistered } = useContext(AuthContext);
  const [img, setImg] = useState("");

  useEffect(() => {
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
      });
  }, []);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Box
        // display="flex"
        // flexDirection="column"
        // alignItems="center"
        // justifyContent="center"
        flexGrow={1}
        overflow="auto"
        minHeight="calc(100vh - 64px)"
        sx={{
          backgroundImage: `linear-gradient(to right, rgba(239, 238, 238, 0.85), rgba(255, 255, 255, 0.85)), url(${img})`,
          width: "100%",
          backgroundSize: "100vw 100vh",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat"
        }}>
        <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
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
  );
}

export default App;
