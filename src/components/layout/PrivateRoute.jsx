import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../utils/MyContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isRegistered, setIsRegistered } = useContext(AuthContext);

  if (sessionStorage.jwtToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
