import { useState, useEffect } from 'react';
import { Home, Briefcase, Building2, Wrench, FileText, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { useHackerMode } from '../contexts/HackerModeContext';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { enterHackerMode, isHackerMode } = useHackerMode();

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'internships', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
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
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const openResume = () => {
    window.open('https://drive.google.com/file/d/1swcBkn9v87sPrR6Oatyi90GI-ZUviG-Q/view?usp=sharing');
  };

  const openGithub = () => {
    window.open('https://github.com/PseudoSwayam', '_blank');
  };

  const openLinkedin = () => {
    window.open('https://www.linkedin.com/in/swayamsahoo11/', '_blank');
  };

  const openEmail = () => {
    window.location.href = 'mailto:swayampr.sahoo@gmail.com';
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-beige-300/20">
        <div className="flex items-center space-x-6">
          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('home')}
              className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-beige-400/30 hover:bg-beige-900/30 hover:mx-1 group ${
                activeSection === 'home' ? 'text-beige-200' : 'text-beige-300/80'
              }`}
              aria-label="Home"
              data-cursor-text="home"
            >
              <Home size={18} />
              {activeSection === 'home' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-beige-300 rounded-full animate-pulse" />
              )}
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-beige-400/30 hover:bg-beige-900/30 hover:mx-1 group ${
                activeSection === 'projects' ? 'text-beige-200' : 'text-beige-300/80'
              }`}
              aria-label="Projects"
              data-cursor-text="projects"
            >
              <Briefcase size={18} />
              {activeSection === 'projects' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-beige-300 rounded-full animate-pulse" />
              )}
            </button>

            <button
              onClick={() => scrollToSection('internships')}
              className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-beige-400/30 hover:bg-beige-900/30 hover:mx-1 group ${
                activeSection === 'internships' ? 'text-beige-200' : 'text-beige-300/80'
              }`}
              aria-label="Internships"
              data-cursor-text="experience"
            >
              <Building2 size={18} />
              {activeSection === 'internships' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-beige-300 rounded-full animate-pulse" />
              )}
            </button>

            <button
              onClick={() => scrollToSection('skills')}
              className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-beige-400/30 hover:bg-beige-900/30 hover:mx-1 group ${
                activeSection === 'skills' ? 'text-beige-200' : 'text-beige-300/80'
              }`}
              aria-label="Skills"
              data-cursor-text="skills"
            >
              <Wrench size={18} />
              {activeSection === 'skills' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-beige-300 rounded-full animate-pulse" />
              )}
            </button>
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-beige-400/30"></div>

          {/* Hacker Mode Toggle */}
          <div className="flex items-center">
            <button
              onClick={enterHackerMode}
              className="relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50 hover:bg-green-950/30 hover:mx-1 group text-green-500/80 hover:text-green-400"
              aria-label="Hacker Mode"
              data-cursor-text="hack"
              disabled={isHackerMode}
            >
              <Terminal size={18} className="group-hover:animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-green-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </button>
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-beige-400/30"></div>

          {/* External Links */}
          <div className="flex items-center space-x-4">
            <button
              onClick={openResume}
              className="relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-beige-400/30 hover:bg-beige-900/30 hover:mx-1 group text-beige-300/80"
              aria-label="Resume"
              data-cursor-text="resume"
            >
              <FileText size={18} />
            </button>

            <button
              onClick={openGithub}
              className="relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-beige-400/30 hover:bg-beige-900/30 hover:mx-1 group text-beige-300/80"
              aria-label="GitHub"
              data-cursor-text="github"
            >
              <Github size={18} />
            </button>

            <button
              onClick={openLinkedin}
              className="relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-beige-400/30 hover:bg-beige-900/30 hover:mx-1 group text-beige-300/80"
              aria-label="LinkedIn"
              data-cursor-text="linkedin"
            >
              <Linkedin size={18} />
            </button>

            <button
              onClick={openEmail}
              className="relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-beige-400/30 hover:bg-beige-900/30 hover:mx-1 group text-beige-300/80"
              aria-label="Email Me"
              data-cursor-text="mail"
            >
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;