import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/MyContext";
import SolarEclipseData from "../api-data/SolarEclipseData";

const MainPage = () => {
  const { isRegistered } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <h1>Sky Events</h1>
      {isRegistered ? (
        <SolarEclipseData />
      ) : (
        <>
          <button onClick={() => navigate("/register")}>Register</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </>
      )}
    </>
  );
};

export default MainPage;
