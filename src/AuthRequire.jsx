import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthCpntext } from "./context/AuthContext";

function AuthRequire() {
  const { data: Auth } = useAuthCpntext();
  const location = useLocation();

  return (
    <>
      {Auth.username ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
}

export default AuthRequire;
