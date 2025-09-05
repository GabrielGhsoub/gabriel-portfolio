import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  MessageCircle,
} from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Connect with me',
    href: `https://${personalInfo.linkedin}`,
    color: 'from-blue-600 to-blue-800',
    bgColor: 'bg-blue-600/10',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'View my projects',
    href: `https://${personalInfo.github}`,
    color: 'from-gray-700 to-gray-900',
    bgColor: 'bg-gray-700/10',
  },
];

interface ContactCardProps {
  method: (typeof contactMethods)[0];
  index: number;
}

const ContactCard = ({ method, index }: ContactCardProps) => {
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
        delay: index * 0.1,
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  const IconComponent = method.icon;

  return (
    <motion.a
      ref={ref}
      href={method.href}
      target={method.href.startsWith('http') ? '_blank' : undefined}
      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`${method.bgColor} backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 cursor-pointer group block`}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{
        y: -5,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className={`p-3 rounded-lg bg-gradient-to-r ${method.color} group-hover:scale-110 transition-transform`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <IconComponent size={24} className="text-white" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
            {method.label}
          </h3>
          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors truncate">
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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
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
            <MessageCircle className="text-green-500" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Let's Connect
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how we can
            build something amazing together!
          </p>
        </motion.div>

        {/* Location Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            titleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <MapPin className="text-red-400" size={20} />
          <span className="text-gray-300 font-medium">
            {personalInfo.location}
          </span>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {contactMethods.map((method, index) => (
            <ContactCard key={method.label} method={method} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <motion.div
            className="inline-block p-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 25px 50px rgba(59, 130, 246, 0.15)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to start a project?
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              I'm always interested in new opportunities and exciting
              challenges.
            </p>

            <motion.a
              href={`mailto:${personalInfo.email}?subject=Project Collaboration`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={20} />
              <span>Send Message</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
