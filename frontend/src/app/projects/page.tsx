import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsPage from "@/components/ProjectsPage";

export default function ProjectsRoute() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ProjectsPage />
      <Footer />
    </main>
  );
}
