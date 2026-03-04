import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  Boxes,
  Cloud,
  Database,
  Wrench,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { skills } from '../../data/portfolio';

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    skills: skills.languages,
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    accentColor: 'text-blue-400',
    bgAccent: 'bg-blue-500/10',
    borderAccent: 'border-blue-500/20',
    pillHover:
      'hover:bg-blue-500/20 hover:border-blue-400/40 hover:text-blue-300',
  },
  {
    title: 'Frameworks & Libraries',
    icon: Boxes,
    skills: skills.frameworks,
    gradient: 'from-emerald-500 to-green-500',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    accentColor: 'text-emerald-400',
    bgAccent: 'bg-emerald-500/10',
    borderAccent: 'border-emerald-500/20',
    pillHover:
      'hover:bg-emerald-500/20 hover:border-emerald-400/40 hover:text-emerald-300',
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: skills.cloud,
    gradient: 'from-purple-500 to-violet-500',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    accentColor: 'text-purple-400',
    bgAccent: 'bg-purple-500/10',
    borderAccent: 'border-purple-500/20',
    pillHover:
      'hover:bg-purple-500/20 hover:border-purple-400/40 hover:text-purple-300',
  },
  {
    title: 'Databases & Caching',
    icon: Database,
    skills: skills.databases,
    gradient: 'from-orange-500 to-amber-500',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    accentColor: 'text-orange-400',
    bgAccent: 'bg-orange-500/10',
    borderAccent: 'border-orange-500/20',
    pillHover:
      'hover:bg-orange-500/20 hover:border-orange-400/40 hover:text-orange-300',
  },
  {
    title: 'Tools & Methodologies',
    icon: Wrench,
    skills: skills.tools,
    gradient: 'from-pink-500 to-rose-500',
    glowColor: 'rgba(236, 72, 153, 0.3)',
    accentColor: 'text-pink-400',
    bgAccent: 'bg-pink-500/10',
    borderAccent: 'border-pink-500/20',
    pillHover:
      'hover:bg-pink-500/20 hover:border-pink-400/40 hover:text-pink-300',
  },
];

interface SkillCardProps {
  category: (typeof skillCategories)[0];
  index: number;
}

const SkillCard = ({ category, index }: SkillCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const IconComponent = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        type: 'spring',
        stiffness: 120,
        damping: 14,
      }}
      className="relative group"
    >
      {/* Glow background on hover */}
      <motion.div
        className={`absolute -inset-[1px] bg-gradient-to-br ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
        style={{ opacity: 0 }}
        whileHover={{ opacity: 0.15 }}
      />

      <div className="relative glass-card-elevated rounded-2xl p-6 h-full group-hover:border-gray-600/30 transition-all duration-300">
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-5">
          <motion.div
            className={`p-2.5 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg`}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { type: 'spring', stiffness: 400 },
            }}
          >
            <IconComponent size={20} className="text-white" />
          </motion.div>
          <h3 className="text-lg font-bold text-white">{category.title}</h3>
        </div>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }
              }
              transition={{
                delay: index * 0.12 + skillIndex * 0.06,
                type: 'spring',
                stiffness: 250,
                damping: 12,
              }}
              whileHover={{
                scale: 1.08,
                y: -2,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-default
                bg-gray-800/60 text-gray-300 border border-gray-700/40
                ${category.pillHover}
                transition-all duration-200`}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const totalSkills = Object.values(skills).flat().length;

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      {/* Background Blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: -30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              titleInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Trophy className="text-yellow-400" size={16} />
            <span className="text-yellow-300 text-sm font-medium">
              Technical Skills
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Tech Stack
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Battle-tested technologies across{' '}
            <span className="text-white font-medium">{totalSkills}+</span> tools
            and frameworks
          </p>
        </motion.div>

        {/* Skills Grid: 3 columns on xl, 2 on md */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}

          {/* Extra card: Total Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: skillCategories.length * 0.12, duration: 0.5 }}
            className="relative group"
          >
            <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="relative glass-card-elevated rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center group-hover:border-gray-600/30 transition-all duration-300">
              <motion.div
                className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles size={28} className="text-purple-400" />
              </motion.div>
              <div className="text-3xl font-bold text-white mb-1">
                {totalSkills}+
              </div>
              <div className="text-gray-400 text-sm font-medium mb-3">
                Technologies & Tools
              </div>
              <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                Continuously expanding through hands-on projects and learning
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
