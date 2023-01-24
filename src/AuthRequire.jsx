import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthCpntext } from "./context/AuthContext";

function AuthRequire({ allowedRoles }) {
  const { data: Auth } = useAuthCpntext();
  const location = useLocation();

  return (
    <>
      {/* looking for roles that are matching */}
      {Auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
        <Outlet />
      ) : Auth?.name ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
}

export default AuthRequire;
