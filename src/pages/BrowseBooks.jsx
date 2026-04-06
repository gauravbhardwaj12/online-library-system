
import { useParams, Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/books";
import BookCard from "../components/BookCard";
import { useState, useMemo } from "react";
import "./BrowseBooks.css";

const BrowseBooks = () => {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const allBooks = useSelector((state) => state.books.list);

  const filteredBooks = useMemo(() => {
    let result = allBooks;

    if (category) {
      result = result.filter(
        (b) => b.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allBooks, category, searchQuery]);

  return (
    <div className="page-wrapper">
      <div className="container browse-layout">
        <aside className="browse-sidebar">
          <h3 className="sidebar-title">Categories</h3>
          <nav className="category-nav">
            <NavLink
              to="/books"
              end
              className={({ isActive }) =>
                "cat-link" + (isActive && !category ? " cat-link-active" : "")
              }
            >
              All Books
              <span className="cat-count">{allBooks.length}</span>
            </NavLink>

            {CATEGORIES.map((cat) => (
              <NavLink
                key={cat}
                to={`/books/${cat}`}
                className={({ isActive }) =>
                  "cat-link" + (isActive ? " cat-link-active" : "")
                }
              >
                {cat}
                <span className="cat-count">
                  {allBooks.filter((b) => b.category === cat).length}
                </span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="browse-main">
          <div className="browse-header">
            <div>
              <h1 className="browse-title">{category ? category : "All Books"}</h1>
              <p className="browse-subtitle">
                {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="search-bar-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search by title or author…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search books"
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="no-results">
              <p className="no-results-icon">🔎</p>
              <h3>No books found</h3>
              <p>browse a different category.</p>
              <Link to="/books" className="btn btn-primary" style={{ marginTop: "16px" }}>
                Show All Books
              </Link>
            </div>
          ) : (
            <div className="books-grid stagger-children">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BrowseBooks;
