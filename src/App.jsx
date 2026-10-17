import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import "./App.css";
import NewsPage from "./pages/news/NewsPage";

/* ==========================================================================
   Shopke routes
   This file only wires pages to paths. It holds no page design or logic.

   How to use it:
   1. Every page starts as a <Soon /> placeholder so the app always runs.
   2. When your page is ready, import it at the top and swap it into your
      route. Change only your own team's lines to avoid merge conflicts.
      Example for Team A:
        import LandingPage from "./pages/landing/LandingPage";
        <Route path="/" element={<LandingPage />} />
   3. The two layouts below also start as simple pass-throughs. Team B and
      Team D replace them with the real ones.
        import MarketingLayout from "./components/marketing/MarketingLayout";
        import DashboardLayout from "./components/dashboard/DashboardLayout";
   ========================================================================== */

// Temporary stand-ins. Delete each one once the real component is imported.
const MarketingLayout = () => <Outlet />; // Team B
const DashboardLayout = () => <Outlet />; // Team D

function Soon({ name }) {
  const { pathname } = useLocation();
  return (
    <div className="section">
      <div className="card">
        <h2 className="h-section">{name}</h2>
        <p className="text-muted">Coming soon at {pathname}</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="section center">
      <h1 className="h-page">Page not found</h1>
      <p className="text-muted" style={{ margin: "12px 0 24px" }}>
        The page you are looking for does not exist.
      </p>
      <Link className="btn" to="/">
        Back to home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public marketing pages share a navbar and footer (Team B) */}
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<Soon name="Landing page (Team A)" />} />
        <Route path="/about" element={<Soon name="About (Team B)" />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<Soon name="Contact (Team B)" />} />
      </Route>

      {/* Authentication and onboarding use their own full-screen layouts (Team C) */}
      <Route path="/signup" element={<Soon name="Sign up (Team C)" />} />
      <Route path="/signin" element={<Soon name="Sign in (Team C)" />} />
      <Route path="/onboarding" element={<Soon name="Onboarding (Team C)" />} />

      {/* Seller dashboard, all pages sit inside the sidebar layout (Team D) */}
      <Route path="/s/:storeId" element={<DashboardLayout />}>
        <Route index element={<Soon name="Overview (Team D)" />} />
        <Route path="orders" element={<Soon name="Orders (Team D)" />} />
        <Route path="products" element={<Soon name="Products (Team E)" />} />
        <Route path="products/new" element={<Soon name="Add product (Team E)" />} />
        <Route
          path="products/:productId/edit"
          element={<Soon name="Edit product (Team E)" />}
        />
        <Route path="contact-info" element={<Soon name="Contact info (Team E)" />} />
        <Route path="payments" element={<Soon name="Payments (Team F)" />} />
        <Route path="customize" element={<Soon name="Customize store (Team F)" />} />
      </Route>

      {/* Public storefront that shoppers open from a seller's link (Team A) */}
      <Route path="/store/:storeSlug" element={<Soon name="Storefront (Team A)" />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
