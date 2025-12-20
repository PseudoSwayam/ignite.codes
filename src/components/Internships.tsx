import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Calendar, Zap, FileText } from 'lucide-react';

interface Internship {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
  tags: string[];
  certificatePath?: string;
}

const Internships: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const [showCertificate, setShowCertificate] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const handleCardHoverStart = useCallback((internship: Internship) => {
    if (internship.certificatePath) {
      setHoveredCard(internship.id);
      hoverTimerRef.current = window.setTimeout(() => {
        setShowCertificate(internship.certificatePath!);
        setHoveredCard(null);
      }, 2000);
    }
  }, []);

  const handleCardHoverEnd = useCallback(() => {
    setHoveredCard(null);
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  const closeCertificate = useCallback(() => {
    setShowCertificate(null);
  }, []);

  // Internships in chronological order (oldest first)
  const internships: Internship[] = [
    {
      id: 3,
      company: 'DeepSurge.ai',
      role: 'AI/ML Intern',
      duration: 'Jul 2025 - Aug 2025',
      description: 'Built YOLOv8-based computer vision pipelines to analyze road infrastructure from 500+ annotated video samples.',
      tags: ['AI', 'YOLOv8', 'Computer Vision'],
      certificatePath: '/Deepsurge.ai.pdf'
    },
    {
      id: 2,
      company: 'Scalable Systems',
      role: 'Data Science Intern',
      duration: 'Jun 2025 - Oct 2025',
      description: 'Designed and optimized ETL pipelines using SQL Server and Databricks to process 10M+ records.',
      tags: ['ETL', 'SQL Server', 'Databricks'],
      certificatePath: '/Scalable_Systems.pdf'
    },
    {
      id: 1,
      company: 'Samsung R&D Institute',
      role: 'Research Intern',
      duration: 'Nov 2025 - Present',
      description: 'Developing deep learning models for DNG image quality enhancement on low-light and noisy datasets.',
      tags: ['Deep Learning', 'Image Processing', 'Research']
    }
  ];

  return (
    <section id="internships" className="py-8 px-4 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        {/* Card Deck Animation Container */}
        <div ref={containerRef} className="h-[300vh] relative">
          {/* Sticky container with heading at top */}
          <div className="sticky top-16 h-screen flex flex-col pt-4 pb-12">
            {/* Header - stays at top */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Professional Experience
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-beige-300 to-beige-500 rounded-full" />
            </motion.div>

            {/* Cards area - positioned below heading */}
            <div className="flex-1 flex items-start justify-start pt-4">
            <div className="relative w-full max-w-5xl mx-auto">
              {internships.map((internship, index) => {
                // Card positions based on scroll
                // Card 0 (DeepSurge): falls down first, then slides right
                // Card 1 (Scalable): falls down second, then slides to middle
                // Card 2 (Samsung): falls down last, stays at left
                
                let xMid = 0;
                let xEnd = 0;
                let yStart = -100;
                let yMid = 0;
                let scrollStart = 0.1;
                let scrollMid = 0.2;
                let scrollEnd = 0.3;

                if (index === 0) {
                  // First card: falls down, then slides all the way right
                  yStart = -100;
                  yMid = 0;
                  xMid = 0;
                  xEnd = 650;
                  scrollStart = 0.1;
                  scrollMid = 0.2;
                  scrollEnd = 0.4;
                } else if (index === 1) {
                  // Second card: falls down, then slides to middle
                  yStart = -100;
                  yMid = 0;
                  xMid = 0;
                  xEnd = 325;
                  scrollStart = 0.25;
                  scrollMid = 0.35;
                  scrollEnd = 0.55;
                } else {
                  // Third card: falls down, stays at left
                  yStart = -100;
                  yMid = 0;
                  xMid = 0;
                  xEnd = 0;
                  scrollStart = 0.4;
                  scrollMid = 0.5;
                  scrollEnd = 0.6;
                }

                // Y position for falling animation
                const y = useTransform(
                  scrollYProgress,
                  [scrollStart, scrollMid],
                  [yStart, yMid]
                );

                // X position for sliding animation (happens after falling)
                const x = useTransform(
                  scrollYProgress,
                  [scrollMid, scrollEnd],
                  [xMid, xEnd]
                );

                // Stacking effect - cards start on top of each other
                const initialZ = internships.length - index;
                
                // Rotation for falling effect
                const rotateZ = useTransform(
                  scrollYProgress,
                  [scrollStart, scrollMid],
                  [0, index === 0 ? 2 : index === 1 ? -2 : 1]
                );

                // Scale during fall
                const scale = useTransform(
                  scrollYProgress,
                  [scrollStart, scrollMid],
                  [0.9, 1]
                );

                // Opacity during fall
                const opacity = useTransform(
                  scrollYProgress,
                  [scrollStart, scrollStart + 0.05],
                  [0, 1]
                );

                return (
                  <motion.div
                    key={internship.id}
                    style={{
                      x,
                      y,
                      rotateZ,
                      scale,
                      opacity,
                      zIndex: initialZ,
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-80"
                    onMouseEnter={() => handleCardHoverStart(internship)}
                    onMouseLeave={handleCardHoverEnd}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.2 } }}
                      className="relative"
                      style={{ willChange: 'transform' }}
                      data-cursor-text={internship.certificatePath && hoveredCard === internship.id ? "keep hovering" : undefined}
                    >
                      {/* Certificate indicator */}
                      {internship.certificatePath && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <div className="relative bg-gradient-to-r from-beige-300 to-beige-500 rounded-full p-2 shadow-lg">
                            <FileText className="w-4 h-4 text-black" />
                            
                            {/* Loading ring when hovering */}
                            {hoveredCard === internship.id && (
                              <svg 
                                className="absolute inset-0 -m-0.5 w-[calc(100%+4px)] h-[calc(100%+4px)] -rotate-90" 
                                viewBox="0 0 50 50"
                              >
                                <circle
                                  cx="25"
                                  cy="25"
                                  r="20"
                                  fill="none"
                                  stroke="rgba(0,0,0,0.1)"
                                  strokeWidth="3"
                                />
                                <motion.circle
                                  cx="25"
                                  cy="25"
                                  r="20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  className="text-black"
                                  initial={{ strokeDashoffset: 126 }}
                                  animate={{ strokeDashoffset: 0 }}
                                  exit={{ strokeDashoffset: 126 }}
                                  transition={{ duration: 2, ease: "linear" }}
                                  style={{
                                    strokeDasharray: "126",
                                  }}
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-beige-300/20 to-beige-500/20 rounded-2xl blur-xl" />

                      {/* Card */}
                      <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-beige-400/20 overflow-hidden shadow-2xl">
                        {/* Gradient background */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute inset-0 bg-gradient-to-br from-beige-400/20 via-transparent to-transparent" />
                        </div>

                        <div className="relative p-8">
                          {/* Company Icon & Name */}
                          <div className="flex items-center gap-3 mb-6">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-beige-300 to-beige-500 rounded-lg blur-md opacity-50" />
                              <div className="relative bg-black p-2.5 rounded-lg border border-beige-400/50">
                                <Building2 className="w-5 h-5 text-beige-300" />
                              </div>
                            </div>
                            <div>
                              <div className="text-beige-300 font-semibold text-xs uppercase tracking-wider">
                                Company
                              </div>
                              <div className="text-white font-bold text-lg">
                                {internship.company}
                              </div>
                            </div>
                          </div>

                          {/* Role */}
                          <h3 className="text-3xl font-black text-white mb-4 leading-tight">
                            {internship.role}
                          </h3>
                          
                          <div className="h-1 w-16 bg-gradient-to-r from-beige-300 to-beige-500 rounded-full mb-4" />

                          {/* Duration */}
                          <div className="flex items-center gap-2 mb-4">
                            <Calendar className="w-4 h-4 text-beige-300" />
                            <span className="text-beige-100 font-medium text-sm">
                              {internship.duration}
                            </span>
                            {index === 2 && (
                              <div className="ml-2 px-2 py-0.5 bg-beige-500/20 border border-beige-400/50 rounded-full">
                                <span className="text-beige-200 text-xs font-bold uppercase flex items-center gap-1">
                                  <Zap className="w-3 h-3" />
                                  Current
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-beige-100 text-sm leading-relaxed mb-6">
                            {internship.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {internship.tags.map((tag) => (
                              <div
                                key={tag}
                                className="px-3 py-1.5 bg-black/80 border border-beige-400/30 rounded-full text-beige-200 font-semibold text-xs"
                              >
                                {tag}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom accent */}
                        <div className="h-1.5 bg-gradient-to-r from-beige-300 via-beige-400 to-beige-500" />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-beige-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-beige-300/5 rounded-full blur-3xl" />
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          style={{ willChange: 'opacity' }}
          onClick={closeCertificate}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-neutral-950 rounded-2xl border-2 border-beige-300/30 shadow-2xl overflow-hidden"
            style={{ willChange: 'transform, opacity' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-beige-900/40 via-beige-800/30 to-beige-900/40 border-b border-beige-400/20 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-beige-300" />
                <h3 className="text-xl font-bold text-white">Certificate</h3>
              </div>
              <button
                onClick={closeCertificate}
                className="p-2 rounded-full bg-beige-900/40 hover:bg-beige-800/60 text-beige-200 hover:text-white border border-beige-400/20 hover:border-beige-300/40 transition-all duration-200"
                data-cursor-text="close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="w-full h-[calc(90vh-80px)] bg-neutral-900">
              <iframe
                src={showCertificate}
                className="w-full h-full"
                title="Certificate"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Internships;
