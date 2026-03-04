import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  FileDown,
  Mouse,
} from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import profileImage from '../../assets/images/profile/profile.jpeg';

const FloatingParticle = ({
  delay,
  duration,
  x,
  size,
}: {
  delay: number;
  duration: number;
  x: number;
  size: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-blue-400/20"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      bottom: '-5%',
    }}
    animate={{
      y: [0, -800],
      x: [0, Math.random() * 100 - 50],
      opacity: [0, 0.6, 0.6, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

export const Hero = () => {
  const [titleText, setTitleText] = useState('');
  const fullTitle = personalInfo.title;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const backgroundX = useTransform(mouseX, [0, window.innerWidth], [10, -10]);
  const backgroundY = useTransform(mouseY, [0, window.innerHeight], [10, -10]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullTitle.length) {
        setTitleText(fullTitle.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [fullTitle]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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

  const blurInVariants = {
    hidden: {
      y: 40,
      opacity: 0,
      filter: 'blur(10px)',
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  const slideUpVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 80,
        duration: 0.9,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const particles = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 1.5,
    duration: 8 + Math.random() * 6,
    x: Math.random() * 100,
    size: 2 + Math.random() * 4,
  }));

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 text-white relative overflow-hidden flex items-center">
      {/* Animated Background - Floating Gradient Orbs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: backgroundX, y: backgroundY }}
      >
        <div className="absolute top-[10%] left-[5%] w-80 h-80 bg-blue-500/[0.07] rounded-full blur-3xl animate-orb-1" />
        <div className="absolute top-[60%] right-[5%] w-96 h-96 bg-purple-500/[0.07] rounded-full blur-3xl animate-orb-2" />
        <div className="absolute top-[30%] left-[50%] w-72 h-72 bg-cyan-500/[0.05] rounded-full blur-3xl animate-orb-3" />
        <div className="absolute bottom-[10%] left-[20%] w-64 h-64 bg-indigo-500/[0.06] rounded-full blur-3xl animate-orb-2" />
        <div className="absolute top-[15%] right-[25%] w-56 h-56 bg-violet-500/[0.05] rounded-full blur-3xl animate-orb-1" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image with Glow */}
          <motion.div
            className="w-36 h-36 mx-auto mb-10 relative"
            variants={blurInVariants}
          >
            <motion.div
              className="w-full h-full rounded-full overflow-hidden animate-profile-glow relative"
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                  <img
                    src={profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
            {/* Decorative ring */}
            <motion.div
              className="absolute inset-[-8px] rounded-full border border-blue-500/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* Name - Blur in with animated gradient */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text leading-tight"
            variants={blurInVariants}
          >
            {personalInfo.name}
          </motion.h1>

          {/* Title - Typing effect */}
          <motion.div className="mb-8" variants={slideUpVariants}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-200 font-light tracking-wide">
              {titleText}
              <motion.span
                className="inline-block w-[3px] h-[1em] bg-blue-400 ml-1 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-14 max-w-2xl mx-auto leading-relaxed"
            variants={slideUpVariants}
          >
            Passionate about building scalable solutions that drive business
            success and user satisfaction
          </motion.p>

          {/* Contact Info Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-10"
            variants={fadeInVariants}
          >
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/[0.06] transition-all duration-300 cursor-default"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <MapPin size={16} />
              <span className="text-sm">{personalInfo.location}</span>
            </motion.div>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/[0.06] transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={16} />
              <span className="text-sm">{personalInfo.email}</span>
            </motion.a>
            <motion.a
              href={`tel:${personalInfo.phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/[0.06] transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={16} />
              <span className="text-sm">{personalInfo.phone}</span>
            </motion.a>
          </motion.div>

          {/* Social Links and CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={fadeInVariants}
          >
            {/* LinkedIn */}
            <motion.a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300 card-hover-glow"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin
                size={22}
                className="text-gray-400 group-hover:text-blue-400 transition-colors"
              />
            </motion.a>

            {/* GitHub */}
            <motion.a
              href={`https://${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300 card-hover-glow"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github
                size={22}
                className="text-gray-400 group-hover:text-purple-400 transition-colors"
              />
            </motion.a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-20"
            variants={fadeInVariants}
          >
            {/* Get In Touch - Primary */}
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white overflow-hidden group"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] animate-gradient" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] animate-gradient" />
              <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] animate-gradient" />
              <span className="relative z-10 flex items-center gap-2">
                <Mail size={18} />
                Get In Touch
              </span>
            </motion.a>

            {/* Download Resume - Secondary with gradient border */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-gray-200 hover:text-white overflow-hidden group gradient-border"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-white/[0.03] group-hover:bg-white/[0.06] transition-all duration-300 rounded-xl" />
              <span className="relative z-10 flex items-center gap-2">
                <FileDown size={18} />
                Download Resume
              </span>
            </motion.a>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            className="cursor-pointer"
            variants={fadeInVariants}
            onClick={scrollToAbout}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Mouse size={20} />
              <ArrowDown size={16} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
