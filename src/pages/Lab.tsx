import PageTransition from "../components/layout/PageTransition";
import Lab3DViewer from "../components/lab/Lab3DViewer";

export default function Lab() {
  return (
    <PageTransition className="min-h-svh px-4 pt-36 md:pt-28 lg:px-6">
      <h1 className="sr-only">Lab: modelos 3D</h1>
      <Lab3DViewer />
    </PageTransition>
  );
}