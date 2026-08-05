const tickerItems = [
  "Sustainably sourced",
  "Fair-trade partners",
  "Small-batch roasted",
  "Coffee for the community",
  "Made with curiosity",
];

function TickerContent() {
  return (
    <span className="ticker-content">
      {tickerItems.map((item) => (
        <span key={item}>
          {item}
          <i aria-hidden="true">✦</i>
        </span>
      ))}
    </span>
  );
}

export function SiteTicker() {
  return (
    <div className="site-ticker" aria-label="Our coffee values">
      <div className="ticker-track">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
