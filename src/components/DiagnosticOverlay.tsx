import React, { useState, useEffect } from 'react';

const DiagnosticOverlay: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<string[]>([]);

  useEffect(() => {
    const logs: string[] = [];
    
    // Check if components are loading
    logs.push('✅ DiagnosticOverlay mounted');
    
    // Check for WebGL
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        logs.push('✅ WebGL is supported');
      } else {
        logs.push('❌ WebGL is NOT supported');
      }
    } catch (e) {
      logs.push('❌ WebGL check failed: ' + e);
    }
    
    // Check window size
    logs.push(`📐 Window size: ${window.innerWidth}x${window.innerHeight}`);
    
    // Check for errors
    window.addEventListener('error', (e) => {
      logs.push(`❌ Error: ${e.message}`);
      setDiagnostics([...logs]);
    });
    
    setDiagnostics(logs);
  }, []);

  return (
    <div className="fixed top-20 right-4 z-[10000] bg-black/90 text-white p-4 rounded-lg max-w-md text-xs font-mono">
      <div className="font-bold mb-2">🔍 Diagnostics</div>
      {diagnostics.map((log, i) => (
        <div key={i} className="py-1">{log}</div>
      ))}
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-3 py-1 bg-beige-500 rounded text-black"
      >
        Reload
      </button>
    </div>
  );
};

export default DiagnosticOverlay;
