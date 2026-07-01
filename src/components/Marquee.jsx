const WORDS = [
  "Arquitectura",
  "Construcción",
  "Mobiliario",
  "Materiales",
  "Metalistería",
  "Superficie",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display text-[clamp(2.2rem,7vw,6rem)] leading-none text-bone">
            {w}
          </span>
          <span className="mx-8 inline-block h-2 w-2 rotate-45 border border-bone/50 md:mx-14" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y border-line-invert bg-ink py-8 md:py-12">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </section>
  );
}
