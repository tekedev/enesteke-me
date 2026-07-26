import SlotButton from '../components/SlotButton';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="Footer__footer">
      <div className="Footer__inner">
        <div className="Footer__top">
          <div className="Footer__top_main">
            <span className="label">GET IN TOUCH</span>
            <h2 className="heading-lg">
              Let's architect something <em className="italic-accent">extraordinary.</em>
            </h2>
            <p className="footer-sub">
              Açık kaynak projeler, otonom yapay zeka mimarileri veya özel yazılım ihtiyaçlarınız için iletişime geçin.
            </p>
          </div>

          <div className="Footer__top_contact">
            <SlotButton
              text="EMAIL: hello@enesteke.me ✉"
              href="mailto:hello@enesteke.me"
              className="SlotButton__button--accent"
            />
            <SlotButton
              text="GITHUB: @tekedev ↗"
              href="https://github.com/tekedev"
            />
          </div>
        </div>

        {/* Links Grid */}
        <div className="Footer__middle">
          <div className="Footer__col">
            <h4 className="Footer__col_title">NAVIGATION</h4>
            <a href="#top" className="Footer__link">Top</a>
            <a href="#work" className="Footer__link">Works</a>
            <a href="#skills" className="Footer__link">Capabilities</a>
            <a href="#about" className="Footer__link">Mission & Vision</a>
          </div>

          <div className="Footer__col">
            <h4 className="Footer__col_title">SOCIAL & PROFILES</h4>
            <a href="https://github.com/tekedev" target="_blank" rel="noopener noreferrer" className="Footer__link">GitHub (@tekedev)</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="Footer__link">LinkedIn</a>
            <a href="https://enesteke.me" target="_blank" rel="noopener noreferrer" className="Footer__link">Portfolio Site</a>
          </div>

          <div className="Footer__col">
            <h4 className="Footer__col_title">LOCATION & AVAILABILITY</h4>
            <p className="Footer__info">Turkey / Remote Worldwide</p>
            <p className="Footer__info">Status: Open for High-Impact Projects</p>
          </div>
        </div>

        {/* Giant Alche Style ET Logo SVG */}
        <div className="Footer__giant_logo">
          <svg viewBox="0 0 1000 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="75%" textAnchor="middle" fontSize="180" fontFamily="Space Grotesk, sans-serif" fontWeight="800" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="2">
              ENESTEKE.ME
            </text>
          </svg>
        </div>

        <div className="Footer__copyright">
          <span>© 2026 Enes Teke (@tekedev). All rights reserved.</span>
          <span>Architected with React 19, Three.js & Vite</span>
        </div>
      </div>
    </footer>
  );
}
