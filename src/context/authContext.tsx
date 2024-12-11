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
  fetchUser: () => Promise<void>;
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
        credentials: "include",
      });

      if (response.ok) {
        const { user } = await response.json();
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

  const logout = async () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
    try {
      // Send a POST request to the backend logout endpoint
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // Ensure cookies (session ID) are sent with the request
        headers: {
          "Content-Type": "application/json", // Indicate that the body content is JSON
        },
      });

      if (response.ok) {
        // Handle successful logout
        console.log("Logged out successfully");
        setUser(null); // Clear the user state in your frontend application
      } else {
        // Handle failed logout
        console.error("Failed to log out:", response.statusText);
      }
    } catch (error) {
      // Handle errors during the fetch process
      console.error("Error logging out:", error);
    }
  };

  const fetchUser = async (): Promise<void> => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include", // Make sure cookies are included in the request
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Set user data to state
      } else {
        setUser(null); // If not authenticated, reset user state
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null); // Handle error and reset user state
    }
  };

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        authError: errorMessage,
        setAuthError: setErrorMessage,
        fetchUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
