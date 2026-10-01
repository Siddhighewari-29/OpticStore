import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    if (!form.fullName.trim()) {
      return 'Please enter your full name.';
    }

    if (!form.email.trim()) {
      return 'Please enter your email.';
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      return 'Please enter a valid email address.';
    }

    if (!form.phone.trim()) {
      return 'Please enter your phone number.';
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      return 'Phone number must be 10 digits.';
    }

    if (!form.address.trim()) {
      return 'Please enter your address.';
    }

    if (!form.city.trim()) {
      return 'Please enter your city.';
    }

    if (!form.state.trim()) {
      return 'Please enter your state.';
    }

    if (!form.pincode.trim()) {
      return 'Please enter your pincode.';
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      return 'Pincode must be 6 digits.';
    }

    if (!form.password) {
      return 'Please enter a password.';
    }

    if (form.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    if (form.password !== form.confirmPassword) {
      return 'Passwords do not match.';
    }

    return '';
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      await registerUser(
        form.fullName.trim(),
        form.email.trim(),
        form.password,
        form.phone.trim(),
        form.address.trim(),
        form.city.trim(),
        form.state.trim(),
        form.pincode.trim()
      );

      alert('Registration successful! Please login.');

      navigate('/login');
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
        err?.response?.data ||
        'Registration failed. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Create your OpticStore account
        </p>

        {error && (
          <div className="register-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>


          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>


          {/* PHONE */}
          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter 10-digit phone number"
              value={form.phone}
              onChange={handleChange}
              maxLength="10"
            />
          </div>


          {/* ADDRESS */}
          <div className="form-group">
            <label>Address</label>

            <textarea
              name="address"
              placeholder="Enter your complete address"
              value={form.address}
              onChange={handleChange}
              rows="3"
            />
          </div>


          {/* CITY */}
          <div className="form-group">
            <label>City</label>

            <input
              type="text"
              name="city"
              placeholder="Enter your city"
              value={form.city}
              onChange={handleChange}
            />
          </div>


          {/* STATE */}
          <div className="form-group">
            <label>State</label>

            <input
              type="text"
              name="state"
              placeholder="Enter your state"
              value={form.state}
              onChange={handleChange}
            />
          </div>


          {/* PINCODE */}
          <div className="form-group">
            <label>Pincode</label>

            <input
              type="text"
              name="pincode"
              placeholder="Enter 6-digit pincode"
              value={form.pincode}
              onChange={handleChange}
              maxLength="6"
            />
          </div>


          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
            />
          </div>


          {/* CONFIRM PASSWORD */}
          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>


          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="register-btn"
            disabled={submitting}
          >
            {submitting ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>


        {/* LOGIN LINK */}
        <div className="register-login-link">
          <span>Already have an account?</span>

          <Link to="/login">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}