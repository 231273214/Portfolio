export interface ProjectDetailData {
  role: string;
  year: string;
  duration: string;
  links: { site?: string; github?: string };
  stack: string[];
  screens: { label: string; image?: string }[];
  problem?: { text: string; before: string[] };
  solution?: {
    text: string;
    after: string[];
    beforeImage?: string;
    afterImage?: string;
  };
  process?: { title: string; text: string }[];
  metrics?: { value: number; prefix?: string; suffix?: string; label: string }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  hue: number;
  detail?: ProjectDetailData;
  image?: string;
  mobileImage?: string;
  hidden?: boolean;
}

const allProjects: Project[] = [
  {
    id: "proyecto-1",
    title: "Proyecto 1",
    image: "/public/projects/project_1/home.png",
    mobileImage: "/public/projects/project_1/mobile.png",
    subtitle: "E-commerce",
    category: "Web App",
    description: "Descripción breve.",
    tags: ["React", "Stripe"],
    hue: 200,
    detail: {
      role: "UX/UI + Frontend",
      year: "2026",
      duration: "3 meses",
      links: { site: "https://ejemplo.com", github: "https://github.com/tu-usuario/repo" },
      stack: ["React", "Tailwind CSS", "Stripe", "Framer Motion"],
      screens: [
        { label: "Home", image: "/projects/project_1/home.png" },
        { label: "Catálogo", image: "/projects/project_1/productos.png" },
        { label: "Carrito", image: "/projects/project_1/carrito.png" },
      ],
      problem: {
        text: "El e-commerce se diseñó para vender, pero no para retener a las personas hasta que compraran.",
        before: [
          "Interfaz plana, estática y poco atractiva.",
          "Estructura rígida, difícil de navegar.",
          "Tiempos de carga lentos y métricas bajas.",
          "Carrito genérico sin retroalimentación visual.",
        ],
      },
      solution: {
        text: "Rediseñé la experiencia completa con foco en rendimiento móvil, microinteracciones y un flujo de compra claro.",
        after: [
          "Interfaz viva, con jerarquía visual clara.",
          "Navegación simple e intuitiva.",
          "Carga optimizada en móvil.",
          "Checkout con feedback en cada paso.",
        ],
        beforeImage: "/projects/project_1/home_antes.png",
        afterImage: "/projects/project_1/home.png",
      },
      process: [
        { title: "Investigación", text: "Análisis de la tienda actual y de la competencia." },
        { title: "Diseño", text: "Wireframes, sistema visual y prototipo en Figma." },
        { title: "Desarrollo", text: "Componentes reutilizables en React y pagos con Stripe." },
        { title: "Pruebas", text: "Ajustes de rendimiento y pruebas de usabilidad." },
      ],
      metrics: [
        { value: 90, suffix: "/100", label: "Lighthouse móvil (ejemplo)" },
        { value: 40, suffix: "%", label: "Menos tiempo de carga (ejemplo)" },
        { value: 25, suffix: "%", label: "Más conversión (ejemplo)" },
      ],
    },
  },
  {
    id: "proyecto-2",
    title: "Mulsali",
    subtitle: "Aplicación móvil",
    category: "Android App",
    description: "Aplicación móvil nativa desarrollada en Kotlin que reimagina la experiencia de reproducción musical al integrar elementos 3D interactivos y procesamiento de audio en tiempo real.",
    tags: ["Mobile", "UI/UX"],
    hue: 265,
  },
  {
    id: "proyecto-3",
    title: "Kinzha Audiovisuals",
    subtitle: "Web App & E-commerce",
    category: "Web App / E-commerce",
    description: "Plataforma web Full-Stack diseñada para un estudio independiente de videojuegos, combinando una vitrina estática de proyectos con una tienda digital integrada para la venta de merchandising y copias digitales.",
    tags: ["Web App", "Interactividad"],
    hue: 285,
  },
  {
    id: "proyecto-4",
    title: "Netzuls",
    subtitle: "Plataforma web PWA",
    category: "Web / PWA",
    description: "Plataforma web PWA para el control de inventario en tiempo real, diseñada con un enfoque en simplicidad de uso, escaneo rápido de productos y métricas de ventas para pequeños y medianos negocios.",
    tags: ["PWA", "Dashboard"],
    hue: 250,
    hidden: true, // proyecto oculto
  },
  {
    id: "proyecto-5",
    title: "Proyecto 5",
    subtitle: "Experiencia interactiva",
    category: "Interactivo / 3D",
    description: "Descripción pendiente. Aquí irá un resumen de dos o tres líneas del proyecto.",
    tags: ["3D", "Creative Coding"],
    hue: 310,
    hidden: true, // proyecto oculto
  },
];

export const projects: Project[] = allProjects.filter((p) => !p.hidden);