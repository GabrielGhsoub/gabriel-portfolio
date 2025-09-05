import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  User,
  GraduationCap,
  Calendar,
  Target,
  Lightbulb,
  Code,
} from 'lucide-react';
import { personalInfo, education } from '../../data/portfolio';

export const About = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const iconRotateVariants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: 'easeInOut' as const,
      },
    },
  };

  const statsCounterVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
        delay: i * 0.2,
      },
    }),
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
            <User className="text-purple-500" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              About Me
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          {/* Personal Summary Card */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            initial="hidden"
            animate={titleInView ? 'visible' : 'hidden'}
            {...cardHoverVariants}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8 cursor-default"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div variants={iconRotateVariants} whileHover="hover">
                <Target className="text-blue-400" size={24} />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">
                Professional Summary
              </h3>
            </div>
            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {personalInfo.summary}
            </motion.p>
          </motion.div>

          {/* Education & Philosophy */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              {...cardHoverVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 cursor-default"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div variants={iconRotateVariants} whileHover="hover">
                  <GraduationCap className="text-green-400" size={24} />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Education</h3>
              </div>
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={
                  titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 text-blue-400">
                  <Calendar size={16} />
                  <span className="font-medium">{education.institution}</span>
                </div>
                <p className="text-gray-300">{education.degree}</p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover="hover"
              {...cardHoverVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 cursor-default"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div variants={iconRotateVariants} whileHover="hover">
                  <Lightbulb className="text-yellow-400" size={24} />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Philosophy</h3>
              </div>
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: 20 }}
                animate={
                  titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                }
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 text-purple-400">
                  <Code size={16} />
                  <span className="font-medium">Code with Purpose</span>
                </div>
                <p className="text-gray-300">
                  I believe in writing clean, maintainable code that solves
                  real-world problems and creates lasting value for businesses
                  and users alike.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Key Achievements */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            {...cardHoverVariants}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mt-8 cursor-default"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div variants={iconRotateVariants} whileHover="hover">
                <Target className="text-orange-400" size={24} />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">
                Key Achievements
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="text-center"
                variants={statsCounterVariants}
                custom={0}
                initial="hidden"
                animate={titleInView ? 'visible' : 'hidden'}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring' as const, stiffness: 300 }}
              >
                <motion.div
                  className="text-3xl font-bold text-blue-400 mb-2"
                  initial={{ scale: 0 }}
                  animate={titleInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    delay: 1.2,
                    type: 'spring' as const,
                    stiffness: 200,
                  }}
                >
                  4+
                </motion.div>
                <div className="text-gray-300">Years Experience</div>
              </motion.div>
              <motion.div
                className="text-center"
                variants={statsCounterVariants}
                custom={1}
                initial="hidden"
                animate={titleInView ? 'visible' : 'hidden'}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring' as const, stiffness: 300 }}
              >
                <motion.div
                  className="text-3xl font-bold text-green-400 mb-2"
                  initial={{ scale: 0 }}
                  animate={titleInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    delay: 1.4,
                    type: 'spring' as const,
                    stiffness: 200,
                  }}
                >
                  6
                </motion.div>
                <div className="text-gray-300">Companies Worked</div>
              </motion.div>
              <motion.div
                className="text-center"
                variants={statsCounterVariants}
                custom={2}
                initial="hidden"
                animate={titleInView ? 'visible' : 'hidden'}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring' as const, stiffness: 300 }}
              >
                <motion.div
                  className="text-3xl font-bold text-purple-400 mb-2"
                  initial={{ scale: 0 }}
                  animate={titleInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    delay: 1.6,
                    type: 'spring' as const,
                    stiffness: 200,
                  }}
                >
                  15+
                </motion.div>
                <div className="text-gray-300">Projects Delivered</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
