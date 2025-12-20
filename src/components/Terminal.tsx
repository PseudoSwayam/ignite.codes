import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
}

interface TerminalProps {
  onNavigate?: (section: string) => void;
}

export default function Terminal({ onNavigate }: TerminalProps) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Ignite\'s Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" for available commands' },
    { type: 'output', content: '' },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const projects = [
    'praxifi-cfo', 'neuracity', 'swasthya-setu', 'drai-ai', 'cognitia', 'kali-ai', 'tara', 'tara-vision'
  ];

  const projectDetails: { [key: string]: { name: string; desc: string; tech: string; status: string } } = {
    'praxifi-cfo': {
      name: 'PRAXIFI CFO',
      desc: 'Enterprise AI Financial Intelligence Platform with 8-layer cryptographic security',
      tech: 'Python, FastAPI, Prophet, SHAP, Redis, Docker, PostgreSQL, Paillier Encryption',
      status: 'Aug 2024 – Present'
    },
    'neuracity': {
      name: 'NEURACITY',
      desc: 'AI Nervous System for Smart Institutions with multi-modal AIOps',
      tech: 'Python, YOLOv8, Google Gemini, LangChain, Redis, PostgreSQL, ChromaDB, MicroPython, Vue.js',
      status: 'Mar 2024 – Present'
    },
    'swasthya-setu': {
      name: 'SWASTHYA-SETU',
      desc: 'Multilingual AI Health Assistant for rural healthcare',
      tech: 'Rasa 3.x, Python, Sentence-Transformers, FAISS, Twilio',
      status: 'Sep 2025 – Present'
    },
    'drai-ai': {
      name: 'DRAI-AI',
      desc: 'Disaster Response Autonomous Rover with AI',
      tech: 'Python, Flask, OpenCV, Raspberry Pi, GPS, Leaflet.js',
      status: 'Jun 2025 – Present'
    },
    'cognitia': {
      name: 'COGNITIA',
      desc: 'Agentic AI Research Mentor with local LLM deployment',
      tech: 'TypeScript, React, FastAPI, Python, LangChain, ChromaDB, Ollama',
      status: 'Jun 2024 - Present'
    },
    'kali-ai': {
      name: 'KALI-AI',
      desc: 'Smart AI-powered Glasses with Edge AI deployment',
      tech: 'Python, YOLOv8m, Tesseract OCR, InsightFace, CoreML, ONNXRuntime',
      status: 'Apr 2025 - Present'
    },
    'tara': {
      name: 'TARA',
      desc: 'IoT-based Women Safety Device with real-time tracking',
      tech: 'Arduino Nano, SIM800L, Neo-6M GPS, Embedded C, Python',
      status: 'Jan 2025 – Present'
    },
    'tara-vision': {
      name: 'TARA-Vision',
      desc: 'AI-powered Surveillance System with real-time alerts',
      tech: 'Python, OpenCV, TensorFlow, YOLOv8, ResNet50',
      status: 'Feb 2025 – Present'
    }
  };

  const skills = {
    'ai-ml-deep-learning': ['TensorFlow', 'PyTorch', 'YOLOv8', 'OpenCV', 'LangChain', 'BERT', 'Transformers'],
    'data-engineering': ['Python', 'SQL', 'Pandas', 'NumPy', 'Databricks', 'SQL Server'],
    'deployment-apis': ['FastAPI', 'Flask', 'Docker', 'PostgreSQL', 'Redis', 'REST APIs'],
    'nlp-vector-db': ['Rasa 3.x', 'Sentence-Transformers', 'ChromaDB', 'FAISS', 'Ollama', 'Prophet'],
    'edge-ai-iot': ['CoreML', 'ONNXRuntime', 'MicroPython', 'Raspberry Pi', 'Tesseract OCR', 'InsightFace'],
  };

  const internships = [
    { 
      company: 'Samsung R&D Institute', 
      role: 'Research Intern', 
      duration: 'Nov 2025 - Present',
      desc: 'Developing deep learning models for DNG image quality enhancement on low-light and noisy datasets'
    },
    { 
      company: 'Scalable Systems', 
      role: 'Data Science Intern', 
      duration: 'Jun 2025 - Oct 2025',
      desc: 'Designed and optimized ETL pipelines using SQL Server and Databricks to process 10M+ records'
    },
    { 
      company: 'DeepSurge.ai', 
      role: 'AI/ML Intern', 
      duration: 'Jul 2025 - Aug 2025',
      desc: 'Built YOLOv8-based computer vision pipelines to analyze road infrastructure from 500+ annotated video samples'
    },
  ];

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setHistory(prev => [...prev, { type: 'command', content: `${currentPath} $ ${trimmedCmd}` }]);
    setCommandHistory(prev => [...prev, trimmedCmd]);

    const [command, ...args] = trimmedCmd.split(' ');
    const arg = args.join(' ');

    switch (command.toLowerCase()) {
      case 'help':
        setHistory(prev => [...prev,
          { type: 'output', content: '' },
          { type: 'output', content: 'Available commands:' },
          { type: 'output', content: '  ls [dir]        - list directory contents' },
          { type: 'output', content: '  cd <dir>        - change directory' },
          { type: 'output', content: '  cat <file>      - display file contents' },
          { type: 'output', content: '  whois           - display info about me' },
          { type: 'output', content: '  skills          - show technical skills' },
          { type: 'output', content: '  projects        - list all projects' },
          { type: 'output', content: '  experience      - show work experience' },
          { type: 'output', content: '  contact         - get contact information' },
          { type: 'output', content: '  clear           - clear terminal' },
          { type: 'output', content: '  exit            - return to normal mode' },
          { type: 'output', content: '' },
        ]);
        break;

      case 'ls':
        if (currentPath === '~') {
          setHistory(prev => [...prev,
            { type: 'output', content: 'projects/  skills/  experience/  about.txt  contact.txt' },
          ]);
        } else if (currentPath === '~/projects') {
          setHistory(prev => [...prev,
            { type: 'output', content: projects.map(p => `${p}/`).join('  ') },
          ]);
        } else if (currentPath === '~/skills') {
          setHistory(prev => [...prev,
            { type: 'output', content: Object.keys(skills).map(s => `${s}/`).join('  ') },
          ]);
        } else if (currentPath === '~/experience') {
          setHistory(prev => [...prev,
            { type: 'output', content: internships.map((_, i) => `${i + 1}-${internships[i].company.toLowerCase().replace(/[^a-z]/g, '-')}/`).join('  ') },
          ]);
        } else if (currentPath.startsWith('~/projects/')) {
          const project = currentPath.split('/')[2];
          if (projects.includes(project)) {
            setHistory(prev => [...prev,
              { type: 'output', content: 'README.md  details.txt' },
            ]);
          }
        } else if (currentPath.startsWith('~/skills/')) {
          const category = currentPath.split('/')[2];
          if (skills[category as keyof typeof skills]) {
            setHistory(prev => [...prev,
              { type: 'output', content: skills[category as keyof typeof skills].map(s => `${s}.txt`).join('  ') },
            ]);
          }
        } else if (currentPath.startsWith('~/experience/')) {
          setHistory(prev => [...prev,
            { type: 'output', content: 'details.txt  description.txt' },
          ]);
        }
        break;

      case 'cd':
        if (!arg || arg === '~') {
          setCurrentPath('~');
        } else {
          // Handle paths with slashes (e.g., ../.. or skills/ai-ml)
          const pathParts = arg.split('/');
          let newPath = currentPath;
          let isValid = true;

          for (const part of pathParts) {
            if (part === '..') {
              // Go up one directory
              const parts = newPath.split('/');
              parts.pop();
              newPath = parts.join('/') || '~';
            } else if (part === '.' || part === '') {
              // Current directory or empty, skip
              continue;
            } else if (part === '~') {
              newPath = '~';
            } else {
              // Navigate to subdirectory
              if (newPath === '~') {
                if (['projects', 'skills', 'experience'].includes(part)) {
                  newPath = `~/${part}`;
                } else {
                  isValid = false;
                  break;
                }
              } else if (newPath === '~/projects') {
                if (projects.includes(part)) {
                  newPath = `~/projects/${part}`;
                } else {
                  isValid = false;
                  break;
                }
              } else if (newPath === '~/skills') {
                if (Object.keys(skills).includes(part)) {
                  newPath = `~/skills/${part}`;
                } else {
                  isValid = false;
                  break;
                }
              } else if (newPath === '~/experience') {
                const match = internships.find((_, i) => 
                  part === `${i + 1}-${internships[i].company.toLowerCase().replace(/[^a-z]/g, '-')}`
                );
                if (match) {
                  newPath = `~/experience/${part}`;
                } else {
                  isValid = false;
                  break;
                }
              } else {
                isValid = false;
                break;
              }
            }
          }

          if (isValid) {
            setCurrentPath(newPath);
          } else {
            setHistory(prev => [...prev,
              { type: 'error', content: `cd: ${arg}: No such file or directory` },
            ]);
          }
        }
        break;

      case 'cat':
        if (arg === 'about.txt' && currentPath === '~') {
          setHistory(prev => [...prev,
            { type: 'output', content: '' },
            { type: 'output', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
            { type: 'output', content: '         SWAYAM PRAKASH SAHOO - PROFILE         ' },
            { type: 'output', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
            { type: 'output', content: '' },
            { type: 'output', content: 'Role: AI/ML Engineer | Data Science' },
            { type: 'output', content: 'Certification: Databricks Certified Data Analyst' },
            { type: 'output', content: 'Focus: Computer Vision, NLP, Edge AI, LLMs' },
            { type: 'output', content: 'Education: B.Tech in CS (AI & ML) - GPA: 8.4/10' },
            { type: 'output', content: '' },
            { type: 'output', content: 'Skilled in building production-grade AI systems' },
            { type: 'output', content: 'spanning smart institutions, financial platforms,' },
            { type: 'output', content: 'and Edge-optimized LLM deployment.' },
            { type: 'output', content: '' },
          ]);
        } else if (arg === 'contact.txt' && currentPath === '~') {
          setHistory(prev => [...prev,
            { type: 'output', content: '' },
            { type: 'output', content: 'Email: swayampr.sahoo@gmail.com' },
            { type: 'output', content: 'Phone: +91-8114367279' },
            { type: 'output', content: 'GitHub: github.com/swayamsahoo' },
            { type: 'output', content: 'LinkedIn: linkedin.com/in/swayamsahoo' },
            { type: 'output', content: '' },
          ]);
        } else if (arg === 'README.md' && currentPath.startsWith('~/projects/')) {
          const projectName = currentPath.split('/')[2];
          const project = projectDetails[projectName];
          if (project) {
            setHistory(prev => [...prev,
              { type: 'output', content: '' },
              { type: 'output', content: `# ${project.name}` },
              { type: 'output', content: '' },
              { type: 'output', content: project.desc },
              { type: 'output', content: '' },
              { type: 'output', content: `**Tech Stack:** ${project.tech}` },
              { type: 'output', content: `**Status:** ${project.status}` },
              { type: 'output', content: '' },
            ]);
          }
        } else if (arg === 'details.txt' && currentPath.startsWith('~/projects/')) {
          const projectName = currentPath.split('/')[2];
          const project = projectDetails[projectName];
          if (project) {
            setHistory(prev => [...prev,
              { type: 'output', content: '' },
              { type: 'output', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
              { type: 'output', content: `       ${project.name.toUpperCase()}` },
              { type: 'output', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
              { type: 'output', content: '' },
              { type: 'output', content: 'DESCRIPTION:' },
              { type: 'output', content: project.desc },
              { type: 'output', content: '' },
              { type: 'output', content: 'TECHNOLOGIES:' },
              { type: 'output', content: project.tech },
              { type: 'output', content: '' },
              { type: 'output', content: 'STATUS:' },
              { type: 'output', content: project.status },
              { type: 'output', content: '' },
            ]);
          }
        } else if (arg.endsWith('.txt') && currentPath.startsWith('~/skills/')) {
          const category = currentPath.split('/')[2] as keyof typeof skills;
          const skillName = arg.replace('.txt', '');
          const categorySkills = skills[category];
          if (categorySkills && categorySkills.includes(skillName)) {
            const skillDescriptions: { [key: string]: string } = {
              'PyTorch': 'Deep learning framework for building neural networks',
              'TensorFlow': 'End-to-end ML platform for production deployments',
              'Scikit-learn': 'Classical ML algorithms and data preprocessing',
              'Pandas': 'Data manipulation and analysis library',
              'NumPy': 'Numerical computing with multi-dimensional arrays',
              'Matplotlib': 'Data visualization and plotting library',
              'FastAPI': 'Modern, fast web framework for building APIs',
              'Django': 'High-level Python web framework for rapid development',
              'Node.js': 'JavaScript runtime for server-side applications',
              'React': 'JavaScript library for building user interfaces',
              'TypeScript': 'Typed superset of JavaScript for large-scale apps',
              'Tailwind': 'Utility-first CSS framework for rapid UI development',
              'Docker': 'Containerization platform for application deployment',
              'Kubernetes': 'Container orchestration for automating deployment',
              'AWS': 'Cloud computing platform with extensive services',
            };
            setHistory(prev => [...prev,
              { type: 'output', content: '' },
              { type: 'output', content: `${skillName}:` },
              { type: 'output', content: skillDescriptions[skillName] || 'Advanced proficiency in this technology' },
              { type: 'output', content: '' },
            ]);
          }
        } else if (arg === 'details.txt' && currentPath.startsWith('~/experience/')) {
          const expPath = currentPath.split('/')[2];
          const expIndex = parseInt(expPath.split('-')[0]) - 1;
          const internship = internships[expIndex];
          if (internship) {
            setHistory(prev => [...prev,
              { type: 'output', content: '' },
              { type: 'output', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
              { type: 'output', content: `       ${internship.company.toUpperCase()}` },
              { type: 'output', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
              { type: 'output', content: '' },
              { type: 'output', content: `ROLE: ${internship.role}` },
              { type: 'output', content: `DURATION: ${internship.duration}` },
              { type: 'output', content: '' },
            ]);
          }
        } else if (arg === 'description.txt' && currentPath.startsWith('~/experience/')) {
          const expPath = currentPath.split('/')[2];
          const expIndex = parseInt(expPath.split('-')[0]) - 1;
          const internship = internships[expIndex];
          if (internship) {
            setHistory(prev => [...prev,
              { type: 'output', content: '' },
              { type: 'output', content: 'WORK DESCRIPTION:' },
              { type: 'output', content: internship.desc },
              { type: 'output', content: '' },
            ]);
          }
        } else {
          setHistory(prev => [...prev,
            { type: 'error', content: `cat: ${arg}: No such file or directory` },
          ]);
        }
        break;

      case 'whois':
        setHistory(prev => [...prev,
          { type: 'output', content: '  Name: Swayam Prakash Sahoo' },
          { type: 'output', content: '  Title: AI/ML Engineer | Data Analyst' },
          { type: 'output', content: '  Status: Currently @ Samsung R&D Institute' },
          { type: 'output', content: '  Certification: Databricks Certified Data Analyst' },
          { type: 'output', content: '  Specialization: Computer Vision | NLP | Edge AI | LLMs' },
          { type: 'output', content: '' },
        ]);
        break;

      case 'skills':
        if (arg && skills[arg as keyof typeof skills]) {
          setHistory(prev => [...prev,
            { type: 'output', content: '' },
            { type: 'output', content: `${arg.toUpperCase()} Skills:` },
            ...skills[arg as keyof typeof skills].map(skill => ({ 
              type: 'output' as const, 
              content: `  → ${skill}` 
            })),
            { type: 'output', content: '' },
          ]);
        } else {
          setHistory(prev => [...prev,
            { type: 'output', content: '' },
            { type: 'output', content: 'Technical Skills:' },
            ...Object.entries(skills).map(([category, items]) => ({
              type: 'output' as const,
              content: `  ${category.toUpperCase()}: ${items.join(', ')}`
            })),
            { type: 'output', content: '' },
          ]);
        }
        break;

      case 'projects':
        setHistory(prev => [...prev,
          { type: 'output', content: '' },
          { type: 'output', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
          { type: 'output', content: '              PROJECT PORTFOLIO                ' },
          { type: 'output', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
          { type: 'output', content: '' },
          { type: 'output', content: '1. SWASTHYA-SETU - Multilingual AI Health Assistant' },
          { type: 'output', content: '2. DRAI-AI - Disaster Response Rover with AI' },
          { type: 'output', content: '3. COGNITIA - AI Research Mentor Platform' },
          { type: 'output', content: '4. KALI-AI - Smart AI Glasses System' },
          { type: 'output', content: '5. TARA - IoT-based Women Safety Device' },
          { type: 'output', content: '6. TARA-Vision - AI Surveillance System' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Use "cd projects" to explore more' },
          { type: 'output', content: '' },
        ]);
        break;

      case 'experience':
        setHistory(prev => [...prev,
          { type: 'output', content: '' },
          { type: 'output', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
          { type: 'output', content: '           WORK EXPERIENCE                     ' },
          { type: 'output', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
          { type: 'output', content: '' },
          ...internships.map(({ company, role, duration }) => [
            { type: 'output' as const, content: `→ ${company}` },
            { type: 'output' as const, content: `  Role: ${role}` },
            { type: 'output' as const, content: `  Duration: ${duration}` },
            { type: 'output' as const, content: '' },
          ]).flat(),
        ]);
        break;

      case 'contact':
        setHistory(prev => [...prev,
          { type: 'output', content: '' },
          { type: 'output', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
          { type: 'output', content: '           CONTACT INFORMATION                 ' },
          { type: 'output', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
          { type: 'output', content: '' },
          { type: 'output', content: '  📧 Email: swayampr.sahoo@gmail.com' },
          { type: 'output', content: '  � Phone: +91-8114367279' },
          { type: 'output', content: '  � GitHub: github.com/swayamsahoo' },
          { type: 'output', content: '  💼 LinkedIn: linkedin.com/in/swayamsahoo' },
          { type: 'output', content: '' },
        ]);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'exit':
        setHistory(prev => [...prev,
          { type: 'output', content: 'Exiting hacker mode...' },
          { type: 'output', content: 'Returning to professional view...' },
        ]);
        setTimeout(() => {
          if (onNavigate) onNavigate('exit');
        }, 1000);
        break;

      default:
        setHistory(prev => [...prev,
          { type: 'error', content: `Command not found: ${command}. Type "help" for available commands.` },
        ]);
    }

    setCurrentCommand('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocomplete - can be enhanced
      const commands = ['help', 'ls', 'cd', 'cat', 'whois', 'skills', 'projects', 'experience', 'contact', 'clear', 'exit'];
      const match = commands.find(cmd => cmd.startsWith(currentCommand));
      if (match) setCurrentCommand(match);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div 
      className="h-full bg-black font-mono text-green-500 p-6 overflow-auto custom-scrollbar cursor-text"
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-4xl mx-auto">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-green-500/30">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-4 text-green-400">swayam@portfolio:~$</span>
        </div>

        {/* Terminal Output */}
        <div className="space-y-1 mb-4 min-h-[60vh]">
          <AnimatePresence>
            {history.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                className={`
                  ${line.type === 'command' ? 'text-green-300' : ''}
                  ${line.type === 'error' ? 'text-red-500' : ''}
                  ${line.type === 'output' ? 'text-green-500/90' : ''}
                `}
              >
                {line.content}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Command Input */}
        <div className="flex items-center gap-2">
          <span className="text-green-400">{currentPath} $</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-500 caret-green-500"
            spellCheck={false}
            autoComplete="off"
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity }}
            className="text-green-500"
          >
            ▮
          </motion.span>
        </div>
      </div>
    </div>
  );
}
