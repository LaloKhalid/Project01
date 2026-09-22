import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {

      const navigate = useNavigate();

      const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");    
      }
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/applications">Applications</NavLink>
        <button onClick={handleLogout} className="navbar-logout-btn">
          Logout
        </button>
        <NavLink to="/auth">Auth</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
