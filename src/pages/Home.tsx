import PageTransition from "../components/layout/PageTransition";
import HeroSection from "../components/home/HeroSection";

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
    </PageTransition>
  );
}