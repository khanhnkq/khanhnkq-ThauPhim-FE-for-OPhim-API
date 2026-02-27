import { useEffect } from 'react';

interface UseVideoKeyboardOptions {
  togglePlay: () => void;
  skip: (sec: number) => void;
  updateVolume: (val: number) => void;
  volume: number;
  toggleMute: () => void;
  toggleFullscreen: () => void;
}

export function useVideoKeyboard({
  togglePlay,
  skip,
  updateVolume,
  volume,
  toggleMute,
  toggleFullscreen,
}: UseVideoKeyboardOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName || '')) return;

      const key = e.key.toLowerCase();
      if (key === ' ' || key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (key === 'arrowright') {
        e.preventDefault();
        skip(10);
      } else if (key === 'arrowleft') {
        e.preventDefault();
        skip(-10);
      } else if (key === 'arrowup') {
        e.preventDefault();
        updateVolume(volume + 0.1);
      } else if (key === 'arrowdown') {
        e.preventDefault();
        updateVolume(volume - 0.1);
      } else if (key === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, skip, updateVolume, volume, toggleMute, toggleFullscreen]);
}
