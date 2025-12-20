import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectModal from './ProjectModal';
import { getTechUseCases } from '../data/techStackUseCases';

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  highlight: string;
  period: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

const Projects: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const projects: Project[] = [
    {
      id: 1,
      title: 'Praxifi CFO',
      description: 'Enterprise AI-Powered Financial Intelligence Platform',
      techStack: ['Python', 'FastAPI', 'Prophet', 'SHAP', 'Redis', 'Docker', 'PostgreSQL', 'Paillier Encryption', 'Zero-Knowledge Proofs', 'Differential Privacy'],
      category: 'AI',
      githubUrl: 'https://github.com/Rishabh9306/praxify-CFO',
      liveUrl: 'https://github.com/Rishabh9306/praxify-CFO',
      highlight: '91.95% accuracy',
      period: 'Aug 2024 – Present',
      situation: 'Organizations lacked an autonomous financial intelligence system that could provide real-time forecasting, anomaly detection, and conversational AI insights with cryptographic-level security guarantees.',
      task: 'Build an enterprise-grade AI/ML platform that acts as an autonomous Finance Guardian with 8-layer cryptographic security, real-time multi-metric forecasting, enhanced anomaly detection, and explainable AI capabilities.',
      action: 'Architected microservices platform with FastAPI backend integrating Prophet for 14-metric parallel forecasting (4.7x speedup on 8 cores) and 6-algorithm ensemble anomaly detection (Isolation Forest, LOF, One-Class SVM) achieving 85% accuracy. Built 8-layer security stack with AES-256-GCM encryption, Paillier homomorphic encryption, 21 zero-knowledge proof types (95.1% success rate), and differential privacy (ε=1.0). Developed SHAP-based explainable AI, scenario simulation engine, and conversational agent with stateful multi-turn dialog. Enabled bulk CSV upload with auto-normalization of 50+ financial metric synonyms.',
      result: 'Achieved 91.95% forecast accuracy with 0 inverted confidence intervals and 57% reduction in anomaly false positives (from 35% to <15%). Delivered 45-60s API response time with <60ms security overhead and 10K rows/s ingestion throughput. Successfully deployed production-ready Docker + Kubernetes infrastructure maintaining GDPR/SOC 2/ISO 27001 compliance.',
    },
    {
      id: 2,
      title: 'NeuraCity',
      description: 'AI Nervous System for Smart Institutions',
      techStack: ['Python', 'YOLOv8', 'Google Gemini', 'LangChain', 'Redis', 'PostgreSQL', 'ChromaDB', 'MicroPython', 'Vue.js', 'Leaflet.js', 'Docker', 'WebSockets'],
      category: 'AI',
      githubUrl: 'https://github.com',
      liveUrl: 'https://github.com',
      highlight: 'Multi-modal AIOps',
      period: 'Mar 2024 – Present',
      situation: 'Smart campuses, hospitals, and corporate facilities lacked a unified AI platform that could integrate Computer Vision, Conversational AI, and IoT sensors into a cohesive system for real-time awareness, safety, and intelligence.',
      task: 'Design and implement a complete, modular microservices ecosystem that acts as an intelligent nervous system capable of seeing (CV), sensing (IoT), remembering (vector DB), thinking (LLM agents), acting (AIOps), and speaking (alerts) for physical spaces.',
      action: 'Architected event-driven microservices platform with 9 independent services communicating via Redis pub/sub and REST APIs. Built multi-stream YOLOv8 surveillance with Apple Silicon acceleration detecting falls, violence, and emergencies in real-time. Developed Edge AI on Raspberry Pi Pico W with MicroPython for local biometric and environmental monitoring. Implemented stateful conversational AI using Google Gemini + LangChain with tool-use capabilities. Created dual-backend memory system using ChromaDB for semantic storage and PostgreSQL for audit trails. Built real-time Vue.js + Leaflet.js interactive map with WebSocket alerts and role-based routing.',
      result: 'Delivered production-ready platform with <100ms CV detection latency and autonomous Edge AI reducing backend calls by 80%. Achieved vector-based semantic memory enabling context-aware LLM responses with full PostgreSQL audit trail. System supports role-based access control, real-time WebSocket notifications, and live campus event visualization with successful Docker containerization.',
    },
    {
      id: 3,
      title: 'Swasthya-Setu',
      description: 'Multilingual AI Public Health Assistant',
      techStack: ['Rasa 3.x', 'Python', 'Sentence-Transformers', 'FAISS', 'Twilio', 'pandas', 'torch'],
      category: 'AI',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      highlight: '>95% accuracy',
      period: 'Sep 2025 – Present',
      situation: 'Identified the lack of a unified, multilingual, production-grade public health assistant capable of answering structured tasks (vaccination, emergencies) and open-ended queries at scale for Indian citizens.',
      task: 'Develop a robust conversational AI system that could handle both rule-based intents and complex semantic queries across four languages while maintaining high accuracy and low latency.',
      action: 'Architected and deployed a hybrid "Intelligent Gatekeeper" dialogue model in Rasa 3.x with a >95% FallbackClassifier threshold. Designed Express-Lane RulePolicies for high-confidence intents and a Smart-Triage layer backed by a FAISS vector index of 500K+ public-health documents for real-time semantic search. Engineered robust Python "Smart Actions" with built-in fallback logic and FormValidationActions to collect user data while gracefully handling interruptions and context shifts in four languages (English, Hindi, Odia, Hinglish).',
      result: 'Achieved 100% NLU accuracy on a curated test suite of 200+ real-world multilingual queries and sub-second semantic retrieval from the 500K-entry FAISS index. Eliminated conversation dead-ends and scaled to support thousands of concurrent users with low server load.',
    },
    {
      id: 4,
      title: 'DRAI-AI',
      description: 'Autonomous Disaster Rover with Real-Time Detection & Reporting',
      techStack: ['Python', 'Flask', 'OpenCV', 'Raspberry Pi', 'GPS', 'pyttsx3', 'ReportLab', 'Leaflet.js'],
      category: 'AI',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      highlight: '<400ms',
      period: 'Jun 2025 – Present',
      situation: 'Disaster response teams needed a deployable autonomous system for rapid human detection and location mapping in hazardous environments.',
      task: 'Created a full-stack autonomous rover capable of real-time human detection, GPS tracking, and automated report generation with minimal latency.',
      action: 'Built a full-stack AI rover using Raspberry Pi, OpenCV, and GPS capable of real-time autonomous human detection with <400ms average latency across LAN. Developed a Flask-powered dashboard with image logs, timestamps, and interactive Leaflet.js maps to visualize rover activity and geolocation of detections. Integrated voice feedback via pyttsx3 to simulate human-like assistant behavior upon detecting motion or survivors.',
      result: 'Automated generation of GPS-tagged PDF reports from JSON logs using ReportLab, supporting embedded imagery and metadata for field documentation. System praised for low-latency multimodal UX during final hackathon demo.',
    },
    {
      id: 5,
      title: 'Cognitia',
      description: 'Agentic AI Research Mentor with Debate Reasoning',
      techStack: ['TypeScript', 'React', 'FastAPI', 'Python', 'LangChain', 'SQLite', 'ChromaDB', 'Ollama', 'TailwindCSS'],
      category: 'LLMs',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      highlight: '45s query',
      period: 'Jun 2024 - Present',
      situation: 'Identified the lack of context-aware academic research tools that could process papers and lectures while providing expert-level mentorship.',
      task: 'Build an AI assistant that semantically ingests academic content and provides real-time contextual answers with simulated expert mentorship through debate reasoning.',
      action: 'Developed Cognitia using FastAPI, LangChain, and Mistral (via Ollama) to semantically fetch and process academic content. Engineered a self-reflective debate engine generating Support, Counterpoints, and Reflective Synthesis segments. Built an emotionally adaptive tone engine using user state inference to deliver tailored motivational, neutral, or empathetic responses. Developed the entire pipeline with LangChain-based chunking, ChromaDB for embedding storage, and a TypeScript + React UI for interactive chat.',
      result: 'Reduced semantic processing time to ~45s average per complex query. Achieved offline-compatible sub-second inference via prompt optimization and pre-processing with dual-sidebars and archival review functionality.',
    },
    {
      id: 6,
      title: 'KALI-AI',
      description: 'AI Smart Glasses for the Visually Impaired',
      techStack: ['Python', 'YOLOv8m', 'Tesseract OCR', 'InsightFace', 'CoreML', 'OpenCV', 'ONNXRuntime', 'macOS'],
      category: 'IoT',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      highlight: '150ms TTS',
      period: 'Apr 2025 - Present',
      situation: 'Visually impaired individuals needed a fully offline, wearable AI assistant for navigation, text reading, and face recognition without relying on cloud services.',
      task: 'Implement a real-time, multi-feature wearable assistant optimized for Apple Silicon with minimal latency for all operations.',
      action: 'Implemented a fully offline wearable assistant with navigation, OCR, and face recognition optimized for Apple Silicon using CoreML. VINA NAV achieved 92% mAP@50 after 100 epochs on a 12-class custom dataset (13.5K images) with directional TTS guidance & pseudo-depth estimation (150ms latency). VINA OCR enabled voice-triggered text reading with <2.5s latency using Tesseract v5.5.0 and Porcupine v3.0.0. VINA FACE integrated InsightFace to detect and recognize known faces at 10 Hz with personalized audio greetings. VINA HELPER created wake-word activated SOS system with GPS retrieval.',
      result: 'Delivered real-time performance with 150ms navigation TTS, <2.5s OCR latency, 10 Hz face recognition, and ~25s total SOS response time via WhatsApp alerts.',
    },
    {
      id: 7,
      title: 'TARA',
      description: 'Threat Alert Rescue Assistant - IoT Women Safety System',
      techStack: ['Arduino Nano', 'SIM800L', 'Neo-6M GPS', 'IR Sensor', 'Voice Module', 'Embedded C', 'Python'],
      category: 'IoT',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      highlight: '90s faster',
      period: 'Jan 2025 – Present',
      situation: 'Addressed the lack of autonomous safety tools for women in constrained, high-stress situations requiring immediate emergency response.',
      task: 'Engineer a wearable safety device with multiple SOS triggers that could automatically alert emergency contacts with minimal response delay.',
      action: 'Engineered a wearable safety device with 3 SOS triggers (voice, button, motion). Integrated GSM + GPS to auto-send calls/SMS with high delivery success. Developed a hardware prototype within a ₹1200–₹1500 budget with form factor optimized for jewelry-like wearability.',
      result: 'Reduced emergency response delays by an average of 90 seconds in simulated high-stress scenarios. Currently designing companion app for live location and audio transmission with planned biometric pulse sensor integration.',
    },
    {
      id: 8,
      title: 'TARA-Vision',
      description: 'AI Surveillance for Women Safety',
      techStack: ['Python', 'OpenCV', 'TensorFlow', 'YOLOv8', 'ResNet50'],
      category: 'AI',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      highlight: '97% accuracy',
      period: 'Feb 2025 – Present',
      situation: 'Tackled the need for real-time surveillance to identify distress scenarios in public spaces under the TARA initiative without manual intervention.',
      task: 'Develop an intelligent CCTV assistant capable of detecting threats and distress patterns automatically.',
      action: 'Built an AI-powered system using a custom-trained ResNet50 (99%+ train / 97% test accuracy) and YOLOv8 for live detection of "Lone Woman" and "Surrounded Woman" events. Added OpenCV-based raised-hand SOS detection, supporting customizable distress gestures.',
      result: 'Achieved <200ms inference speed for real-time edge deployment. Designed as the "Eye of TARA," enabling seamless integration with the IoT module and app for AI-triggered emergency alerts.',
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          {/* Minimal Header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Projects
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-beige-300 to-beige-500 rounded-full" />
          </div>

          {/* Grid - 2 columns, compact */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ 
                  opacity: 0, 
                  y: 40,
                  rotateX: 15,
                  filter: 'blur(4px)',
                }}
                animate={inView ? { 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                  filter: 'blur(0px)',
                } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ perspective: 1000 }}
                className="group relative cursor-pointer"
                onClick={() => openProjectModal(project)}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoveredTech(null);
                }}
                data-cursor-text="view"
              >
                {/* Accent bar that grows on hover */}
                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-beige-300 to-beige-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Card */}
                <div className="h-full p-6 rounded-xl bg-black/40 border border-beige-400/20 hover:border-beige-300/50 transition-all duration-300 backdrop-blur-sm hover:bg-black/60">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-beige-200 transition-colors">
                        {project.title}
                      </h3>
                      <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-beige-900/50 text-beige-300">
                        {project.category}
                      </span>
                    </div>
                    <span className="text-xs font-bold bg-gradient-to-r from-beige-300 to-beige-500 bg-clip-text text-transparent whitespace-nowrap ml-2">
                      {project.highlight}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-beige-100 mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack - Shows on Hover */}
                  <div className="relative">
                    {/* Collapsed state */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: hoveredCard === project.id ? 0 : 1,
                        height: hoveredCard === project.id ? 0 : 'auto',
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-0.5 rounded bg-beige-900/30 text-beige-200 border border-beige-400/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-xs text-beige-300">
                            +{project.techStack.length - 3} more
                          </span>
                        )}
                      </div>
                    </motion.div>

                    {/* Expanded state - Shows ALL tech stack with use cases */}
                    <AnimatePresence>
                      {hoveredCard === project.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-1.5 mb-4 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-beige-400/20 scrollbar-track-transparent pr-1 pb-1">
                            {project.techStack.map((tech) => {
                              const techData = getTechUseCases(tech);
                              const projectUseCase = techData?.useCases.find(
                                uc => uc.project === project.title
                              );

                              return (
                                <div
                                  key={tech}
                                  className="relative group/tech"
                                  onMouseEnter={() => setHoveredTech(tech)}
                                  onMouseLeave={() => setHoveredTech(null)}
                                >
                                  <span
                                    className={`text-xs px-2 py-1 rounded cursor-pointer transition-all duration-200 ${
                                      techData
                                        ? 'bg-beige-900/40 text-beige-200 border border-beige-400/30 hover:bg-beige-900/60 hover:border-beige-300/50 hover:scale-105 hover:shadow-md font-medium'
                                        : 'bg-beige-900/50 text-beige-200 border border-beige-400/30'
                                    }`}
                                  >
                                    {tech}
                                  </span>

                                  {/* Use Case Tooltip */}
                                  {hoveredTech === tech && projectUseCase && (
                                    <motion.div
                                      initial={{ opacity: 0, y: -5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
                                    >
                                      <div className="bg-black/95 backdrop-blur-md border border-beige-400/40 rounded-lg px-3 py-2.5 shadow-2xl min-w-[200px] max-w-[280px]">
                                        <div className="flex items-center gap-2 mb-1.5">
                                          <div className="w-1.5 h-1.5 rounded-full bg-beige-400" />
                                          <div className="text-xs font-bold text-beige-200 uppercase tracking-wide">
                                            {tech}
                                          </div>
                                        </div>
                                        <div className="text-xs text-beige-300 leading-relaxed mb-1.5">
                                          {projectUseCase.description}
                                        </div>
                                        {projectUseCase.impact && (
                                          <div className="pt-1.5 border-t border-beige-400/20">
                                            <div className="text-xs text-beige-400 font-semibold">
                                              Impact: {projectUseCase.impact}
                                            </div>
                                          </div>
                                        )}
                                        {/* Arrow */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                                          <div className="border-4 border-transparent border-t-black/95" />
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Click to view more hint */}
                  <div className="text-xs text-beige-400 group-hover:text-beige-300 transition-colors">
                    Click to view details →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;
