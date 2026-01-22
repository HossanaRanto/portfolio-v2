import { Hero } from "@/presentation/components/domain/Hero";
import { FeaturedProjects } from "@/presentation/components/domain/FeaturedProjects";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProjects />
    </div>
  );
}
