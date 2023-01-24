import React, { createContext, useContext, useState } from "react";

export const AuthContextApi = createContext({});

export const useAuthCpntext = () => {
  return useContext(AuthContextApi);
};

function AuthContext({ children }) {
  const [data, setData] = useState({});
  const [persist, setpersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)

  return (
    <AuthContextApi.Provider
      value={{
        data,
        setData,
        persist, setpersist
      }}
    >
      {children}
    </AuthContextApi.Provider>
  );
}

export default AuthContext;
