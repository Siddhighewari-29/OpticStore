import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { categories } from '../data/products';
import './Navbar.css';

export default function Navbar() {
  const {
    cartCount,
    wishlistCount,
    user,
    logout,
    setSearchTerm,
  } = useApp();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [query, setQuery] = useState('');

  const catRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();

    setSearchTerm(query.trim());
    navigate('/search');
    setMobileOpen(false);
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        {/* BRAND */}
        <Link
          to="/"
          className="brand"
          onClick={() => setMobileOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            <svg
              width="30"
              height="18"
              viewBox="0 0 30 18"
              fill="none"
            >
              <circle
                cx="8"
                cy="9"
                r="7.5"
                stroke="currentColor"
                strokeWidth="2"
              />

              <circle
                cx="22"
                cy="9"
                r="7.5"
                stroke="currentColor"
                strokeWidth="2"
              />

              <line
                x1="15.5"
                y1="9"
                x2="14.5"
                y2="9"
                stroke="currentColor"
                strokeWidth="2"
              />

              <line
                x1="0.5"
                y1="6"
                x2="0.5"
                y2="4"
                stroke="currentColor"
                strokeWidth="2"
              />

              <line
                x1="29.5"
                y1="6"
                x2="29.5"
                y2="4"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>

          <span className="brand-word">
            Optic<em>Store</em>
          </span>
        </Link>


        {/* DESKTOP SEARCH */}
        <form
          className="navbar-search"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            placeholder="Search glasses, brands, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />

          <button
            type="submit"
            aria-label="Search"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />

              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </form>


        {/* NAVIGATION */}
        <nav
          className={`navbar-links ${
            mobileOpen ? 'is-open' : ''
          }`}
        >

          {/* HOME */}
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>


          {/* CATEGORIES */}
          <div
            className="nav-dropdown"
            ref={catRef}
          >
            <button
              type="button"
              className="nav-dropdown-toggle"
              onClick={() => setCatOpen((v) => !v)}
              aria-expanded={catOpen}
            >
              Categories

              <svg
                width="11"
                height="7"
                viewBox="0 0 12 8"
                fill="none"
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div
              className={`nav-dropdown-menu ${
                catOpen ? 'is-visible' : ''
              }`}
            >
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${encodeURIComponent(cat)}`}
                  onClick={() => {
                    setCatOpen(false);
                    setMobileOpen(false);
                  }}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>


          {/* OTHER LINKS */}
          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>


          {/* MOBILE SEARCH */}
          <form
            className="navbar-search navbar-search-mobile"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />

            <button
              type="submit"
              aria-label="Search"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </form>


          {/* MOBILE USER ACTIONS */}
          <div className="navbar-mobile-actions">

            <span className="navbar-user-mobile">
              Hi, {user?.name || 'Guest'}
            </span>

            {/* MOBILE PROFILE ICON */}
            {user && (
              <Link
                to="/profile"
                className="profile-icon"
                title="Profile"
                aria-label="Profile"
                onClick={() => setMobileOpen(false)}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M4.5 21c.8-4.1 3.3-6 7.5-6s6.7 1.9 7.5 6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            )}

            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </nav>


        {/* RIGHT SIDE ICONS */}
        <div className="navbar-icons">

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="icon-btn"
            aria-label="Wishlist"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 21s-7.5-4.6-10-9.1C0.3 8.4 2 4.5 5.7 4c2-.3 3.7.6 4.9 2.3.3.4.9.4 1.2 0C13 4.6 14.7 3.7 16.7 4c3.7.5 5.4 4.4 3.7 7.9C19.5 16.4 12 21 12 21z"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>

            {wishlistCount > 0 && (
              <span className="icon-badge">
                {wishlistCount}
              </span>
            )}
          </Link>


          {/* CART */}
          <Link
            to="/cart"
            className="icon-btn"
            aria-label="Cart"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="10"
                cy="21"
                r="1.4"
                fill="currentColor"
              />

              <circle
                cx="18"
                cy="21"
                r="1.4"
                fill="currentColor"
              />
            </svg>

            {cartCount > 0 && (
              <span className="icon-badge">
                {cartCount}
              </span>
            )}
          </Link>


          {/* DESKTOP USER */}
          <div className="navbar-user desktop-only">

            <span>
              Hi, {user?.name || 'Guest'}
            </span>

            {/* DESKTOP PROFILE ICON */}
            {user && (
              <Link
                to="/profile"
                className="profile-icon"
                title="Profile"
                aria-label="Profile"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M4.5 21c.8-4.1 3.3-6 7.5-6s6.7 1.9 7.5 6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            )}

            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>


          {/* HAMBURGER */}
          <button
            type="button"
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </div>
    </header>
  );
}