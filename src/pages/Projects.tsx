import PageTransition from "../components/layout/PageTransition";
import ProjectsStage from "../components/projects/ProjectsStage";
import ProjectsMobile from "../components/projects/ProjectsMobile";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useProjectSelection } from "../hooks/useProjectSelection";


export default function Projects() {
  const sel = useProjectSelection();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <PageTransition>
      {isDesktop ? (
        <ProjectsStage {...sel} />
      ) : (
        <ProjectsMobile selectedId={sel.selectedId} select={sel.select} />
      )}
    </PageTransition>
  );
}