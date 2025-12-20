import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Database, Code2, Sparkles, Cloud } from 'lucide-react';

const skills = {
  'AI/ML & Deep Learning': {
    icon: <Brain className="w-5 h-5" />,
    items: [
      'TensorFlow',
      'PyTorch',
      'YOLOv8',
      'OpenCV',
      'LangChain',
      'BERT',
      'Transformers',
    ],
  },
  'Data Engineering': {
    icon: <Database className="w-5 h-5" />,
    items: [
      'Python',
      'SQL',
      'Pandas',
      'NumPy',
      'Databricks',
      'SQL Server',
    ],
  },
  'Deployment & APIs': {
    icon: <Code2 className="w-5 h-5" />,
    items: [
      'FastAPI',
      'Flask',
      'Docker',
      'PostgreSQL',
      'Redis',
      'REST APIs',
    ],
  },
  'NLP & Vector DB': {
    icon: <Sparkles className="w-5 h-5" />,
    items: [
      'Rasa 3.x',
      'Sentence-Transformers',
      'ChromaDB',
      'FAISS',
      'Ollama',
      'Prophet',
    ],
  },
  'Edge AI & IoT': {
    icon: <Cloud className="w-5 h-5" />,
    items: [
      'CoreML',
      'ONNXRuntime',
      'MicroPython',
      'Raspberry Pi',
      'Tesseract OCR',
      'InsightFace',
    ],
  },
};

const SkillsVisualization: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Track scroll progress through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll into horizontal movement
  // Start at 100px to show first card fully, move to -1850px to show last card fully
  // Ending at 0.65 instead of 0.8 to resume vertical scroll sooner
  const x = useTransform(scrollYProgress, [0.2, 0.65], [100, -1850]);

  const skillCategories = Object.entries(skills);

  return (
    <section id="skills" className="relative">
      {/* Extra height for scroll-based horizontal movement */}
      <div ref={containerRef} className="h-[400vh]">
        {/* Sticky container that holds the horizontally scrolling content */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-neutral-950 pt-20">
          <div className="w-full max-w-6xl mx-auto px-4">
            {/* Header - stays in place */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                <span className="text-white">Skills & </span>
                <span className="bg-gradient-to-r from-beige-200 to-beige-400 bg-clip-text text-transparent">
                  Expertise
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-beige-100 text-lg max-w-2xl"
              >
                Scroll to explore full-stack capabilities
              </motion.p>
            </motion.div>

            {/* Horizontally scrolling cards */}
            <div className="overflow-hidden">
              <motion.div
                ref={ref}
                style={{ x }}
                className="flex gap-6"
              >
                {skillCategories.map(([category, { icon, items }], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    className="group flex-shrink-0"
                    style={{ width: '400px' }}
                  >
                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-beige-400/20 hover:border-beige-300/50 transition-all duration-300 h-full">
                      {/* Category Header */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-beige-500/10 text-beige-300 group-hover:bg-beige-500/20 transition-colors">
                          {icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">{category}</h3>
                      </div>

                      {/* Skills List */}
                      <div className="space-y-3">
                        {items.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              duration: 0.4,
                              delay: categoryIndex * 0.1 + skillIndex * 0.05,
                            }}
                            onHoverStart={() => setHoveredSkill(skill)}
                            onHoverEnd={() => setHoveredSkill(null)}
                            className="relative"
                          >
                            {/* Skill Badge */}
                            <div className="px-4 py-2.5 bg-black/40 border border-beige-400/20 rounded-lg hover:border-beige-300/40 transition-all duration-200">
                              <div className="flex items-center justify-between">
                                <span className="text-beige-100 text-sm font-medium">
                                  {skill}
                                </span>
                                
                                {/* Decorative dot indicator */}
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={hoveredSkill === skill ? { scale: 1 } : { scale: 0 }}
                                  className="w-2 h-2 rounded-full bg-gradient-to-r from-beige-300 to-beige-500"
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Tools section at the end */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex-shrink-0"
                  style={{ width: '500px' }}
                >
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-beige-400/20 h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">
                      Tools & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {[
                        'Git',
                        'Streamlit',
                        'Scikit-learn',
                        'ResNet',
                        'React',
                        'TypeScript',
                        'Leaflet.js',
                        'Vue.js',
                        'Web Scraping',
                        'Semantic Search',
                      ].map((tool, index) => (
                        <motion.span
                          key={tool}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: 0.7 + index * 0.03,
                          }}
                          whileHover={{ scale: 1.1, y: -3 }}
                          className="px-4 py-2 bg-beige-900/30 backdrop-blur-sm border border-beige-400/20 rounded-full text-sm text-beige-100 hover:text-beige-200 hover:border-beige-300/50 transition-all duration-300 cursor-default"
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Floating orbs */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-beige-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-beige-300/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default SkillsVisualization;
