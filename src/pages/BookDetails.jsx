import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./BookDetails.css";

const StarRating = ({ rating }) => {
  return (
    <div className="detail-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? "star-filled" : "star-empty"}>
          ★
        </span>
      ))}
      <span className="rating-number">{rating.toFixed(1)} / 5</span>
    </div>
  );
};

const BookDetails = () => {
  const { id, category } = useParams();
  const navigate = useNavigate();

  const book = useSelector((state) =>
    state.books.list.find((b) => b.id === parseInt(id, 10))
  );

  if (!book) {
    return (
      <div className="page-wrapper">
        <div className="container not-found-state">
          <h2>Book Not Found</h2>
          <p>We couldn't find the book you were looking for.</p>
          <Link to="/books" className="btn btn-primary" style={{ marginTop: "16px" }}>
            ← Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="detail-back-row">
          <button
            className="btn btn-outline back-btn"
            onClick={() => navigate(`/books/${category || book.category}`)}
          >
            ← Back to Browse
          </button>
        </div>

        <article className="detail-card fade-in-up">
          <div className="detail-cover-col">
            <img
              src={book.cover}
              alt={`Cover of ${book.title}`}
              className="detail-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop";
              }}
            />
            <span className="book-card-category" style={{ textAlign: "center", display: "block", marginTop: "12px" }}>
              {book.category}
            </span>
          </div>

          <div className="detail-info-col">
            <h1 className="detail-title">{book.title}</h1>
            <p className="detail-author">by {book.author}</p>

            <StarRating rating={book.rating} />

            <div className="detail-meta">
              {book.year && (
                <div className="meta-item">
                  <span className="meta-label">Published</span>
                  <span className="meta-value">{book.year}</span>
                </div>
              )}
              {book.pages && (
                <div className="meta-item">
                  <span className="meta-label">Pages</span>
                  <span className="meta-value">{book.pages}</span>
                </div>
              )}
              <div className="meta-item">
                <span className="meta-label">Genre</span>
                <span className="meta-value">{book.category}</span>
              </div>
            </div>

            <div className="detail-description">
              <h3 className="desc-heading">About this book</h3>
              <p>{book.description}</p>
            </div>

            <div className="detail-actions">
              <Link to={`/books/${book.category}`} className="btn btn-primary">
                More {book.category} Books
              </Link>
              <button className="btn btn-outline" onClick={() => navigate(-1)}>
                ← Go Back
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BookDetails;
