import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const contactMethods = [
  {
    icon: Mail,
    label: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    ariaLabel: `Email ${personalInfo.name} at ${personalInfo.email}`,
    external: false,
  },
  {
    icon: Phone,
    label: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
    ariaLabel: `Call ${personalInfo.name} at ${personalInfo.phone}`,
    external: false,
  },
  {
    icon: MapPin,
    label: personalInfo.location,
    href: null,
    ariaLabel: null,
    external: false,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: `https://${personalInfo.linkedin}`,
    ariaLabel: `${personalInfo.name} on LinkedIn`,
    external: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    href: `https://${personalInfo.github}`,
    ariaLabel: `${personalInfo.name} on GitHub`,
    external: true,
  },
];

export const Contact = () => {
  return (
    <div>
      <div className="py-24 md:py-32">
        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-12 flex items-center gap-4"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              <span className="font-mono text-lg md:text-xl text-accent mr-3 align-middle">
                05.
              </span>
              Contact
            </h2>
            <div aria-hidden="true" className="h-px flex-1 bg-line" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.p
              variants={itemVariants}
              className="font-mono text-sm text-accent"
            >
              What's next?
            </motion.p>

            <motion.h3
              variants={itemVariants}
              className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink"
            >
              Let's build something together.
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-ink-secondary leading-relaxed"
            >
              I'm always open to new opportunities and interesting challenges.
              Whether you have a project in mind, a role to fill, or just want
              to say hi, my inbox is open and I'll get back to you.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-block bg-accent text-background font-medium rounded-lg px-6 py-3 hover:bg-accent-bright transition-colors"
              >
                Say hello
              </a>
            </motion.div>

            <motion.ul
              variants={itemVariants}
              className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
            >
              {contactMethods.map((method) => {
                const Icon = method.icon;
                const content = (
                  <>
                    <Icon size={16} aria-hidden="true" className="shrink-0" />
                    <span>{method.label}</span>
                  </>
                );

                return (
                  <li key={method.label}>
                    {method.href ? (
                      <a
                        href={method.href}
                        aria-label={method.ariaLabel ?? undefined}
                        target={method.external ? '_blank' : undefined}
                        rel={
                          method.external ? 'noopener noreferrer' : undefined
                        }
                        className="inline-flex items-center gap-2 font-mono text-sm text-ink-secondary hover:text-accent transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 font-mono text-sm text-ink-secondary">
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
