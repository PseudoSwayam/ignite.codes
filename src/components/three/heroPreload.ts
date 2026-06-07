let hasPreloaded = false;

export const preloadHeroAssets = () => {
  if (hasPreloaded) return;
  hasPreloaded = true;

  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'fetch';
    link.href = '/modules/typing.glb';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  void import('./TypingModel');
  void import('./HeroScene');
};
