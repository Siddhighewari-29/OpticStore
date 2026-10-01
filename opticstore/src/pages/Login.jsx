import { useState } from 'react';
import { Link , Navigate, useLocation, useNavigate } from 'react-router-dom';
// import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Login.css';

export default function Login() {
  const { login, isAuthenticated } = useApp();

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    identifier: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    const redirectTo = location.state?.from?.pathname || '/';
    return <Navigate to={redirectTo} replace />;
  }

  function validate() {
    const next = {};

    if (!form.identifier.trim()) {
      next.identifier = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.identifier.trim())) {
      next.identifier = 'Enter a valid email address';
    }

    if (!form.password) {
      next.password = 'Password is required';
    } else if (form.password.length < 4) {
      next.password = 'Password must be at least 4 characters';
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    setErrors({});

    try {
      await login(
        form.identifier.trim(),
        form.password
      );

      const redirectTo = location.state?.from?.pathname || '/';

      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error('Login failed:', err);

      setErrors({
        identifier: 'Invalid email or password',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">

      <div className="login-visual">
        <div className="login-visual-content">

          <span className="pill-tag">OpticStore</span>

          <h1>See Better. Look Better.</h1>

          <p>
            Sign in to explore curated frames for men, women and kids —
            plus polarized sunglasses built for every season.
          </p>

          <div className="login-lens-art" aria-hidden="true">
            <svg width="220" height="130" viewBox="0 0 220 130" fill="none">
              <circle
                cx="70"
                cy="65"
                r="58"
                stroke="#22d3ee"
                strokeWidth="3"
                opacity="0.9"
              />

              <circle
                cx="150"
                cy="65"
                r="58"
                stroke="#22d3ee"
                strokeWidth="3"
                opacity="0.9"
              />

              <line
                x1="112"
                y1="65"
                x2="108"
                y2="65"
                stroke="#22d3ee"
                strokeWidth="3"
              />

              <line
                x1="8"
                y1="40"
                x2="8"
                y2="20"
                stroke="#22d3ee"
                strokeWidth="3"
              />

              <line
                x1="212"
                y1="40"
                x2="212"
                y2="20"
                stroke="#22d3ee"
                strokeWidth="3"
              />
            </svg>
          </div>

        </div>
      </div>

      <div className="login-form-side">

        <form
          className="login-card"
          onSubmit={handleSubmit}
          noValidate
        >

          <h2>Welcome back</h2>

          <p className="login-subtitle">
            Sign in to continue to your OpticStore account.
          </p>

          <div className="form-group">

            <label htmlFor="identifier">
              Email
            </label>

            <input
              id="identifier"
              type="email"
              className={`form-control ${
                errors.identifier ? 'is-invalid' : ''
              }`}
              placeholder="you@example.com"
              value={form.identifier}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  identifier: e.target.value,
                }))
              }
              autoComplete="username"
            />

            {errors.identifier && (
              <span className="field-error">
                {errors.identifier}
              </span>
            )}

          </div>

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="password-field">

              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    password: e.target.value,
                  }))
                }
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((v) => !v)
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.4 4.6A10.6 10.6 0 0112 4.5c5.5 0 9.5 4.2 10.5 7.5-.4 1.3-1.3 2.9-2.6 4.3M6.6 6.6C4.3 8 2.9 9.9 2.5 12c1 3.3 5 7.5 9.5 7.5 1.3 0 2.6-.3 3.7-.8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M2.5 12S6.5 4.5 12 4.5 21.5 12 21.5 12 17.5 19.5 12 19.5 2.5 12 2.5 12z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                )}
              </button>

            </div>

            {errors.password && (
              <span className="field-error">
                {errors.password}
              </span>
            )}

          </div>

          <div className="login-row">

            <label className="remember-check">

              <input
                type="checkbox"
                checked={remember}
                onChange={(e) =>
                  setRemember(e.target.checked)
                }
              />

              Remember me

            </label>

            <a
              href="#forgot"
              onClick={(e) => e.preventDefault()}
            >
              Forgot password?
            </a>

          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            {submitting
              ? 'Signing in...'
              : 'Sign In'}
          </button>

          <p className="login-hint">
            Use your registered OpticStore email and password.
          </p>

<div className="login-register-link">
  <span>Don't have an account?</span>
  <Link to="/register">Create an account</Link>
</div>
        </form>

      </div>

    </div>
  );
}