import { Link, useLocation } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <p className="notfound-code">404</p>
        <h1 className="notfound-title">Page Not Found</h1>
       
        <code className="notfound-path">{location.pathname}</code>
        <p className="notfound-message">
          Url not exist
        </p>
        <Link to="/" className="btn btn-primary notfound-btn">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
