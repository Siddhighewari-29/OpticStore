import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Wishlist.css';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="container section-tight">
        <div className="empty-state">
          <div className="empty-icon">💙</div>
          <h3>Your wishlist is empty</h3>
          <p>Save the frames you love here so you can find them again later.</p>
          <Link to="/" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-tight">
      <h1 className="section-title" style={{ marginBottom: 28 }}>
        My Wishlist ({wishlist.length})
      </h1>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div className="wishlist-card" key={item.id}>
            <Link to={`/product/${item.id}`} className="wishlist-media">
              <img src={item.image} alt={item.name} />
            </Link>
            <div className="wishlist-body">
              <span className="cart-item-category">{item.category}</span>
              <Link to={`/product/${item.id}`}>
                <h3>{item.name}</h3>
              </Link>
              <span className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</span>

              <div className="wishlist-actions">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => addToCart(item, 1)}>
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
