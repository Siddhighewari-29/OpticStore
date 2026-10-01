import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <svg width="30" height="18" viewBox="0 0 30 18" fill="none">
              <circle cx="8" cy="9" r="7.5" stroke="currentColor" strokeWidth="2" />
              <circle cx="22" cy="9" r="7.5" stroke="currentColor" strokeWidth="2" />
              <line x1="15.5" y1="9" x2="14.5" y2="9" stroke="currentColor" strokeWidth="2" />
            </svg>
            Optic<em>Store</em>
          </Link>
          <p>
            Premium eyewear for every face and every day. Frames, sunglasses and lenses
            engineered for clarity, comfort and style.
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H8v4h2v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M21 5.3c-.7.4-1.6.7-2.4.8a4 4 0 0 0 1.8-2.3c-.8.5-1.7.8-2.7 1a4.2 4.2 0 0 0-7.2 3.9A12 12 0 0 1 2.4 4.2a4.3 4.3 0 0 0 1.3 5.7c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.8.1a4.2 4.2 0 0 0 3.9 3A8.4 8.4 0 0 1 1 18.6 11.9 11.9 0 0 0 7.3 20.5c7.5 0 11.7-6.5 11.7-12.1v-.6c.8-.6 1.5-1.3 2-2.1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M9.5 18c1-3.2 1.5-5.2 2-7.4.4-1.7 2.8-1.7 3.1-.1.2 1-.3 2.3-.9 3.7-.5 1.2.3 2.3 1.6 2.3 1.9 0 3.2-2.4 3.2-4.7 0-2-1.6-3.8-4.3-3.8-3.2 0-5.2 2.2-5.2 4.7 0 .8.3 1.4.7 1.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Categories</h4>
          <ul>
            {categories.map((cat) => (
              <li key={cat}>
                <Link to={`/category/${encodeURIComponent(cat)}`}>{cat}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Support</h4>
          <ul>
            <li><Link to="/contact">Help Center</Link></li>
            <li><Link to="/contact">Shipping &amp; Returns</Link></li>
            <li><Link to="/contact">Track Order</Link></li>
            <li><Link to="/contact">FAQs</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li>support@opticstore.com</li>
            <li>+91 98765 43210</li>
            <li>221 Lens Avenue, Pune, MH 411001</li>
            <li>Mon–Sat, 9:00 AM – 7:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} OpticStore. All rights reserved.</span>
          <span className="footer-credit">Designed &amp; built as a portfolio project.</span>
        </div>
      </div>
    </footer>
  );
}
