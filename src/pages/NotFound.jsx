import { Link, useLocation } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <p className="notfound-code">404</p>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-path-label">The page you were looking for:</p>
        <code className="notfound-path">{location.pathname}</code>
        <p className="notfound-message">
          This URL doesn't exist in our library. It may have been moved,
          deleted, or you might have mistyped the address.
        </p>
        <Link to="/" className="btn btn-primary notfound-btn">
          ← Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
