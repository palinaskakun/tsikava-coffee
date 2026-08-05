import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = { title: "Locations", description: "Find a TSIKAVA café near you." };

const locations = [
  { city: "Manhattan", state: "New York", address: "Street Name 123", details: "A bright all-day café for the downtown rhythm.", image: "/images/tsikava-space.jpg", status: "Opening soon" },
  { city: "Brooklyn", state: "New York", address: "Street Name 123", details: "A neighborhood stop for slow mornings and late catch-ups.", image: "/images/tsikava-cafe-interior.jpg", status: "Open daily · 7 AM–7 PM" },
  { city: "Dearborn", state: "Michigan", address: "Street Name 123", details: "A relaxed coffeehouse with room to make yourself at home.", image: "/images/tsikava-coffee-table.jpg", status: "Open daily · 7 AM–7 PM" },
  { city: "Lansing", state: "Michigan", address: "Street Name 123", details: "A new gathering place for coffee, tea, and curious people.", image: "/images/tsikava-coffee-beans.jpg", status: "Opening soon" },
];

export default function LocationsPage() {
  return (
    <main className="locations-page">
      <section className="locations-hero">
        <Reveal className="page-shell">
          <p className="section-label">Come say hello</p>
          <h1>Find your next favorite corner.</h1>
          <p>Every TSIKAVA café is a little different, but each one is made for taking a breath, sharing a table, and leaving with something good.</p>
        </Reveal>
      </section>

      <section className="page-shell locations-list">
        {locations.map((location, index) => (
          <Reveal className="location-feature-reveal" delay={(index % 3) as 0 | 1 | 2} key={location.city}>
            <article className="location-feature">
              <div className="location-feature-image">
                <Image alt={`TSIKAVA ${location.city} atmosphere`} fill sizes="(max-width: 760px) 100vw, 44vw" src={location.image} />
              </div>

              <div className="location-feature-copy">
                <span>0{index + 1}</span>
                <h2>{location.city}, <em>{location.state}</em></h2>
                <p>{location.details}</p>
                <div>
                  <p><MapPin size={16} /> {location.address}</p>
                  <p><Clock3 size={16} /> {location.status}</p>
                </div>
                <Link className="underlined-link" href="/menu">Browse the menu <ArrowRight size={15} /></Link>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
