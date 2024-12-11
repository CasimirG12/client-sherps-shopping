import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../context/authContext";

const Root: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Navigate based on the user's authentication status
  useEffect(() => {
    if (user) {
      navigate("/home"); // Redirect authenticated users to home
    } else if (user === null) {
      navigate("/login"); // Redirect unauthenticated users to login
    }
  }, [user, navigate]); // Only re-run if `user` or `navigate` changes

  return <Outlet />;
};

export default Root;
