import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductList from '../components/ProductList';
import './ListingPage.css';

export default function SearchResults() {
  const { products, productsLoading, searchTerm, setSearchTerm } = useApp();
  const [localTerm, setLocalTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalTerm(searchTerm);
  }, [searchTerm]);

  const results = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchTerm(localTerm.trim());
  }

  return (
    <div className="listing-page">
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <span>Search</span>
          </div>
          <h1>Search Products</h1>
          <p>Search by product name, category, or brand.</p>

          <form className="search-page-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. aviator, sunglasses, Lenscraft..."
              value={localTerm}
              onChange={(e) => setLocalTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </div>

      <div className="section-tight">
        <div className="container">
          {productsLoading ? (
            <div className="loading-wrap">
              <div className="spinner" />
              <span>Loading products…</span>
            </div>
          ) : !searchTerm.trim() ? (
            <div className="empty-state">
              <div className="empty-icon">🔎</div>
              <h3>Start typing to search</h3>
              <p>Search our full eyewear catalog by name, category or brand.</p>
            </div>
          ) : (
            <>
              <p className="results-count">
                {results.length} result{results.length !== 1 ? 's' : ''} for “{searchTerm}”
              </p>
              <ProductList products={results} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
