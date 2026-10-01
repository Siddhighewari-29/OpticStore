import { Link } from 'react-router-dom';
import './About.css';

const VALUES = [
  {
    title: 'Quality Commitment',
    desc: 'Every frame passes multi-point inspection for durability, fit and lens clarity before it reaches you.',
    icon: '🔍',
  },
  {
    title: 'Customer-Focused',
    desc: 'From sizing guidance to hassle-free returns, our team is built around your experience, not just the sale.',
    icon: '🤝',
  },
  {
    title: 'Honest Pricing',
    desc: 'We cut out unnecessary markups so premium eyewear stays accessible, not exclusive.',
    icon: '💳',
  },
  {
    title: 'Sustainable Sourcing',
    desc: 'We partner with manufacturers who share our standards for ethical, responsible production.',
    icon: '🌱',
  },
];

export default function About() {
  return (
    <div className="about-page">
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <span>About</span>
          </div>
          <h1>About OpticStore</h1>
          <p>
            We started OpticStore with one goal: make quality eyewear simple to find, easy to
            trust, and satisfying to wear — for every face in the family.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container about-intro">
          <div>
            <span className="pill-tag">Our Story</span>
            <h2 className="section-title" style={{ marginTop: 14 }}>
              Eyewear built around how you actually see the world
            </h2>
            <p className="section-sub" style={{ marginTop: 14 }}>
              OpticStore began as a small optical studio focused on getting the details right —
              frame balance, lens clarity, and a fit that lasts all day. Today we bring that same
              craftsmanship online, with a catalog spanning men's, women's, kids' and sun
              collections, backed by fast delivery and easy returns.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container mission-grid">
          <div className="mission-card">
            <h3>Our Mission</h3>
            <p>
              To make premium, well-crafted eyewear accessible to everyone — without compromising
              on comfort, durability or style.
            </p>
          </div>
          <div className="mission-card">
            <h3>Our Vision</h3>
            <p>
              To become the eyewear brand people trust first, known for clarity in product and
              honesty in every interaction.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">Why Customers Choose Us</h2>
              <p className="section-sub">The principles behind every pair we ship.</p>
            </div>
          </div>

          <div className="values-grid">
            {VALUES.map((v) => (
              <div className="value-card" key={v.title}>
                <span className="value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
