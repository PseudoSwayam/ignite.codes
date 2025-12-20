import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project3DCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    category: string;
    githubUrl: string;
    liveUrl: string;
  };
  delay?: number;
}

const Project3DCard: React.FC<Project3DCardProps> = ({ project, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative bg-white/60 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/30 dark:border-beige-400/20 shadow-xl hover:shadow-2xl transition-shadow duration-300"
      >
        {/* Glowing background effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-beige-300/20 via-beige-400/20 to-beige-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{
            transform: 'translateZ(-20px)',
          }}
        />

        {/* Category badge with depth */}
        <motion.div
          style={{
            transform: 'translateZ(30px)',
          }}
          className="inline-block mb-3"
        >
          <span className="px-3 py-1 bg-gradient-to-r from-beige-300 to-beige-500 text-black text-xs font-semibold rounded-full shadow-lg">
            {project.category}
          </span>
        </motion.div>

        {/* Title with depth */}
        <motion.h3
          style={{
            transform: 'translateZ(40px)',
          }}
          className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-beige-500 dark:group-hover:text-beige-300 transition-colors duration-300"
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          style={{
            transform: 'translateZ(25px)',
          }}
          className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed"
        >
          {project.description}
        </motion.p>

        {/* Tech stack */}
        <motion.div
          style={{
            transform: 'translateZ(30px)',
          }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {project.techStack.slice(0, 5).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 text-xs rounded-md backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
              +{project.techStack.length - 5} more
            </span>
          )}
        </motion.div>

        {/* Action buttons with magnetic effect */}
        <motion.div
          style={{
            transform: 'translateZ(50px)',
          }}
          className="flex gap-3"
        >
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
          >
            <Github size={16} />
            Code
          </motion.a>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-beige-300 to-beige-500 text-black rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
          >
            <ExternalLink size={16} />
            Live
          </motion.a>
        </motion.div>

        {/* Shimmer effect on hover */}
        <motion.div
          animate={{
            x: isHovered ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl pointer-events-none"
          style={{
            transform: 'translateZ(60px) skewX(-20deg)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Project3DCard;
