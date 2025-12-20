// Comprehensive tech stack use cases across all projects and internships

export interface TechUseCase {
  tech: string;
  useCases: {
    project?: string;
    internship?: string;
    description: string;
    impact?: string;
  }[];
  category: 'AI/ML' | 'Web' | 'Data' | 'IoT' | 'Tools' | 'Cloud';
  color: string; // Tailwind color class
}

export const techStackUseCases: Record<string, TechUseCase> = {
  // AI/ML Technologies
  'Python': {
    tech: 'Python',
    category: 'AI/ML',
    color: 'from-blue-400 to-blue-600',
    useCases: [
      { project: 'Praxifi CFO', description: 'Core backend with FastAPI for REST APIs and parallel forecasting', impact: '4.7x speedup' },
      { project: 'NeuraCity', description: 'Microservices backend for AI agents, CV, and IoT integration', impact: '9 services' },
      { project: 'DRAI-AI', description: 'Core backend for Flask server and OpenCV processing', impact: '<400ms latency' },
      { project: 'Cognitia', description: 'FastAPI backend with LangChain orchestration', impact: '45s avg query' },
      { project: 'KALI-AI', description: 'Real-time inference pipeline for YOLOv8, OCR, and face recognition', impact: '150ms TTS' },
      { project: 'TARA-Vision', description: 'OpenCV + TensorFlow model training and deployment', impact: '97% accuracy' },
      { project: 'Skills Dashboard', description: 'Data pipeline with Pandas for 120K+ job records', impact: '80+ trends' },
      { project: 'Swasthya-Setu', description: 'Rasa NLU with custom actions and semantic search', impact: '>95% accuracy' },
      { internship: 'DeepSurge.ai', description: 'YOLOv8 computer vision pipelines for road analysis', impact: '500+ samples' },
    ]
  },
  'YOLOv8': {
    tech: 'YOLOv8',
    category: 'AI/ML',
    color: 'from-purple-400 to-purple-600',
    useCases: [
      { project: 'NeuraCity', description: 'Multi-stream surveillance with Apple Silicon (MPS) acceleration', impact: '<100ms latency' },
      { project: 'KALI-AI', description: 'Navigation system trained on 12-class dataset (13.5K images)', impact: '92% mAP@50' },
      { project: 'TARA-Vision', description: 'Real-time distress pattern detection', impact: '<200ms inference' },
      { internship: 'DeepSurge.ai', description: 'Road infrastructure analysis from video', impact: '500+ samples' },
    ]
  },
  'YOLOv8m': {
    tech: 'YOLOv8m',
    category: 'AI/ML',
    color: 'from-purple-400 to-purple-600',
    useCases: [
      { project: 'KALI-AI', description: 'Medium-size model for balance between accuracy and speed', impact: '10 Hz detection' },
    ]
  },
  'OpenCV': {
    tech: 'OpenCV',
    category: 'AI/ML',
    color: 'from-green-400 to-green-600',
    useCases: [
      { project: 'DRAI-AI', description: 'Real-time human detection from rover camera', impact: '<400ms latency' },
      { project: 'KALI-AI', description: 'Image preprocessing and frame capture', impact: '10 Hz processing' },
      { project: 'TARA-Vision', description: 'Raised-hand SOS gesture detection', impact: 'Custom gestures' },
    ]
  },
  'TensorFlow': {
    tech: 'TensorFlow',
    category: 'AI/ML',
    color: 'from-orange-400 to-orange-600',
    useCases: [
      { project: 'TARA-Vision', description: 'ResNet50 custom training for distress scenarios', impact: '99% train / 97% test' },
    ]
  },
  'ResNet50': {
    tech: 'ResNet50',
    category: 'AI/ML',
    color: 'from-orange-400 to-orange-600',
    useCases: [
      { project: 'TARA-Vision', description: 'Transfer learning for "Lone Woman" and "Surrounded Woman" classification', impact: '97% accuracy' },
    ]
  },
  'Tesseract OCR': {
    tech: 'Tesseract OCR',
    category: 'AI/ML',
    color: 'from-indigo-400 to-indigo-600',
    useCases: [
      { project: 'KALI-AI', description: 'Voice-triggered text reading with Porcupine wake-word', impact: '<2.5s latency' },
    ]
  },
  'InsightFace': {
    tech: 'InsightFace',
    category: 'AI/ML',
    color: 'from-pink-400 to-pink-600',
    useCases: [
      { project: 'KALI-AI', description: 'Face detection and recognition with personalized greetings', impact: '10 Hz recognition' },
    ]
  },
  'CoreML': {
    tech: 'CoreML',
    category: 'AI/ML',
    color: 'from-gray-400 to-gray-600',
    useCases: [
      { project: 'KALI-AI', description: 'Apple Silicon optimization for offline inference', impact: 'Fully offline' },
    ]
  },
  'ONNXRuntime': {
    tech: 'ONNXRuntime',
    category: 'AI/ML',
    color: 'from-teal-400 to-teal-600',
    useCases: [
      { project: 'KALI-AI', description: 'Cross-platform model deployment', impact: 'Optimized inference' },
    ]
  },

  // LLM Technologies
  'LangChain': {
    tech: 'LangChain',
    category: 'AI/ML',
    color: 'from-emerald-400 to-emerald-600',
    useCases: [
      { project: 'NeuraCity', description: 'Tool-use orchestration for conversational AI agent', impact: 'Multi-turn dialog' },
      { project: 'Cognitia', description: 'Document chunking and semantic pipeline orchestration', impact: '45s queries' },
      { project: 'Swasthya-Setu', description: 'Integration with FAISS for semantic health queries', impact: '500K+ docs' },
    ]
  },
  'Google Gemini': {
    tech: 'Google Gemini',
    category: 'AI/ML',
    color: 'from-blue-400 to-blue-600',
    useCases: [
      { project: 'NeuraCity', description: 'Stateful conversational AI with context-aware responses', impact: 'Tool-use enabled' },
    ]
  },
  'Ollama (Mistral)': {
    tech: 'Ollama (Mistral)',
    category: 'AI/ML',
    color: 'from-violet-400 to-violet-600',
    useCases: [
      { project: 'Cognitia', description: 'Local LLM for debate reasoning and tone adaptation', impact: 'Sub-second inference' },
    ]
  },
  'Ollama': {
    tech: 'Ollama',
    category: 'AI/ML',
    color: 'from-violet-400 to-violet-600',
    useCases: [
      { project: 'Cognitia', description: 'Local LLM deployment for offline AI', impact: 'Privacy-first' },
    ]
  },
  'ChromaDB': {
    tech: 'ChromaDB',
    category: 'Data',
    color: 'from-yellow-400 to-yellow-600',
    useCases: [
      { project: 'NeuraCity', description: 'Semantic conversation memory for LLM context', impact: 'Vector storage' },
      { project: 'Cognitia', description: 'Vector embedding storage for academic content', impact: 'Semantic search' },
    ]
  },
  'FAISS': {
    tech: 'FAISS',
    category: 'Data',
    color: 'from-yellow-400 to-yellow-600',
    useCases: [
      { project: 'Swasthya-Setu', description: 'Vector index for 500K+ public health documents', impact: 'Sub-second retrieval' },
    ]
  },
  'Rasa 3.x': {
    tech: 'Rasa 3.x',
    category: 'AI/ML',
    color: 'from-purple-400 to-purple-600',
    useCases: [
      { project: 'Swasthya-Setu', description: 'Hybrid dialogue system with FallbackClassifier', impact: '>95% threshold' },
      { project: 'Swasthya-Setu', description: 'Multilingual NLU (English, Hindi, Odia, Hinglish)', impact: '100% test accuracy' },
    ]
  },
  'Sentence-Transformers': {
    tech: 'Sentence-Transformers',
    category: 'AI/ML',
    color: 'from-blue-400 to-blue-600',
    useCases: [
      { project: 'Swasthya-Setu', description: 'Semantic embedding for multilingual queries', impact: 'Cross-lingual search' },
    ]
  },

  // Web Technologies
  'Flask': {
    tech: 'Flask',
    category: 'Web',
    color: 'from-slate-400 to-slate-600',
    useCases: [
      { project: 'DRAI-AI', description: 'REST API for rover dashboard with real-time logs', impact: 'LAN deployment' },
    ]
  },
  'FastAPI': {
    tech: 'FastAPI',
    category: 'Web',
    color: 'from-cyan-400 to-cyan-600',
    useCases: [
      { project: 'Praxifi CFO', description: 'High-performance async REST API with 10 req/s throughput', impact: '45-60s response' },
      { project: 'Cognitia', description: 'High-performance async backend for AI chat', impact: 'Real-time streaming' },
    ]
  },
  'React': {
    tech: 'React',
    category: 'Web',
    color: 'from-sky-400 to-sky-600',
    useCases: [
      { project: 'Cognitia', description: 'Interactive chat UI with dual-sidebar design', impact: 'Archival review' },
    ]
  },
  'TypeScript': {
    tech: 'TypeScript',
    category: 'Web',
    color: 'from-blue-500 to-blue-700',
    useCases: [
      { project: 'Cognitia', description: 'Type-safe frontend with React components', impact: 'Maintainable code' },
    ]
  },
  'TailwindCSS': {
    tech: 'TailwindCSS',
    category: 'Web',
    color: 'from-teal-400 to-teal-600',
    useCases: [
      { project: 'Cognitia', description: 'Responsive UI styling with utility-first approach', impact: 'Fast development' },
    ]
  },
  'HTML': {
    tech: 'HTML',
    category: 'Web',
    color: 'from-red-400 to-red-600',
    useCases: [
      { project: 'DRAI-AI', description: 'Dashboard structure for rover interface', impact: 'Web-based control' },
    ]
  },
  'JS': {
    tech: 'JS',
    category: 'Web',
    color: 'from-yellow-400 to-yellow-600',
    useCases: [
      { project: 'DRAI-AI', description: 'Client-side interactivity for dashboard', impact: 'Real-time updates' },
    ]
  },
  'Leaflet.js': {
    tech: 'Leaflet.js',
    category: 'Web',
    color: 'from-green-400 to-green-600',
    useCases: [
      { project: 'NeuraCity', description: 'Interactive campus map with live event visualization', impact: 'Real-time markers' },
      { project: 'DRAI-AI', description: 'Interactive GPS mapping for rover detections', impact: 'Geolocation viz' },
    ]
  },

  // Data Technologies
  'Pandas': {
    tech: 'Pandas',
    category: 'Data',
    color: 'from-indigo-400 to-indigo-600',
    useCases: [
      { project: 'Skills Dashboard', description: 'Data wrangling for 120K+ job records', impact: 'ETL pipeline' },
      { project: 'Swasthya-Setu', description: 'Health data processing and transformation', impact: 'Structured output' },
    ]
  },
  'pandas': {
    tech: 'pandas',
    category: 'Data',
    color: 'from-indigo-400 to-indigo-600',
    useCases: [
      { project: 'Swasthya-Setu', description: 'Data manipulation for health records', impact: 'Clean datasets' },
    ]
  },
  'Streamlit': {
    tech: 'Streamlit',
    category: 'Web',
    color: 'from-red-400 to-red-600',
    useCases: [
      { project: 'Skills Dashboard', description: 'Interactive dashboard for skill trend visualization', impact: '80+ skills tracked' },
    ]
  },
  'Plotly': {
    tech: 'Plotly',
    category: 'Data',
    color: 'from-purple-400 to-purple-600',
    useCases: [
      { project: 'Skills Dashboard', description: 'Dynamic charts for trend forecasting', impact: 'Interactive viz' },
    ]
  },
  'SQLite': {
    tech: 'SQLite',
    category: 'Data',
    color: 'from-gray-400 to-gray-600',
    useCases: [
      { project: 'Cognitia', description: 'Local database for chat history and embeddings', impact: 'Persistent storage' },
    ]
  },
  'SQL Server': {
    tech: 'SQL Server',
    category: 'Data',
    color: 'from-blue-400 to-blue-600',
    useCases: [
      { internship: 'Scalable Systems', description: 'ETL pipeline optimization for 10M+ records', impact: 'Production scale' },
    ]
  },
  'Databricks': {
    tech: 'Databricks',
    category: 'Cloud',
    color: 'from-orange-400 to-orange-600',
    useCases: [
      { internship: 'Scalable Systems', description: 'Big data processing and analytics', impact: '10M+ records' },
    ]
  },
  'BeautifulSoup': {
    tech: 'BeautifulSoup',
    category: 'Tools',
    color: 'from-green-400 to-green-600',
    useCases: [
      { project: 'Skills Dashboard', description: 'Web scraping for job market data', impact: '120K+ jobs scraped' },
    ]
  },
  'Regex': {
    tech: 'Regex',
    category: 'Tools',
    color: 'from-yellow-400 to-yellow-600',
    useCases: [
      { project: 'Skills Dashboard', description: 'Pattern matching for skill extraction', impact: '80+ skills identified' },
    ]
  },
  'GitHub API': {
    tech: 'GitHub API',
    category: 'Tools',
    color: 'from-gray-400 to-gray-600',
    useCases: [
      { project: 'Skills Dashboard', description: 'Trending repository analysis for emerging tools', impact: 'Project ideas' },
    ]
  },
  'Google Trends API': {
    tech: 'Google Trends API',
    category: 'Tools',
    color: 'from-red-400 to-red-600',
    useCases: [
      { project: 'Skills Dashboard', description: 'Search trend analysis for skill popularity', impact: 'Future forecasting' },
    ]
  },
  'ArXiv/YouTube API': {
    tech: 'ArXiv/YouTube API',
    category: 'Tools',
    color: 'from-purple-400 to-purple-600',
    useCases: [
      { project: 'Cognitia', description: 'Academic content ingestion from papers and videos', impact: 'Multi-source learning' },
    ]
  },
  'CSV': {
    tech: 'CSV',
    category: 'Data',
    color: 'from-green-400 to-green-600',
    useCases: [
      { project: 'Skills Dashboard', description: 'Data storage and exchange format', impact: 'Portable datasets' },
    ]
  },
  'EDA': {
    tech: 'EDA',
    category: 'Data',
    color: 'from-blue-400 to-blue-600',
    useCases: [
      { project: 'Skills Dashboard', description: 'Exploratory data analysis for insights', impact: 'Trend discovery' },
    ]
  },

  // IoT & Hardware
  'Raspberry Pi': {
    tech: 'Raspberry Pi',
    category: 'IoT',
    color: 'from-red-400 to-red-600',
    useCases: [
      { project: 'DRAI-AI', description: 'Edge computing platform for autonomous rover', impact: 'Portable deployment' },
    ]
  },
  'GPS': {
    tech: 'GPS',
    category: 'IoT',
    color: 'from-green-400 to-green-600',
    useCases: [
      { project: 'DRAI-AI', description: 'Location tracking for PDF report generation', impact: 'Geolocation mapping' },
      { project: 'TARA', description: 'Neo-6M GPS for emergency SOS alerts', impact: 'Live location' },
    ]
  },
  'pyttsx3': {
    tech: 'pyttsx3',
    category: 'Tools',
    color: 'from-purple-400 to-purple-600',
    useCases: [
      { project: 'DRAI-AI', description: 'Text-to-speech for human-like assistant feedback', impact: 'Voice alerts' },
    ]
  },
  'ReportLab': {
    tech: 'ReportLab',
    category: 'Tools',
    color: 'from-blue-400 to-blue-600',
    useCases: [
      { project: 'DRAI-AI', description: 'Automated GPS-tagged PDF report generation', impact: 'Field documentation' },
    ]
  },
  'Arduino Nano': {
    tech: 'Arduino Nano',
    category: 'IoT',
    color: 'from-teal-400 to-teal-600',
    useCases: [
      { project: 'TARA', description: 'Microcontroller for wearable IoT device', impact: '₹1500 budget' },
    ]
  },
  'SIM800L': {
    tech: 'SIM800L',
    category: 'IoT',
    color: 'from-red-400 to-red-600',
    useCases: [
      { project: 'TARA', description: 'GSM module for emergency calls and SMS', impact: 'Auto-send alerts' },
    ]
  },
  'Neo-6M GPS': {
    tech: 'Neo-6M GPS',
    category: 'IoT',
    color: 'from-green-400 to-green-600',
    useCases: [
      { project: 'TARA', description: 'GPS module for location tracking in SOS', impact: 'Live coordinates' },
    ]
  },
  'IR Sensor': {
    tech: 'IR Sensor',
    category: 'IoT',
    color: 'from-yellow-400 to-yellow-600',
    useCases: [
      { project: 'TARA', description: 'Motion detection for automatic SOS trigger', impact: 'Hands-free alert' },
    ]
  },
  'Voice Module': {
    tech: 'Voice Module',
    category: 'IoT',
    color: 'from-pink-400 to-pink-600',
    useCases: [
      { project: 'TARA', description: 'Voice-activated emergency trigger', impact: 'Discreet activation' },
    ]
  },
  'Embedded C': {
    tech: 'Embedded C',
    category: 'IoT',
    color: 'from-gray-400 to-gray-600',
    useCases: [
      { project: 'TARA', description: 'Low-level programming for Arduino hardware', impact: 'Optimized firmware' },
    ]
  },
  'macOS': {
    tech: 'macOS',
    category: 'Tools',
    color: 'from-gray-400 to-gray-600',
    useCases: [
      { project: 'KALI-AI', description: 'Development and deployment platform', impact: 'Apple Silicon optimization' },
    ]
  },

  // Additional Tools
  'torch': {
    tech: 'torch',
    category: 'AI/ML',
    color: 'from-orange-400 to-orange-600',
    useCases: [
      { project: 'Swasthya-Setu', description: 'PyTorch for transformer-based embeddings', impact: 'FAISS integration' },
    ]
  },
  'Twilio': {
    tech: 'Twilio',
    category: 'Tools',
    color: 'from-red-400 to-red-600',
    useCases: [
      { project: 'Swasthya-Setu', description: 'SMS/WhatsApp integration for health alerts', impact: 'Multi-channel delivery' },
    ]
  },

  // Computer Vision
  'Computer Vision': {
    tech: 'Computer Vision',
    category: 'AI/ML',
    color: 'from-blue-400 to-blue-600',
    useCases: [
      { internship: 'DeepSurge.ai', description: 'Road infrastructure analysis pipelines', impact: '500+ video samples' },
    ]
  },

  // Data Engineering
  'ETL': {
    tech: 'ETL',
    category: 'Data',
    color: 'from-indigo-400 to-indigo-600',
    useCases: [
      { internship: 'Scalable Systems', description: 'Extract-Transform-Load pipeline design', impact: '10M+ records' },
    ]
  },

  // Research
  'Deep Learning': {
    tech: 'Deep Learning',
    category: 'AI/ML',
    color: 'from-purple-400 to-purple-600',
    useCases: [
      { internship: 'Samsung R&D Institute', description: 'DNG image quality enhancement models', impact: 'Low-light/noisy datasets' },
    ]
  },
  'Image Processing': {
    tech: 'Image Processing',
    category: 'AI/ML',
    color: 'from-pink-400 to-pink-600',
    useCases: [
      { internship: 'Samsung R&D Institute', description: 'Advanced image enhancement research', impact: 'Production quality' },
    ]
  },
  'Research': {
    tech: 'Research',
    category: 'AI/ML',
    color: 'from-indigo-400 to-indigo-600',
    useCases: [
      { internship: 'Samsung R&D Institute', description: 'Novel approaches to image quality', impact: 'R&D innovation' },
    ]
  },

  // AI Category
  'AI': {
    tech: 'AI',
    category: 'AI/ML',
    color: 'from-purple-400 to-purple-600',
    useCases: [
      { internship: 'DeepSurge.ai', description: 'AI-powered computer vision solutions', impact: 'Infrastructure analysis' },
    ]
  },

  // Praxifi CFO Technologies
  'Prophet': {
    tech: 'Prophet',
    category: 'AI/ML',
    color: 'from-blue-400 to-blue-600',
    useCases: [
      { project: 'Praxifi CFO', description: '14-metric parallel forecasting with custom seasonality', impact: '91.95% accuracy' },
    ]
  },
  'SHAP': {
    tech: 'SHAP',
    category: 'AI/ML',
    color: 'from-purple-400 to-purple-600',
    useCases: [
      { project: 'Praxifi CFO', description: 'Explainable AI for profit driver analysis', impact: 'Top 5 drivers' },
    ]
  },
  'Redis': {
    tech: 'Redis',
    category: 'Data',
    color: 'from-red-400 to-red-600',
    useCases: [
      { project: 'Praxifi CFO', description: 'Session management and result caching', impact: '90% cache hit' },
      { project: 'NeuraCity', description: 'Event bus for pub/sub microservices communication', impact: 'Real-time events' },
    ]
  },
  'Docker': {
    tech: 'Docker',
    category: 'Cloud',
    color: 'from-blue-400 to-blue-600',
    useCases: [
      { project: 'Praxifi CFO', description: 'Production containerization with auto-scaling', impact: 'K8s ready' },
      { project: 'NeuraCity', description: 'Microservices containerization', impact: '9 services' },
    ]
  },
  'PostgreSQL': {
    tech: 'PostgreSQL',
    category: 'Data',
    color: 'from-blue-400 to-blue-600',
    useCases: [
      { project: 'Praxifi CFO', description: 'Structured data storage with SQLAlchemy ORM', impact: 'ACID compliance' },
      { project: 'NeuraCity', description: 'Audit trail and structured event logging', impact: 'Full compliance' },
    ]
  },
  'Paillier Encryption': {
    tech: 'Paillier Encryption',
    category: 'Tools',
    color: 'from-red-400 to-red-600',
    useCases: [
      { project: 'Praxifi CFO', description: 'Homomorphic encryption for computation on encrypted data', impact: '2048-bit key' },
    ]
  },
  'Zero-Knowledge Proofs': {
    tech: 'Zero-Knowledge Proofs',
    category: 'Tools',
    color: 'from-purple-400 to-purple-600',
    useCases: [
      { project: 'Praxifi CFO', description: '21 proof types for privacy-preserving validation', impact: '95.1% success' },
    ]
  },
  'Differential Privacy': {
    tech: 'Differential Privacy',
    category: 'Tools',
    color: 'from-indigo-400 to-indigo-600',
    useCases: [
      { project: 'Praxifi CFO', description: 'Adaptive noise injection with ε=1.0 privacy budget', impact: '<60ms overhead' },
    ]
  },

  // NeuraCity Technologies
  'MicroPython': {
    tech: 'MicroPython',
    category: 'IoT',
    color: 'from-green-400 to-green-600',
    useCases: [
      { project: 'NeuraCity', description: 'Edge AI on Raspberry Pi Pico W with local inference', impact: '80% less backend' },
    ]
  },
  'Vue.js': {
    tech: 'Vue.js',
    category: 'Web',
    color: 'from-green-400 to-green-600',
    useCases: [
      { project: 'NeuraCity', description: 'Interactive real-time campus map dashboard', impact: 'Live events' },
    ]
  },
  'WebSockets': {
    tech: 'WebSockets',
    category: 'Web',
    color: 'from-yellow-400 to-yellow-600',
    useCases: [
      { project: 'NeuraCity', description: 'Real-time alert delivery with role-based routing', impact: 'Instant notifications' },
    ]
  },
};

// Helper function to get tech use cases
export const getTechUseCases = (tech: string): TechUseCase | undefined => {
  return techStackUseCases[tech];
};

// Helper function to get all techs by category
export const getTechsByCategory = (category: TechUseCase['category']): TechUseCase[] => {
  return Object.values(techStackUseCases).filter(t => t.category === category);
};
