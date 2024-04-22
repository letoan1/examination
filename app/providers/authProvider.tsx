"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from "../utils/helpers/storage";
import { IAuthResponse } from "../interface";
interface AuthContextData {
  isAuthenticated: boolean;
  currentUser: any | null;
  setCurrentUser: (currentUser: any) => void;
  logInSuccess: (data: IAuthResponse) => Promise<void>;
  logOutSuccess: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  currentUser: null,
  setCurrentUser: (currentUser: any) => {},
  logInSuccess: (data: IAuthResponse) => Promise.resolve(),
  logOutSuccess: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      const user = getCookie("currentUser");
      if (user) {
        setCurrentUser(JSON.parse(user));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } else {
      setCookie("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const logInSuccess = async (data: IAuthResponse) => {
    const { access_token, refresh_token } = data;
    setCookie("accessToken", access_token);
    setCookie("refreshToken", refresh_token);
    setIsAuthenticated(true);
    setCurrentUser(data);
  };

  const logOutSuccess = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("currentUser");

    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        setCurrentUser,
        logInSuccess,
        logOutSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
