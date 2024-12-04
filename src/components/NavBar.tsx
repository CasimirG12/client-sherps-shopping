import { Link, NavLink } from "react-router";
import { useAuthContext } from "../context/authContext";

const NavBar = () => {
  const { logout } = useAuthContext();

  return (
    <nav className="w-full flex flex-row items-center justify-between bg-gradient-to-r from-slate-800 to-slate-900 shadow-sm py-2 text-white shadow-slate-600">
      <div className="flex flex-row items-center gap-2 mx-2">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "text-yellow-300 font-bold" : "text-white"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/shopping-lists"
          className={({ isActive }) =>
            isActive ? "text-yellow-300 font-bold" : "text-white"
          }
        >
          Shopping Lists
        </NavLink>
        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            isActive ? "text-yellow-300 font-bold" : "text-white"
          }
        >
          Recipes
        </NavLink>
      </div>
      <Link to="/login" onClick={() => logout()}>
        Log Out
      </Link>
    </nav>
  );
};

export default NavBar;
