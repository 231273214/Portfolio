export interface LabModel {
  id: string;
  title: string;
  description: string;
  tags: string[];
  shape: "knot" | "ico" | "octa" | "torus" | "box"; 
  color: string; 
  src?: string;
}

export const models: LabModel[] = [
  { id: "modelo-1", title: "Modelo 01", description: "Descripción pendiente.", tags: ["3D"], shape: "knot", color: "#b36bff" },
  { id: "modelo-2", title: "Modelo 02", description: "Descripción pendiente.", tags: ["3D"], shape: "ico", color: "#ff8fd1" },
  { id: "modelo-3", title: "Modelo 03", description: "Descripción pendiente.", tags: ["3D"], shape: "torus", color: "#7fd0ff" },
  { id: "modelo-4", title: "Modelo 04", description: "Descripción pendiente.", tags: ["3D"], shape: "octa", color: "#ffd36b" },
  { id: "modelo-5", title: "Modelo 05", description: "Descripción pendiente.", tags: ["3D"], shape: "box", color: "#8affc1" },
];