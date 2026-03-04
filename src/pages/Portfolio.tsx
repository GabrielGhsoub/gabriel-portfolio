import {
  Navigation,
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Contact,
} from '../components/portfolio';

const SectionDivider = () => (
  <div className="section-divider" aria-hidden="true" />
);

export const Portfolio = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />

      <main>
        <section id="home">
          <Hero />
        </section>

        <SectionDivider />

        <section id="about">
          <About />
        </section>

        <SectionDivider />

        <section id="projects">
          <Projects />
        </section>

        <SectionDivider />

        <section id="skills">
          <Skills />
        </section>

        <SectionDivider />

        <section id="experience">
          <Experience />
        </section>

        <SectionDivider />

        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
};
