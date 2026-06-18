import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import LookingFor from "@/components/LookingFor";
import Footer from "@/components/Footer";
import { apps } from "@/lib/content";
import { getProjectMedia } from "@/lib/media";

export default function Home() {
  const appsWithMedia = apps.map((app) => ({
    ...app,
    media: getProjectMedia(app.slug),
  }));

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects apps={appsWithMedia} />
        <Skills />
        <About />
        <LookingFor />
      </main>
      <Footer />
    </>
  );
}
