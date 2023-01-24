import React, { useEffect } from "react";
import { useAuthCpntext } from "../context/AuthContext";
import useRefreshToken from "../hooks/useRefreshToken";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function PersistUser() {
  const { data: auth, persist } = useAuthCpntext();
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async function () {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? refreshToken() : setIsLoading(false);
  }, [setIsLoading, refresh, auth]);

  useEffect(() => {
    console.log("isloading : ", isLoading);
    console.log("aT : ", JSON.stringify(auth?.accessToken));
  }, [isLoading, auth]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
}

export default PersistUser;
