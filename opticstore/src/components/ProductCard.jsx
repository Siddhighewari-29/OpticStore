import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const inWishlist = isInWishlist(product.id);
  const outOfStock = product.stock === 0;

  function handleAddToCart(e) {
    e.preventDefault();
    if (outOfStock) return;
    addToCart(product, 1);
  }

  function handleWishlist(e) {
    e.preventDefault();
    toggleWishlist(product);
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {outOfStock && <span className="stock-flag">Out of Stock</span>}
        <button
          type="button"
          className={`wishlist-toggle ${inWishlist ? 'is-active' : ''}`}
          onClick={handleWishlist}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'}>
            <path
              d="M12 21s-7.5-4.6-10-9.1C0.3 8.4 2 4.5 5.7 4c2-.3 3.7.6 4.9 2.3.3.4.9.4 1.2 0C13 4.6 14.7 3.7 16.7 4c3.7.5 5.4 4.4 3.7 7.9C19.5 16.4 12 21 12 21z"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
        </button>
      </div>

      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-name">{product.name}</h3>

        <div className="product-card-rating">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />
          </svg>
          <span>{product.rating}</span>
          <span className="review-count">({product.reviews})</span>
        </div>

        <div className="product-card-footer">
          <span className="product-card-price">₹{product.price.toLocaleString('en-IN')}</span>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleAddToCart}
            disabled={outOfStock}
          >
            {outOfStock ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
