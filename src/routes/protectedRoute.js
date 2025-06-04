import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({
  component: Component,
  restricted,
  auth,
  ...rest
}) => {
  return !localStorage.getItem("accessToken") ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default ProtectedRoute;
