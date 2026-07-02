import { gsap, useGsap, splitWords } from "../lib/anim";
import { useRef } from "react";
import { COMPANY } from "../data";

export default function Footer() {
  const wordmark = useRef(null);

  useGsap(() => {
    const words = splitWords(wordmark.current);
    gsap.set(words, { yPercent: 120 });
    gsap.to(words, {
      yPercent: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: { trigger: wordmark.current, start: "top 82%" },
    });
    gsap.from(".contact-meta", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".contact-grid", start: "top 78%" },
    });
  }, []);

  return (
    <section
      id="contacto"
      data-nav-dark
      className="overflow-hidden bg-ink px-gutter py-[clamp(6rem,16vh,12rem)] text-bone">
      <div className="mx-auto max-w-[1400px]">
        <h2
          ref={wordmark}
          className="wordmark-hover font-display text-[clamp(3.5rem,13vw,11rem)] leading-[0.85] tracking-[0.02em] text-bone"
          style={{ overflow: "hidden" }}>
          {COMPANY.wordmark}
        </h2>

        <div className="contact-grid mt-20 grid grid-cols-1 gap-y-12 border-t border-line-invert pt-12 md:grid-cols-3 md:gap-x-12">
          <div className="contact-meta">
            <div className="eyebrow mb-4 text-stone-2">Dirección</div>
            <address className="not-italic text-lg leading-relaxed text-bone">
              {COMPANY.address.street}
              <br />
              {COMPANY.address.zip} {COMPANY.address.city}
              <br />
              {COMPANY.address.province}
            </address>
            <br />
            <div className="eyebrow mb-4 text-stone-2">
              Oficinas comerciales
            </div>
            <address className="not-italic text-lg leading-relaxed text-bone">
              {COMPANY.office.street}
              <br />
              {COMPANY.office.city}
              <br />
              {COMPANY.office.province}
            </address>
          </div>

          <div className="contact-meta">
            <div className="eyebrow mb-4 text-stone-2">Consultas</div>
            <a
              href={`mailto:${COMPANY.email}`}
              className="group flex w-fit items-center gap-2 text-lg text-bone">
              {COMPANY.email}
              <span className="inline-block h-px w-6 bg-bone transition-all duration-500 group-hover:w-10" />
            </a>
            <a
              href="https://wa.me/5491151856492"
              target="_blank"
              rel="noreferrer"
              className="group mt-3 flex w-fit items-center gap-2 text-lg text-bone">
              +54 9 11 5185-6492
              <span className="inline-block h-px w-6 bg-bone transition-all duration-500 group-hover:w-10" />
            </a>
          </div>

          <div className="contact-meta">
            <div className="eyebrow mb-4 text-stone-2">Identificación</div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-line-invert pb-3">
                <dt className="text-stone-2">Razón social</dt>
                <dd className="text-bone">{COMPANY.legalName}</dd>
              </div>
              <div className="flex justify-between border-b border-line-invert pb-3">
                <dt className="text-stone-2">CUIT</dt>
                <dd className="text-bone">{COMPANY.cuit}</dd>
              </div>
              <div className="flex justify-between pb-3">
                <dt className="text-stone-2">Forma jurídica</dt>
                <dd className="text-bone">{COMPANY.form}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-16 border-t border-line-invert pt-8 text-[0.68rem] text-center uppercase tracking-[0.2em] text-stone-2">
          © {new Date().getFullYear()} · {COMPANY.legalName}
        </div>
      </div>
    </section>
  );
}
