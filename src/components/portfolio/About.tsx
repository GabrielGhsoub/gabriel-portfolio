import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { education } from '../../data/portfolio';

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const stats = [
  { value: '5', suffix: '+', label: 'years experience' },
  { value: '99.95', suffix: '%', label: 'uptime achieved' },
  { value: '93', suffix: '%', label: 'faster deployments' },
  { value: '90', suffix: '%', label: 'test coverage' },
];

export const About = () => {
  return (
    <div className="py-24 md:py-32">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            <span className="font-mono text-lg md:text-xl text-accent mr-3 align-middle">
              01.
            </span>
            About
          </h2>
          <div aria-hidden="true" className="h-px flex-1 bg-line" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-5">
              <motion.p
                variants={itemVariants}
                className="text-ink-secondary leading-relaxed"
              >
                I'm a full-stack software engineer with more than five years of
                experience architecting and delivering scalable distributed
                applications. My core stack is Java, Spring Boot and WebFlux on
                the backend, paired with React and Angular on the frontend.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-ink-secondary leading-relaxed"
              >
                I've led cross-functional teams of up to five engineers, owning
                features from design through deployment. Much of my recent work
                centers on reliability: building CI/CD pipelines and tuning
                performance so releases ship faster and systems stay up.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-line bg-surface p-5 hover:border-line-bright transition-colors duration-300"
                >
                  <div className="font-display text-3xl font-semibold text-ink">
                    {stat.value}
                    <span className="text-accent">{stat.suffix}</span>
                  </div>
                  <div className="mt-1 font-mono text-xs text-ink-muted">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center gap-2.5 font-mono text-sm text-ink-muted"
          >
            <GraduationCap
              size={16}
              aria-hidden="true"
              className="shrink-0 text-accent"
            />
            <span>
              {education.degree} · {education.institution}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
