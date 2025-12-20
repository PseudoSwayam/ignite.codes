import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'code' | 'fade'>('code');
  const [codeLines, setCodeLines] = useState<string[]>([]);

  const codeSnippets = [
    'import { Developer } from "@ignite/core";',
    'const swayam = new Developer({',
    '  name: "Swayam Sahoo",',
    '  skills: ["AI/ML", "Data Science"],',
    '  passion: "Building the future",',
    '});',
    '',
    'swayam.initialize();',
    '// Compiling portfolio...',
  ];

  useEffect(() => {
    let typingInterval: number;
    let fadeTimer: number;

    // Type out code lines with faster speed
    let currentLine = 0;
    typingInterval = window.setInterval(() => {
      if (currentLine < codeSnippets.length) {
        setCodeLines(prev => [...prev, codeSnippets[currentLine]]);
        currentLine++;
      } else {
        clearInterval(typingInterval);
        // Wait a bit after typing completes, then fade
        setTimeout(() => setPhase('fade'), 400);
      }
    }, 200); // Faster typing speed: 200ms per line

    // Fade and complete
    fadeTimer = window.setTimeout(onComplete, (codeSnippets.length * 200) + 900);

    return () => {
      if (typingInterval) clearInterval(typingInterval);
      if (fadeTimer) clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'fade' ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-neutral-950 overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-beige-400"
            style={{ top: `${i * 5}%`, width: '100%' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-beige-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            delay: Math.random() * 3,
            duration: 2,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="relative h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* Code Phase */}
          {phase === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl px-8"
            >
              <div className="bg-neutral-900/80 backdrop-blur-sm border border-beige-500/20 rounded-lg p-8 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-beige-500 text-sm font-mono">portfolio.ts</span>
                </div>
                <div className="font-mono text-sm space-y-1">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={
                        line?.includes('import') ? 'text-purple-400' :
                        line?.includes('const') || line?.includes('new') ? 'text-blue-400' :
                        line?.includes('//') ? 'text-gray-500 italic' :
                        line?.includes('"') ? 'text-green-400' :
                        line?.includes('initialize') ? 'text-yellow-400' :
                        'text-beige-300'
                      }
                    >
                      {line || '\u00A0'}
                      {i === codeLines.length - 1 && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-2 h-4 bg-beige-400 ml-1"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner accents */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
        <motion.div
          key={corner}
          className={`absolute ${corner.includes('top') ? 'top-8' : 'bottom-8'} ${corner.includes('left') ? 'left-8' : 'right-8'}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="w-16 h-16 border-beige-400/30 relative">
            {corner.includes('top') && corner.includes('left') && (
              <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2" />
            )}
            {corner.includes('top') && corner.includes('right') && (
              <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2" />
            )}
            {corner.includes('bottom') && corner.includes('left') && (
              <div className="absolute bottom-0 left-0 w-full h-full border-b-2 border-l-2" />
            )}
            {corner.includes('bottom') && corner.includes('right') && (
              <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2" />
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WelcomeAnimation;