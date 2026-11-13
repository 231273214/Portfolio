import type { Project } from "../../../data/projects";
import type { PanelDef } from "./types";
import Intro from "./Intro";
import ScreenPanel from "./ScreenPanel";
import Phones from "./Phones";
import Problem from "./Problem";
import Solution from "./Solution";
import Story from "./Story";
import Features from "./Features";
import Tech from "./Tech";
import Process from "./Process";
import Metrics from "./Metrics";
import Outro from "./Outro";

export function buildPanels(project: Project, next: Project): PanelDef[] {
  const d = project.detail;
  let count = 0;
  const num = () => String(++count).padStart(2, "0");

  const panels: PanelDef[] = [{ id: "intro", label: "Intro", node: <Intro project={project} /> }];

  // Pantallas: celulares para apps móviles, marcos de navegador para web
  const screens = d?.screens?.length ? d.screens : [{ label: "Pantalla principal" }];
  if (project.device === "mobile") {
    panels.push({
      id: "phones",
      label: "Pantallas",
      node: <Phones project={project} screens={screens} />,
    });
  } else {
    screens.forEach((screen, i) =>
      panels.push({
        id: `screen-${i}`,
        label: "Pantallas",
        node: <ScreenPanel project={project} screen={screen} index={i} total={screens.length} />,
      })
    );
  }

  if (d?.problem)
    panels.push({ id: "problem", label: "Problema", node: <Problem data={d.problem} n={num()} /> });
  if (d?.solution)
    panels.push({ id: "solution", label: "Solución", node: <Solution project={project} n={num()} /> });
  if (d?.story)
    panels.push({ id: "story", label: "Historia", node: <Story data={d.story} n={num()} /> });
  if (d?.features?.length)
    panels.push({
      id: "features",
      label: "Funciones",
      node: <Features items={d.features} n={num()} title={d.featuresTitle} />,
    });
  if (d?.stackGroups?.length)
    panels.push({ id: "tech", label: "Tecnología", node: <Tech groups={d.stackGroups} n={num()} /> });
  if (d?.process?.length)
    panels.push({ id: "process", label: "Proceso", node: <Process steps={d.process} n={num()} /> });
  if (d?.metrics?.length)
    panels.push({ id: "metrics", label: "Resultados", node: <Metrics metrics={d.metrics} n={num()} /> });

  panels.push({ id: "outro", label: "Siguiente", node: <Outro next={next} /> });

  return panels;
}