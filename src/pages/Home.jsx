import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/books";
import BookCard from "../components/BookCard";
import "./Home.css";

const CATEGORY_ICONS = {

};

const Home = () => {
  const allBooks = useSelector((state) => state.books.list);
  const popularBooks = allBooks.filter((b) => b.popular);

  return (
    <div className="page-wrapper">
      <section className="hero">
        <div className="hero-content container">
          <p className="hero-eyebrow">Welcome to</p>
          <h1 className="hero-title">Your Digital Library</h1>
          <p className="hero-subtitle">
            Explore thousands of books across every genre. Discover your next
            great read, track your favourites, and add your own finds.
          </p>
          <div className="hero-cta">
            <Link to="/books" className="btn btn-primary">Browse Collection</Link>
            <Link to="/add-book" className="btn btn-outline">+ Add a Book</Link>
          </div>
        </div>
        <div className="hero-decoration" aria-hidden="true">
          <div className="deco-book deco-book-1">📚</div>
          <div className="deco-book deco-book-2">📕</div>
          <div className="deco-book deco-book-3">📗</div>
        </div>
      </section>

      <div className="container">
        <section className="categories-section">
          <h2 className="section-title">Browse by Category</h2>
          <ul className="categories-grid stagger-children">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link to={`/books/${cat}`} className="category-card">
                  <span className="category-icon">{CATEGORY_ICONS[cat] || "📚"}</span>
                  <span className="category-name">{cat}</span>
                  <span className="category-count">
                    {allBooks.filter((b) => b.category === cat).length} books
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="popular-section">
          <h2 className="section-title">Popular Reads</h2>
          {popularBooks.length === 0 ? (
            <p className="empty-msg">No popular books to display yet.</p>
          ) : (
            <div className="books-grid stagger-children">
              {popularBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
          <div className="see-all-row">
            <Link to="/books" className="btn btn-outline">See All Books →</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
