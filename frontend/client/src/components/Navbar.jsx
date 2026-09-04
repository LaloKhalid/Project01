import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/applications">Applications</NavLink>
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/auth">Auth</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
