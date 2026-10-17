import { Link } from "react-router-dom";
import "./marketing.css";

export default function Footer() {
  return (
    <footer className="footer section--dark">
      <span className="footer__brand">Shopke</span>
      <nav className="footer__links" aria-label="Footer">
        <Link to="/about">About</Link>
        <Link to="/news">News</Link>
        <Link to="/contact">Contact</Link>
        <span>Terms</span>
        <span>Privacy</span>
      </nav>
    </footer>
  );
}