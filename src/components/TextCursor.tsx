import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TextCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('ignite.codes');
  const [isHackerHover, setIsHackerHover] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Check if hovering over an element with data-cursor-text attribute
      const target = e.target as HTMLElement;
      const elementWithCursorText = target.closest('[data-cursor-text]') as HTMLElement;
      
      if (elementWithCursorText) {
        const text = elementWithCursorText.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
          setIsHackerHover(text === 'hack');
        }
      } else {
        setCursorText('ignite.codes');
        setIsHackerHover(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorText('ignite.codes');
      setIsHackerHover(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom text cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          x: 0,
          y: 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Hacker mode glowing ring effect */}
          {isHackerHover && (
            <motion.div 
              className="absolute inset-0 -m-4 rounded-lg bg-green-500/20 blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
          
          {/* Text cursor with contrast box */}
          <motion.div 
            className={`backdrop-blur-sm border rounded px-3 py-1 shadow-lg relative ${
              isHackerHover 
                ? 'bg-black/95 border-green-500 shadow-green-500/50' 
                : 'bg-black/90 border-beige-300/40 shadow-beige-400/20'
            }`}
            key={isHackerHover ? 'hacker' : 'normal'}
            animate={isHackerHover ? {
              boxShadow: [
                '0 0 10px rgba(34, 197, 94, 0.3)',
                '0 0 20px rgba(34, 197, 94, 0.6)',
                '0 0 10px rgba(34, 197, 94, 0.3)',
              ],
            } : {
              boxShadow: '0 4px 6px -1px rgba(245, 222, 179, 0.2)',
            }}
            transition={{
              duration: isHackerHover ? 1.2 : 0.3,
              repeat: isHackerHover ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <motion.div 
              className={`font-mono text-xs font-bold whitespace-nowrap tracking-tight ${
                isHackerHover ? 'text-green-400' : 'text-beige-200'
              }`}
              key={cursorText}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isHackerHover && (
                <motion.span
                  className="inline-block mr-1"
                  animate={{
                    opacity: [1, 0.3, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {'>'}{'>'}
                </motion.span>
              )}
              {cursorText}
              {isHackerHover && (
                <motion.span
                  className="inline-block ml-1"
                  animate={{
                    opacity: [1, 0.3, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                >
                  {'<'}{'<'}
                </motion.span>
              )}
            </motion.div>
          </motion.div>
          
          {/* Dot at the exact cursor position */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full opacity-60 ${
            isHackerHover ? 'bg-green-400' : 'bg-beige-300'
          }`} />
        </div>
      </motion.div>
    </>
  );
};

export default TextCursor;
