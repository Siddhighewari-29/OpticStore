import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitContactForm } from '../services/api';
import './Contact.css';

const INITIAL_FORM = { name: '', email: '', phone: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'Enter a valid email address';
    }
    if (form.phone.trim() && !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      next.phone = 'Enter a valid 10-digit phone number';
    }
    if (!form.message.trim()) {
      next.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      next.message = 'Message should be at least 10 characters';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await submitContactForm(form);
      setSubmitted(true);
      setForm(INITIAL_FORM);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <span>Contact</span>
          </div>
          <h1>Get in Touch</h1>
          <p>Questions about sizing, orders or returns? We usually reply within one business day.</p>
        </div>
      </div>

      <section className="section-tight">
        <div className="container contact-layout">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h3>Send us a message</h3>

            {submitted && (
              <div className="contact-success">
                Thanks for reaching out! We've received your message and will get back to you soon.
              </div>
            )}

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number (optional)</label>
              <input
                id="phone"
                type="tel"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="98765 43210"
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={5}
                className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="How can we help?"
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Sending...' : 'Submit'}
            </button>
          </form>

          <div className="contact-info">
            <div className="contact-info-card">
              <h3>Contact Information</h3>
              <ul>
                <li>
                  <span className="contact-icon">✉️</span>
                  <div>
                    <strong>Email</strong>
                    <span>support@opticstore.com</span>
                  </div>
                </li>
                <li>
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>Phone</strong>
                    <span>+91 98765 43210</span>
                  </div>
                </li>
                <li>
                  <span className="contact-icon">📍</span>
                  <div>
                    <strong>Address</strong>
                    <span>221 Lens Avenue, Pune, Maharashtra 411001</span>
                  </div>
                </li>
                <li>
                  <span className="contact-icon">🕐</span>
                  <div>
                    <strong>Business Hours</strong>
                    <span>Mon – Sat, 9:00 AM – 7:00 PM</span>
                  </div>
                </li>
              </ul>

              <div className="footer-social contact-social">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H8v4h2v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M21 5.3c-.7.4-1.6.7-2.4.8a4 4 0 0 0 1.8-2.3c-.8.5-1.7.8-2.7 1a4.2 4.2 0 0 0-7.2 3.9A12 12 0 0 1 2.4 4.2a4.3 4.3 0 0 0 1.3 5.7c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.8.1a4.2 4.2 0 0 0 3.9 3A8.4 8.4 0 0 1 1 18.6 11.9 11.9 0 0 0 7.3 20.5c7.5 0 11.7-6.5 11.7-12.1v-.6c.8-.6 1.5-1.3 2-2.1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
