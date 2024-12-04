import { createContext, useContext } from "react";
import { User } from "../types/user";
import React, { useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  authError: string | null;
  setAuthError: React.Dispatch<React.SetStateAction<string | null>>;
}

const authContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user: User = await response.json();
        setUser(user); // Assuming setUser is a context/state setter
        navigate("/home"); // Ensure navigate is properly configured
      } else {
        setErrorMessage("Login failed, please check your credentials."); // Provide user feedback
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error, please try again later.");
    }
  };

  const logout = (): void => {
    setUser(null);
  };

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        authError: errorMessage,
        setAuthError: setErrorMessage,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
