import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders, updateProfile } from '../services/api';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState('');

  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
  });

  useEffect(() => {
    if (!user?.email) return;

    async function loadOrders() {
      try {
        setOrdersLoading(true);
        setOrdersError('');

        const data = await fetchUserOrders(user.email);

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setOrdersError('Failed to load your orders.');
      } finally {
        setOrdersLoading(false);
      }
    }

    loadOrders();
  }, [user?.email]);

  if (!user) return null;

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEdit() {
    setForm({
      fullName: user.name || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      pincode: user.pincode || '',
    });

    setError('');
    setEditing(true);
  }

  function handleCancel() {
    setError('');
    setEditing(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    setError('');

    if (!form.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      setError('Phone number must be 10 digits.');
      return;
    }

    if (!form.address.trim()) {
      setError('Please enter your address.');
      return;
    }

    if (!form.city.trim()) {
      setError('Please enter your city.');
      return;
    }

    if (!form.state.trim()) {
      setError('Please enter your state.');
      return;
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setError('Pincode must be 6 digits.');
      return;
    }

    try {
      setSaving(true);

      const updatedUser = await updateProfile(
        user.id,
        form.fullName.trim(),
        form.phone.trim(),
        form.address.trim(),
        form.city.trim(),
        form.state.trim(),
        form.pincode.trim()
      );

      const sessionUser = {
        id: updatedUser.id,
        name: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        city: updatedUser.city,
        state: updatedUser.state,
        pincode: updatedUser.pincode,
      };

      sessionStorage.setItem(
        'opticstore_auth',
        JSON.stringify(sessionUser)
      );

      window.location.reload();

    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
        err?.response?.data ||
        'Failed to update profile.'
      );
    } finally {
      setSaving(false);
    }
  }

  function formatDate(dateValue) {
    if (!dateValue) return 'Date unavailable';

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return 'Date unavailable';
    }

    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  function formatPrice(value) {
    return `₹${Number(value || 0).toLocaleString('en-IN')}`;
  }

  const firstLetter =
    user.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* PROFILE HEADER */}
        <div className="profile-header">

          <div className="profile-avatar">
            {firstLetter}
          </div>

          <div className="profile-heading">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>

        </div>


        {/* ACCOUNT INFORMATION */}
        <div className="profile-card">

          <div className="profile-card-title">

            <div className="profile-title-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M4.5 21c.8-4.1 3.3-6 7.5-6s6.7 1.9 7.5 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="profile-title-text">
              <h2>Account Information</h2>
              <p>Your personal account details</p>
            </div>

            {!editing && (
              <button
                type="button"
                className="profile-edit-btn"
                onClick={handleEdit}
              >
                ✏️ Edit Profile
              </button>
            )}

          </div>


          {/* EDIT FORM */}
          {editing ? (

            <form
              className="profile-edit-form"
              onSubmit={handleSave}
            >

              {error && (
                <div className="profile-error">
                  {error}
                </div>
              )}

              <div className="profile-form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>


              <div className="profile-form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  value={user.email}
                  disabled
                />

                <small>
                  Email address cannot be changed.
                </small>
              </div>


              <div className="profile-form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength="10"
                  placeholder="Enter 10-digit phone number"
                />
              </div>


              <div className="profile-form-group">
                <label>Address</label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your complete address"
                />
              </div>


              <div className="profile-form-row">

                <div className="profile-form-group">
                  <label>City</label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>

                <div className="profile-form-group">
                  <label>State</label>

                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>

              </div>


              <div className="profile-form-group">
                <label>Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  maxLength="6"
                  placeholder="Enter 6-digit pincode"
                />
              </div>


              <div className="profile-form-actions">

                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="profile-save-btn"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>

              </div>

            </form>

          ) : (

            <>

              {/* NAME */}
              <div className="profile-info-row">
                <div className="profile-info-icon">👤</div>

                <div className="profile-info-content">
                  <span>Full Name</span>
                  <strong>{user.name}</strong>
                </div>
              </div>


              {/* EMAIL */}
              <div className="profile-info-row">
                <div className="profile-info-icon">✉️</div>

                <div className="profile-info-content">
                  <span>Email Address</span>
                  <strong>{user.email}</strong>
                </div>
              </div>


              {/* PHONE */}
              <div className="profile-info-row">
                <div className="profile-info-icon">📱</div>

                <div className="profile-info-content">
                  <span>Phone Number</span>
                  <strong>
                    {user.phone || 'Not provided'}
                  </strong>
                </div>
              </div>


              {/* ADDRESS */}
              <div className="profile-info-row">
                <div className="profile-info-icon">📍</div>

                <div className="profile-info-content">
                  <span>Address</span>
                  <strong>
                    {user.address || 'Not provided'}
                  </strong>
                </div>
              </div>


              {/* CITY */}
              <div className="profile-info-row">
                <div className="profile-info-icon">🏙️</div>

                <div className="profile-info-content">
                  <span>City</span>
                  <strong>
                    {user.city || 'Not provided'}
                  </strong>
                </div>
              </div>


              {/* STATE */}
              <div className="profile-info-row">
                <div className="profile-info-icon">🗺️</div>

                <div className="profile-info-content">
                  <span>State</span>
                  <strong>
                    {user.state || 'Not provided'}
                  </strong>
                </div>
              </div>


              {/* PINCODE */}
              <div className="profile-info-row">
                <div className="profile-info-icon">📮</div>

                <div className="profile-info-content">
                  <span>Pincode</span>
                  <strong>
                    {user.pincode || 'Not provided'}
                  </strong>
                </div>
              </div>


              {/* ACCOUNT STATUS */}
              <div className="profile-info-row">
                <div className="profile-info-icon">✓</div>

                <div className="profile-info-content">
                  <span>Account Status</span>

                  <strong className="account-status">
                    <span className="status-dot"></span>
                    Active
                  </strong>
                </div>
              </div>

            </>
          )}

        </div>


        {/* MY ORDERS */}
        <div className="profile-card orders-card">

          <div className="profile-card-title">

            <div className="profile-title-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 3h12l2 4v14H4V7l2-4z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                <path
                  d="M4 7h16M9 11h6M9 15h6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="profile-title-text">
              <h2>My Orders</h2>
              <p>Your recent orders</p>
            </div>

          </div>


          {ordersLoading ? (

            <div className="orders-message">
              Loading your orders...
            </div>

          ) : ordersError ? (

            <div className="orders-error">
              {ordersError}
            </div>

          ) : orders.length === 0 ? (

            <div className="orders-empty">

              <div className="orders-empty-icon">
                🛍️
              </div>

              <h3>No Orders Yet</h3>

              <p>
                You haven't placed any orders yet.
              </p>

              <button
                type="button"
                className="orders-shop-btn"
                onClick={() => navigate('/')}
              >
                Start Shopping
              </button>

            </div>

          ) : (

            <div className="orders-list">

              {orders.map((order) => (

                <div
                  className="order-item"
                  key={order.id}
                >

                  <div className="order-item-top">

                    <div>
                      <span className="order-label">
                        Order ID
                      </span>

                      <strong>
                        #{order.id}
                      </strong>
                    </div>

                    <span className="order-status">
                      {order.status || 'CONFIRMED'}
                    </span>

                  </div>


                  <div className="order-item-details">

                    <div className="order-detail">
                      <span>Date</span>
                      <strong>
                        {formatDate(order.orderDate)}
                      </strong>
                    </div>

                    <div className="order-detail">
                      <span>Items</span>
                      <strong>
                        {order.items?.length || 0}
                      </strong>
                    </div>

                    <div className="order-detail">
                      <span>Payment</span>
                      <strong>
                        {order.paymentMethod || 'COD'}
                      </strong>
                    </div>

                    <div className="order-detail">
                      <span>Total</span>
                      <strong className="order-total">
                        {formatPrice(order.total)}
                      </strong>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* LOGOUT */}
        <button
          className="profile-logout-btn"
          onClick={handleLogout}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M10 17l5-5-5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M15 12H3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          Logout
        </button>

      </div>

    </div>
  );
}