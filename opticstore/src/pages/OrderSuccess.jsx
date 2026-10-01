import { Link, Navigate, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

export default function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const paymentMethod =
    order.paymentMethod === 'cod'
      ? 'Cash on Delivery'
      : order.paymentMethod === 'upi'
      ? 'UPI'
      : 'Credit / Debit Card';

  const deliveryAddress = [
    order.city,
    order.state,
    order.pincode,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="container section-tight order-success">
      <div className="order-success-card">

        <div className="success-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M8 12.5l2.6 2.6L16 9.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1>Order placed successfully!</h1>

        <p>
          Thank you, {order.fullName || 'valued customer'}.
          <br />
          A confirmation has been sent to{' '}
          <strong>{order.email}</strong>.
        </p>

        <div className="order-id-box">
          <span>Order ID</span>
          <strong>#{order.id}</strong>
        </div>

        <div className="order-summary-mini">

          <div className="summary-row">
            <span>Items</span>
            <span>{order.items?.length || 0}</span>
          </div>

          <div className="summary-row">
            <span>Payment Method</span>
            <span className="capitalize">
              {paymentMethod}
            </span>
          </div>

          <div className="summary-row">
            <span>Delivery Address</span>
            <span>
              {deliveryAddress || 'Address not available'}
            </span>
          </div>

          <div className="summary-row summary-total">
            <span>Total Paid</span>
            <span>
              ₹{Number(order.total || 0).toLocaleString('en-IN')}
            </span>
          </div>

        </div>

        <div className="order-success-actions">
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>

          <Link to="/contact" className="btn btn-outline-light">
            Need Help?
          </Link>
        </div>

      </div>
    </div>
  );
}