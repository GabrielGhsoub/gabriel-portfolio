import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Layers,
  Satellite,
  Scale,
  Fingerprint,
  Cpu,
  CloudCog,
  Code2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  category: string;
  icon: typeof Satellite;
  gradient: string;
  accentColor: string;
  glowColor: string;
}

const projects: Project[] = [
  {
    title: 'Inpulse Satellite Monitoring Platform',
    description:
      'Re-architected real-time satellite monitoring tool for Intelsat using a fully reactive stack, improving system responsiveness by 40% under high-throughput data loads.',
    tech: ['Java WebFlux', 'React', 'MongoDB', 'PostgreSQL'],
    category: 'Enterprise Platform',
    icon: Satellite,
    gradient: 'from-blue-500 to-cyan-500',
    accentColor: 'blue',
    glowColor: 'rgba(59, 130, 246, 0.15)',
  },
  {
    title: 'eBareau Legal Platform',
    description:
      'Engineered comprehensive web platform managing digital services for 15,000+ registered lawyers, deployed on VPS with 99.9% uptime.',
    tech: ['Java', 'React', 'Jenkins CI/CD', 'PostgreSQL'],
    category: 'Web Platform',
    icon: Scale,
    gradient: 'from-purple-500 to-violet-500',
    accentColor: 'purple',
    glowColor: 'rgba(139, 92, 246, 0.15)',
  },
  {
    title: 'National Digital Identity System',
    description:
      'Led development of a secure dual-purpose digital card solution integrating e-wallet functionality, fee payment processing, and identity/access control.',
    tech: ['Java', 'React', 'Security', 'Architecture'],
    category: 'Identity & Security',
    icon: Fingerprint,
    gradient: 'from-emerald-500 to-teal-500',
    accentColor: 'emerald',
    glowColor: 'rgba(16, 185, 129, 0.15)',
  },
  {
    title: 'IoT Energy Management System',
    description:
      'Built automated IoT energy management system with real-time monitoring dashboard, achieving 15% reduction in energy costs.',
    tech: ['Angular', 'IoT', 'Analytics', 'Real-time'],
    category: 'IoT & Analytics',
    icon: Cpu,
    gradient: 'from-orange-500 to-amber-500',
    accentColor: 'orange',
    glowColor: 'rgba(249, 115, 22, 0.15)',
  },
  {
    title: 'Healthcare BPM Migration',
    description:
      'Integrated legacy monolithic application into modern BPM platform, migrating business logic to reactive microservices architecture.',
    tech: ['Spring WebFlux', 'Kubernetes', 'JUnit', 'Azure DevOps'],
    category: 'Cloud Migration',
    icon: CloudCog,
    gradient: 'from-pink-500 to-rose-500',
    accentColor: 'pink',
    glowColor: 'rgba(236, 72, 153, 0.15)',
  },
];

const categories = ['All', ...new Set(projects.map((p) => p.category))];

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.15,
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.15 + i * 0.08,
        type: 'spring' as const,
        stiffness: 200,
        damping: 12,
      },
    }),
  };

  const IconComponent = project.icon;

  return (
    <motion.div
      ref={ref}
      layout
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      exit="exit"
      className="group relative"
    >
      {/* Glow effect behind card */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${project.glowColor}, transparent, ${project.glowColor})`,
        }}
      />

      <div className="relative bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-700/50 group-hover:border-gray-500/50 transition-all duration-500 overflow-hidden h-full flex flex-col">
        {/* Card header with gradient accent */}
        <div className="relative p-6 pb-4">
          {/* Subtle gradient overlay at top */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`}
          />

          {/* Category badge and icon row */}
          <div className="flex items-center justify-between mb-4">
            <motion.span
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${project.gradient} bg-opacity-10 text-white/90 border border-white/10`}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.15 + 0.2 }}
            >
              <Layers size={12} />
              {project.category}
            </motion.span>

            <motion.div
              className={`p-2.5 rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring' as const, stiffness: 300 }}
            >
              <IconComponent size={20} className="text-white" />
            </motion.div>
          </div>

          {/* Project title */}
          <motion.h3
            className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-cyan-400 transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.1 }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.15 }}
          >
            {project.description}
          </motion.p>
        </div>

        {/* Tech stack section */}
        <div className="px-6 pb-6 pt-2 mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <Code2 size={14} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <motion.span
                key={tech}
                custom={techIndex}
                variants={techVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="px-3 py-1.5 bg-gray-700/40 text-gray-300 text-xs font-medium rounded-lg border border-gray-600/30 hover:border-gray-500/50 hover:bg-gray-700/60 transition-all duration-200 cursor-default"
                whileHover={{ scale: 1.05, y: -1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Hover reveal footer */}
        <motion.div
          className="px-6 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        >
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <ExternalLink size={14} />
            <span className="font-medium">Professional Project</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: -30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-cyan-500" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Featured Projects
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Impactful solutions built across enterprise, identity, IoT, and
            cloud domains
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={filterVariants}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800/50 text-gray-400 border-gray-700/50 hover:text-white hover:border-gray-500/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom accent */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-gray-700/50 text-gray-500 text-sm">
            <Code2 size={14} />
            <span>More projects in development</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
