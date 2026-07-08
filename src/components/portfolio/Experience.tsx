import { motion, type Variants } from 'framer-motion';
import { experience } from '../../data/portfolio';
import { getCompanyLogo, getCompanyLinkedIn } from '../../data/companyLogos';

const EASE = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const entryVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

interface ExperienceEntryProps {
  job: (typeof experience)[number];
}

const ExperienceEntry = ({ job }: ExperienceEntryProps) => {
  const logo = getCompanyLogo(job.company);
  const linkedIn = getCompanyLinkedIn(job.company);

  return (
    <motion.li
      variants={entryVariants}
      className="relative pl-8 pb-12 last:pb-0 md:grid md:grid-cols-[9.5rem_1fr] md:gap-8"
    >
      {/* Static timeline dot */}
      <span
        aria-hidden="true"
        className="absolute -left-[4.5px] top-2 h-2 w-2 rounded-full bg-accent"
      />

      {/* Period */}
      <p className="mb-2 font-mono text-xs uppercase tracking-wide text-ink-muted md:mb-0 md:pt-2">
        {job.period}
      </p>

      {/* Entry body */}
      <div>
        <div className="flex items-center gap-3">
          {logo && (
            <img
              src={logo}
              alt={`${job.company} logo`}
              width={40}
              height={40}
              loading="lazy"
              className="h-10 w-10 shrink-0 rounded-lg border border-line bg-white object-contain p-1"
            />
          )}
          <h3 className="font-display text-lg font-semibold text-ink">
            {job.title}{' '}
            <span className="text-accent">
              ·{' '}
              {linkedIn ? (
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {job.company}
                </a>
              ) : (
                job.company
              )}
            </span>
          </h3>
        </div>

        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
          {job.highlights.map((highlight) => (
            <li
              key={highlight}
              className="text-sm leading-relaxed text-ink-secondary"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-ink-secondary transition-colors hover:border-accent/40 hover:text-accent"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
};

export const Experience = () => {
  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            <span className="font-mono text-lg md:text-xl text-accent mr-3 align-middle">
              04.
            </span>
            Experience
          </h2>
          <div aria-hidden="true" className="h-px flex-1 bg-line" />
        </motion.div>

        <motion.ol
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative list-none border-l border-line"
        >
          {experience.map((job) => (
            <ExperienceEntry key={`${job.company}-${job.period}`} job={job} />
          ))}
        </motion.ol>
      </div>
    </div>
  );
};
