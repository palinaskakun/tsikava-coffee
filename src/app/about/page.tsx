import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flower2, Languages, Shapes, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Learn about the language, color, and Belarusian inspiration behind TSIKAVA.",
};

const principles = [
  {
    icon: Languages,
    title: "Language with meaning",
    description:
      "The name gives visitors something to ask about and creates a natural introduction to Belarusian language.",
  },
  {
    icon: Shapes,
    title: "Tradition, simplified",
    description:
      "Geometric ornament is interpreted through borders, symbols, packaging, and small interface details.",
  },
  {
    icon: Flower2,
    title: "Cornflower color",
    description:
      "Cornflower blue introduces a softer cultural reference alongside white, black, and dark red.",
  },
];

export default function AboutPage() {
  return (
    <main className="page-main">
      <section className="about-hero">
        <div className="page-shell about-hero-grid">
          <div>
            <p className="eyebrow">
              <Sparkles size={16} />
              Why TSIKAVA?
            </p>

            <h1>A name that starts a conversation.</h1>
          </div>

          <div className="about-intro">
            <p>
              <strong>Цікава</strong> is a Belarusian word meaning
              “interesting.” The name also contains <strong>кава</strong>, or
              “coffee.”
            </p>

            <p>
              TSIKAVA turns that small piece of language into a modern café
              identity built around curiosity, warmth, and visual culture.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell story-section">
        <div className="story-visual" aria-hidden="true">
          <div className="story-orbit story-orbit-one" />
          <div className="story-orbit story-orbit-two" />

          <div className="story-flower">
            <Flower2 />
          </div>

          <div className="story-word">
            <span>ЦІКАВА</span>
            <small>interesting</small>
          </div>
        </div>

        <div className="story-text">
          <p className="section-number">01 · The idea</p>

          <h2>Cultural influence without copying the past.</h2>

          <p>
            The concept is not meant to recreate traditional clothing or turn
            cultural references into decoration without context. Instead, it
            borrows structure: repeated geometry, strong contrast, careful
            craftsmanship, and recognizable color.
          </p>

          <p>
            Those ideas become a clean digital system that can live on a
            website, mobile application, cup sleeve, menu, or storefront.
          </p>
        </div>
      </section>

      <section className="principles-section">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The visual language</p>
              <h2>Rooted, not costume-like</h2>
            </div>
          </div>

          <div className="principles-grid">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <article className="principle-card" key={principle.title}>
                  <div className="principle-icon">
                    <Icon size={25} />
                  </div>

                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="page-shell about-cta-content">
          <p>Ready to find your drink?</p>
          <h2>Start with something familiar. Leave with a new favorite.</h2>

          <Link className="light-button" href="/menu">
            Explore the menu
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}