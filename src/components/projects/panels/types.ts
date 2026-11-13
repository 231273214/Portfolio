import type { ReactNode } from "react";
import type { Project } from "../../../data/projects";

export interface PanelDef {
  id: string;
  label: string; 
  node: ReactNode;
}

export type DetailData = NonNullable<Project["detail"]>;
export type ScreenData = DetailData["screens"][number];