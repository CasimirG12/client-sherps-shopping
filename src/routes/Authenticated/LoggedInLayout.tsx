import NavBar from "../../components/NavBar";
import { Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../../context/authContext";
import { useEffect } from "react";

const LoggedInLayout = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="w-screen h-screen bg-gradient-to-tr from-slate-500 to-slate-800">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default LoggedInLayout;
