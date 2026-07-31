import Link from "next/link";
import {
  ArrowRight,
  Flower2,
} from "lucide-react";
import { DrinkCard } from "@/components/menu/drink-card";
import { Reveal } from "@/components/motion/reveal";

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
    <main className="home-page">
      <section className="hero">
        <div
          className="hero-ambient ambient-red"
          aria-hidden="true"
        />

        <div
          className="hero-ambient ambient-blue"
          aria-hidden="true"
        />

        <div
          className="hero-ambient ambient-matcha"
          aria-hidden="true"
        />

        <div className="hero-content page-shell">
          <Reveal className="hero-copy">
            <h1>
              It means
              <span> interesting.</span>
            </h1>

            <p className="hero-description">
              TSIKAVA is a modern café concept shaped by
              Belarusian color, pattern, and language,
              with a small menu of coffee and matcha made
              with care.
            </p>

            <div className="hero-actions">
              <Link
                className="primary-button"
                href="/menu"
              >
                Explore the menu
                <ArrowRight size={18} />
              </Link>

              <Link
                className="secondary-button"
                href="/about"
              >
                Why TSIKAVA?
              </Link>
            </div>

            <div className="language-note">
              <strong>
                ЦІКАВА · КАВА · ГАРБАТА
              </strong>

              <span>
                Interesting · Coffee · Tea
              </span>
            </div>
          </Reveal>

          <Reveal
            className="hero-art"
            delay={1}
          >
            <div
              className="flower flower-one"
              aria-hidden="true"
            >
              <Flower2 />
            </div>

            <div
              className="flower flower-two"
              aria-hidden="true"
            >
              <Flower2 />
            </div>

            <div
              className="cup-shadow"
              aria-hidden="true"
            />

            <div
              className="cup"
              aria-label="Decorative TSIKAVA coffee cup"
            >
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
          </Reveal>
        </div>
      </section>

      <section className="meaning-section">
        <div className="page-shell meaning-grid">
          <Reveal className="meaning-label">
            <Flower2 size={22} />
            <span>The name</span>
          </Reveal>

          <Reveal
            className="meaning-copy"
            delay={1}
          >
            <h2>
              TSIKAVA comes from the Belarusian word
              <em> цікава</em> — “interesting.”
            </h2>

            <p>
              Inside the name is also{" "}
              <strong>kava</strong>, the Belarusian word
              for coffee. It felt like the right name for
              a café where language, design, and drinks
              all meet in one place.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="featured-section">
        <div className="page-shell">
          <Reveal className="section-heading">
            <div>
              <p className="featured-intro">
                Made carefully
              </p>

              <h2>Current favorites</h2>
            </div>

            <Link
              className="section-link"
              href="/menu"
            >
              See the full menu
              <ArrowRight size={16} />
            </Link>
          </Reveal>

          <div className="drink-grid">
            {featuredDrinks.map(
              (drink, index) => (
                <Reveal
                  key={drink.id}
                  delay={
                    (index + 1) as 1 | 2 | 3
                  }
                >
                  <DrinkCard product={drink} />
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="culture-banner">
        <div
          className="culture-decoration"
          aria-hidden="true"
        >
          ЦІКАВА · КАВА · ГАРБАТА · ЦІКАВА · КАВА ·
          ГАРБАТА
        </div>

        <Reveal className="page-shell culture-content">
          <p className="culture-kicker">
            Modern, but rooted
          </p>

          <h2>
            Belarusian inspiration.
          </h2>

          <p>
            Traditional geometry, cornflower blue, deep
            red, and warm café textures appear through a
            contemporary visual system.
          </p>

          <Link
            className="light-button"
            href="/about"
          >
            Read our story
            <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}