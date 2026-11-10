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
  accent?: string; 
  features?: { title: string; text: string }[];
  stackGroups?: { label: string; items: string[] }[];
  status?: string;
  featuresTitle?: string;
  story?: {
    title?: string;
    text: string;
    moments: { title: string; text: string }[];
  };
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
  device?: "web" | "mobile";
}

const allProjects: Project[] = [
 {
  id: "cafe-funcional",
  title: "Café Funcional",
  image: "/projects/project_1/home.png",
  mobileImage: "/projects/project_1/mobile.png",
  subtitle: "E-commerce de café con hongos adaptógenos",
  category: "Web App",
  description:
    "Rediseño completo de un e-commerce de café funcional: nueva identidad visual, experiencia responsive y un carrito lateral con flujo de compra simulado.",
  tags: ["Angular", "SCSS", "Figma"],
  hue: 25, 
  detail: {
    role: "UX/UI + Frontend",
    year: "2026",
    duration: "4 dias",
    links: {
      site: "TODO: URL del sitio publicado",
      github: "TODO: https://github.com/tu-usuario/repo",
    },
    stack: ["Angular", "TypeScript", "SCSS", "Bootstrap", "Figma"],
    screens: [
      { label: "Home", image: "/projects/project_1/home.png" },
      { label: "Productos", image: "/projects/project_1/productos.png" },
      { label: "Carrito", image: "/projects/project_1/carrito.png" },
    ],
    problem: {
      text: "La tienda funcionaba como vitrina, pero su interfaz era rígida, poco responsive y no tenía un flujo de compra real.",
      before: [
        "Navbar fijo de 300 px, sin menú para móvil.",
        "Botón «Agregar al carrito» sin funcionalidad ni respuesta visual.",
        "Tarjetas escritas a mano y catálogo repetido entre Inicio y Productos.",
        "Formularios sin validación ni mensajes de error.",
      ],
    },
    solution: {
      text: "Rediseñé las cuatro páginas desde Figma sobre el proyecto existente, con enfoque mobile-first, componentes reutilizables y un flujo de compra con carrito lateral.",
      after: [
        "Identidad visual nueva con paleta cálida y tipografías Montserrat y DM Sans.",
        "Navbar fijo con menú hamburguesa animado y filtros accesibles.",
        "Carrito lateral con cantidades, total y checkout simulado.",
        "Avisos de «avísame cuando esté disponible» y formularios con validación.",
      ],
      beforeImage: "/projects/project_1/home_antes.png",
      afterImage: "/projects/project_1/home.png",
    },
    process: [
      { title: "Investigación", text: "Revisión del proyecto Angular existente y definición de qué mantener y qué rediseñar." },
      { title: "Diseño", text: "Rediseño de las cuatro páginas en Figma, con paleta y tipografías definidas." },
      { title: "Desarrollo", text: "Variables globales, componentes reutilizables, Angular Signals y formularios reactivos." },
      { title: "Refinamiento", text: "Microinteracciones, feedback visual y ajustes de responsive y accesibilidad." },
    ],
    metrics: [
      { value: 4, suffix: "", label: "Páginas rediseñadas" },
      { value: 3, suffix: "", label: "Flujos nuevos: carrito, avisos y filtros" },
    ],
  },
},
  {
  id: "mulsali",
  title: "Mulsali",
  device: "mobile",
  image: "/projects/mulsali/home.png",
  mobileImage: "/projects/mulsali/home.png",
  subtitle: "Reproductor de música para Android",
  category: "Android App",
  description:
    "Reproductor de música para Android desarrollado en Kotlin. Funciona con tu propia música, sin depender de la nube, con una interfaz interactiva pensada para escuchar sin interrupciones.",
  tags: ["Kotlin", "Android", "UI/UX"],
  hue: 265,
  detail: {
    accent: "#76ABAE",
    status: "En desarrollo",
    role: "UX/UI + Desarrollo", // ajusta a tu rol real
    year: "2026",
    duration: "En curso",
    links: {},
    stack: ["Kotlin", "Android", "Figma"],
    screens: [
      { label: "Home", image: "/projects/mulsali/home.png" },
      { label: "Reproductor", image: "/projects/mulsali/music.png" },
      { label: "Biblioteca", image: "/projects/mulsali/library.png" },
      { label: "Añadir música", image: "/projects/mulsali/add.png" },
    ],
    story: {
      title: "Por qué Mulsali",
      text: "Me gusta la música para trabajar, para caminar y para los viajes largos en bus o avión. Quería un reproductor que no se corte, que me deje elegir libremente qué escuchar y que siga sonando aunque apague la pantalla.",
      moments: [
        { title: "Al trabajar", text: "Una sesión larga sin interrupciones ni distracciones." },
        { title: "Al caminar", text: "El celular en el bolsillo y la música siguiendo su curso." },
        { title: "De viaje", text: "Buses y vuelos largos, con tu música lista sin depender de la conexión." },
      ],
    },
    featuresTitle: "Qué ofrece",
    features: [
      { title: "Tu música, tus archivos", text: "Añades tus propias canciones. La app no incluye catálogo ni depende de la nube." },
      { title: "Sin cortes", text: "La reproducción continúa con la pantalla apagada." },
      { title: "Elige libremente", text: "Tú decides qué suena y en qué orden." },
      { title: "Biblioteca propia", text: "Un espacio para organizar y encontrar tu música." },
      { title: "Interfaz interactiva", text: "Pensada con criterios de UX/UI para que escuchar sea fluido y claro." },
      { title: "Hecha para Android", text: "Desarrollo nativo en Kotlin." },
    ],
    process: [
      { title: "Idea", text: "Definir qué debe hacer bien un reproductor para el día a día." },
      { title: "Diseño", text: "Pantallas de Home, reproductor, biblioteca y añadir música en Figma." },
      { title: "Desarrollo", text: "Construcción nativa en Kotlin. En curso." },
    ],
  },
},
  {
  id: "kinzha-audiovisuals",
  title: "Kinzha Audiovisuals",
  image: "/projects/kinzha/home.png",
  mobileImage: "/projects/kinzha/mobile.png",
  subtitle: "Sitio web y tienda para un estudio de videojuegos",
  category: "Web App",
  description:
    "Portal oficial de un estudio indie: portafolio de proyectos, servicios, equipo, tienda de merch con checkout y una sección inmersiva para el videojuego Cadence of Shadows.",
  tags: ["Next.js", "Tailwind CSS", "Three.js", "Prisma"],
  hue: 0,
  detail: {
    accent: "#e11d2e",
    role: "UX/UI + Full-stack", 
    year: "2026",
    duration: "3 meses", 
    links: {}, // añade site y github cuando los tengas
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React Three Fiber", "Prisma"],
    stackGroups: [
      { label: "Frontend", items: ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS v4"] },
      { label: "Animación y 3D", items: ["Framer Motion", "GSAP", "React Three Fiber"] },
      { label: "Backend y datos", items: ["Prisma", "PostgreSQL (Neon)", "Nodemailer", "Zod"] },
      { label: "Despliegue", items: ["Vercel"] },
    ],
    screens: [
      { label: "Home y proyectos", image: "/projects/kinzha/home.png" },
      { label: "Servicios y equipo", image: "/projects/kinzha/servicios.png" },
      { label: "Tienda", image: "/projects/kinzha/productos.png" },
      { label: "Cadence of Shadows", image: "/projects/kinzha/cadence.png" },
    ],
    problem: {
      text: "El sitio tenía la información repartida en demasiadas páginas y las tarjetas de proyectos eran cuadros grises cargados de texto, sin impacto visual ni coherencia con la identidad del estudio.",
      before: [
        "Home y proyectos separados, con navegación dispersa.",
        "Tarjetas grises con mucha información a la vez.",
        "Equipo y servicios en páginas distintas.",
        "Sección del videojuego sin una paleta consistente.",
      ],
    },
    solution: {
      text: "Rediseñé la experiencia unificando secciones, con tarjetas visuales que revelan su información al pasar el cursor y una paleta noir en negro y rojo.",
      after: [
        "Home y proyectos unidos en un solo recorrido.",
        "Tarjetas de imagen completa con título, descripción y botón en hover.",
        "Servicios y equipo en una sola página.",
        "Cadence of Shadows con una paleta y una dirección de arte coherentes.",
      ],
      beforeImage: "/projects/kinzha/proyectos_antes.png",
      afterImage: "/projects/kinzha/home.png",
    },
    features: [
      { title: "Tarjetas con revelado", text: "Imagen completa que muestra título, descripción y botón solo al pasar el cursor." },
      { title: "Portfolio por integrante", text: "Cada miembro del equipo tiene su propio espacio dentro de la página de servicios." },
      { title: "Tablero de evidencias", text: "Expedientes interactivos que presentan el universo narrativo de Cadence of Shadows." },
      { title: "Visor 3D", text: "Escena con React Three Fiber para explorar modelos del videojuego." },
      { title: "Tienda con checkout", text: "Carrito, control de stock y dos métodos de pago." },
      { title: "Correos de confirmación", text: "Envío automático con Nodemailer al completar una compra." },
    ],
    process: [
      { title: "Análisis", text: "Revisión de la estructura del sitio y del documento de dirección de arte del videojuego." },
      { title: "Diseño", text: "Paleta noir, tarjetas con revelado en hover y reorganización de la navegación." },
      { title: "Desarrollo", text: "Componentes en Next.js, escena 3D, carrito, checkout simulado y envío de correos." },
      { title: "Despliegue", text: "Migraciones de Prisma, variables de entorno y publicación en Vercel." },
    ],
  },
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