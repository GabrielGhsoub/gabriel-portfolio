import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import profileImage from '../../assets/images/profile/profile.jpeg';

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image */}
          <motion.div
            className="w-32 h-32 mx-auto mb-8 relative"
            variants={itemVariants}
            animate={floatingAnimation}
          >
            <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-gray-300/20 relative">
              <img
                src={profileImage}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            {personalInfo.name}
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
            variants={itemVariants}
          >
            {personalInfo.title}
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Passionate about building scalable solutions that drive business
            success and user satisfaction
          </motion.p>

          {/* Contact Info */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin size={20} />
              <span>{personalInfo.location}</span>
            </motion.div>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              <span>{personalInfo.email}</span>
            </motion.a>
            <motion.a
              href={`tel:${personalInfo.phone}`}
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={20} />
              <span>{personalInfo.phone}</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6 mb-16"
            variants={itemVariants}
          >
            <motion.a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-600/20 rounded-full hover:bg-blue-600/40 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href={`https://${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-600/20 rounded-full hover:bg-gray-600/40 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} />
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div className="animate-bounce" variants={itemVariants}>
            <ArrowDown size={32} className="mx-auto text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
