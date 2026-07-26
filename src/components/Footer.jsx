import './Footer.css';

/* Social links — text only, no icons */
const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/tekedev' },
  { label: 'X', href: 'https://x.com/enesteke' },
  { label: 'Mail', href: 'mailto:hello@enesteke.me' },
];

/**
 * Footer — Ultra-minimal editorial footer.
 *
 * - Top: thin gradient line (transparent → white/10 → transparent)
 * - Left: copyright in mono
 * - Right: text social links separated by dots
 */
export default function Footer() {
  return (
    <footer className="footer">
      {/* Gradient top divider */}
      <div className="footer__line" />

      <div className="footer__inner">
        {/* Copyright */}
        <p className="footer__copy">
          &copy; 2026 Enes Teke
        </p>

        {/* Social text links */}
        <div className="footer__socials">
          {SOCIALS.map((link, i) => (
            <span key={link.label} className="footer__social-item">
              {i > 0 && <span className="footer__social-dot">&middot;</span>}
              <a
                className="footer__social-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
