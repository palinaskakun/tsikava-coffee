import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flower2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "The language, coffee rituals, and Belarusian curiosity behind TSIKAVA.",
};

const words = [
  {
    belarusian: "ЦІКАВА",
    transliteration: "tsikava",
    meaning: "interesting",
    description: "A small invitation to be curious, notice more, and stay for one more conversation.",
    tone: "blue",
  },
  {
    belarusian: "КАВА",
    transliteration: "kava",
    meaning: "coffee",
    description: "The familiar part of the ritual. A thoughtful cup, made with attention and served without rushing.",
    tone: "coffee",
  },
  {
    belarusian: "ГАРБАТА",
    transliteration: "harbata",
    meaning: "tea",
    description: "A gentler pause. Warm, fragrant, and just as much a reason to sit down for a while.",
    tone: "tea",
  },
  {
    belarusian: "ВАСІЛЁК",
    transliteration: "vasilyok",
    meaning: "cornflower",
    description: "A familiar blue bloom that adds a soft Belarusian reference to our color and our point of view.",
    tone: "flower",
  },
];

export default function AboutPage() {
  return (
    <main className="about-page page-main">
      <section className="about-hero">
        <Flower2 aria-hidden="true" className="about-flower about-flower-hero" />
        <Flower2 aria-hidden="true" className="about-flower about-flower-hero-small" />

        <Reveal className="page-shell about-hero-grid">
          <div>
            <p className="eyebrow">Why TSIKAVA?</p>
            <h1>Curiosity translated into coffee.</h1>
          </div>

          <div className="about-intro">
            <p>
              <strong>Цікава</strong> means “interesting” in Belarusian. It is a word that feels like an open door, a reason to look closer, ask a question, or stay a little longer.
            </p>

            <p>
              TSIKAVA brings that feeling into a modern cafe. We make familiar drinks with care, create warm places to pause, and let small cultural details do the talking.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="page-shell story-section">
        <Reveal className="story-visual" aria-hidden="true">
          <div className="story-orbit story-orbit-one" />
          <div className="story-orbit story-orbit-two" />


          <div className="story-word">
            <span>ЦІКАВА</span>
            <div aria-hidden="true" className="story-word-ornament" />
            <small>stay curious</small>
          </div>
        </Reveal>

        <Reveal className="story-text" delay={1}>
          <p className="section-number">The idea</p>

          <h2>A coffeehouse with a point of view.</h2>

          <p>
            TSIKAVA began with the kind of details that make a place stay with you: the deep red of a woven ornament, a flash of cornflower blue, a word you want to learn how to say, and the first warm sip that tells you there is nowhere else to be for a minute.
          </p>

          <p>
            We use Belarusian references as a thread. They move quietly through the cafe in the names we choose, the things we make, and the small surprises that reward a closer look. The result should feel welcoming first, interesting second, and unmistakably TSIKAVA by the time you leave.
          </p>

        </Reveal>
      </section>

      <section className="belarus-context-section">
        <div className="page-shell belarus-context-grid">
          <Reveal className="belarus-context-copy">
            <p className="eyebrow">Belarus, in context</p>
            <h2>A country at the center of Eastern Europe.</h2>
            <p>
              Belarus is a landlocked country between Poland, Lithuania, Latvia, Russia, and Ukraine. Its compact, gently irregular outline sits at a crossroads of languages, landscapes, and long shared histories.
            </p>
            <p>
              For TSIKAVA, that context is a starting point. We are not trying to recreate a place. We are carrying a few details from it into a new coffeehouse ritual.
            </p>
          </Reveal>

          <Reveal className="belarus-outline-card" delay={1}>
            <img
              alt="Outline map of Belarus"
              className="belarus-outline"
              src="/images/belarus-outline.svg"
            />
            <p>Eastern Europe</p>
          </Reveal>
        </div>
      </section>

      <section className="about-words-section">
        <Flower2 aria-hidden="true" className="about-flower about-flower-words" />
        <div className="page-shell">
          <Reveal className="section-heading about-words-heading">
            <div>
              <p className="eyebrow">A small Belarusian glossary</p>
              <h2>Words worth keeping close.</h2>
            </div>
            <p>Each one is part of the TSIKAVA world and a small cue for how we want the cafe to feel.</p>
          </Reveal>

          <div className="about-word-grid">
            {words.map((word, index) => (
              <Reveal delay={(index % 3 + 1) as 1 | 2 | 3} key={word.belarusian}>
                <article className={`about-word-card about-word-card-${word.tone}`}>
                  <p className="about-word-belarusian">{word.belarusian}</p>
                  <p className="about-word-transliteration">{word.transliteration}</p>
                  <h3>{word.meaning}</h3>
                  <p>{word.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <Reveal className="page-shell about-cta-content">
          <p>Something familiar, made interesting</p>
          <h2>Find the drink that meets your day where it is.</h2>

          <Link className="light-button menu-cta-button" href="/menu">
            Explore the menu
            <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
