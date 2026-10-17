import { useState } from "react";
import { posts } from "../../data/news";
import "./news.css";

// Built once from the data, so a new category adds a chip automatically
const categories = ["All", ...new Set(posts.map((post) => post.category))];

export default function NewsPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  // Derived from the two pieces of state, so the filters always work together
  const visible = posts.filter((post) => {
    const matchesCategory = category === "All" || post.category === category;
    const text = `${post.title} ${post.summary}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase());
  });

  return (
    <section className="section">
      <h1 className="h-page">News and updates</h1>
      <p className="text-muted news__intro">
        Product updates, seller stories and tips for growing online.
      </p>

      <div className="news__controls">
        <div className="news__chips" role="group" aria-label="Filter by category">
          {categories.map((name) => (
            <button
              type="button"
              key={name}
              aria-pressed={name === category}
              className={`chip${name === category ? " chip--active" : ""}`}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="news__search">
          <label className="label visually-hidden" htmlFor="news-search">
            Search posts
          </label>
          <input
            id="news-search"
            className="input"
            type="search"
            placeholder="Search posts"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {visible.length} {visible.length === 1 ? "post" : "posts"} shown
      </p>

      <div className="grid grid--3">
        {visible.map((post) => (
          <article className="card" key={post.id}>
            <div className="placeholder news__image" aria-hidden="true" />
            <p className="news__category">{post.category}</p>
            <h2 className="news__title">{post.title}</h2>
            <p className="text-muted">{post.summary}</p>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-muted">
          No posts match. Try another category or clear the search.
        </p>
      )}
    </section>
  );
}