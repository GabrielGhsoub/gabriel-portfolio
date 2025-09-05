import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Briefcase,
  Calendar,
  Circle,
  TrendingUp,
  Users,
  Zap,
  Code2,
  Scale,
  Landmark,
} from 'lucide-react';
import { experience } from '../../data/portfolio';
import { getCompanyLogo, getCompanyLinkedIn } from '../../data/companyLogos';

interface ExperienceCardProps {
  job: (typeof experience)[0];
  index: number;
  isEven: boolean;
}

const ExperienceCard = ({ job, index, isEven }: ExperienceCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? 100 : -100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  const highlightVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.2 + i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const getCompanyIcon = (company: string) => {
    if (company.includes('Syndicate'))
      return <Scale className="text-purple-400" size={20} />;
    if (company.includes('Bcom'))
      return <TrendingUp className="text-blue-400" size={20} />;
    if (company.includes('GCG'))
      return <Users className="text-green-400" size={20} />;
    if (company.includes('Inspire'))
      return <Zap className="text-yellow-400" size={20} />;
    if (company.includes('Blom'))
      return <Landmark className="text-blue-600" size={20} />;
    return <Briefcase className="text-gray-400" size={20} />;
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`flex items-center gap-8 mb-12 ${isEven ? 'flex-row-reverse' : ''}`}
    >
      {/* Timeline Node - Clickable Company Logo */}
      <motion.a
        href={getCompanyLinkedIn(job.company) || '#'}
        target={getCompanyLinkedIn(job.company) ? '_blank' : undefined}
        rel={
          getCompanyLinkedIn(job.company) ? 'noopener noreferrer' : undefined
        }
        className={`relative block ${getCompanyLinkedIn(job.company) ? 'cursor-pointer' : 'cursor-default'}`}
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring' as const, stiffness: 300 }}
        onClick={
          !getCompanyLinkedIn(job.company)
            ? (e) => e.preventDefault()
            : undefined
        }
      >
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/15 overflow-hidden ring-1 ring-blue-400/20 relative hover:ring-2 hover:ring-blue-400/40 transition-all duration-300">
          {getCompanyLogo(job.company) ? (
            <img
              src={getCompanyLogo(job.company)!}
              alt={job.company}
              className="w-12 h-12 object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              {getCompanyIcon(job.company)}
            </div>
          )}
        </div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur animate-pulse opacity-8"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      </motion.a>

      {/* Experience Card */}
      <motion.div
        className="flex-1 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
        whileHover={{
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
            <div className="flex items-center gap-2 text-blue-400 font-medium">
              {getCompanyIcon(job.company)}
              <span>{job.company}</span>
            </div>
          </div>
          <motion.div
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
            }
            transition={{ delay: index * 0.2 + 0.2 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              borderColor: 'rgba(59, 130, 246, 0.4)',
            }}
          >
            <motion.div
              animate={{
                color: ['#60a5fa', '#a78bfa', '#60a5fa'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Calendar size={16} />
            </motion.div>
            <motion.span
              className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.2 + 0.4 }}
            >
              {job.period}
            </motion.span>
          </motion.div>
        </div>

        <div className="space-y-3">
          {job.highlights.map((highlight, highlightIndex) => (
            <motion.div
              key={highlightIndex}
              custom={highlightIndex}
              variants={highlightVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex items-start gap-3 group"
            >
              <motion.div
                className="mt-2"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.2 + highlightIndex * 0.1 + 0.3 }}
                whileHover={{ scale: 1.2 }}
              >
                <Circle size={8} className="text-blue-400 fill-blue-400" />
              </motion.div>
              <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                {highlight}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Skills Gained */}
        <motion.div
          className="mt-4 pt-4 border-t border-gray-700/50"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Code2 size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-gray-400">
              Skills Gained:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Connection Line for Desktop */}
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 h-full -z-10" />
    </motion.div>
  );
};

export const Experience = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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
            <Briefcase className="text-blue-500" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Professional Journey
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My career progression through innovative companies and challenging
            projects
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 h-full opacity-30" />

          {experience.map((job, index) => (
            <ExperienceCard
              key={`${job.company}-${job.period}`}
              job={job}
              index={index}
              isEven={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
