import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Building2, Code2, Mail } from 'lucide-react';

interface TimelineSection {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const ScrollTimeline: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections: TimelineSection[] = [
    { id: 'home', label: 'Home', icon: <Home size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Code2 size={16} /> },
    { id: 'internships', label: 'Experience', icon: <Building2 size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Briefcase size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Determine active section
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="relative">
        {/* Background Line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-300/20 dark:bg-beige-400/10" />
        
        {/* Progress Line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-beige-400 via-beige-500 to-beige-600 origin-top"
          style={{
            height: `${scrollProgress}%`,
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: scrollProgress / 100 }}
          transition={{ duration: 0.1 }}
        />

        {/* Timeline Dots */}
        <div className="relative space-y-16 py-2">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            const isPassed = sections.findIndex(s => s.id === activeSection) > index;
            
            return (
              <motion.div
                key={section.id}
                className="relative flex items-center justify-center group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Clickable Dot */}
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-beige-400 border-beige-400 scale-125 shadow-lg shadow-beige-400/50'
                      : isPassed
                      ? 'bg-beige-500/50 border-beige-500/50'
                      : 'bg-transparent border-gray-400/30 dark:border-beige-400/20 hover:border-beige-400/50 hover:scale-110'
                  }`}
                  aria-label={`Go to ${section.label}`}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-beige-400"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ opacity: 0.3 }}
                    />
                  )}
                </button>

                {/* Label Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute right-full mr-4 whitespace-nowrap"
                >
                  <div className="flex items-center gap-2 px-3 py-2 bg-black/90 dark:bg-white/90 backdrop-blur-sm rounded-lg shadow-xl border border-beige-400/20">
                    <span className="text-beige-400 dark:text-beige-600">
                      {section.icon}
                    </span>
                    <span className="text-sm font-medium text-white dark:text-gray-900">
                      {section.label}
                    </span>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-black/90 dark:border-l-white/90" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Percentage Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollProgress > 5 ? 1 : 0 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs font-semibold text-beige-400 tabular-nums"
        >
          {Math.round(scrollProgress)}%
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollTimeline;
