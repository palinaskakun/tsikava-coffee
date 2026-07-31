import clsx from "clsx";

export type DrinkArtwork =
  | "cornflower"
  | "cherry"
  | "honey"
  | "matcha"
  | "mocha"
  | "classic";

type DrinkIllustrationProps = {
  artwork: DrinkArtwork;
  compact?: boolean;
};

export function DrinkIllustration({
  artwork,
  compact = false,
}: DrinkIllustrationProps) {
  return (
    <div
      className={clsx(
        "drink-illustration",
        `drink-illustration-${artwork}`,
        compact && "drink-illustration-compact",
      )}
      aria-hidden="true"
    >
      <div className="illustration-orbit orbit-one" />
      <div className="illustration-orbit orbit-two" />

      <div className="illustration-flower flower-a">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>

      <div className="illustration-flower flower-b">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>

      <div className="illustration-cup">
        <div className="illustration-cup-rim" />
        <div className="illustration-liquid" />
        <div className="illustration-steam steam-one" />
        <div className="illustration-steam steam-two" />

        <div className="illustration-cup-band">
          <span>◆</span>
          <span>◇</span>
          <span>◆</span>
        </div>
      </div>

      <div className="illustration-sparkle sparkle-one">✦</div>
      <div className="illustration-sparkle sparkle-two">✧</div>
    </div>
  );
}