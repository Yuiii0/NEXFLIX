import { useNavigate } from "react-router-dom";

import React, { createContext, useContext, useState } from "react";

type AuthContextValue = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

const initialValue: AuthContextValue = {
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const logIn = () => {
    setIsLoggedIn(true);
    navigate("/main");
  };
  const logOut = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const value: AuthContextValue = {
    isLoggedIn,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
