import { useEffect, useState } from "react";
import { gsap, useGsap, EASE_EXPO } from "../lib/anim";
import { NAV, COMPANY } from "../data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const scope = useGsap(() => {
    // Navbar is the last piece of the load-in sequence — it settles in
    // once the hero's headline and fade-ins have finished revealing.
    gsap.from(scope.current, {
      yPercent: -100,
      opacity: 0,
      duration: 0.8,
      delay: 1.2,
      ease: EASE_EXPO,
    });
  }, []);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el)
      window.lenis
        ? window.lenis.scrollTo(el, { offset: -20 })
        : el.scrollIntoView();
  };

  return (
    <>
      <header
        ref={scope}
        className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
        {/* Background lives on a child, not the fixed element itself — iOS
            Safari samples the fixed element's background-color to tint the
            status-bar / dynamic-island area, and a translucent one lets page
            content show through up there. */}
        <div
          aria-hidden
          className={`absolute inset-0 border-b transition-[background-color,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "border-line bg-bone/85 backdrop-blur-md"
              : "border-transparent"
          }`}
        />
        <div
          className={`relative flex items-center justify-between px-gutter transition-[padding] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "py-4" : "py-6 md:py-8"
          }`}>
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            className="font-display text-ink"
            aria-label={COMPANY.legalName}>
            <span
              className={`block leading-none tracking-[0.28em] transition-all duration-700 ${
                scrolled ? "text-lg" : "text-xl md:text-2xl"
              }`}>
              {COMPANY.wordmark}
            </span>
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => go(e, n.href)}
                className="group relative text-[0.7rem] uppercase tracking-[0.24em] text-ink-soft">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-6 w-8 flex-col items-end justify-center gap-[6px] md:hidden"
            aria-label="Menú">
            <span
              className={`h-px bg-ink transition-all duration-500 ${
                open ? "w-6 translate-y-[3.5px] rotate-45" : "w-8"
              }`}
            />
            <span
              className={`h-px bg-ink transition-all duration-500 ${
                open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-5"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-bone px-gutter transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}>
        <nav className="flex flex-col gap-2">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={(e) => go(e, n.href)}
              className="border-b border-line-soft py-4 font-display text-4xl text-ink"
              style={{ transitionDelay: `${i * 40}ms` }}>
              <span className="mr-4 text-xs align-super text-stone">
                0{i + 1}
              </span>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
