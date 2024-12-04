import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../context/authContext";

const Root: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("firing root");
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return <Outlet />;
};

export default Root;
