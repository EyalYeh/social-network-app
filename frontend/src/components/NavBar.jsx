import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [photo1x, setPhoto1x] = useState(null);
  const [photo2x, setPhoto2x] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePhoto");
    localStorage.removeItem("profilePhoto2x");
    navigate("/"); 
  };

  useEffect(() => {
    let p1 = localStorage.getItem("profilePhoto") || "";
    let p2 = localStorage.getItem("profilePhoto2x") || "";

    if (p1 && !p1.startsWith("http")) p1 = `http://localhost:5000${p1}`;
    if (p2 && !p2.startsWith("http")) p2 = `http://localhost:5000${p2}`;

    setPhoto1x(p1 || null);
    setPhoto2x(p2 || p1 || null);
  }, [pathname]);

  const isOpeningPage = pathname === "/";

  return (
    <header className="nav">
      <div className="nav__inner">
        {/* Brand */}
        <button className="nav__brand">
          {photo1x ? (
            <img
              src={photo1x || "/default-avatar.png"}
              srcSet={photo2x ? `${photo2x} 2x` : undefined}
              alt="Profile"
              className="nav__profile-img"
              onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
            />
          ) : (
            <span className="nav__logo" aria-hidden>◆</span>
          )}
          <span className="nav__brand-text">
            Social<span className="accent">Travel</span><span>Net</span>
          </span>
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
        <nav
          className={`nav__links ${open ? "is-open" : ""}`}
          onClick={() => setOpen(false)}
        >
          {isOpeningPage ? (
            <>
              <NavLink to="/about" className="nav__link">About</NavLink>
              <NavLink to="/team" className="nav__link">Team</NavLink>
              <NavLink to="/contact" className="nav__link">Contact Us</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/home" className="nav__link">Home</NavLink>
              <NavLink to="/recents" className="nav__link">Recents</NavLink>
              <NavLink to="/favorites" className="nav__link">Favorites</NavLink>
              <NavLink to="/chats" className="nav__link">Chats</NavLink>
              <NavLink to="/profile" className="nav__link">Profile</NavLink>
              <button className="nav__logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
