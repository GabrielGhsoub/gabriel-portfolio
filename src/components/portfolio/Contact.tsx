import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  MessageCircle,
  FileDown,
  ExternalLink,
} from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: 'from-blue-500 to-cyan-500',
    hoverGlow: 'rgba(59, 130, 246, 0.15)',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    color: 'from-emerald-500 to-teal-500',
    hoverGlow: 'rgba(16, 185, 129, 0.15)',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Connect with me',
    href: `https://${personalInfo.linkedin}`,
    color: 'from-blue-600 to-indigo-600',
    hoverGlow: 'rgba(79, 70, 229, 0.15)',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'View my projects',
    href: `https://${personalInfo.github}`,
    color: 'from-purple-500 to-violet-600',
    hoverGlow: 'rgba(139, 92, 246, 0.15)',
  },
];

interface ContactCardProps {
  method: (typeof contactMethods)[0];
  index: number;
}

const ContactCard = ({ method, index }: ContactCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Tilt effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.12,
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const IconComponent = method.icon;

  return (
    <motion.a
      ref={(node) => {
        ref(node);
        (cardRef as React.MutableRefObject<HTMLAnchorElement | null>).current =
          node;
      }}
      href={method.href}
      target={method.href.startsWith('http') ? '_blank' : undefined}
      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="relative rounded-xl p-6 cursor-pointer group block card-gradient-border card-hover-glow overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        background: 'rgba(15, 23, 42, 0.6)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -8,
        boxShadow: `0 25px 50px ${method.hoverGlow}`,
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Subtle shine effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex items-center gap-4">
        <motion.div
          className={`p-3 rounded-xl bg-gradient-to-br ${method.color} shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <IconComponent size={22} className="text-white" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-white mb-0.5 group-hover:text-blue-300 transition-colors flex items-center gap-2">
            {method.label}
            {method.href.startsWith('http') && (
              <ExternalLink
                size={12}
                className="opacity-0 group-hover:opacity-60 transition-opacity"
              />
            )}
          </h3>
          <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors truncate">
            {method.value}
          </p>
        </div>
      </div>
    </motion.a>
  );
};

export const Contact = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-80 h-80 bg-blue-500/[0.04] rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-purple-500/[0.04] rounded-full blur-3xl animate-orb-2" />
        <div className="absolute top-[50%] left-[40%] w-72 h-72 bg-cyan-500/[0.03] rounded-full blur-3xl animate-orb-3" />
      </div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: -30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/[0.08] border border-blue-500/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              titleInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MessageCircle size={14} className="text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">
              Get In Touch
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Ready to collaborate on your next project? Let's discuss how we can
            build something amazing together.
          </p>
        </motion.div>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            titleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center justify-center gap-2 mb-14"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <MapPin className="text-red-400" size={16} />
            <span className="text-gray-400 text-sm font-medium">
              {personalInfo.location}
            </span>
          </div>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-20">
          {contactMethods.map((method, index) => (
            <ContactCard key={method.label} method={method} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            className="relative max-w-2xl mx-auto p-10 rounded-2xl overflow-hidden"
            whileHover={{
              boxShadow: '0 30px 60px rgba(59, 130, 246, 0.1)',
            }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {/* CTA card background with gradient border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/[0.06] via-purple-500/[0.04] to-cyan-500/[0.06]" />
            <div className="absolute inset-0 rounded-2xl card-gradient-border" />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to start a project?
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                I'm always interested in new opportunities and exciting
                challenges. Let's build something great.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Send Message - Primary */}
                <motion.a
                  href={`mailto:${personalInfo.email}?subject=Project Collaboration`}
                  className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white overflow-hidden group"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] animate-gradient" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] animate-gradient" />
                  <span className="relative z-10 flex items-center gap-2">
                    <Send size={18} />
                    Send Message
                  </span>
                </motion.a>

                {/* Download Resume - Secondary */}
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-gray-300 hover:text-white overflow-hidden group gradient-border"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.05] transition-all duration-300 rounded-xl" />
                  <span className="relative z-10 flex items-center gap-2">
                    <FileDown size={18} />
                    Download Resume
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
