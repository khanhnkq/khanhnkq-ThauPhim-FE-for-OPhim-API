import { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

interface UseHlsOptions {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  src: string;
  mounted: boolean;
}

interface UseHlsReturn {
  hlsRef: React.RefObject<Hls | null>;
  loading: boolean;
  setLoading: (v: boolean) => void;
  hlsFailed: boolean;
  qualities: { height: number; index: number }[];
  currentQuality: number;
  setCurrentQuality: (idx: number) => void;
}

export function useHls({ videoRef, src, mounted }: UseHlsOptions): UseHlsReturn {
  const hlsRef = useRef<Hls | null>(null);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [loading, setLoading] = useState(true);
  const [hlsFailed, setHlsFailed] = useState(false);
  const [qualities, setQualities] = useState<{ height: number; index: number }[]>([]);
  const [currentQuality, setCurrentQuality] = useState(-1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || src.trim() === '') return;

    setLoading(true);
    setHlsFailed(false);

    // Safety net: if loading takes >15s, force-dismiss
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    loadingTimeoutRef.current = setTimeout(() => setLoading(false), 15000);

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const isM3u8 = src.includes('.m3u8') || src.includes('m3u8');

    if (isM3u8 && Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, startLevel: -1 });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        const qs = data.levels
          .map((l, i) => ({ height: l.height, index: i }))
          .filter((q) => q.height > 0);
        setQualities(qs);
        setCurrentQuality(-1);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          console.error('HLS fatal error – switching to fallback');
          setHlsFailed(true);
          setLoading(false);
          if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
        }
      });
    } else {
      video.src = src;
      video.load();
    }

    return () => {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      hlsRef.current?.destroy();
    };
  }, [src, mounted, videoRef]);

  return {
    hlsRef,
    loading,
    setLoading,
    hlsFailed,
    qualities,
    currentQuality,
    setCurrentQuality,
  };
}
