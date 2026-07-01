import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./lib/anim";

import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Marquee from "./components/Marquee";
import Divisions from "./components/Divisions";
import Materials from "./components/Materials";
import Presence from "./components/Presence";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Keep pinned/scrubbed triggers accurate once images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.lenis = null;
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="grain relative">
      <Cursor />
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Marquee />
        <Divisions />
        <Materials />
        <Presence />
      </main>
      <Footer />
    </div>
  );
}
