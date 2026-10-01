import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { placeOrder } from '../services/api';
import './Checkout.css';

const DELIVERY_CHARGE = 149;
const FREE_DELIVERY_THRESHOLD = 2000;

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
};

export default function Checkout() {
  const { cart, cartSubtotal, clearCart } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState('cod');
  const [placing, setPlacing] = useState(false);

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const delivery = cartSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const total = cartSubtotal + delivery;

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Full name is required';
    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'Enter a valid email address';
    }
    if (!form.phone.trim()) {
      next.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      next.phone = 'Enter a valid 10-digit phone number';
    }
    if (!form.address.trim()) next.address = 'Address is required';
    if (!form.city.trim()) next.city = 'City is required';
    if (!form.state.trim()) next.state = 'State is required';
    if (!form.pincode.trim()) {
      next.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(form.pincode.trim())) {
      next.pincode = 'Enter a valid 6-digit pincode';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (!validate()) return;

    setPlacing(true);
    try {
      const order = await placeOrder({
        customer: form,
        items: cart,
        subtotal: cartSubtotal,
        delivery,
        total,
        paymentMethod: payment,
      });
      clearCart();
      navigate('/order-success', { state: { order } });
    } catch (err) {
      console.error('Order failed', err);
      setPlacing(false);
    }
  }

  return (
    <div className="container section-tight">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/cart">Cart</Link> / <span>Checkout</span>
      </div>
      <h1 className="section-title" style={{ marginBottom: 28 }}>Checkout</h1>

      <form className="checkout-layout" onSubmit={handlePlaceOrder} noValidate>
        <div className="checkout-form-col">
          <div className="checkout-card">
            <h3>Customer Information</h3>

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                value={form.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="Jordan Smith"
              />
              {errors.fullName && <span className="field-error">{errors.fullName}</span>}
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="98765 43210"
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="House no., street, locality"
              />
              {errors.address && <span className="field-error">{errors.address}</span>}
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  value={form.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="Pune"
                />
                {errors.city && <span className="field-error">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                  value={form.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  placeholder="Maharashtra"
                />
                {errors.state && <span className="field-error">{errors.state}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode"
                className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                value={form.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                placeholder="411001"
              />
              {errors.pincode && <span className="field-error">{errors.pincode}</span>}
            </div>
          </div>

          <div className="checkout-card">
            <h3>Payment Method</h3>
            <div className="payment-options">
              {[
                { id: 'cod', label: 'Cash on Delivery', hint: 'Pay when your order arrives' },
                { id: 'upi', label: 'UPI', hint: 'Pay instantly via any UPI app' },
                { id: 'card', label: 'Credit / Debit Card', hint: 'Visa, MasterCard, RuPay accepted' },
              ].map((option) => (
                <label
                  key={option.id}
                  className={`payment-option ${payment === option.id ? 'is-active' : ''}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={payment === option.id}
                    onChange={() => setPayment(option.id)}
                  />
                  <span className="payment-option-text">
                    <strong>{option.label}</strong>
                    <small>{option.hint}</small>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="checkout-summary-col">
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {cart.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="checkout-item-info">
                    <span>{item.name}</span>
                    <small>Qty: {item.qty}</small>
                  </div>
                  <span className="checkout-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={placing}>
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
