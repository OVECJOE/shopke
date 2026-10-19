import { Link } from "react-router-dom";
import "./LandingPage.css";

const features = [
  {
    title: "Your own storefront",
    description:
      "A clean online shop with your logo, colours and products, live in minutes.",
    icon: "▣",
  },
  {
    title: "Get paid your way",
    description:
      "Bank transfer, card and USSD, with payment details you control.",
    icon: "₦",
  },
  {
    title: "Sell where customers are",
    description:
      "Share your store link on WhatsApp and Instagram and take orders from both.",
    icon: "↗",
  },
];

export default function LandingPage() {
  return (
    <main className="landing-page">
      {/* Temporary page navigation. Coordinate with Team B's shared layout. */}
      <header className="landing-nav">
        <Link className="landing-brand" to="/">
          Shopke
        </Link>

        <nav className="landing-nav-links" aria-label="Main navigation">
          <a href="#features">Features</a>
          <Link to="/about">About</Link>
          <Link to="/news">News</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="landing-nav-actions">
          <Link className="landing-signin" to="/signin">
            Sign in
          </Link>
          <Link className="landing-nav-cta" to="/signup">
            Start free
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1>
            Your shop, online
            <br />
            in minutes.
          </h1>

          <p>
            Shopke helps small and mid-sized Nigerian businesses sell online
            with a storefront of their own.
          </p>

          <div className="landing-actions">
            <Link
              className="landing-button landing-button-primary"
              to="/signup"
            >
              Create your store
            </Link>

            <a
              className="landing-button landing-button-secondary"
              href="#features"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="landing-visual" aria-label="Preview of a Shopke order">
          <div className="landing-order-card">
            <span className="landing-order-dot" />
            <div>
              <strong>New order received</strong>
              <p>Classic Sneakers · ₦25,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features" id="features">
        <div className="landing-feature-grid">
          {features.map((feature) => (
            <article className="landing-feature-card" key={feature.title}>
              <span className="landing-feature-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Signup call to action */}
      <section className="landing-cta">
        <h2>Ready to open your shop?</h2>
        <p>Sign up with Google and set up in three steps.</p>
        <Link className="landing-button landing-button-cta" to="/signup">
          Get started
        </Link>
      </section>

      {/* Temporary footer. Coordinate with Team B's shared layout. */}
      <footer className="landing-footer">
        <Link className="landing-footer-brand" to="/">
          Shopke
        </Link>

        <nav aria-label="Footer navigation">
          <Link to="/about">About</Link>
          <Link to="/news">News</Link>
          <Link to="/contact">Contact</Link>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
        </nav>
      </footer>
    </main>
  );
}
