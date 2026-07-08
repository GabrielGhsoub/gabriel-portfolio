import { useState, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import {
  Menu,
  X,
  User,
  Briefcase,
  Award,
  MessageCircle,
  FolderKanban,
} from 'lucide-react';

const navLinks = [
  { id: 'about', number: '01', label: 'About', icon: User },
  { id: 'projects', number: '02', label: 'Projects', icon: FolderKanban },
  { id: 'skills', number: '03', label: 'Skills', icon: Award },
  { id: 'experience', number: '04', label: 'Experience', icon: Briefcase },
  { id: 'contact', number: '05', label: 'Contact', icon: MessageCircle },
];

const sectionIds = ['home', ...navLinks.map((link) => link.id)];

// Height of the fixed nav bar (h-16 = 4rem = 64px)
const NAV_OFFSET = 64;

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 20,
      delay: 0.1,
    },
  },
};

const drawerVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 25,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const drawerItemVariants = {
  closed: { x: 50, opacity: 0 },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 20,
    },
  },
};

const backdropVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  const updateOnScroll = useCallback((scrollTop: number) => {
    // React bails out when the value is unchanged, so state only
    // flips when crossing the 50px threshold.
    setIsScrolled(scrollTop > 50);

    // Active section: bottom-up check of section positions
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const element = document.getElementById(sectionIds[i]);
      if (element && element.getBoundingClientRect().top <= 120) {
        setActiveSection(sectionIds[i]);
        break;
      }
    }
  }, []);

  useMotionValueEvent(scrollY, 'change', updateOnScroll);

  // Sync state on mount (e.g. page loaded mid-scroll)
  useEffect(() => {
    updateOnScroll(window.scrollY);
  }, [updateOnScroll]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close the drawer on Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Release the mobile drawer's body scroll-lock synchronously before
    // scrolling — otherwise the scroll is a no-op while the body is locked.
    setIsMenuOpen(false);
    document.body.style.overflow = '';

    // Offset by the fixed nav height so the heading isn't hidden beneath the
    // nav, and clamp so the last (short) section can still be reached.
    const target = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: Math.max(0, target - NAV_OFFSET),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent origin-left z-[60]"
      />

      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-line'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection('home')}
              className="font-display font-bold text-xl text-ink cursor-pointer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Go to top"
            >
              GG<span className="text-accent">.</span>
            </motion.button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`font-mono text-sm px-3 py-2 transition-colors cursor-pointer ${
                      isActive
                        ? 'text-accent'
                        : 'text-ink-secondary hover:text-accent'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-accent">{item.number}.</span>{' '}
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-ink-secondary hover:text-accent transition-colors cursor-pointer"
              whileTap={{ scale: 0.9 }}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    className="block"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    className="block"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-background/70 md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-surface border-l border-line md:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex h-16 items-center justify-between border-b border-line px-6">
                <button
                  onClick={() => scrollToSection('home')}
                  className="font-display font-bold text-xl text-ink cursor-pointer"
                  aria-label="Go to top"
                >
                  GG<span className="text-accent">.</span>
                </button>
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg text-ink-secondary hover:text-accent transition-colors cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <X size={20} aria-hidden="true" />
                </motion.button>
              </div>

              {/* Drawer items */}
              <div className="flex flex-1 flex-col justify-center gap-2 px-6">
                {navLinks.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      variants={drawerItemVariants}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-4 rounded-lg px-4 py-3 transition-colors cursor-pointer ${
                        isActive
                          ? 'text-accent bg-elevated'
                          : 'text-ink-secondary hover:text-accent hover:bg-elevated'
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <IconComponent size={18} aria-hidden="true" />
                      <span className="font-mono text-sm">
                        <span className="text-accent">{item.number}.</span>{' '}
                        {item.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Drawer footer */}
              <div className="border-t border-line px-6 py-6">
                <p className="text-center font-mono text-xs text-ink-muted">
                  Gabriel Ghoussoub
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
