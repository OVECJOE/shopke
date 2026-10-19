import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./StorefrontPage.css";

// Temporary demo data.
// Replace these details with the agreed Team E data source.
const demoStore = {
  slug: "ama-fashion",
  name: "Ama's Boutique",
  tagline: "Everyday style, made special.",
  description:
    "Discover thoughtfully selected fashion pieces for your everyday wardrobe.",
  whatsappNumber: "2348180989639",
  products: [
    {
      id: 1,
      name: "Classic Everyday Bag",
      price: 18500,
      category: "Bags",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 2,
      name: "Minimal Wristwatch",
      price: 25000,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 3,
      name: "Everyday Sneakers",
      price: 32000,
      category: "Shoes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 4,
      name: "Essential Shoulder Bag",
      price: 22000,
      category: "Bags",
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80",
    },
  ],
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

export default function StorefrontPage() {
  const { storeSlug } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Only the demo store is available until real store data is connected.
  const store = storeSlug === demoStore.slug ? demoStore : null;

  useEffect(() => {
    document.title = store
      ? `${store.name} | Shopke`
      : "Store not found | Shopke";

    return () => {
      document.title = "Shopke";
    };
  }, [store]);

  if (!store) {
    return (
      <main className="store-not-found">
        <h1>Store not found</h1>
        <p>We couldn't find this store. Check the link and try again.</p>
        <a href="/">Return to Shopke</a>
      </main>
    );
  }

  const categories = [
    "All",
    ...new Set(store.products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? store.products
      : store.products.filter(
          (product) => product.category === selectedCategory,
        );

  function orderOnWhatsApp(product) {
    const message =
      `Hello ${store.name}, I'm interested in ordering:\n\n` +
      `Product: ${product.name}\n` +
      `Price: ${formatPrice(product.price)}\n\n` +
      "Is this item available?";

    const url =
      `https://wa.me/${store.whatsappNumber}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="storefront">
      <header className="storefront-header">
        <a className="storefront-brand" href="/">
          {store.name}
        </a>

        <button
          className="storefront-order-button storefront-header-order"
          type="button"
          onClick={() => {
            const message = `Hello ${store.name}, I'd like to make an enquiry about your products.`;
            const url = `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank", "noopener,noreferrer");
          }}
        >
          Order on WhatsApp <span aria-hidden="true">↗</span>
        </button>
      </header>

      <section className="storefront-hero">
        <div className="storefront-banner-content">
          <span className="storefront-eyebrow">WELCOME TO OUR STORE</span>
          <h1>{store.name}</h1>
          <h2>{store.tagline}</h2>
          <p>{store.description}</p>
        </div>
      </section>

      <section className="storefront-catalogue">
        <div className="storefront-section-heading">
          <div>
            <span className="storefront-eyebrow">MADE FOR YOU</span>
            <h2>Explore our products</h2>
          </div>
          <span className="storefront-product-count">
            {filteredProducts.length} products
          </span>
        </div>

        <div
          className="storefront-categories"
          aria-label="Filter products by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`storefront-category ${
                selectedCategory === category ? "active" : ""
              }`}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="storefront-product-grid">
          {filteredProducts.map((product) => (
            <article className="storefront-product-card" key={product.id}>
              <div className="storefront-product-image">
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="storefront-product-category">
                  {product.category}
                </span>
              </div>

              <div className="storefront-product-details">
                <h3>{product.name}</h3>
                <p className="storefront-product-price">
                  {formatPrice(product.price)}
                </p>
                <button
                  className="storefront-order-button"
                  type="button"
                  onClick={() => orderOnWhatsApp(product)}
                >
                  Order on WhatsApp <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="storefront-empty">
            No products found in this category.
          </p>
        )}
      </section>

      <footer className="storefront-footer">
        <p className="storefront-footer-details">
          {store.name}
          {store.phone && <> · {store.phone}</>}
          {store.address && <> · {store.address}</>}
        </p>

        <p>Powered by Shopke</p>
      </footer>
    </main>
  );
}
