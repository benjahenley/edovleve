# EDOVLEVE S.A. — sitio

Sitio institucional para **EDOVLEVE S.A.** (CUIT 30-71605670-4), estudio de
arquitectura, construcción, mobiliario y superficie con sede en La Plata,
Buenos Aires. Todo el contenido se deriva de la Constancia de Inscripción de
ARCA (única fuente de información de la empresa).

## Stack

- **Vite + React 19**
- **Tailwind CSS v4** (vía `@tailwindcss/vite`) — todo el estilado con clases
  utilitarias; `src/index.css` sólo contiene tokens de tema y primitivas que no
  se pueden expresar como utilidades.
- **GSAP + ScrollTrigger** — revelados por línea, parallax, galería horizontal
  fijada (pin) y transiciones.
- **Lenis** — scroll suave sincronizado con el ticker de GSAP.

## Dirección de diseño

Editorial, monocromo cálido (tinta / hueso), sin croma ni esquinas
redondeadas. Tipografía **Marcellus** (display, inspirada en la inscripción
romana, en la línea de la Optima de Porcelanosa) + **Hanken Grotesk** (texto).

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run preview  # previsualizar el build
```

## Estructura

- `src/data.js` — contenido derivado de la constancia de ARCA
- `src/lib/anim.js` — GSAP + helpers (`useGsap`, `splitWords`)
- `src/components/*` — secciones (Hero, Manifesto, Marquee, Divisions,
  Materials, Presence, Contact, Footer, Header, Cursor)
- `public/images/*` — fotografía (arquitectura, superficie, interiores, metal)
