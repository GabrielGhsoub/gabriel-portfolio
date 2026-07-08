import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, MapPin } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import profileImage from '../../assets/images/profile/profile.webp';

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

export const Hero = () => {
  const scrollToAbout = () => {
    document
      .getElementById('about')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="hero-backdrop relative flex min-h-screen items-center">
      <div aria-hidden="true" className="absolute inset-0 bg-dot-grid" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24">
        <motion.div
          className="flex items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text column */}
          <div className="max-w-2xl">
            <motion.p
              variants={itemVariants}
              className="mb-5 font-mono text-sm text-accent md:text-base"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl font-bold tracking-tight text-ink md:text-7xl"
            >
              {personalInfo.name}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-secondary md:text-5xl"
            >
              I build scalable systems end to end.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl leading-relaxed text-ink-secondary"
            >
              Full-stack software engineer with 5+ years of experience building
              scalable distributed applications. I work across the stack with
              Java, Spring Boot, and React, and have kept production systems
              running at 99.95% uptime.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm text-ink-muted"
            >
              <span className="flex items-center gap-2">
                <MapPin size={14} aria-hidden="true" />
                {personalInfo.location}
              </span>
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />
                Open to new opportunities
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href={`mailto:${personalInfo.email}`}
                className="rounded-lg bg-accent px-6 py-3 font-medium text-background transition-colors hover:bg-accent-bright"
              >
                Get in touch
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-line px-6 py-3 text-ink-secondary transition-colors hover:border-accent/50 hover:text-accent"
              >
                Download resume
              </a>
              <div className="flex items-center gap-1">
                <a
                  href={`https://${personalInfo.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="p-2 text-ink-secondary transition-colors hover:text-accent"
                >
                  <Github size={20} />
                </a>
                <a
                  href={`https://${personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-2 text-ink-secondary transition-colors hover:text-accent"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Profile image */}
          <motion.div
            variants={itemVariants}
            className="relative hidden shrink-0 md:block"
          >
            <div
              aria-hidden="true"
              className="absolute -right-3 -bottom-3 h-full w-full rounded-2xl border border-accent/40"
            />
            <img
              src={profileImage}
              alt={`Portrait of ${personalInfo.name}`}
              width={320}
              height={340}
              fetchPriority="high"
              className="relative h-auto w-64 rounded-2xl border border-line object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <button
        type="button"
        onClick={scrollToAbout}
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-muted transition-colors hover:text-accent"
      >
        <motion.span
          className="block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.6 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <ArrowDown size={20} />
        </motion.span>
      </button>
    </div>
  );
};
