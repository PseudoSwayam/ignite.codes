import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { HackerModeProvider, useHackerMode } from './contexts/HackerModeContext';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import WelcomeAnimation from './components/WelcomeAnimation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TextCursor from './components/TextCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import HackerModeTransition from './components/HackerModeTransition';
import TerminalView from './components/TerminalView';
import HomeNew from './pages/HomeNew';
import TestPage from './pages/TestPage';
import Projects from './pages/Projects';
import Internships from './pages/Internships';
import Skills from './pages/Skills';

function AppContent() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const { isHackerMode, isTransitioning } = useHackerMode();

  useEffect(() => {
    const welcomeShown = sessionStorage.getItem('welcomeShown');
    if (welcomeShown) {
      setShowWelcome(false);
      setHasShownWelcome(true);
    }
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setHasShownWelcome(true);
    sessionStorage.setItem('welcomeShown', 'true');
  };

  return (
    <Router basename="/">
      <AnimatePresence mode="wait">
        {showWelcome && !hasShownWelcome ? (
          <WelcomeAnimation key="welcome" onComplete={handleWelcomeComplete} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {isTransitioning && (
                <HackerModeTransition />
              )}
            </AnimatePresence>

          {isHackerMode ? (
            <TerminalView />
          ) : (
            <>
              <ScrollToTop />
              <ScrollProgressBar />
              <TextCursor />
              <div className="min-h-screen bg-neutral-950 transition-colors duration-300">
                <Navbar />

                <Routes>
                  <Route path="/test" element={<TestPage />} />
                  <Route path="/" element={<HomeNew />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/internships" element={<Internships />} />
                  <Route path="/skills" element={<Skills />} />
                </Routes>

                <Footer />
              </div>
            </>
          )}
        </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <HackerModeProvider>
          <AppContent />
        </HackerModeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;