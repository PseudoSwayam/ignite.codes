import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useHackerMode } from '../contexts/HackerModeContext';

export default function HackerModeTransition() {
  const { isEntering } = useHackerMode();
  const [matrixColumns, setMatrixColumns] = useState<number[]>([]);
  const [bootSequence, setBootSequence] = useState<string[]>([]);

  useEffect(() => {
    // Create matrix rain columns
    const columns = Array.from({ length: 50 }, (_, i) => i);
    setMatrixColumns(columns);

    // Different messages for entering vs exiting
    const messages = isEntering ? [
      '> INITIALIZING HACKER MODE...',
      '> LOADING KERNEL MODULES...',
      '> ESTABLISHING SECURE CONNECTION...',
      '> DECRYPTING MAINFRAME...',
      '> BYPASSING FIREWALL...',
      '> ACCESS GRANTED',
      '> WELCOME TO THE MATRIX',
    ] : [
      '> EXITING HACKER MODE...',
      '> CLOSING SECURE CHANNELS...',
      '> CLEARING COMMAND HISTORY...',
      '> RESTORING NORMAL VIEW...',
      '> DISCONNECTING FROM MATRIX...',
      '> EXIT SUCCESSFUL',
      '> RETURNING TO PROFESSIONAL MODE',
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < messages.length) {
        setBootSequence(prev => [...prev, messages[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isEntering]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 bg-black">
        {matrixColumns.map((col) => (
          <motion.div
            key={col}
            className={`absolute top-0 font-mono text-xs opacity-70 ${isEntering ? 'text-green-500' : 'text-beige-400'}`}
            style={{
              left: `${(col / 50) * 100}%`,
              width: '20px',
            }}
            initial={{ y: isEntering ? -100 : 0, opacity: isEntering ? 0 : 1 }}
            animate={{
              y: isEntering ? ['0vh', '100vh'] : ['0vh', '-100vh'],
              opacity: isEntering ? [0, 1, 1, 0] : [1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          >
            {Array.from({ length: 30 }, () => 
              String.fromCharCode(0x30A0 + Math.random() * 96)
            ).join('\n')}
          </motion.div>
        ))}
      </div>

      {/* Glitch Grid Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0, 0.5, 0] }}
        transition={{ duration: 0.5, repeat: 6 }}
      >
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, ${isEntering ? 'rgba(0, 255, 0, 0.05)' : 'rgba(245, 222, 179, 0.05)'} 25%, ${isEntering ? 'rgba(0, 255, 0, 0.05)' : 'rgba(245, 222, 179, 0.05)'} 26%, transparent 27%, transparent 74%, ${isEntering ? 'rgba(0, 255, 0, 0.05)' : 'rgba(245, 222, 179, 0.05)'} 75%, ${isEntering ? 'rgba(0, 255, 0, 0.05)' : 'rgba(245, 222, 179, 0.05)'} 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, ${isEntering ? 'rgba(0, 255, 0, 0.05)' : 'rgba(245, 222, 179, 0.05)'} 25%, ${isEntering ? 'rgba(0, 255, 0, 0.05)' : 'rgba(245, 222, 179, 0.05)'} 26%, transparent 27%, transparent 74%, ${isEntering ? 'rgba(0, 255, 0, 0.05)' : 'rgba(245, 222, 179, 0.05)'} 75%, ${isEntering ? 'rgba(0, 255, 0, 0.05)' : 'rgba(245, 222, 179, 0.05)'} 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}/>
      </motion.div>

      {/* Center Screen Effect - Different for enter/exit */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isEntering ? (
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 1.5, times: [0, 0.6, 1] }}
          >
            {/* Hexagon Container for Entry */}
            <div className="relative w-64 h-64">
              {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
                <motion.div
                  key={rotation}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1.5, 2],
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    times: [0, 0.2, 0.8, 1]
                  }}
                >
                  <div 
                    className="w-full h-full border-2 border-green-500"
                    style={{ 
                      transform: `rotate(${rotation}deg)`,
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="relative"
            initial={{ scale: 1, rotate: 0 }}
            animate={{ 
              scale: [1, 0.5, 0],
              rotate: [0, -180, -360],
            }}
            transition={{ duration: 1.5, times: [0, 0.6, 1] }}
          >
            {/* Circular Shrinking Effect for Exit */}
            <div className="relative w-64 h-64">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ 
                    opacity: [1, 0.5, 0],
                    scale: [1, 0.5, 0],
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: i * 0.1,
                    times: [0, 0.5, 1]
                  }}
                >
                  <div 
                    className="w-full h-full border-2 border-beige-400 rounded-full"
                    style={{ 
                      transform: `scale(${1 - i * 0.2})`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Boot Sequence Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className={`bg-black/90 border-2 ${isEntering ? 'border-green-500' : 'border-beige-400'} p-8 rounded-lg max-w-2xl`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className={`font-mono ${isEntering ? 'text-green-500' : 'text-beige-400'} space-y-2`}>
            {bootSequence.map((message, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  ▮
                </motion.span>
                {message}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Screen Scan Line */}
      <motion.div
        className={`absolute left-0 right-0 h-1 ${isEntering ? 'bg-green-500/50' : 'bg-beige-400/50'} blur-sm`}
        animate={{ 
          y: isEntering ? ['0vh', '100vh'] : ['100vh', '0vh'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Glitch Overlay */}
      <motion.div
        className={`absolute inset-0 ${isEntering ? 'bg-green-500/10' : 'bg-beige-400/10'}`}
        animate={{
          opacity: [0, 0.2, 0, 0.3, 0],
          x: [-5, 5, -5, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: 15,
        }}
      />

      {/* Corner Brackets */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
        <motion.div
          key={corner}
          className={`absolute ${corner.includes('top') ? 'top-4' : 'bottom-4'} ${corner.includes('left') ? 'left-4' : 'right-4'}`}
          initial={{ opacity: isEntering ? 0 : 1, scale: isEntering ? 0 : 1 }}
          animate={{ opacity: isEntering ? 1 : 0, scale: isEntering ? 1 : 0 }}
          transition={{ delay: isEntering ? 1.5 : 0, duration: 0.3 }}
        >
          <div className={`${isEntering ? 'text-green-500' : 'text-beige-400'} text-6xl font-mono`}>
            {corner === 'top-left' && '┌'}
            {corner === 'top-right' && '┐'}
            {corner === 'bottom-left' && '└'}
            {corner === 'bottom-right' && '┘'}
          </div>
        </motion.div>
      ))}

      {/* Digital Rain Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute w-2 h-2 ${isEntering ? 'bg-green-500' : 'bg-beige-400'} rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        />
      ))}
    </motion.div>
  );
}
