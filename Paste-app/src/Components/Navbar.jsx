import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <div className={`flex justify-between px-4 lg:px-6 py-4 items-center ${theme === "light" ? "bg-[#F8E1B7]" : "bg-[#121212]"}`}>
      <div className="text-2xl font-bold lg:text-3xl">
        <NavLink to="/" className="hover:text-yellow-700">Paste App</NavLink>
      </div>
      <div className="flex gap-2 lg:gap-60">
        <NavLink to="/" className="text-lg font-medium hover:text-yellow-700">Home</NavLink>
        <NavLink to="/pastes" className="text-lg font-medium hover:text-yellow-700">Pastes</NavLink>
      </div>
      <button 
        onClick={() => dispatch(toggleTheme())} 
        className="p-2 rounded-full border transition-all"
      >
        {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
      </button>
    </div>
  );
};

export default Navbar;

