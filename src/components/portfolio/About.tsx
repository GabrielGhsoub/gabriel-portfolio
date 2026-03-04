import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  User,
  GraduationCap,
  Calendar,
  Target,
  Lightbulb,
  Code,
  Heart,
  Rocket,
  Award,
  BookOpen,
} from 'lucide-react';
import { personalInfo, education } from '../../data/portfolio';

const useCountUp = (
  end: number,
  duration: number = 2000,
  startCounting: boolean = false
) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!startCounting) return;

    const startTime = performance.now();
    countRef.current = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(eased * end);

      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, startCounting]);

  return count;
};

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
  delay: number;
  startCounting: boolean;
}

const StatCard = ({
  value,
  suffix,
  label,
  color,
  gradientFrom,
  gradientTo,
  icon,
  delay,
  startCounting,
}: StatCardProps) => {
  const count = useCountUp(value, 2000, startCounting);

  return (
    <motion.div
      className="relative group"
      initial={{ scale: 0, opacity: 0 }}
      animate={
        startCounting ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
      }
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay,
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
      />
      <div className="relative glass-card-elevated rounded-2xl p-6 text-center group-hover:border-gray-600/30 transition-all duration-300">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} mb-4`}
        >
          {icon}
        </div>
        <div className={`text-4xl font-bold ${color} mb-1 tabular-nums`}>
          {count}
          {suffix}
        </div>
        <div className="text-gray-400 text-sm font-medium">{label}</div>
      </div>
    </motion.div>
  );
};

export const About = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 150,
      },
    },
  };

  const getExperienceYears = useCallback((): number => {
    const startDate = new Date(2021, 0);
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }, []);

  const stats = [
    {
      value: getExperienceYears(),
      suffix: '+',
      label: 'Years Experience',
      color: 'text-blue-400',
      gradientFrom: 'from-blue-500/20',
      gradientTo: 'to-cyan-500/20',
      icon: <Award size={22} className="text-white" />,
    },
    {
      value: 7,
      suffix: '',
      label: 'Companies',
      color: 'text-emerald-400',
      gradientFrom: 'from-emerald-500/20',
      gradientTo: 'to-green-500/20',
      icon: <Rocket size={22} className="text-white" />,
    },
    {
      value: 15,
      suffix: '+',
      label: 'Projects Delivered',
      color: 'text-purple-400',
      gradientFrom: 'from-purple-500/20',
      gradientTo: 'to-violet-500/20',
      icon: <Target size={22} className="text-white" />,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-500/[0.07] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-blue-500/[0.07] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[120px]" />
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              titleInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <User className="text-purple-400" size={16} />
            <span className="text-purple-300 text-sm font-medium">
              About Me
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get to Know Me
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The person behind the code, the passion behind the product
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto space-y-8"
        >
          {/* Professional Summary Card */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="relative glass-card-elevated rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/10">
                  <Target className="text-blue-400" size={22} />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Professional Summary
                </h3>
              </div>
              <motion.p
                className="text-gray-300 text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {personalInfo.summary}
              </motion.p>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            ref={statsRef}
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                {...stat}
                delay={i * 0.15}
                startCounting={statsInView}
              />
            ))}
          </motion.div>

          {/* Education & Philosophy Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Education Card */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative glass-card-elevated rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/10">
                    <GraduationCap className="text-emerald-400" size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Education</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <BookOpen size={18} className="text-emerald-400/60" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">
                        {education.degree}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-emerald-400/60" />
                    <span className="text-gray-300 font-medium">
                      {education.institution}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700/30">
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Strong foundation in computer science, networking, and
                      software engineering principles.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Philosophy Card */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative glass-card-elevated rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/10">
                    <Lightbulb className="text-amber-400" size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Philosophy</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Code size={18} className="text-amber-400/60" />
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      I believe in writing clean, maintainable code that solves
                      real-world problems and creates lasting value for
                      businesses and users alike.
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700/30">
                    <div className="flex items-center gap-3">
                      <Heart size={18} className="text-amber-400/60" />
                      <span className="text-gray-400 text-sm">
                        Passionate about scalable architectures and developer
                        experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Passion / What Drives Me Section */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-violet-500/20 via-pink-500/15 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="relative glass-card-elevated rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 border border-violet-500/10">
                  <Rocket className="text-violet-400" size={22} />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  What Drives Me
                </h3>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Code size={20} className="text-blue-400" />,
                    title: 'Clean Architecture',
                    description:
                      'Building systems that are maintainable, scalable, and a joy to work with.',
                    gradient: 'from-blue-500/10 to-cyan-500/10',
                    borderColor: 'border-blue-500/10',
                  },
                  {
                    icon: <Target size={20} className="text-purple-400" />,
                    title: 'Impact-Driven',
                    description:
                      'Every line of code should contribute to solving real problems and delivering value.',
                    gradient: 'from-purple-500/10 to-violet-500/10',
                    borderColor: 'border-purple-500/10',
                  },
                  {
                    icon: <Lightbulb size={20} className="text-amber-400" />,
                    title: 'Continuous Growth',
                    description:
                      "Embracing new technologies and pushing the boundaries of what's possible.",
                    gradient: 'from-amber-500/10 to-orange-500/10',
                    borderColor: 'border-amber-500/10',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    className={`p-5 rounded-xl bg-gradient-to-br ${item.gradient} border ${item.borderColor}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <div className="mb-3">{item.icon}</div>
                    <h4 className="text-white font-semibold mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
