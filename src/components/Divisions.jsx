import { useRef } from "react";
import { gsap, ScrollTrigger, useGsap, EASE } from "../lib/anim";
import { DIVISIONS } from "../data";

export default function Divisions() {
  const stageRef = useRef(null);

  useGsap(() => {
    // Mobile / fallback: simple per-row reveal, each division scrolls past.
    const rows = gsap.utils.toArray(".division-row");
    rows.forEach((row) => {
      const frame = row.querySelector(".division-frame");
      const image = row.querySelector(".division-img");
      const reveals = row.querySelectorAll("[data-reveal]");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: row, start: "top 75%" },
      });
      tl.fromTo(
        frame,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: EASE },
      )
        .fromTo(
          image,
          { scale: 1.4 },
          { scale: 1, duration: 1.6, ease: EASE },
          0,
        )
        .fromTo(
          reveals,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.08, ease: EASE },
          0.35,
        );

      gsap.to(image, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: row,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Desktop: the stage pins in place and each division slides up over the
    // last, like a stacked deck, while the copy crossfades in step.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const stage = stageRef.current;
      if (!stage) return;
      const images = gsap.utils.toArray(".division-stack-img", stage);
      const texts = gsap.utils.toArray(".division-stack-text", stage);
      const n = images.length;
      if (n < 2) return;

      gsap.set(images, { yPercent: 100 });
      gsap.set(images[0], { yPercent: 0 });
      gsap.set(texts, { autoAlpha: 0, yPercent: 14 });
      gsap.set(texts[0], { autoAlpha: 1, yPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => "+=" + (n - 1) * window.innerHeight,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < n; i++) {
        const pos = i - 1;
        tl.to(
          images[i],
          { yPercent: 0, duration: 1, ease: "power2.inOut" },
          pos,
        )
          .to(
            texts[i - 1],
            {
              autoAlpha: 0,
              yPercent: -14,
              duration: 0.6,
              ease: "power2.inOut",
            },
            pos,
          )
          .to(
            texts[i],
            { autoAlpha: 1, yPercent: 0, duration: 0.6, ease: "power2.inOut" },
            pos + 0.4,
          );
      }

      return () => {
        gsap.set(images, { clearProps: "all" });
        gsap.set(texts, { clearProps: "all" });
      };
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      id="divisiones"
      className="bg-bone px-gutter py-[clamp(5rem,12vh,9rem)] md:px-0 md:py-0">
      <div className="mx-auto max-w-[1400px] px-0 md:px-gutter md:pt-[clamp(5rem,12vh,9rem)]">
        <div className="mb-16 flex flex-col justify-between gap-6 border-b border-line pb-8 md:mb-16 md:flex-row md:items-end">
          <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-none">
            Divisiones
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            Seis actividades, un mismo estándar. Cada división opera de forma
            autónoma y converge en la obra terminada.
          </p>
        </div>
      </div>

      {/* Desktop: pinned stack — one frame, divisions cycle through it. */}
      <div
        ref={stageRef}
        className="division-stage relative hidden h-[100svh] md:flex md:items-center">
        <div className="mx-auto w-full max-w-[1400px] px-gutter">
          <div className="grid grid-cols-12 gap-x-12">
            <div
              className="division-frame-stack relative col-span-7 h-[70vh] overflow-hidden bg-bone-2"
              data-cursor>
              {DIVISIONS.map((d) => (
                <div
                  key={d.index}
                  className="division-stack-img absolute inset-0">
                  <img
                    src={d.image}
                    alt={d.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="division-text-stack relative col-span-5 h-[70vh] pl-8">
              {DIVISIONS.map((d) => (
                <div
                  key={d.index}
                  className="division-stack-text absolute inset-0 flex flex-col justify-center">
                  <h3 className="font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.92]">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-stone">
                    {d.subtitle}
                  </p>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: original stacked-row layout. */}
      <div className="mx-auto flex max-w-[1400px] flex-col gap-y-[clamp(5rem,12vh,10rem)] px-gutter md:hidden">
        {DIVISIONS.map((d) => (
          <article
            key={d.index}
            className="division-row group grid grid-cols-1 items-center gap-y-8">
            <div
              className="division-frame relative aspect-[4/5] overflow-hidden bg-bone-2"
              data-cursor>
              <img
                src={d.image}
                alt={d.title}
                className="division-img img-reveal h-[112%] w-full -translate-y-[6%] object-cover group-hover:scale-[1.03]"
              />
            </div>

            <div>
              <div className="mt-4 overflow-hidden pb-[0.08em]">
                <h3
                  data-reveal
                  className="block font-display text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[0.92]">
                  {d.title}
                </h3>
              </div>

              <div className="mt-6 max-w-md overflow-hidden">
                <p
                  data-reveal
                  className="block text-sm leading-relaxed text-ink-soft">
                  {d.body}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
