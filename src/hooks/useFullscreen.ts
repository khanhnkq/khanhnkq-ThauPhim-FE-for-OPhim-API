import { useEffect, useState, useCallback } from 'react';

interface UseFullscreenOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useFullscreen({ containerRef }: UseFullscreenOptions) {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [containerRef]);

  useEffect(() => {
    const onFsChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  return { fullscreen, toggleFullscreen };
}
