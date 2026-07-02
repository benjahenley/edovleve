import { useRef } from "react";
import { gsap, ScrollTrigger, useGsap } from "../lib/anim";
import { SURFACES, COMPANY } from "../data";

export default function Materials() {
  const track = useRef(null);

  const scope = useGsap(() => {
    const amount = () => track.current.scrollWidth - window.innerWidth;

    gsap.to(track.current, {
      x: () => -amount(),
      ease: "none",
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: () => "+=" + amount(),
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // subtle inner-image drift for depth as cards move through view
    gsap.utils.toArray(".surface-img").forEach((im) => {
      gsap.fromTo(
        im,
        { xPercent: -8 },
        {
          xPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: () => "+=" + amount(),
            scrub: true,
          },
        },
      );
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      id="superficies"
      ref={scope}
      data-nav-dark
      className="relative h-[100svh] overflow-hidden bg-ink text-bone">
      <div
        ref={track}
        className="flex h-full w-max items-center will-change-transform">
        {/* Intro panel */}
        <div className="flex h-full w-[86vw] shrink-0 flex-col justify-center px-gutter md:w-[46vw]">
          <div className="eyebrow flex items-center gap-3 text-stone-2">
            <span className="inline-block h-px w-8 bg-stone-2" />
            Catálogo de superficies
          </div>
          <h2 className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-bone">
            La materia,
            <br /> de cerca.
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-stone-2">
            Piedra natural, cerámica y metal. Un recorrido horizontal por las
            superficies con las que {COMPANY.wordmark} da forma al espacio.
          </p>
          <div className="mt-10 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-stone-2">
            Arrastrar
            <span className="inline-block h-px w-16 bg-stone-2" />
          </div>
        </div>

        {/* Surface cards */}
        {SURFACES.map((s, i) => (
          <div key={s.src} className="relative mr-[3vw] shrink-0">
            <figure
              className="relative z-10 h-[64vh] w-[74vw] overflow-hidden bg-ink-soft md:h-[70vh] md:w-[34vw]"
              data-cursor>
              <img
                src={s.src}
                alt={s.caption}
                className="surface-img h-full w-[118%] max-w-none object-cover"
              />
              <figcaption className="absolute z-100 inset-x-0 bottom-0 flex items-end justify-between p-4 text-bone md:p-6">
                <span className="font-display text-base md:text-2xl">
                  {s.caption}
                </span>
              </figcaption>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
