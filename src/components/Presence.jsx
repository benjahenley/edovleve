import { gsap, useGsap, EASE } from "../lib/anim";
import { JURISDICTIONS } from "../data";

// Line-art marks lifted from growforce.agency's "criteria" icon set
// (Tight-knit Team / We Watch the Clock / Problem Solving / Contemporary
// Approach) — cycled across the five jurisdictions.
const ICONS = [
  // Tight-knit Team: two interlocking rounded squares — spins the opposite
  // way from the sunburst, for contrast.
  (props) => (
    <svg viewBox="0 0 91 75" fill="none" {...props}>
      <g className="icon-spin-rev">
        <rect
          x="80.1747"
          y="3.01674"
          width="69.654"
          height="69.654"
          rx="18.9565"
          transform="rotate(90 80.1747 3.01674)"
          stroke="currentColor"
          strokeWidth="4.40848"
        />
        <path
          d="M80.1748 21.9736L80.1748 31.7266C80.1748 37.3265 75.635 41.8662 70.0352 41.8662L20.6602 41.8662C15.0603 41.8662 10.5205 37.3265 10.5205 31.7266L10.5205 21.9736C10.5205 11.5043 19.0082 3.0166 29.4775 3.0166L61.2178 3.0166C71.6871 3.0166 80.1748 11.5043 80.1748 21.9736Z"
          stroke="currentColor"
          strokeWidth="4.40848"
        />
        <path
          d="M48.876 13.1562L48.876 31.7266C48.876 37.3265 44.3362 41.8662 38.7363 41.8662L20.6611 41.8662C15.0614 41.866 10.5225 37.3263 10.5225 31.7266L10.5225 21.9736C10.5225 11.5043 19.0091 3.0166 29.4785 3.0166L38.7363 3.0166C44.3362 3.0166 48.876 7.55635 48.876 13.1562Z"
          stroke="currentColor"
          strokeWidth="4.40848"
        />
      </g>
    </svg>
  ),
  // We Watch the Clock: sunburst — spins continuously, like the source.
  (props) => (
    <svg viewBox="0 0 83 87" fill="none" {...props}>
      <g className="icon-spin">
        <path
          d="M44.9482 28.5273L45.4521 31.2441L47.4561 29.3428L61.7842 15.7461L53.2812 33.5752L52.0928 36.0684L54.8311 35.708L74.417 33.1299L57.0566 42.5566L54.6289 43.875L57.0566 45.1934L74.417 54.6191L54.8311 52.042L52.0928 51.6816L53.2812 54.1748L61.7842 72.0029L47.4561 58.4072L45.4521 56.5059L44.9482 59.2227L41.3477 78.6465L37.7471 59.2227L37.2432 56.5059L35.2393 58.4072L20.9102 72.0029L29.4141 54.1748L30.6025 51.6816L27.8643 52.042L8.27734 54.6191L25.6387 45.1934L28.0664 43.875L25.6387 42.5566L8.27734 33.1299L27.8643 35.708L30.6025 36.0684L29.4141 33.5752L20.9102 15.7461L35.2393 29.3428L37.2432 31.2441L37.7471 28.5273L41.3477 9.10254L44.9482 28.5273Z"
          stroke="currentColor"
          strokeWidth="3"
        />
      </g>
    </svg>
  ),
  // Problem Solving: crossed capsules — spins slowly, clockwise.
  (props) => (
    <svg viewBox="0 0 85 75" fill="none" {...props}>
      <g className="icon-spin-slow2">
        <rect
          x="26.0977"
          y="3.375"
          width="33"
          height="69"
          rx="16.5"
          stroke="currentColor"
          strokeWidth="5"
        />
        <rect
          x="77.0977"
          y="21.375"
          width="33"
          height="69"
          rx="16.5"
          transform="rotate(90 77.0977 21.375)"
          stroke="currentColor"
          strokeWidth="5"
        />
      </g>
    </svg>
  ),
  // Contemporary Approach: circle banded by a diagonal ring — the ring
  // slowly rotates, matching the source's rotating band.
  (props) => (
    <svg viewBox="0 0 75 75" fill="none" {...props}>
      <circle cx="37.5" cy="37.5" r="30" stroke="currentColor" strokeWidth="3.5" />
      <ellipse
        className="icon-spin-slow"
        cx="37.5"
        cy="37.5"
        rx="30"
        ry="11"
        stroke="currentColor"
        strokeWidth="3.5"
        transform="rotate(-24 37.5 37.5)"
      />
    </svg>
  ),
  // Sierra fan (own design, for San Luis): three capsules crossed at 60°,
  // a six-pointed rosette that turns slowly — kin to the crossed capsules
  // and the sunburst.
  (props) => (
    <svg viewBox="0 0 75 75" fill="none" {...props}>
      <g className="icon-spin-slow">
        <rect
          x="21"
          y="3"
          width="33"
          height="69"
          rx="16.5"
          stroke="currentColor"
          strokeWidth="5"
        />
        <rect
          x="21"
          y="3"
          width="33"
          height="69"
          rx="16.5"
          stroke="currentColor"
          strokeWidth="5"
          transform="rotate(60 37.5 37.5)"
        />
        <rect
          x="21"
          y="3"
          width="33"
          height="69"
          rx="16.5"
          stroke="currentColor"
          strokeWidth="5"
          transform="rotate(120 37.5 37.5)"
        />
      </g>
    </svg>
  ),
];

// Editorial descriptions — one per jurisdiction, written for tone rather
// than pulled from the registration record.
const BLURBS = {
  901: "La densidad porteña impone otro ritmo: cada obra responde a una ciudad que no se detiene.",
  902: "Del conurbano a la llanura, la provincia despliega una escala que exige presencia constante.",
  913: "Entre viñedos y cordillera, la construcción dialoga con un paisaje de geometría propia.",
  912: "Sol templado y adobe antiguo: la tradición riojana encuentra formas nuevas de habitar.",
  919: "Las sierras puntanas enmarcan una arquitectura que crece hacia la piedra y la altura.",
};

export default function Presence() {
  useGsap(() => {
    gsap.from(".jur-row", {
      yPercent: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.09,
      ease: EASE,
      scrollTrigger: { trigger: ".jur-list", start: "top 82%" },
    });
  }, []);

  return (
    <section
      id="presencia"
      className="bg-bone px-gutter py-[clamp(6rem,16vh,12rem)] text-ink">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 md:mb-24 md:px-[3vw]">
          <h2 className="text-balance font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.95]">
            Cinco jurisdicciones
            <br /> del convenio multilateral
          </h2>
        </div>

        <div className="jur-list flex flex-col">
          {JURISDICTIONS.map((j, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={j.code}
                className="jur-row grid grid-cols-1 gap-6 border-t-2 border-black py-10 md:grid-cols-2 md:gap-14 md:py-16">
                <div className="flex items-start justify-between md:px-[3vw]">
                  <Icon className="h-[54px] w-[54px] shrink-0 text-ink md:h-[75px] md:w-[75px]" />
                  <div className="mt-2 text-right md:mt-6">
                    <h3 className="text-[0.85rem] font-medium uppercase tracking-[0.16em] text-ink md:text-[1rem]">
                      {j.name}
                    </h3>
                  </div>
                </div>
                <p className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.05] text-ink">
                  {BLURBS[j.code]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
