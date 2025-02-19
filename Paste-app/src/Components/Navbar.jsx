import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-4"> {/* Light beige background, like Notes App */}
      <div className="flex justify-center gap-20 text-2xl font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-yellow-700 text-white shadow-md hover:bg-yellow-600" // Active state
                : "text-gray-700 hover:bg-yellow-700 hover:text-white"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-yellow-700 text-white shadow-md hover:bg-yellow-600" // Active state
                : "text-gray-700 hover:bg-yellow-700 hover:text-white"
            }`
          }
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
