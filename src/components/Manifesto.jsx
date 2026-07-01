import { useRef } from "react";
import { gsap, useGsap, splitWords } from "../lib/anim";
import { COMPANY } from "../data";

export default function Manifesto() {
  const stmt = useRef(null);

  useGsap(() => {
    const words = splitWords(stmt.current);
    gsap.set(words, { color: "var(--color-stone-2)" });
    gsap.to(words, {
      color: "var(--color-ink)",
      stagger: 1,
      ease: "none",
      scrollTrigger: {
        trigger: stmt.current,
        start: "top 78%",
        end: "bottom 55%",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      id="manifiesto"
      className="relative bg-bone px-gutter py-[clamp(6rem,16vh,12rem)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-12">
        <div className="md:col-span-3">
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-soft">
            Constituida en 2017. Seis disciplinas reunidas alrededor de una
            idea: la coherencia entre lo que se proyecta y lo que se construye.
          </p>
        </div>

        <div className="md:col-span-9">
          <p
            ref={stmt}
            className="font-display text-[clamp(1.8rem,4.4vw,3.6rem)] leading-[1.3] tracking-[-0.01em]">
            Trabajamos la superficie como se trabaja una idea: con paciencia,
            oficio y precisión. Edovleve reúne arquitectura, construcción y
            materia en un solo gesto.
          </p>
        </div>
      </div>
    </section>
  );
}
