import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  //handle layout for registered and unregistered users
  if (sessionStorage.jwtToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
