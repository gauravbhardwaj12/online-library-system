import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          
          <span className="brand-name">Library System</span>
        </NavLink>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/books" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Browse Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-book" className={({ isActive }) => isActive ? "nav-link active cta" : "nav-link cta"}>
              + Add Book
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
