import { useRef } from "react";
import { gsap, ScrollTrigger, useGsap, EASE_EXPO } from "../lib/anim";
import { COMPANY } from "../data";

const HEADLINE = ["Superficie,", "estructura", "y hábitat."];

export default function Hero() {
  const imgWrap = useRef(null);
  const img = useRef(null);

  const scope = useGsap(() => {
    // Intro — image uncovers, words sweep up from their masks.
    const words = gsap.utils.toArray(".hero-word");
    gsap.set(words, { yPercent: 120 });
    gsap.set(img.current, { scale: 1.25 });

    const tl = gsap.timeline({ defaults: { ease: EASE_EXPO } });
    tl.to(img.current, { scale: 1, duration: 1.9 }, 0)
      .to(".hero-cover", { yPercent: -101, duration: 1.5 }, 0.1)
      .to(words, { yPercent: 0, duration: 1.5, stagger: 0.12 }, 0.55)
      .fromTo(
        ".hero-fade",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.4, stagger: 0.12 },
        0.9,
      );

    // Parallax + soft dissolve on scroll. Runs on the WRAPPER, not the img —
    // the intro tween owns the img's scale, and sharing the property makes
    // the first scroll snap the image back to its pre-intro size.
    gsap.to(imgWrap.current, {
      yPercent: 18,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".hero-content", {
      yPercent: -40,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={scope}
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-bone-2">
      <div ref={imgWrap} className="absolute inset-0 overflow-hidden">
        <img
          ref={img}
          src="/images/hero-hall.jpg"
          alt="Columnata de mármol"
          className="h-full w-full object-cover"
        />
        {/* light scrim so ink type stays legible over bright stone */}
        <div className="absolute inset-0 bg-gradient-to-t from-bone/70 via-bone/5 to-bone/45" />
        {/* cover panel that lifts on load */}
        <div className="hero-cover absolute inset-0 z-10 bg-bone" />
      </div>

      <div className="hero-content relative z-20 flex h-full flex-col justify-start px-gutter pb-[clamp(2rem,5vh,4rem)] pt-[24vh] md:pt-[18vh]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-14">
          <h1 className="font-display text-ink text-[clamp(3.2rem,12vw,12rem)] leading-[1.14] md:flex-1">
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span className="hero-word inline-block">{line}</span>
              </span>
            ))}
          </h1>

          <div className="flex flex-col gap-6 border-t border-line pt-6 md:w-64 md:shrink-0 md:border-t-0 md:border-l md:pb-2 md:pl-8 md:pt-0">
            <p className="hero-fade text-sm font-normal leading-relaxed text-ink md:text-base">
              Estudio de arquitectura, construcción y superficie. Del proyecto a
              la materia, un mismo lenguaje para el espacio contemporáneo.
            </p>
            <div className="hero-fade flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-ink-soft">
              Desplazar
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
