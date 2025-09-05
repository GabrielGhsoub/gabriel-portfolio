import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Wrench, Cloud, Database, Settings, Trophy } from 'lucide-react';
import { skills } from '../../data/portfolio';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    skills: skills.languages,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Frameworks & Libraries',
    icon: Wrench,
    skills: skills.frameworks,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: skills.cloud,
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    title: 'Databases & Caching',
    icon: Database,
    skills: skills.databases,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    title: 'Tools & Methodologies',
    icon: Settings,
    skills: skills.tools,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring' as const,
        stiffness: 200,
        damping: 10,
      },
    }),
  };

  const IconComponent = category.icon;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`${category.bgColor} backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105`}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{
        y: -5,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
          <IconComponent size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{category.title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <motion.div
            key={skill}
            custom={skillIndex}
            variants={skillItemVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="px-3 py-2 bg-gray-800/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700/50 transition-colors cursor-default border border-gray-700/50"
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(75, 85, 99, 0.6)',
            }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: -30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="text-yellow-500" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Technical Skills
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Battle-tested technologies and frameworks I've mastered through
            years of development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
