import { useRef, useState, useCallback } from 'react';

type FeedbackIcon = 'play' | 'pause' | 'volume' | 'seek';

interface UseVideoPlayerOptions {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export function useVideoPlayer({ videoRef }: UseVideoPlayerOptions) {
  const playPromiseRef = useRef<Promise<void> | undefined>(undefined);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [feedback, setFeedback] = useState<{ icon: FeedbackIcon; value?: string } | null>(null);

  const showFeedback = useCallback((icon: FeedbackIcon, value?: string) => {
    setFeedback({ icon, value });
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(null), 1000);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      playPromiseRef.current = video.play();
      playPromiseRef.current?.catch((err) => {
        if (err?.name !== 'AbortError') console.warn('Play failed:', err);
      });
      showFeedback('play');
    } else {
      const p = playPromiseRef.current;
      if (p !== undefined) {
        p.then(() => video.pause()).catch(() => {});
      } else {
        video.pause();
      }
      showFeedback('pause');
    }
  }, [videoRef, showFeedback]);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    setDuration(v.duration || 0);
  }, [videoRef]);

  const handleSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = parseFloat(e.target.value);
    },
    [videoRef]
  );

  const updateVolume = useCallback(
    (val: number) => {
      const v = videoRef.current;
      if (!v) return;
      const clamped = Math.max(0, Math.min(1, val));
      v.volume = clamped;
      v.muted = clamped === 0;
      setVolume(clamped);
      setMuted(clamped === 0);
      showFeedback('volume', `${Math.round(clamped * 100)}%`);
    },
    [videoRef, showFeedback]
  );

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const nextMuted = !v.muted;
    v.muted = nextMuted;
    setMuted(nextMuted);
    showFeedback('volume', nextMuted ? 'Muted' : `${Math.round(volume * 100)}%`);
  }, [videoRef, volume, showFeedback]);

  const skip = useCallback(
    (sec: number) => {
      const v = videoRef.current;
      if (!v) return;
      const target = Math.max(0, Math.min(v.duration, v.currentTime + sec));
      v.currentTime = target;
      showFeedback('seek', `${sec > 0 ? '+' : ''}${sec}s`);
    },
    [videoRef, showFeedback]
  );

  const setSpeed = useCallback(
    (rate: number) => {
      const v = videoRef.current;
      if (v) v.playbackRate = rate;
      setPlaybackRate(rate);
    },
    [videoRef]
  );

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return {
    playing,
    setPlaying,
    currentTime,
    duration,
    volume,
    muted,
    playbackRate,
    feedback,
    progress,
    togglePlay,
    handleTimeUpdate,
    handleSeek,
    updateVolume,
    toggleMute,
    skip,
    setSpeed,
  };
}
