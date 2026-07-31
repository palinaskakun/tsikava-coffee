import Link from "next/link";
import { Camera, Flower2 } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-pattern" aria-hidden="true" />

      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <Link className="footer-wordmark" href="/">
            TSIKAVA<span>!</span>
          </Link>

          <p>
            Coffee, tea, color, and culture — made a little more interesting.
          </p>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Visit</p>
          <p>East Lansing, Michigan</p>
          <p>Monday–Sunday</p>
          <p>7:00 AM–7:00 PM</p>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Explore</p>
          <Link href="/menu">Menu</Link>
          <Link href="/about">Our story</Link>
          <Link href="/account">Account</Link>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Follow</p>

          <a href="#" aria-label="TSIKAVA Instagram">
            <Camera size={17} />
            Instagram
          </a>

          <p className="footer-flower">
            <Flower2 size={18} />
            Inspired by the cornflower
          </p>
        </div>
      </div>

      <div className="page-shell footer-bottom">
        <p>© 2026 TSIKAVA. Fictional portfolio concept.</p>
        <p>Цікава · Кава · Гарбата</p>
      </div>
    </footer>
  );
}