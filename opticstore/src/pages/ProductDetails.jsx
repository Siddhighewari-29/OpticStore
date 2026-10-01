import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, productsLoading, addToCart, toggleWishlist, isInWishlist } = useApp();

  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [addedMsg, setAddedMsg] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (product && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
    setQty(1);
    setAddedMsg(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, product]);

  if (productsLoading) {
    return (
      <div className="loading-wrap">
        <div className="spinner" />
        <span>Loading product…</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container section-tight">
        <div className="empty-state">
          <div className="empty-icon">🕶️</div>
          <h3>Product not found</h3>
          <p>The product you're looking for doesn't exist or may have been removed.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const outOfStock = product.stock === 0;
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  function handleAddToCart() {
    if (outOfStock) return;
    addToCart(product, qty);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2200);
  }

  return (
    <div className="product-details-page">
      <div className="container section-tight">
        <div className="breadcrumb">
          <Link to="/">Home</Link> /{' '}
          <Link to={`/category/${encodeURIComponent(product.category)}`}>{product.category}</Link> /{' '}
          <span>{product.name}</span>
        </div>

        <button type="button" className="btn btn-outline-light btn-sm back-btn" onClick={() => navigate(-1)}>
          ← Back to Products
        </button>

        <div className="product-details-grid">
          <div className="product-details-media">
            <img src={product.image} alt={product.name} />
            {outOfStock && <span className="stock-flag">Out of Stock</span>}
          </div>

          <div className="product-details-info">
            <span className="product-card-category">{product.category} · {product.brand}</span>
            <h1>{product.name}</h1>

            <div className="product-card-rating">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />
              </svg>
              <span>{product.rating}</span>
              <span className="review-count">({product.reviews} reviews)</span>
            </div>

            <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>

            <p className="product-description">{product.description}</p>

            <div className="spec-grid">
              <div>
                <span className="spec-label">Frame Material</span>
                <span className="spec-value">{product.frameMaterial}</span>
              </div>
              <div>
                <span className="spec-label">Lens Type</span>
                <span className="spec-value">{product.lensType}</span>
              </div>
              <div>
                <span className="spec-label">Stock Status</span>
                <span className={`spec-value ${outOfStock ? 'text-danger' : 'text-success'}`}>
                  {outOfStock ? 'Out of Stock' : `In Stock (${product.stock} available)`}
                </span>
              </div>
            </div>

            <div className="color-picker">
              <span className="spec-label">Available Colors</span>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-chip ${selectedColor === color ? 'is-active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="qty-row">
              <span className="spec-label">Quantity</span>
              <div className="qty-stepper">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={outOfStock}
              >
                {outOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                type="button"
                className={`btn btn-outline-light ${inWishlist ? 'is-wishlisted' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                {inWishlist ? '♥ In Wishlist' : '♡ Add to Wishlist'}
              </button>
            </div>

            {addedMsg && <p className="added-confirmation">Added {qty} × {product.name} to your cart.</p>}
          </div>
        </div>

        {related.length > 0 && (
          <div className="related-section">
            <h2 className="section-title">You May Also Like</h2>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
