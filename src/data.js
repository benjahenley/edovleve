// All content derived from the ARCA "Constancia de Inscripción" for EDOVLEVE S.A.
// CUIT 30-71605670-4 — the only authoritative record of the company.

export const COMPANY = {
  legalName: "EDOVLEVE S.A.",
  wordmark: "EDOVLEVE",
  cuit: "30-71605670-4",
  form: "Sociedad Anónima",
  incorporated: "2017",
  incorporatedFull: "06 · 12 · 2017",
  fiscalClose: "Octubre",
  email: "edovleve@gmail.com",
  address: {
    street: "Calle 12 Nº 736 · Piso 5",
    between: "entre 46 y 47",
    city: "La Plata",
    zip: "B1900",
    province: "Buenos Aires · Argentina",
  },
  office: {
    street: "Suipacha 760 · Piso 6",
    city: "C.A.B.A.",
    province: "Buenos Aires · Argentina",
  },
};

// The six registered activities, reframed as design divisions.
export const DIVISIONS = [
  {
    index: "01",
    code: "475410",
    title: "Mobiliario",
    subtitle: "Interiorismo & equipamiento del hogar",
    body: "Venta al por menor de muebles para el hogar, artículos de mimbre y corcho. Piezas seleccionadas para habitar el espacio doméstico con carácter.",
    image: "/images/interior-furniture.jpg",
  },
  {
    index: "02",
    code: "711009",
    title: "Arquitectura",
    subtitle: "Ingeniería & asesoramiento técnico",
    body: "Servicios de arquitectura e ingeniería y servicios conexos de asesoramiento técnico. El proyecto como origen de toda materia construida.",
    image: "/images/arch-facade.jpg",
  },
  {
    index: "03",
    code: "410011",
    title: "Construcción",
    subtitle: "Obra residencial & no residencial",
    body: "Construcción, reforma y reparación de edificios residenciales y no residenciales. La ejecución precisa de aquello que se ha proyectado.",
    image: "/images/arch-construction.jpg",
  },
  {
    index: "04",
    code: "475290",
    title: "Materiales",
    subtitle: "Superficies & materia prima",
    body: "Venta al por menor de materiales de construcción. Piedra, cerámica y superficie: el vocabulario físico de cada obra.",
    image: "/images/marble-01.jpg",
  },
  {
    index: "05",
    code: "711001",
    title: "Servicios",
    subtitle: "Coordinación integral de obra",
    body: "Servicios relacionados con la construcción. Dirección, logística y oficios reunidos bajo una misma disciplina.",
    image: "/images/bath-01.jpg",
  },
  {
    index: "06",
    code: "259999",
    title: "Metalistería",
    subtitle: "Fabricación de productos de metal",
    body: "Fabricación de productos elaborados de metal N.C.P. La estructura, la carpintería metálica y el detalle a medida.",
    image: "/images/metal-fab.jpg",
  },
];

// Horizontal surfaces gallery.
export const SURFACES = [
  { src: "/images/hero-hall.jpg", caption: "Mármol", tag: "Piedra natural" },
  { src: "/images/wood-grain.jpg", caption: "Veta abierta", tag: "Madera" },
  { src: "/images/metal-weld.jpg", caption: "Chispas de forja", tag: "Metal" },
  { src: "/images/interior-wide.jpg", caption: "Interior continuo", tag: "Espacio" },
  { src: "/images/bath-02.jpg", caption: "Baño en piedra", tag: "Hábitat" },
  { src: "/images/interior-kitchen.jpg", caption: "Piso cerámico", tag: "Materia" },
  { src: "/images/interior-showroom.jpg", caption: "Sala de muestras", tag: "Mobiliario" },
];

export const FACTS = [
  { value: 2017, label: "Año de constitución", suffix: "", format: "year" },
  { value: 6, label: "Actividades registradas", suffix: "" },
  { value: 5, label: "Jurisdicciones activas", suffix: "" },
  { value: 100, label: "Convenio multilateral", suffix: "%" },
];

export const JURISDICTIONS = [
  { code: "901", name: "C.A.B.A.", since: "11 · 2025" },
  { code: "902", name: "Buenos Aires", since: "10 · 2024" },
  { code: "913", name: "Mendoza", since: "10 · 2024" },
  { code: "912", name: "La Rioja", since: "10 · 2024" },
  { code: "919", name: "San Luis", since: "10 · 2024" },
];

export const NAV = [
  { label: "Estudio", href: "#manifiesto" },
  { label: "Divisiones", href: "#divisiones" },
  { label: "Superficies", href: "#superficies" },
  { label: "Presencia", href: "#presencia" },
];
