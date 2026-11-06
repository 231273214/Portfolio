export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  hue: number; // color del placeholder mientras no haya imagen
  imagepc?: string;
  imagemo?:string;
}

export const projects: Project[] = [
  {
    id: "proyecto-1",
    title: "Cafe origen",
    subtitle: "E-commerce & Rediseño UI/UX",
    category: "E-commerce / UI/UX",
    description: "Rediseño y refactorización de una plataforma de comercio electrónico de café de especialidad, enfocado en experiencia interactiva, rendimiento móvil y conversión.",
    tags: ["Web Responsive", "E-commerce / UI/UX"],
    hue: 28,
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
  },
  {
    id: "proyecto-5",
    title: "Proyecto 5",
    subtitle: "Experiencia interactiva",
    category: "Interactivo / 3D",
    description: "Descripción pendiente. Aquí irá un resumen de dos o tres líneas del proyecto.",
    tags: ["3D", "Creative Coding"],
    hue: 310,
  },
];