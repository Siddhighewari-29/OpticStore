import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { categories } from '../data/products';
import './ProductList.css';

export default function ProductList({ products, showCategoryFilter = false, title }) {
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filtered = useMemo(() => {
    let list = [...products];

    if (showCategoryFilter && category !== 'All') {
      list = list.filter((p) => p.category === category);
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return list;
  }, [products, category, sortBy, showCategoryFilter]);

  return (
    <div className="product-list-wrap">
      <div className="product-list-toolbar">
        {title && <h2 className="product-list-title">{title}</h2>}

        <div className="product-list-controls">
          {showCategoryFilter && (
            <select
              className="form-control filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}

          <select
            className="form-control filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try a different category or clear your filters to see more eyewear.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
