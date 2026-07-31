import Link from "next/link";
import { ArrowRight, Flower2, Sparkles } from "lucide-react";
import { DrinkCard } from "@/components/menu/drink-card";

const featuredDrinks = [
  {
    id: "cornflower-cloud",
    name: "Cornflower Cloud",
    slug: "cornflower-cloud",
    description:
      "Blueberry cold foam, vanilla matcha, and oat milk with a soft and sweet finish.",
    price: 6.5,
    category: "Seasonal matcha",
    artwork: "cornflower" as const,
    featured: true,
  },
  {
    id: "cherry-kava",
    name: "Cherry Kava",
    slug: "cherry-kava",
    description:
      "Espresso, dark cherry, cocoa, and lightly sweet cream over ice.",
    price: 6.25,
    category: "Signature latte",
    artwork: "cherry" as const,
    featured: true,
  },
  {
    id: "honey-linen",
    name: "Honey Linen",
    slug: "honey-linen",
    description:
      "Wildflower honey, espresso, sea salt, and silky steamed milk.",
    price: 5.75,
    category: "Signature latte",
    artwork: "honey" as const,
    featured: true,
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-ambient ambient-red" aria-hidden="true" />
        <div className="hero-ambient ambient-blue" aria-hidden="true" />

        <div className="hero-content page-shell">
          <div className="hero-copy">
            <p className="eyebrow">
              <Sparkles size={16} />
              Coffee and tea, made curious
            </p>

            <h1>
              It means
              <span> interesting.</span>
            </h1>

            <p className="hero-description">
              TSIKAVA is a modern café concept shaped by Belarusian color,
              pattern, and language — with a small menu of coffee and matcha
              worth getting curious about.
            </p>

            <div className="hero-actions">
              <Link className="primary-button" href="/menu">
                Explore the menu
                <ArrowRight size={18} />
              </Link>

              <Link className="secondary-button" href="/about">
                Why TSIKAVA?
              </Link>
            </div>

            <div className="language-note">
              <div>
                <strong>ЦІКАВА · КАВА · ГАРБАТА</strong>
                <span>Interesting · Coffee · Tea</span>
              </div>

              <p>Pronounced roughly: tsee-KAH-va</p>
            </div>
          </div>

          <div className="hero-art" aria-label="Decorative TSIKAVA coffee cup">
            <div className="flower flower-one">
              <Flower2 />
            </div>

            <div className="flower flower-two">
              <Flower2 />
            </div>

            <div className="cup-shadow" />

            <div className="cup">
              <div className="cup-rim" />
              <div className="cup-liquid" />

              <div className="cup-steam steam-left" />
              <div className="cup-steam steam-right" />

              <div className="cup-pattern">
                <span>◆</span>
                <span>◇</span>
                <span>◆</span>
                <span>◇</span>
                <span>◆</span>
              </div>
            </div>

            <p>цікавая кава</p>
          </div>
        </div>
      </section>

      <section className="meaning-section">
        <div className="page-shell meaning-grid">
          <div className="meaning-label">
            <Flower2 size={22} />
            <span>The name</span>
          </div>

          <div className="meaning-copy">
            <h2>
              TSIKAVA comes from the Belarusian word
              <em> цікава</em> — “interesting.”
            </h2>

            <p>
              Inside the name is also <strong>kava</strong>, the Belarusian word
              for coffee. It felt like the right name for a café where language,
              design, and drinks all meet in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="featured-section page-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A small menu, made carefully</p>
            <h2>Current favorites</h2>
          </div>

          <Link className="section-link" href="/menu">
            See the full menu
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="drink-grid">
          {featuredDrinks.map((drink) => (
            <DrinkCard key={drink.id} product={drink} />
          ))}
        </div>
      </section>

      <section className="culture-banner">
        <div className="culture-decoration" aria-hidden="true">
          ЦІКАВА · КАВА · ГАРБАТА · ЦІКАВА · КАВА · ГАРБАТА
        </div>

        <div className="page-shell culture-content">
          <p className="culture-kicker">Modern, but rooted</p>

          <h2>
            Belarusian inspiration.
          </h2>

          <p>
            Traditional geometry, cornflower blue, deep red, and warm café
            textures appear through a contemporary visual system.
          </p>

          <Link className="light-button" href="/about">
            Read our story
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}