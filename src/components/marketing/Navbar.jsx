import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./marketing.css";

const links = [
  { to: "/about", label: "About" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={`nav${open ? " nav--open" : ""}`}>
      <Link to="/" className="brand" onClick={close}>
        Shopke
      </Link>

      <button
        type="button"
        className="btn btn--outline btn--small nav__toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="nav-menu"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <nav id="nav-menu" className="nav__links" aria-label="Main">
        <Link to="/" onClick={close}>
          Features
        </Link>
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? "nav__link--active" : "")}
            onClick={close}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav__actions">
        <Link to="/signin" onClick={close}>
          Sign in
        </Link>
        <Link to="/signup" className="btn" onClick={close}>
          Start free
        </Link>
      </div>
    </header>
  );
}