import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Code2, Layers, Cloud, Database, Wrench } from 'lucide-react';
import { skills } from '../../data/portfolio';

const EASE = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  items: string[];
}

const skillCategories: SkillCategory[] = [
  { title: 'Languages', icon: Code2, items: skills.languages },
  { title: 'Frameworks & Libraries', icon: Layers, items: skills.frameworks },
  { title: 'Cloud & DevOps', icon: Cloud, items: skills.cloud },
  { title: 'Databases & Caching', icon: Database, items: skills.databases },
  { title: 'Tools & Methodologies', icon: Wrench, items: skills.tools },
];

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const chipListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.02, delayChildren: 0.1 },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE },
  },
};

export const Skills = () => {
  return (
    <div className="py-24 md:py-32">
      <div className="container max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            <span className="font-mono text-lg md:text-xl text-accent mr-3 align-middle">
              03.
            </span>
            Skills
          </h2>
          <div aria-hidden="true" className="h-px flex-1 bg-line" />
        </motion.div>

        {/* Category cards */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="rounded-xl border border-line bg-surface p-6 hover:border-line-bright transition-[border-color,background-color] duration-300"
              >
                <div className="mb-5 flex items-center gap-3">
                  <Icon size={18} className="text-accent" aria-hidden="true" />
                  <h3 className="font-mono text-sm text-accent uppercase tracking-wider">
                    {category.title}
                  </h3>
                </div>

                <motion.ul
                  variants={chipListVariants}
                  className="flex flex-wrap gap-2"
                >
                  {category.items.map((item) => (
                    <motion.li
                      key={item}
                      variants={chipVariants}
                      className="font-mono text-xs px-3 py-1 rounded-full border border-line bg-surface text-ink-secondary hover:text-accent hover:border-accent/40 transition-colors cursor-default"
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
