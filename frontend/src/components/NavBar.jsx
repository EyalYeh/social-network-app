import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ onLogout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header className="nav">
      <div className="nav__inner">
        {/* Brand */}
        <button className="nav__brand" onClick={() => navigate("/home")}>
          <span className="nav__logo" aria-hidden>◆</span>
          <span className="nav__brand-text">Social<span className="accent">Net</span></span>
        </button>

        {/* Hamburger */}
        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Links */}
        <nav className={`nav__links ${open ? "is-open" : ""}`} onClick={() => setOpen(false)}>
          <NavLink to="/home" className="nav__link">Home</NavLink>
          <NavLink to="/recents" className="nav__link">Recents</NavLink>
          <NavLink to="/favorites" className="nav__link">Favorites</NavLink>
          <NavLink to="/chat" className="nav__link">Chat</NavLink>
          <NavLink to="/profile" className="nav__link">Profile</NavLink>
          <button className="nav__logout" onClick={handleLogout}>Logout</button>
        </nav>
      </div>
    </header>
  );
}