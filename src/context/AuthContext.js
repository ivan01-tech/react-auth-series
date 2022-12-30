import React, { createContext, useContext, useState } from "react";

export const AuthContextApi = createContext({});

export const useAuthCpntext = () => {
  return useContext(AuthContextApi);
};

function AuthContext({ children }) {
  const [data, setData] = useState({});

  return (
    <AuthContextApi.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </AuthContextApi.Provider>
  );
}


export default AuthContext;
