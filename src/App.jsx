import { useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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

function App() {
  const { setIsRegistered } = useContext(AuthContext);

  useEffect(() => {
    if (sessionStorage.jwtToken) {
      setIsRegistered(true);
    }
  }, []);

  return (
    <div>
      <Navbar />
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
    </div>
  );
}

export default App;
