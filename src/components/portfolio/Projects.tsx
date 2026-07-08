import { useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import {
  Satellite,
  Scale,
  Fingerprint,
  Cpu,
  CloudCog,
  ExternalLink,
  Smartphone,
  Dumbbell,
  Headset,
  ChevronLeft,
  ChevronRight,
  AppWindow,
  Briefcase,
} from 'lucide-react';

const EASE = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

interface PersonalProject {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  icon: typeof Smartphone;
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
    screenshots: [
      '/projects/padel/home.webp',
      '/projects/padel/league.webp',
      '/projects/padel/play.webp',
      '/projects/padel/profile.webp',
    ],
    link: 'https://apps.apple.com/lb/app/padel-lebanon/id6759597948',
    linkLabel: 'View on App Store',
  },
  {
    title: 'NipperMan',
    description:
      'A personal offline-first AI-powered workout companion built around a 12-week hypertrophy program. Not for distribution. Features agentic AI that can modify workouts in real-time, vision-based nutrition logging via photo analysis, and a persistent AI coach with full training context.',
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
    screenshots: [
      '/projects/fitness/program.webp',
      '/projects/fitness/workout.webp',
      '/projects/fitness/coach.webp',
      '/projects/fitness/summary.webp',
    ],
  },
  {
    title: 'Salsa VR',
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
    screenshots: ['/projects/salsa/quest3.webp'],
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
  },
  {
    title: 'eBareau Legal Platform',
    description:
      'Engineered comprehensive web platform managing digital services for 15,000+ registered lawyers, deployed on VPS with 99.9% uptime.',
    tech: ['Java', 'React', 'Jenkins CI/CD', 'PostgreSQL'],
    category: 'Web Platform',
    icon: Scale,
  },
  {
    title: 'National Digital Identity System',
    description:
      'Led development of a secure dual-purpose digital card solution integrating e-wallet functionality, fee payment processing, and identity/access control.',
    tech: ['Java', 'React', 'Security', 'Architecture'],
    category: 'Identity & Security',
    icon: Fingerprint,
  },
  {
    title: 'IoT Energy Management System',
    description:
      'Built automated IoT energy management system with real-time monitoring dashboard, achieving 15% reduction in energy costs.',
    tech: ['Angular', 'IoT', 'Analytics', 'Real-time'],
    category: 'IoT & Analytics',
    icon: Cpu,
  },
  {
    title: 'Healthcare BPM Migration',
    description:
      'Integrated legacy monolithic application into modern BPM platform, migrating business logic to reactive microservices architecture.',
    tech: ['Spring WebFlux', 'Kubernetes', 'JUnit', 'Azure DevOps'],
    category: 'Cloud Migration',
    icon: CloudCog,
  },
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const TechChip = ({ label }: { label: string }) => (
  <span className="font-mono text-xs px-3 py-1 rounded-full border border-line bg-surface text-ink-secondary hover:text-accent hover:border-accent/40 transition-colors">
    {label}
  </span>
);

const PhoneFrame = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto w-[180px] sm:w-[220px]">
    <div className="relative overflow-hidden rounded-[2rem] border-4 border-line-bright bg-elevated sm:rounded-[2.5rem] sm:border-[5px]">
      <div className="absolute top-0 left-1/2 z-20 h-4 w-16 -translate-x-1/2 rounded-b-xl bg-elevated sm:h-5 sm:w-20 sm:rounded-b-2xl" />
      <div className="relative aspect-[9/19.5] overflow-hidden bg-background">
        {children}
      </div>
      <div className="absolute bottom-1 left-1/2 z-20 h-1 w-20 -translate-x-1/2 rounded-full bg-line-bright sm:bottom-1.5 sm:w-24" />
    </div>
  </div>
);

const SWIPE_THRESHOLD = 50;

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
};

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
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => {
        if (dir === 1) return prev === screenshots.length - 1 ? 0 : prev + 1;
        return prev === 0 ? screenshots.length - 1 : prev - 1;
      });
    },
    [screenshots.length]
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD) {
        paginate(1);
      } else if (info.offset.x > SWIPE_THRESHOLD) {
        paginate(-1);
      }
    },
    [paginate]
  );

  if (screenshots.length === 0) return null;

  const isSingleImage = screenshots.length === 1;

  if (aspect === 'landscape') {
    return (
      <div className="relative w-full aspect-[16/10] max-h-[350px] overflow-hidden rounded-lg border border-line bg-elevated">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            src={screenshots[current]}
            alt={`${title} screenshot ${current + 1} of ${screenshots.length}`}
            width={720}
            height={480}
            loading="lazy"
            className="h-full w-full object-contain"
            transition={{ duration: 0.3, ease: EASE }}
          />
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="group/carousel relative touch-pan-y py-2 sm:py-4">
      <PhoneFrame>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={isSingleImage ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            src={screenshots[current]}
            alt={`${title} screenshot ${current + 1} of ${screenshots.length}`}
            width={390}
            height={845}
            loading="lazy"
            draggable={false}
            className="h-full w-full select-none object-cover"
            style={{ touchAction: 'pan-y' }}
            transition={{ duration: 0.3, ease: EASE }}
          />
        </AnimatePresence>
      </PhoneFrame>

      {!isSingleImage && (
        <>
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label={`Previous ${title} screenshot`}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full border border-line bg-elevated p-1.5 text-ink-secondary opacity-0 transition-[opacity,color,border-color] duration-300 hover:border-accent/50 hover:text-accent focus-visible:opacity-100 group-hover/carousel:opacity-100 sm:block"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label={`Next ${title} screenshot`}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full border border-line bg-elevated p-1.5 text-ink-secondary opacity-0 transition-[opacity,color,border-color] duration-300 hover:border-accent/50 hover:text-accent focus-visible:opacity-100 group-hover/carousel:opacity-100 sm:block"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>

          <div className="mt-3 flex justify-center gap-2 sm:mt-4">
            {screenshots.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                aria-label={`Go to ${title} screenshot ${i + 1}`}
                aria-current={i === current}
                className={`h-1.5 cursor-pointer rounded-full transition-colors ${
                  i === current
                    ? 'w-6 bg-accent'
                    : 'w-1.5 bg-line hover:bg-line-bright'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const PersonalProjectCard = ({ project }: { project: PersonalProject }) => {
  const IconComponent = project.icon;

  return (
    <motion.div variants={itemVariants}>
      <article className="overflow-hidden rounded-xl border border-line bg-surface transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-line-bright">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Screenshot Carousel */}
          <div className="flex items-center justify-center border-b border-line bg-background/60 p-4 sm:p-6 lg:border-b-0 lg:border-r">
            <ScreenshotCarousel
              screenshots={project.screenshots}
              title={project.title}
              aspect={project.screenshotAspect ?? 'portrait'}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <IconComponent
                size={20}
                className="shrink-0 text-accent"
                aria-hidden="true"
              />
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {project.title}
              </h3>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-ink-secondary">
              {project.description}
            </p>

            {/* Highlights */}
            <ul className="mb-6 space-y-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-sm text-ink-secondary"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </div>

            {/* Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.linkLabel ?? 'View project'}: ${project.title} (opens in new tab)`}
                className="mt-6 inline-flex w-fit items-center gap-2 font-mono text-sm text-ink-secondary transition-colors hover:text-accent"
              >
                <ExternalLink size={15} aria-hidden="true" />
                {project.linkLabel ?? 'View Project'}
              </a>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
};

const ProfessionalProjectCard = ({
  project,
}: {
  project: ProfessionalProject;
}) => {
  const IconComponent = project.icon;

  return (
    <motion.div variants={itemVariants} className="h-full">
      <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-line-bright">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            {project.category}
          </span>
          <IconComponent
            size={18}
            className="shrink-0 text-accent"
            aria-hidden="true"
          />
        </div>

        <h3 className="mb-2 font-display text-lg font-semibold tracking-tight text-ink">
          {project.title}
        </h3>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-ink-secondary">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <TechChip key={tech} label={tech} />
          ))}
        </div>
      </article>
    </motion.div>
  );
};

export const Projects = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'professional'>(
    'professional'
  );

  const tabs = [
    {
      id: 'professional' as const,
      label: 'Professional Work',
      icon: Briefcase,
    },
    { id: 'personal' as const, label: 'Personal Apps', icon: AppWindow },
  ];

  return (
    <div className="py-24 md:py-32">
      <div className="container max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="mb-12 flex items-center gap-4">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              <span className="font-mono text-lg md:text-xl text-accent mr-3 align-middle">
                02.
              </span>
              Projects
            </h2>
            <div aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>

          <p className="mb-10 max-w-2xl leading-relaxed text-ink-secondary">
            From published mobile apps to enterprise platforms, projects I've
            built end-to-end.
          </p>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Project categories"
            className="mb-12 flex gap-8 border-b border-line"
          >
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`-mb-px flex cursor-pointer items-center gap-2 border-b-2 pb-3 font-mono text-sm transition-colors ${
                    isActive
                      ? 'border-accent text-accent'
                      : 'border-transparent text-ink-secondary hover:text-ink'
                  }`}
                >
                  <TabIcon size={14} aria-hidden="true" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'personal' ? (
            <motion.div
              key="personal"
              role="tabpanel"
              id="panel-personal"
              aria-labelledby="tab-personal"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              className="space-y-8"
            >
              {personalProjects.map((project) => (
                <PersonalProjectCard key={project.title} project={project} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="professional"
              role="tabpanel"
              id="panel-professional"
              aria-labelledby="tab-professional"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {professionalProjects.map((project) => (
                <ProfessionalProjectCard
                  key={project.title}
                  project={project}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-16 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-line px-4 py-2 font-mono text-xs text-ink-muted">
            Always building something new
          </span>
        </motion.div>
      </div>
    </div>
  );
};
