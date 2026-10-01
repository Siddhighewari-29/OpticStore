import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Cart.css';

const DELIVERY_CHARGE = 149;
const FREE_DELIVERY_THRESHOLD = 2000;

export default function Cart() {
  const { cart, updateCartQty, removeFromCart, clearCart, cartSubtotal } = useApp();
  const navigate = useNavigate();

  const delivery = cart.length === 0 || cartSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const total = cartSubtotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="container section-tight">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any eyewear yet. Let's find your perfect pair.</p>
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-tight">
      <div className="page-title-row">
        <h1 className="section-title">Shopping Cart</h1>
        <button type="button" className="btn btn-danger btn-sm" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <Link to={`/product/${item.id}`} className="cart-item-media">
                <img src={item.image} alt={item.name} />
              </Link>

              <div className="cart-item-info">
                <Link to={`/product/${item.id}`}>
                  <h3>{item.name}</h3>
                </Link>
                <span className="cart-item-category">{item.category}</span>
                <span className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</span>
              </div>

              <div className="cart-item-qty">
                <div className="qty-stepper">
                  <button type="button" onClick={() => updateCartQty(item.id, item.qty - 1)} aria-label="Decrease quantity">−</button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => updateCartQty(item.id, item.qty + 1)} aria-label="Increase quantity">+</button>
                </div>
              </div>

              <div className="cart-item-total">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>

              <button
                type="button"
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0l-.8 12.1a2 2 0 01-2 1.9H8.8a2 2 0 01-2-1.9L6 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          ))}

          <Link to="/" className="continue-link">← Continue Shopping</Link>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
          </div>
          {delivery > 0 && (
            <p className="free-delivery-hint">
              Add ₹{(FREE_DELIVERY_THRESHOLD - cartSubtotal).toLocaleString('en-IN')} more for free delivery.
            </p>
          )}
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <button type="button" className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
