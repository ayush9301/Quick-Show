import React from "react";
import SetAuthStatus from "./authStatus";
import Loader from "../Hooks/Loader";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const { userExist, checkUser } = SetAuthStatus();

  if (checkUser) return <Loader />;

  return userExist ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateComponent;
