import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Cpu, Wifi, Activity, Shield, Zap, Database } from 'lucide-react';

export default function HackerProfile() {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [networkActivity, setNetworkActivity] = useState(0);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    // Simulate system stats
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 40 + 30));
      setMemoryUsage(Math.floor(Math.random() * 30 + 50));
      setNetworkActivity(Math.floor(Math.random() * 100));
    }, 2000);

    const uptimeInterval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full bg-black border-l border-green-500/30 p-6 font-mono text-green-500 overflow-auto custom-scrollbar">
      <div className="space-y-3">
        {/* ASCII Art Profile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-green-500/50 p-3 rounded"
        >
          <pre className="text-xs text-green-400 leading-tight whitespace-pre">
{`  ██╗ ██████╗ ███╗   ██╗██╗████████╗███████╗
  ██║██╔════╝ ████╗  ██║██║╚══██╔══╝██╔════╝
  ██║██║  ███╗██╔██╗ ██║██║   ██║   █████╗  
  ██║██║   ██║██║╚██╗██║██║   ██║   ██╔══╝  
  ██║╚██████╔╝██║ ╚████║██║   ██║   ███████╗
  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝   ╚══════╝`}
          </pre>
          <div className="mt-3 text-center">
            <div className="text-green-300 font-bold text-base">SWAYAM SAHOO</div>
            <div className="text-green-500/70 text-xs mt-0.5">AI/ML ENGINEER</div>
          </div>
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-green-500/50 p-3 rounded space-y-2"
        >
          <div className="text-green-300 font-bold text-sm mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            USER PROFILE
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-green-500/70">USER:</span>
              <span className="text-green-400">swayam@ignite</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-500/70">ROLE:</span>
              <span className="text-green-400">ADMIN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-500/70">STATUS:</span>
              <span className="text-green-400 flex items-center gap-1">
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-2 h-2 bg-green-500 rounded-full"
                />
                ONLINE
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-500/70">ACCESS:</span>
              <span className="text-green-400">ROOT</span>
            </div>
          </div>
        </motion.div>

        {/* Two Column Layout for remaining sections */}
        <div className="grid grid-cols-2 gap-3">
          {/* System Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-green-500/50 p-3 rounded space-y-2"
          >
            <div className="text-green-300 font-bold text-xs mb-2 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              SYSTEM
            </div>

            {/* CPU */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1 text-green-500/70">
                  <Cpu className="w-2.5 h-2.5" />
                  CPU
                </span>
                <span className="text-green-400">{cpuUsage}%</span>
              </div>
              <div className="w-full h-1.5 bg-green-950 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${cpuUsage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Memory */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1 text-green-500/70">
                  <Database className="w-2.5 h-2.5" />
                  MEM
                </span>
                <span className="text-green-400">{memoryUsage}%</span>
              </div>
              <div className="w-full h-1.5 bg-green-950 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${memoryUsage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Network */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1 text-green-500/70">
                  <Wifi className="w-2.5 h-2.5" />
                  NET
                </span>
                <span className="text-green-400">{networkActivity}KB/s</span>
              </div>
              <div className="w-full h-1.5 bg-green-950 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-green-500"
                  animate={{ width: `${networkActivity}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Session Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-green-500/50 p-3 rounded space-y-2"
          >
            <div className="text-green-300 font-bold text-xs mb-2 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              SESSION
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between">
                <span className="text-green-500/70">TIME:</span>
                <span className="text-green-400 font-mono">{formatUptime(uptime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-500/70">SHELL:</span>
                <span className="text-green-400">hacksh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-500/70">TTY:</span>
                <span className="text-green-400">MATRIX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-500/70">ENC:</span>
                <span className="text-green-400">AES256</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats - spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-2 border border-green-500/50 p-3 rounded"
          >
            <div className="text-green-300 font-bold text-xs mb-2">PORTFOLIO STATS</div>
            <div className="grid grid-cols-4 gap-2 text-[10px] text-center">
              <div className="border border-green-500/30 p-2 rounded">
                <div className="text-green-400 font-bold text-lg">6</div>
                <div className="text-green-500/70 text-[9px]">PROJECTS</div>
              </div>
              <div className="border border-green-500/30 p-2 rounded">
                <div className="text-green-400 font-bold text-lg">3</div>
                <div className="text-green-500/70 text-[9px]">INTERNSHIPS</div>
              </div>
              <div className="border border-green-500/30 p-2 rounded">
                <div className="text-green-400 font-bold text-lg">20+</div>
                <div className="text-green-500/70 text-[9px]">SKILLS</div>
              </div>
              <div className="border border-green-500/30 p-2 rounded">
                <div className="text-green-400 font-bold text-lg">∞</div>
                <div className="text-green-500/70 text-[9px]">PASSION</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
