import clsx from "clsx";

export type DrinkArtwork =
  | "cornflower"
  | "cherry"
  | "honey"
  | "matcha"
  | "mocha"
  | "classic"
  | "berry"
  | "kupalle"
  | "birch";

type DrinkIllustrationProps = {
  artwork: DrinkArtwork;
  compact?: boolean;
};

const drinkLabels: Record<
  DrinkArtwork,
  {
    top: string;
    bottom: string;
    note: string;
  }
> = {
  cornflower: {
    top: "ВАСIЛЁК",
    bottom: "Cornflower",
    note: "blueberry · matcha",
  },
  cherry: {
    top: "ВІШНЯ",
    bottom: "Cherry",
    note: "cherry · cocoa",
  },
  honey: {
    top: "ЛЁН",
    bottom: "Linen",
    note: "honey · sea salt",
  },
  matcha: {
    top: "ПОЛЕ",
    bottom: "Field",
    note: "strawberry · matcha",
  },
  mocha: {
    top: "ЛЕС",
    bottom: "Forest",
    note: "dark cocoa · cherry",
  },
  classic: {
    top: "КАВА",
    bottom: "Coffee",
    note: "simple · familiar",
  },
  berry: {
    top: "ЯГАДЫ",
    bottom: "Berries",
    note: "wild berry · sparkle",
  },
  kupalle: {
    top: "ЗАХАД",
    bottom: "Sunset",
    note: "hibiscus · lemonade",
  },
  birch: {
    top: "БЯРОЗА",
    bottom: "Birch",
    note: "apple · white peach",
  },
};

function DrinkGarnish() {
  return (
    <>
      <div className="drink-garnish garnish-left">
        <span className="garnish-stem" />
        <span className="garnish-leaf leaf-one" />
        <span className="garnish-leaf leaf-two" />
        <span className="garnish-fruit fruit-one" />
        <span className="garnish-fruit fruit-two" />
      </div>

      <div className="drink-garnish garnish-right">
        <span className="garnish-stem" />
        <span className="garnish-leaf leaf-one" />
        <span className="garnish-fruit fruit-one" />
      </div>
    </>
  );
}

export function DrinkIllustration({
  artwork,
  compact = false,
}: DrinkIllustrationProps) {
  const label = drinkLabels[artwork];

  return (
    <div
      aria-hidden="true"
      className={clsx(
        "drink-illustration",
        `drink-illustration-${artwork}`,
        compact && "drink-illustration-compact",
      )}
    >
      <div className="drink-art-halo" />

      <div className="drink-art-scribble scribble-one" />
      <div className="drink-art-scribble scribble-two" />

      <span className="drink-art-sparkle sparkle-one">
        ✦
      </span>

      <span className="drink-art-sparkle sparkle-two">
        ✧
      </span>

      <div className="drink-art-straw" />

      <div className="drink-art-vessel">
        <div className="drink-art-handle" />

        <div className="drink-art-rim" />

        <div className="drink-art-fill">
          <div className="drink-layer layer-bottom" />
          <div className="drink-layer layer-middle" />
          <div className="drink-layer layer-top" />

          <div className="drink-foam">
            <span className="foam-peak foam-peak-one" />
            <span className="foam-peak foam-peak-two" />
            <span className="foam-peak foam-peak-three" />
          </div>

          <span className="ice-cube ice-one" />
          <span className="ice-cube ice-two" />
          <span className="ice-cube ice-three" />
          <span className="ice-cube ice-four" />

          <span className="drink-bubble bubble-one" />
          <span className="drink-bubble bubble-two" />
          <span className="drink-bubble bubble-three" />
        </div>

        <div className="drink-art-highlight" />

        <div className="drink-art-label">
          <span>{label.top}</span>
          <small>{label.bottom}</small>
        </div>
      </div>

      <DrinkGarnish />

      <span className="drink-art-note">
        {label.note}
      </span>
    </div>
  );
}