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
  Smartphone,
  Dumbbell,
  Headset,
  ChevronLeft,
  ChevronRight,
  AppWindow,
  Briefcase,
} from 'lucide-react';

interface PersonalProject {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  icon: typeof Smartphone;
  gradient: string;
  glowColor: string;
  screenshots: string[];
  screenshotAspect?: 'portrait' | 'landscape';
  link?: string;
  linkLabel?: string;
}

interface ProfessionalProject {
  title: string;
  description: string;
  tech: string[];
  category: string;
  icon: typeof Satellite;
  gradient: string;
  accentColor: string;
  glowColor: string;
}

const personalProjects: PersonalProject[] = [
  {
    title: 'Padel Lebanon',
    description:
      'The first dedicated digital platform for padel in the MENA region. A full-stack mobile app featuring league management, skill-based matchmaking, court booking, equipment marketplace, and a gamification system with XP, achievements, and national leaderboards.',
    tech: [
      'React Native',
      'Expo',
      'NestJS',
      'PostgreSQL',
      'Redis',
      'TypeORM',
      'Zustand',
      'Terraform',
    ],
    highlights: [
      'Published on Apple App Store',
      '40+ screens, full-stack architecture',
      'Real-time league standings & matchmaking',
      'Admin panel with React + shadcn/ui',
    ],
    icon: Smartphone,
    gradient: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(16, 185, 129, 0.2)',
    screenshots: [
      '/projects/padel/home.png',
      '/projects/padel/league.png',
      '/projects/padel/play.png',
      '/projects/padel/profile.png',
    ],
    link: 'https://apps.apple.com/lb/app/padel-lebanon/id6759597948',
    linkLabel: 'View on App Store',
  },
  {
    title: 'NipperMan — AI Fitness Coach',
    description:
      'An offline-first AI-powered workout companion built around a 12-week hypertrophy program. Features agentic AI that can modify workouts in real-time, vision-based nutrition logging via photo analysis, and a persistent AI coach with full training context.',
    tech: [
      'React Native',
      'Expo',
      'SQLite',
      'Drizzle ORM',
      'Claude AI',
      'Zustand',
      'Reanimated',
    ],
    highlights: [
      'Agentic AI modifies workouts mid-session',
      'Photo-based nutrition logging with Claude Vision',
      'Batch pre-workout weight suggestions with plate math',
      'Full offline SQLite database with FTS5 search',
    ],
    icon: Dumbbell,
    gradient: 'from-indigo-500 to-violet-500',
    glowColor: 'rgba(99, 102, 241, 0.2)',
    screenshots: [
      '/projects/fitness/program.png',
      '/projects/fitness/workout.png',
      '/projects/fitness/coach.png',
      '/projects/fitness/summary.png',
    ],
  },
  {
    title: 'Salsa VR — Dance Trainer',
    description:
      'A Meta Quest 3 VR salsa dancing trainer built in Godot 4.5. Uses OpenXR hand tracking to evaluate timing accuracy on every beat of 8-count salsa phrases, with real-time scoring, ghost hand indicators, floor footwork guides, and a procedurally generated neon club environment.',
    tech: [
      'Godot 4.5',
      'GDScript',
      'OpenXR',
      'Meta Quest 3',
      'BVH Mocap',
      'Spatial Audio',
    ],
    highlights: [
      'Real-time hand tracking dance evaluation',
      '4 progressive lessons with beat-sync scoring',
      'Procedural neon club with reactive lighting',
      'Haptic feedback on every salsa beat',
    ],
    icon: Headset,
    gradient: 'from-rose-500 to-pink-500',
    glowColor: 'rgba(244, 63, 94, 0.2)',
    screenshots: ['/projects/salsa/quest3.jpg'],
    screenshotAspect: 'landscape',
  },
];

const professionalProjects: ProfessionalProject[] = [
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

const ScreenshotCarousel = ({
  screenshots,
  title,
  aspect = 'portrait',
}: {
  screenshots: string[];
  title: string;
  aspect?: 'portrait' | 'landscape';
}) => {
  const [current, setCurrent] = useState(0);

  if (screenshots.length === 0) return null;

  const isSingleImage = screenshots.length === 1;
  const aspectClass =
    aspect === 'landscape'
      ? 'aspect-[16/10] max-h-[350px]'
      : 'aspect-[9/16] max-h-[420px]';

  return (
    <div
      className={`relative w-full ${aspectClass} bg-slate-900/80 rounded-xl overflow-hidden group/carousel`}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={screenshots[current]}
          alt={`${title} screenshot ${current + 1}`}
          className="w-full h-full object-contain"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      {!isSingleImage && (
        <>
          <button
            onClick={() =>
              setCurrent((p) => (p === 0 ? screenshots.length - 1 : p - 1))
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() =>
              setCurrent((p) => (p === screenshots.length - 1 ? 0 : p + 1))
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  i === current
                    ? 'bg-white w-5'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const PersonalProjectCard = ({
  project,
  index,
}: {
  project: PersonalProject;
  index: number;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const IconComponent = project.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        type: 'spring' as const,
        stiffness: 80,
        damping: 15,
      }}
      className="group relative"
    >
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
        style={{
          background: `radial-gradient(ellipse at center, ${project.glowColor}, transparent 70%)`,
        }}
      />

      <div className="relative bg-slate-800/60 backdrop-blur-sm rounded-3xl border border-gray-700/40 group-hover:border-gray-500/40 transition-all duration-500 overflow-hidden">
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Screenshot Carousel */}
          <div className="p-6 flex items-center justify-center bg-slate-900/30">
            <ScreenshotCarousel
              screenshots={project.screenshots}
              title={project.title}
              aspect={project.screenshotAspect ?? 'portrait'}
            />
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className={`p-2.5 rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring' as const, stiffness: 300 }}
              >
                <IconComponent size={22} className="text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {project.title}
                </h3>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2 mb-5">
              {project.highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{ delay: index * 0.2 + i * 0.1 + 0.3 }}
                  className="flex items-start gap-2 text-sm"
                >
                  <span
                    className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0`}
                  />
                  <span className="text-gray-300">{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <Code2 size={13} className="text-gray-500" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tech Stack
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      inView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{
                      delay: index * 0.2 + i * 0.06 + 0.4,
                      type: 'spring' as const,
                      stiffness: 200,
                    }}
                    className="px-3 py-1.5 bg-gray-700/40 text-gray-300 text-xs font-medium rounded-lg border border-gray-600/30 hover:border-gray-500/50 hover:bg-gray-700/60 transition-all duration-200"
                    whileHover={{ scale: 1.05, y: -1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Link */}
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${project.gradient} text-white text-sm font-medium w-fit hover:shadow-lg transition-shadow duration-300`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={14} />
                {project.linkLabel || 'View Project'}
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProfessionalProjectCard = ({
  project,
  index,
}: {
  project: ProfessionalProject;
  index: number;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const IconComponent = project.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      }}
      className="group relative"
    >
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${project.glowColor}, transparent, ${project.glowColor})`,
        }}
      />

      <div className="relative bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-700/50 group-hover:border-gray-500/50 transition-all duration-500 overflow-hidden h-full flex flex-col p-6">
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`}
        />

        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-white/5 text-white/80 border border-white/10">
            <Layers size={12} />
            {project.category}
          </span>
          <motion.div
            className={`p-2 rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring' as const, stiffness: 300 }}
          >
            <IconComponent size={18} className="text-white" />
          </motion.div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-cyan-400 transition-all duration-300">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-gray-700/40 text-gray-400 text-xs font-medium rounded-md border border-gray-600/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [proRef, proInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState<'personal' | 'professional'>(
    'personal'
  );

  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

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
            From published mobile apps to enterprise platforms — projects I've
            built end-to-end
          </p>
        </motion.div>

        {/* Tab Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-2xl bg-slate-800/70 border border-gray-700/50 p-1.5">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === 'personal'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <AppWindow size={16} />
              Personal Apps
            </button>
            <button
              onClick={() => setActiveTab('professional')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === 'professional'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Briefcase size={16} />
              Professional Work
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'personal' ? (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 max-w-6xl mx-auto"
            >
              {personalProjects.map((project, index) => (
                <PersonalProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="professional"
              ref={proRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto"
            >
              {professionalProjects.map((project, index) => (
                <ProfessionalProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom accent */}
        <motion.div
          ref={proRef}
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={proInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-gray-700/50 text-gray-500 text-sm">
            <Code2 size={14} />
            <span>Always building something new</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
