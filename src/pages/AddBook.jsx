import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBook } from "../store/index";
import { CATEGORIES } from "../data/books";
import "./AddBook.css";

const validate = (fields) => {
  const errors = {};

  if (!fields.title.trim()) errors.title = "Book title is required.";
  if (!fields.author.trim()) errors.author = "Author name is required.";
  if (!fields.category) errors.category = "Please select a category.";

  if (!fields.description.trim()) {
    errors.description = "Please provide a short description.";
  } else if (fields.description.trim().length < 20) {
    errors.description = "Description must be at least 20 characters.";
  }

  const rating = parseFloat(fields.rating);
  if (!fields.rating) {
    errors.rating = "Rating is required.";
  } else if (isNaN(rating) || rating < 0 || rating > 5) {
    errors.rating = "Rating 0 and 5.";
  }

  if (fields.year) {
    const yr = parseInt(fields.year, 10);
    if (isNaN(yr) || yr < 1000 || yr > new Date().getFullYear()) {
      errors.year = `Year must be between 1000 and ${new Date().getFullYear()}.`;
    }
  }

  if (fields.pages) {
    const pg = parseInt(fields.pages, 10);
    if (isNaN(pg) || pg < 1) errors.pages = "Pages must be a positive number.";
  }

  return errors;
};

const INITIAL_STATE = {
  title: "",
  author: "",
  category: "",
  description: "",
  rating: "",
  year: "",
  pages: "",
};

const AddBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fields, setFields] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(addBook({
      title: fields.title.trim(),
      author: fields.author.trim(),
      category: fields.category,
      description: fields.description.trim(),
      rating: parseFloat(parseFloat(fields.rating).toFixed(1)),
      year: fields.year ? parseInt(fields.year, 10) : null,
      pages: fields.pages ? parseInt(fields.pages, 10) : null,
    }));

    setSubmitted(true);
    setTimeout(() => navigate("/books"), 1200);
  };

  return (
    <div className="page-wrapper">
      <div className="container add-book-container">
        <div className="add-book-header">
          <h1>Add a New Book</h1>
          <p className="add-book-subtitle">fill in the details below.</p>
        </div>

        {submitted && (
          <div className="success-banner" role="alert">
            Book added successfully
          </div>
        )}

        <form className="add-book-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Book Title *</label>
            <input
              id="title" name="title" type="text"
              className={`form-input ${errors.title ? "error" : ""}`}
              placeholder="Enter Title"
              value={fields.title} onChange={handleChange}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="author">Author *</label>
            <input
              id="author" name="author" type="text"
              className={`form-input ${errors.author ? "error" : ""}`}
              placeholder="Enter AUthor"
              value={fields.author} onChange={handleChange}
            />
            {errors.author && <span className="form-error">{errors.author}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category">Category *</label>
            <select
              id="category" name="category"
              className={`form-select ${errors.category ? "error" : ""}`}
              value={fields.category} onChange={handleChange}
            >
              <option value="">-- Select a category --</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="form-error">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Description *</label>
            <textarea
              id="description" name="description"
              className={`form-textarea ${errors.description ? "error" : ""}`}
              placeholder="Description"
              value={fields.description} onChange={handleChange} rows={4}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label" htmlFor="rating">Rating (0–5) *</label>
              <input
                id="rating" name="rating" type="number" min="0" max="5" step="0.1"
                className={`form-input ${errors.rating ? "error" : ""}`}
                placeholder="e.g. 4.5"
                value={fields.rating} onChange={handleChange}
              />
              {errors.rating && <span className="form-error">{errors.rating}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="year">Year Published</label>
              <input
                id="year" name="year" type="number"
                min="1000" max={new Date().getFullYear()}
                className={`form-input ${errors.year ? "error" : ""}`}
                placeholder={`e.g. ${new Date().getFullYear()}`}
                value={fields.year} onChange={handleChange}
              />
              {errors.year && <span className="form-error">{errors.year}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="pages">Pages</label>
              <input
                id="pages" name="pages" type="number" min="1"
                className={`form-input ${errors.pages ? "error" : ""}`}
                placeholder="e.g. 320"
                value={fields.pages} onChange={handleChange}
              />
              {errors.pages && <span className="form-error">{errors.pages}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={submitted}>
              {submitted ? "Adding…" : "Add Book to Library"}
            </button>
            <button
              type="button" className="btn btn-outline" disabled={submitted}
              onClick={() => { setFields(INITIAL_STATE); setErrors({}); }}
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
