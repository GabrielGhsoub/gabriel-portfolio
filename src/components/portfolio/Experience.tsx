import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
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
  Globe,
  ChevronRight,
} from 'lucide-react';
import { experience } from '../../data/portfolio';
import { getCompanyLogo, getCompanyLinkedIn } from '../../data/companyLogos';

interface ExperienceCardProps {
  job: (typeof experience)[0];
  index: number;
  isEven: boolean;
}

const getCompanyIcon = (company: string) => {
  if (company.includes('Syndicate'))
    return <Scale className="text-purple-400" size={18} />;
  if (company.includes('Bcom'))
    return <TrendingUp className="text-blue-400" size={18} />;
  if (company.includes('GCG'))
    return <Users className="text-green-400" size={18} />;
  if (company.includes('Inspire'))
    return <Zap className="text-yellow-400" size={18} />;
  if (company.includes('WonderEight'))
    return <Globe className="text-pink-400" size={18} />;
  if (company.includes('Blom'))
    return <Landmark className="text-blue-600" size={18} />;
  return <Briefcase className="text-gray-400" size={18} />;
};

const ExperienceCard = ({ job, index, isEven }: ExperienceCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const linkedInUrl = getCompanyLinkedIn(job.company);
  const logoUrl = getCompanyLogo(job.company);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? 60 : -60 }}
      animate={
        inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 60 : -60 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      className={`flex items-start gap-6 md:gap-8 mb-12 last:mb-0 ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Timeline Node */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        <motion.a
          href={linkedInUrl || '#'}
          target={linkedInUrl ? '_blank' : undefined}
          rel={linkedInUrl ? 'noopener noreferrer' : undefined}
          className={`relative block z-10 ${linkedInUrl ? 'cursor-pointer' : 'cursor-default'}`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={!linkedInUrl ? (e) => e.preventDefault() : undefined}
        >
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden ring-2 ring-blue-400/20 hover:ring-blue-400/50 transition-all duration-300">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={job.company}
                className="w-10 h-10 object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                {getCompanyIcon(job.company)}
              </div>
            )}
          </div>
          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/20 blur-md -z-10"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.a>
      </div>

      {/* Experience Card */}
      <motion.div
        className="flex-1 relative group"
        whileHover={{
          y: -3,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      >
        {/* Gradient border glow on hover */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

        <div className="relative glass-card-elevated rounded-2xl p-6 md:p-7 group-hover:border-gray-600/30 transition-all duration-300">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <div className="flex items-start gap-3">
              {/* Mobile-only logo */}
              <motion.a
                href={linkedInUrl || '#'}
                target={linkedInUrl ? '_blank' : undefined}
                rel={linkedInUrl ? 'noopener noreferrer' : undefined}
                className={`md:hidden flex-shrink-0 ${linkedInUrl ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={!linkedInUrl ? (e) => e.preventDefault() : undefined}
              >
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center overflow-hidden ring-1 ring-blue-400/20">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={job.company}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      {getCompanyIcon(job.company)}
                    </div>
                  )}
                </div>
              </motion.a>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 text-blue-400 font-medium text-sm">
                  {getCompanyIcon(job.company)}
                  <span>{job.company}</span>
                </div>
              </div>
            </div>

            {/* Period Badge */}
            <motion.div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 self-start flex-shrink-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
              }
              transition={{ delay: index * 0.15 + 0.2 }}
            >
              <Calendar size={14} className="text-blue-400" />
              <span className="text-xs font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
                {job.period}
              </span>
            </motion.div>
          </div>

          {/* Highlights */}
          <div className="space-y-3 mb-5">
            {job.highlights.map((highlight, highlightIndex) => (
              <motion.div
                key={highlightIndex}
                initial={{ opacity: 0, x: -15 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                transition={{
                  delay: index * 0.15 + highlightIndex * 0.1 + 0.3,
                  duration: 0.4,
                }}
                className="flex items-start gap-2.5 group/item"
              >
                <motion.div className="mt-2 flex-shrink-0">
                  <ChevronRight
                    size={14}
                    className="text-blue-400/70 group-hover/item:text-blue-400 transition-colors"
                  />
                </motion.div>
                <p className="text-gray-300 text-sm leading-relaxed group-hover/item:text-gray-200 transition-colors">
                  {highlight}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Skills Tags */}
          <motion.div
            className="pt-4 border-t border-gray-700/30"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Code2 size={14} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key Skills
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    inView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{
                    delay: index * 0.15 + skillIndex * 0.08 + 0.5,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -1,
                    transition: { duration: 0.15 },
                  }}
                  className="px-2.5 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 text-xs font-medium rounded-lg border border-blue-500/15 hover:border-blue-400/30 hover:text-blue-200 transition-all duration-200 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Experience = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%']);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-500/[0.05] rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/[0.05] rounded-full blur-[100px]" />
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              titleInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Briefcase className="text-blue-400" size={16} />
            <span className="text-blue-300 text-sm font-medium">
              Experience
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My career progression through innovative companies and challenging
            projects
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineContainerRef} className="relative max-w-5xl mx-auto">
          {/* Animated Central Timeline Line (Desktop only) */}
          <div className="hidden md:block absolute left-[27px] top-0 bottom-0 w-[2px]">
            {/* Background track */}
            <div className="absolute inset-0 bg-gray-800/50 rounded-full" />
            {/* Animated fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-0">
            {experience.map((job, index) => (
              <ExperienceCard
                key={`${job.company}-${job.period}`}
                job={job}
                index={index}
                isEven={false}
              />
            ))}
          </div>

          {/* Timeline End Dot */}
          <motion.div
            className="hidden md:flex absolute left-[20px] bottom-0 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 items-center justify-center z-10"
            initial={{ scale: 0 }}
            animate={titleInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 1.5, type: 'spring' }}
          >
            <Circle size={8} className="text-white fill-white" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
