import { Link } from "react-router-dom";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <span className="stars-display">
      {"★".repeat(fullStars).split("").map((s, i) => (
        <span key={`f-${i}`} className="star-filled">{s}</span>
      ))}
      {hasHalf && <span className="star-filled">½</span>}
      {"☆".repeat(emptyStars).split("").map((s, i) => (
        <span key={`e-${i}`} className="star-empty">{s}</span>
      ))}
    </span>
  );
};

const BookCard = ({ book }) => {
  return (
    <article className="book-card fade-in-up">
      <img
        src={book.cover}
        alt={`Cover of ${book.title}`}
        className="book-card-cover"
        loading="lazy"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop";
        }}
      />
      <div className="book-card-body">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">by {book.author}</p>
        <span className="book-card-category">{book.category}</span>
        <div className="book-card-rating">
          <StarRating rating={book.rating} />
          <span>{book.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="book-card-footer">
        <Link
          to={`/books/${book.category}/${book.id}`}
          className="btn btn-outline"
          style={{ width: "100%", justifyContent: "center", fontSize: "0.82rem" }}
        >
          View Details →
        </Link>
      </div>
    </article>
  );
};

export default BookCard;
