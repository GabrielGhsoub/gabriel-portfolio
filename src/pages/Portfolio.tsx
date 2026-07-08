import {
  Navigation,
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Contact,
} from '../components/portfolio';
import { personalInfo } from '../data/portfolio';

export const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Navigation />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="container max-w-5xl mx-auto px-6 text-center font-mono text-xs text-ink-muted">
          Designed &amp; built by {personalInfo.name} &middot; 2026
        </div>
      </footer>
    </div>
  );
};
