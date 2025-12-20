import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Calendar, Wrench } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    period: string;
    techStack: string[];
    description: string;
    situation: string;
    task: string;
    action: string;
    result: string;
    githubUrl?: string;
    liveUrl?: string;
  } | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-4xl max-h-[85vh] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glowing background effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-beige-300/20 via-beige-400/20 to-beige-500/20 rounded-3xl blur-xl opacity-75" />
              
              {/* Main content */}
              <div className="relative bg-neutral-950 border border-beige-300/30 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-beige-900/40 via-beige-800/30 to-beige-900/40 border-b border-beige-400/20 px-8 py-6">
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-beige-300/10 to-transparent rounded-br-full" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-beige-300/10 to-transparent rounded-bl-full" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <motion.h2 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight"
                        >
                          {project.title}
                        </motion.h2>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center gap-2 text-beige-200 text-sm"
                        >
                          <Calendar size={14} />
                          <span>{project.period}</span>
                        </motion.div>
                      </div>
                      
                      <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-beige-900/40 hover:bg-beige-800/60 text-beige-200 hover:text-white border border-beige-400/20 hover:border-beige-300/40 transition-all duration-200 hover:scale-110"
                        data-cursor-text="close"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Tech Stack */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-2 mt-4"
                    >
                      <Wrench size={14} className="text-beige-300 mt-1 flex-shrink-0" />
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-1 bg-beige-900/40 border border-beige-400/30 text-beige-100 text-xs rounded-full font-medium backdrop-blur-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto max-h-[calc(85vh-180px)] px-8 py-6 custom-scrollbar">
                  {/* Overview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <p className="text-beige-100 leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* STAR Method */}
                  <div className="space-y-6">
                    {/* Situation */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-beige-300 to-beige-400 text-black font-bold text-sm">
                          S
                        </div>
                        <h3 className="text-lg font-semibold text-beige-200">Situation</h3>
                      </div>
                      <div className="ml-11 pl-4 border-l-2 border-beige-400/20 group-hover:border-beige-300/40 transition-colors">
                        <p className="text-beige-100/90 leading-relaxed">{project.situation}</p>
                      </div>
                    </motion.div>

                    {/* Task */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-beige-400 to-beige-500 text-black font-bold text-sm">
                          T
                        </div>
                        <h3 className="text-lg font-semibold text-beige-200">Task</h3>
                      </div>
                      <div className="ml-11 pl-4 border-l-2 border-beige-400/20 group-hover:border-beige-300/40 transition-colors">
                        <p className="text-beige-100/90 leading-relaxed">{project.task}</p>
                      </div>
                    </motion.div>

                    {/* Action */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-beige-500 to-beige-600 text-black font-bold text-sm">
                          A
                        </div>
                        <h3 className="text-lg font-semibold text-beige-200">Action</h3>
                      </div>
                      <div className="ml-11 pl-4 border-l-2 border-beige-400/20 group-hover:border-beige-300/40 transition-colors">
                        <p className="text-beige-100/90 leading-relaxed">{project.action}</p>
                      </div>
                    </motion.div>

                    {/* Result */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-beige-600 to-beige-700 text-white font-bold text-sm">
                          R
                        </div>
                        <h3 className="text-lg font-semibold text-beige-200">Result</h3>
                      </div>
                      <div className="ml-11 pl-4 border-l-2 border-beige-400/20 group-hover:border-beige-300/40 transition-colors">
                        <p className="text-beige-100/90 leading-relaxed">{project.result}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Footer with action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="border-t border-beige-400/20 bg-beige-900/20 px-8 py-4"
                >
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-black/60 hover:bg-black/80 border border-beige-400/30 hover:border-beige-300/50 text-beige-100 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-beige-400/10"
                        data-cursor-text="github"
                      >
                        <Github size={16} />
                        <span>View Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-beige-300 to-beige-500 hover:from-beige-400 hover:to-beige-600 text-black rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-beige-400/30"
                        data-cursor-text="demo"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
