import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';
import './Home.css';

const WHY_CHOOSE = [
  {
    title: 'Premium Quality',
    desc: 'Every frame is inspected for finish, fit and durability before it ships.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16l-5.4 2.9 1-6.1L3.2 8.5l6.1-.9L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
    ),
  },
  {
    title: 'Affordable Prices',
    desc: 'Direct-to-you pricing keeps premium eyewear within everyday reach.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M9.5 9.5c0-1.4 1.1-2.3 2.5-2.3s2.5.7 2.5 1.9c0 2.4-5 1.7-5 4.2 0 1.2 1.1 1.9 2.5 1.9s2.5-.9 2.5-2.3M12 6v1.4M12 16.6V18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
    ),
  },
  {
    title: 'Fast Delivery',
    desc: 'Most orders leave our warehouse within 24 hours and arrive in days.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 7h11v9H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M14 10h4l3 3v3h-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.4" /><circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.4" /></svg>
    ),
  },
  {
    title: 'Secure Payments',
    desc: 'Checkout is encrypted end-to-end with support for every major method.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
  {
    title: 'Easy Returns',
    desc: '30-day hassle-free returns and exchanges, no questions asked.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 1 1 2.6 5.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M4 8v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
];

const CATEGORY_META = {
  "Men's Eyewear": { emoji: '🕶️', blurb: 'Sharp, structured frames built for everyday confidence.' },
  "Women's Eyewear": { emoji: '👓', blurb: 'Elegant silhouettes from cat-eye classics to soft minimalism.' },
  'Kids Eyewear': { emoji: '🧒', blurb: 'Flexible, durable frames designed for active young faces.' },
  'Sunglasses': { emoji: '🌤️', blurb: 'UV-protected shades for sun, sport and everything between.' },
};

export default function Home() {
  const { products, productsLoading } = useApp();

  const featured = products.filter((p) => p.rating >= 4.6).slice(0, 8);

  function byCategory(cat, count = 4) {
    return products.filter((p) => p.category === cat).slice(0, count);
  }

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="pill-tag">New Season Collection</span>
            <h1>See Better. Look Better.</h1>
            <p>
              Discover frames engineered for clarity and cut for confidence — from
              everyday essentials to statement sunglasses, for every member of the family.
            </p>
            <div className="hero-actions">
              <Link to="/category/Sunglasses" className="btn btn-primary">Shop Now</Link>
              <Link to="/about" className="btn btn-outline">Our Story</Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>24+</strong>
                <span>Curated Styles</span>
              </div>
              <div>
                <strong>4.6★</strong>
                <span>Average Rating</span>
              </div>
              <div>
                <strong>30-Day</strong>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-glow" />
            <svg width="360" height="220" viewBox="0 0 360 220" fill="none">
              <circle cx="120" cy="110" r="92" stroke="#22d3ee" strokeWidth="4" opacity="0.95" />
              <circle cx="250" cy="110" r="92" stroke="#22d3ee" strokeWidth="4" opacity="0.95" />
              <line x1="200" y1="110" x2="188" y2="110" stroke="#22d3ee" strokeWidth="4" />
              <line x1="18" y1="60" x2="18" y2="24" stroke="#22d3ee" strokeWidth="4" />
              <line x1="352" y1="60" x2="352" y2="24" stroke="#22d3ee" strokeWidth="4" />
            </svg>
          </div>
        </div>
      </section>

      {/* ---------------- Popular Categories ---------------- */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">Popular Categories</h2>
              <p className="section-sub">Find the right fit, whoever you're shopping for.</p>
            </div>
          </div>

          <div className="category-grid">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${encodeURIComponent(cat)}`}
                className="category-card"
              >
                <span className="category-emoji">{CATEGORY_META[cat]?.emoji}</span>
                <h3>{cat}</h3>
                <p>{CATEGORY_META[cat]?.blurb}</p>
                <span className="category-link">
                  Shop collection
                  <svg width="14" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5h13M9 1l5 4-5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Featured Products ---------------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-sub">Our highest-rated frames, picked by customers like you.</p>
            </div>
            <Link to="/category/Sunglasses" className="btn btn-outline-light btn-sm">View All</Link>
          </div>

          {productsLoading ? (
            <div className="loading-wrap">
              <div className="spinner" />
              <span>Loading products…</span>
            </div>
          ) : (
            <div className="product-grid">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------------- Per-category sections ---------------- */}
      {!productsLoading &&
        categories.map((cat, idx) => (
          <section className={`section ${idx % 2 === 1 ? 'section-alt' : ''}`} key={cat}>
            <div className="container">
              <div className="section-head">
                <div>
                  <h2 className="section-title">{cat}</h2>
                  <p className="section-sub">{CATEGORY_META[cat]?.blurb}</p>
                </div>
                <Link to={`/category/${encodeURIComponent(cat)}`} className="btn btn-outline-light btn-sm">
                  View All
                </Link>
              </div>
              <div className="product-grid">
                {byCategory(cat).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        ))}

      {/* ---------------- Why Choose OpticStore ---------------- */}
      <section className="section why-choose">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title" style={{ color: 'var(--white)' }}>Why Choose OpticStore</h2>
              <p className="section-sub" style={{ color: 'var(--muted-on-navy)' }}>
                Built around clarity, comfort and honest pricing.
              </p>
            </div>
          </div>

          <div className="why-grid">
            {WHY_CHOOSE.map((item) => (
              <div className="why-card" key={item.title}>
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
