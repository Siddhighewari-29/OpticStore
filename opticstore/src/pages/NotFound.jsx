import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container section">
      <div className="empty-state">
        <div className="empty-icon">🕶️</div>
        <h3>404 — Page Not Found</h3>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
}
