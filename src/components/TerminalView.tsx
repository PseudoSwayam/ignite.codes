import { motion } from 'framer-motion';
import Terminal from './Terminal';
import HackerProfile from './HackerProfile';
import { useHackerMode } from '../contexts/HackerModeContext';

export default function TerminalView() {
  const { exitHackerMode } = useHackerMode();

  const handleNavigate = (section: string) => {
    if (section === 'exit') {
      exitHackerMode();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50"
    >
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-0 right-0 h-px bg-green-500/30"
          animate={{ 
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* CRT Screen Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 0, 0.03) 2px,
              rgba(0, 255, 0, 0.03) 4px
            )
          `,
        }}
      />

      {/* Main Content Grid */}
      <div className="h-screen grid grid-cols-[1fr_420px] pb-10">
        {/* Terminal Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative overflow-hidden"
        >
          <Terminal onNavigate={handleNavigate} />
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative overflow-hidden"
        >
          <HackerProfile />
        </motion.div>
      </div>

      {/* Bottom Status Bar */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 bg-green-950/50 border-t border-green-500/30 px-4 py-1.5 font-mono text-[10px] text-green-400 flex items-center justify-between z-10"
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-green-500 rounded-full"
            />
            SYSTEM ACTIVE
          </span>
          <span>MATRIX v1.0.0</span>
        </div>
        <div className="flex items-center gap-4">
          <span>SECURE CONNECTION</span>
          <span className="text-green-300">Type 'help' for commands</span>
        </div>
      </motion.div>

      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.5) 100%)',
        }}
      />
    </motion.div>
  );
}
