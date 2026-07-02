import { useEffect, useRef } from "react";
import { gsap } from "../lib/anim";

// A restrained cursor: a 1px ink ring that trails the pointer and dilates
// over interactive elements. Hidden on touch / coarse pointers.
export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = ring.current;
    const d = dot.current;

    const xTo = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3.out" });
    const dxTo = gsap.quickTo(d, "x", { duration: 0.12, ease: "power2.out" });
    const dyTo = gsap.quickTo(d, "y", { duration: 0.12, ease: "power2.out" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dxTo(e.clientX);
      dyTo(e.clientY);
    };

    const enter = () => gsap.to(r, { scale: 2.4, duration: 0.4, ease: "power3.out" });
    const leave = () => gsap.to(r, { scale: 1, duration: 0.4, ease: "power3.out" });

    window.addEventListener("pointermove", move);
    const targets = document.querySelectorAll("a, button, [data-cursor]");
    targets.forEach((t) => {
      t.addEventListener("pointerenter", enter);
      t.addEventListener("pointerleave", leave);
    });
    gsap.to([r, d], { opacity: 1, duration: 0.6, delay: 0.3 });

    // Ring turns to a wax-seal red over the surfaces catalogue and contact.
    const redZones = ["superficies", "contacto"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const active = new Set();
    let observer;
    if (redZones.length) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) active.add(entry.target.id);
            else active.delete(entry.target.id);
          });
          gsap.to(r, {
            borderColor: active.size ? "#a3271c" : "#1a1611",
            duration: 0.5,
            ease: "power2.out",
          });
        },
        { threshold: 0.4 }
      );
      redZones.forEach((el) => observer.observe(el));
    }

    return () => {
      window.removeEventListener("pointermove", move);
      targets.forEach((t) => {
        t.removeEventListener("pointerenter", enter);
        t.removeEventListener("pointerleave", leave);
      });
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={ring}
        className="absolute left-0 top-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink opacity-0"
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink opacity-0"
      />
    </div>
  );
}
