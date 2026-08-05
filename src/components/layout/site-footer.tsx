import Link from "next/link";
import {
  Apple,
  Camera,
  MapPin,
  MessagesSquare,
  Music2,
  Play,
} from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-pattern" aria-hidden="true" />

      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <Link className="footer-wordmark" href="/">
            <span aria-hidden="true" className="wordmark-mark" />
            <span className="wordmark-name">TSIKAVA</span>
            <span className="wordmark-bang">!</span>
          </Link>

          <p>Modern coffee, thoughtful rituals, and a little Belarusian curiosity in every cup.</p>

          <div className="footer-socials">
            <Link aria-label="TSIKAVA Instagram" href="/social"><Camera size={17} /></Link>
            <Link aria-label="TSIKAVA Facebook" href="/social"><MessagesSquare size={17} /></Link>
            <Link aria-label="TSIKAVA TikTok" href="/social"><Music2 size={17} /></Link>
          </div>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Visit</p>
          <Link href="/locations"><MapPin size={15} /> Find a TSIKAVA</Link>
          <p>Every day, 7 AM–7 PM</p>
          <p>Made for lingering</p>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Explore</p>
          <Link href="/menu">Menu</Link>
          <Link href="/locations">Locations</Link>
          <Link href="/about">Our story</Link>
          <Link href="/account">Account</Link>
        </div>

        <div className="footer-column footer-apps">
          <p className="footer-heading">The TSIKAVA app</p>
          <p>Order ahead, save favorites, and earn a little more time for coffee.</p>
          <div className="app-badges">
            <Link href="/social"><Apple size={18} /><span>Download on the<br /><strong>App Store</strong></span></Link>
            <Link href="/social"><Play size={18} fill="currentColor" /><span>Get it on<br /><strong>Google Play</strong></span></Link>
          </div>
        </div>
      </div>

      <div className="page-shell footer-bottom">
        <p>© 2026 TSIKAVA. Fictional portfolio concept.</p>
        <div>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <span>Цікава · Кава · Гарбата</span>
        </div>
      </div>
    </footer>
  );
}
