import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Signature easing used across the site — a long, refined settle.
export const EASE = "power3.out";
export const EASE_EXPO = "expo.out";

/**
 * Splits an element's text into word spans wrapped in overflow-hidden lines
 * so words can be swept up from a mask. Returns the created word nodes.
 */
export function splitWords(el) {
  const text = el.textContent;
  el.textContent = "";
  el.setAttribute("aria-label", text);
  const words = text.split(/(\s+)/);
  const nodes = [];
  words.forEach((w) => {
    if (/^\s+$/.test(w)) {
      el.appendChild(document.createTextNode(" "));
      return;
    }
    const mask = document.createElement("span");
    mask.style.display = "inline-block";
    mask.style.overflow = "hidden";
    mask.style.verticalAlign = "top";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = w;
    inner.setAttribute("aria-hidden", "true");
    mask.appendChild(inner);
    el.appendChild(mask);
    nodes.push(inner);
  });
  return nodes;
}

/**
 * Scoped GSAP effects with automatic cleanup. Pass a callback that receives
 * the scope element; use gsap/ScrollTrigger freely inside — everything is
 * reverted on unmount (and on StrictMode's double-invoke).
 */
export function useGsap(setup, deps = []) {
  const scope = useRef(null);
  useLayoutEffect(() => {
    // Scope selectors to the element when a ref is attached; otherwise run
    // globally so component-unique class names still resolve.
    const ctx = gsap.context(setup, scope.current || undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return scope;
}
