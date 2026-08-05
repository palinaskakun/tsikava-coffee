import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  MapPin,
  MessagesSquare,
  Music2,
  Star,
} from "lucide-react";
import { DrinkCard } from "@/components/menu/drink-card";
import { SiteTicker } from "@/components/layout/site-ticker";
import { Reveal } from "@/components/motion/reveal";

const featuredDrinks = [
  {
    id: "honey-linen",
    name: "Honey Linen",
    slug: "honey-linen",
    description: "Wildflower honey, espresso, sea salt, and silky steamed milk.",
    price: 5.75,
    category: "Signature latte",
    artwork: "honey" as const,
    featured: true,
  },
  {
    id: "cornflower-cloud",
    name: "Cornflower Cloud",
    slug: "cornflower-cloud",
    description: "Blueberry cold foam, vanilla matcha, and oat milk with a soft and sweet finish.",
    price: 6.5,
    category: "Seasonal matcha",
    artwork: "cornflower" as const,
    featured: true,
  },
  {
    id: "birch-morning",
    name: "Birch Morning",
    slug: "birch-morning",
    description: "Crisp apple, white peach, lemon, and sparkling birch water.",
    price: 5.75,
    category: "Sparkling refresher",
    artwork: "birch" as const,
    featured: true,
  },
];

const locations = [
  { city: "Manhattan", state: "New York", address: "Street Name 123", note: "Opening soon", image: "/images/tsikava-space.jpg" },
  { city: "Brooklyn", state: "New York", address: "Street Name 123", note: "Daily, 7 AM–7 PM", image: "/images/tsikava-cafe-interior.jpg" },
  { city: "Dearborn", state: "Michigan", address: "Street Name 123", note: "Daily, 7 AM–7 PM", image: "/images/tsikava-coffee-table.jpg" },
  { city: "Lansing", state: "Michigan", address: "Street Name 123", note: "Opening soon", image: "/images/tsikava-coffee-beans.jpg" },
];

const reviews = [
  { quote: "The kind of cafe that makes you slow down on purpose. My Cherry Kava was perfect.", name: "Maya R.", detail: "Brooklyn guest" },
  { quote: "Beautiful space, thoughtful menu, and the warmest team. It already feels like a favorite.", name: "Hannah L.", detail: "Dearborn guest" },
  { quote: "The matcha is genuinely special and the little details make every visit feel considered.", name: "Jordan P.", detail: "Manhattan guest" },
];

const socialPosts = [
  { label: "Instagram", icon: Camera, image: "/images/tsikava-iced-coffee.jpg", position: "center" },
  { label: "Facebook", icon: MessagesSquare, image: "/images/tsikava-cafe-interior.jpg", position: "center" },
  { label: "TikTok", icon: Music2, image: "/images/tsikava-espresso.jpg", position: "center" },
];

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="hero">
        <Image
          alt=""
          aria-hidden="true"
          className="hero-background-photo"
          fill
          priority
          sizes="100vw"
          src="/images/tsikava-cafe-interior.jpg"
        />
        <div className="hero-ambient ambient-red" aria-hidden="true" />
        <div className="hero-ambient ambient-blue" aria-hidden="true" />

        <div className="hero-content page-shell">
          <Reveal className="hero-copy">
            <p className="home-kicker">Coffee, tea & curiosity</p>
            <h1>Come for the coffee. <span>Stay for the interesting.</span></h1>
            <p className="hero-description">TSIKAVA is a modern café shaped by thoughtful drinks, warm spaces, and the small rituals that turn an ordinary day into a good one.</p>
            <div className="hero-actions hero-inline-actions">
              <Link className="hero-action-link" href="/menu">Explore the menu</Link>
              <span aria-hidden="true" className="hero-action-divider">|</span>
              <Link className="hero-action-link" href="/locations">Find your cafe</Link>
            </div>
          </Reveal>

          <Reveal className="hero-photo" delay={1}>
            <Image alt="Iced coffees being prepared" fill priority sizes="(max-width: 1000px) 100vw, 44vw" src="/images/tsikava-iced-coffee.jpg" />
            <div className="hero-photo-caption"> TSIKAVA Original Honey Linen Latte</div>
          </Reveal>
        </div>

        <div className="hero-values-bar" aria-label="What guides TSIKAVA">
          <div className="hero-values-track">
            {Array.from({ length: 2 }, (_, copy) => (
              <div className="hero-values-content" key={copy}>
                <span>It means interesting</span>
                <i aria-hidden="true">✦</i>
                <span>Belarusian roots</span>
                <i aria-hidden="true">✦</i>
                <span>Coffee with curiosity</span>
                <i aria-hidden="true">✦</i>
                <span>Made for lingering</span>
                <i aria-hidden="true">✦</i>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="intro-section">
        <div className="page-shell intro-grid">
          <Reveal className="intro-image">
            <Image alt="Bright TSIKAVA cafe interior" fill sizes="(max-width: 760px) 100vw, 42vw" src="/images/tsikava-bright-cafe.jpg" />
          </Reveal>
          <Reveal className="intro-copy" delay={1}>
            <p className="section-label">The name</p>
            <h2>TSIKAVA means <em>interesting.</em></h2>
            <p>It&apos;s a Belarusian word, and a small invitation to stay curious. We pair familiar coffeehouse comfort with a point of view — one that makes every pour, pastry, and conversation feel a little more memorable.</p>
            <Link className="underlined-link" href="/about">Our story <ArrowRight size={15} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="featured-section">
        <div className="page-shell">
          <Reveal className="section-heading">
            <div>
              <p className="featured-intro">Thoughtfully made</p>
              <h2>Current favorites</h2>
            </div>
            <Link className="section-link" href="/menu">See the full menu <ArrowRight size={16} /></Link>
          </Reveal>
          <div className="drink-grid">
            {featuredDrinks.map((drink, index) => <Reveal delay={(index + 1) as 1 | 2 | 3} key={drink.id}><DrinkCard product={drink} /></Reveal>)}
          </div>
        </div>
      </section>

      <section className="locations-preview">
        <div className="page-shell">
          <Reveal className="locations-heading">
            <div><p className="section-label">Meet us nearby</p><h2>Your neighborhood TSIKAVA.</h2></div>
            <p>Good coffee should feel close to home. Visit one of our growing cafes for a quiet table, a quick pick-me-up, or a reason to meet someone you like.</p>
          </Reveal>
          <div className="location-grid">
            {locations.map((location, index) => <Reveal delay={(index % 3 + 1) as 1 | 2 | 3} key={location.city}>
              <article className="location-card"><Image alt="" aria-hidden fill sizes="(max-width: 560px) 100vw, 25vw" src={location.image} /><span className="location-number">0{index + 1}</span><MapPin size={18} /><h3>{location.city}, <em>{location.state}</em></h3><p>{location.address}</p><small>{location.note}</small></article>
            </Reveal>)}
          </div>
          <Reveal><Link className="underlined-link locations-link" href="/locations">See all locations <ArrowRight size={15} /></Link></Reveal>
        </div>
      </section>

      <SiteTicker />

      <section className="reviews-section">
        <div className="page-shell"><Reveal className="reviews-heading"><p className="section-label">A few kind words</p><h2>Made for the regulars and the soon-to-be regulars.</h2></Reveal>
          <div className="review-grid">{reviews.map((review, index) => <Reveal delay={(index + 1) as 1 | 2 | 3} key={review.name}><article className="review-card"><div className="review-stars" aria-label="Five star review">{Array.from({ length: 5 }, (_, star) => <Star fill="currentColor" key={star} size={13} />)}</div><blockquote>“{review.quote}”</blockquote><footer><strong>{review.name}</strong><span>{review.detail}</span></footer></article></Reveal>)}</div>
        </div>
      </section>

      <section className="social-section">
        <div className="page-shell"><Reveal className="social-heading"><div><p className="section-label">From the cafe</p><h2>Follow along.</h2></div><p>More coffee, more corners, more things that catch our eye.</p></Reveal>
          <div className="social-grid">{socialPosts.map((post) => { const Icon = post.icon; return <Link className="social-post" href="/social" key={post.label}><Image alt={`${post.label} preview`} fill sizes="(max-width: 700px) 100vw, 33vw" src={post.image} style={{ objectPosition: post.position }} /><span className="social-overlay"><Icon size={28} /><b>{post.label}</b></span></Link>; })}</div>
        </div>
      </section>
    </main>
  );
}
