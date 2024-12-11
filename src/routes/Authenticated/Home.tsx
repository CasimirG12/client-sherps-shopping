import React from "react";
import { useAuthContext } from "../../context/authContext";

const Home: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <div>Hello, {user?.username}! Welcome Back!</div>
    </div>
  );
};

export default Home;
