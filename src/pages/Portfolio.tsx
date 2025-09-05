import {
  Navigation,
  Hero,
  About,
  Skills,
  Experience,
  Contact,
} from '../components/portfolio';

export const Portfolio = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
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
    </div>
  );
};
