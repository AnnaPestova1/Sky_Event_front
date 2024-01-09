import React, { useContext } from "react";
import { AuthContext } from "../../utils/MyContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isRegistered } = useContext(AuthContext);
  if (isRegistered) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
