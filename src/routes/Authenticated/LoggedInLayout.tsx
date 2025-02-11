import NavBar from "../../components/NavBar";
import { Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../../context/authContext";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";

const LoggedInLayout = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { fetchPopIngredients } = useGlobalContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchPopIngredients();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-slate-500 to-slate-800">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default LoggedInLayout;
