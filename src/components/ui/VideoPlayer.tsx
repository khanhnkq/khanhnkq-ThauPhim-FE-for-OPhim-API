"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  Loader2,
  SkipForward,
  SkipBack,
} from "lucide-react";
import { useHls } from "@/hooks/useHls";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useVideoKeyboard } from "@/hooks/useVideoKeyboard";

// ── Types ────────────────────────────────────

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  fallbackEmbed?: string;
}

// ── Helpers ──────────────────────────────────

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ── Component ────────────────────────────────

export function VideoPlayer({ src, poster, title, fallbackEmbed }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mounted, setMounted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // ── Hooks ──────────────────────────────────
  const {
    hlsRef,
    loading, setLoading,
    hlsFailed,
    qualities, currentQuality, setCurrentQuality,
  } = useHls({ videoRef, src, mounted });

  const {
    playing, setPlaying,
    currentTime, duration, volume, muted,
    playbackRate, feedback, progress,
    togglePlay, handleTimeUpdate, handleSeek,
    updateVolume, toggleMute, skip, setSpeed,
  } = useVideoPlayer({ videoRef });

  const { fullscreen, toggleFullscreen } = useFullscreen({ containerRef });

  useVideoKeyboard({ togglePlay, skip, updateVolume, volume, toggleMute, toggleFullscreen });

  // ── Controls visibility ────────────────────
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      if (playing && !showSettings) setShowControls(false);
    }, 3500);
  }, [playing, showSettings]);

  // ── Quality / Speed setters ────────────────
  const handleSetQuality = (idx: number) => {
    if (hlsRef.current) hlsRef.current.currentLevel = idx;
    setCurrentQuality(idx);
    setShowSettings(false);
  };

  const handleSetSpeed = (rate: number) => {
    setSpeed(rate);
    setShowSettings(false);
  };

  // ── Early returns ──────────────────────────
  if (!mounted) return <div className="w-full aspect-video bg-black" />;

  if (!src || src.trim() === '') {
    if (fallbackEmbed) {
      return (
        <div className="relative w-full aspect-video bg-black">
          <iframe src={fallbackEmbed} className="absolute inset-0 w-full h-full" allowFullScreen title={title || "Video Player"} />
        </div>
      );
    }
    return (
      <div className="relative w-full aspect-video bg-black flex items-center justify-center">
        <p className="text-gray-400 text-sm">Không tìm thấy nguồn phim. Vui lòng thử server khác.</p>
      </div>
    );
  }

  if (hlsFailed && fallbackEmbed) {
    return (
      <div className="relative w-full aspect-video bg-black">
        <iframe src={fallbackEmbed} className="absolute inset-0 w-full h-full" allowFullScreen title={title || "Video Player"} />
      </div>
    );
  }

  // ── Render ─────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black overflow-hidden group/player cursor-default"
      onMouseMove={resetHideTimer}
      onMouseLeave={() => playing && setShowControls(false)}
      onTouchStart={resetHideTimer}
      onDoubleClick={toggleFullscreen}
    >
      {/* Cockpit corner brackets */}
      {!fullscreen && (
        <>
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-mecha-accent z-40 pointer-events-none opacity-50 transition-opacity group-hover/player:opacity-100" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-mecha-accent z-40 pointer-events-none opacity-50 transition-opacity group-hover/player:opacity-100" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-mecha-accent z-40 pointer-events-none opacity-50 transition-opacity group-hover/player:opacity-100" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-mecha-accent z-40 pointer-events-none opacity-50 transition-opacity group-hover/player:opacity-100" />
        </>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full object-contain cursor-pointer"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onLoadedData={() => setLoading(false)}
        onCanPlay={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onClick={togglePlay}
        playsInline
      />

      {/* Feedback Overlay */}
      {feedback && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md rounded-full p-6 animate-ping-once flex flex-col items-center gap-2">
            {feedback.icon === "play" && <Play className="text-mecha-accent" size={48} fill="currentColor" />}
            {feedback.icon === "pause" && <Pause className="text-mecha-accent" size={48} fill="currentColor" />}
            {feedback.icon === "volume" && <Volume2 className="text-mecha-accent" size={48} />}
            {feedback.icon === "seek" && <SkipForward className="text-mecha-accent" size={48} />}
            {feedback.value && <span className="text-white font-mono text-sm">{feedback.value}</span>}
          </div>
        </div>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 pointer-events-none">
          <Loader2 className="text-mecha-accent animate-spin" size={44} />
        </div>
      )}

      {/* Controls overlay */}
      <div
        className={`absolute inset-0 z-30 pointer-events-none transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showControls || !playing
            ? "duration-300 backdrop-blur-0 bg-black/10"
            : "duration-1000 backdrop-blur-0 bg-transparent"
        }`}
      >
        {/* Top bar */}
        <div
          className={`absolute top-0 left-0 right-0 px-5 pt-4 pb-16 bg-gradient-to-b from-black/80 via-black/30 to-transparent transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
            showControls || !playing
              ? "duration-300 translate-y-0 opacity-100"
              : "duration-1200 -translate-y-full opacity-0"
          }`}
        >
          {title && (
            <div className="flex items-center gap-3">
              <div className="w-1 h-4 bg-mecha-accent" />
              <p className="text-white text-sm font-bold uppercase tracking-[0.15em] truncate drop-shadow-lg">
                {title}
              </p>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 pt-16 px-4 pb-4 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-auto transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
            showControls || !playing
              ? "duration-300 translate-y-0 opacity-100"
              : "duration-1200 translate-y-full opacity-0"
          }`}
        >
          <div className="flex flex-col gap-3">
            {/* Seek bar */}
            <div className="flex items-center gap-3 group/seekbar">
              <span className="text-white/70 text-[11px] font-mono tabular-nums min-w-[40px]">
                {formatTime(currentTime)}
              </span>
              <div className="relative flex-1 h-1.5 cursor-pointer flex items-center">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden group-hover/seekbar:h-1.5 transition-all">
                  <div
                    className="h-full bg-mecha-accent rounded-full shadow-[0_0_12px_#fec93d]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.5}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
              </div>
              <span className="text-white/70 text-[11px] font-mono tabular-nums min-w-[40px] text-right">
                {formatTime(duration)}
              </span>
            </div>

            {/* Button row */}
            <div className="flex items-center justify-between">
              {/* Left */}
              <div className="flex items-center gap-5">
                <button onClick={() => skip(-10)} className="text-white/80 hover:text-white transition-colors">
                  <SkipBack size={20} />
                </button>
                <button onClick={togglePlay} className="text-mecha-accent hover:scale-110 transition-transform">
                  {playing ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                </button>
                <button onClick={() => skip(10)} className="text-white/80 hover:text-white transition-colors">
                  <SkipForward size={20} />
                </button>

                <div className="w-px h-4 bg-white/10 mx-1" />

                {/* Volume */}
                <div className="flex items-center gap-3 group/vol">
                  <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors">
                    {muted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300 flex items-center">
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={muted ? 0 : volume}
                      onChange={(e) => updateVolume(parseFloat(e.target.value))}
                      className="w-24 accent-mecha-accent cursor-pointer h-1"
                    />
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4 relative">
                <div className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-white/40">
                  {playbackRate.toFixed(2)}x
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); setShowSettings((s) => !s); }}
                  className={`transition-all ${showSettings ? "text-mecha-accent scale-110" : "text-white/80 hover:text-white"}`}
                >
                  <Settings size={20} />
                </button>

                <button onClick={toggleFullscreen} className="text-white/80 hover:text-mecha-accent transition-colors">
                  {fullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
                </button>

                {/* Settings panel */}
                {showSettings && (
                  <div
                    className="absolute bottom-full right-0 mb-4 w-56 bg-mecha-dark/98 border border-white/10 backdrop-blur-xl rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 flex flex-col gap-4 z-50 animate-fade-in"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div>
                      <p className="text-[10px] text-mecha-accent font-black uppercase tracking-[0.2em] mb-3">Tốc độ phát</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((r) => (
                          <button
                            key={r}
                            onClick={() => handleSetSpeed(r)}
                            className={`px-1 py-1.5 rounded-md text-[11px] font-bold transition-all ${
                              playbackRate === r ? "bg-mecha-accent text-mecha-dark" : "bg-white/5 text-white/70 hover:bg-white/10"
                            }`}
                          >
                            {r}x
                          </button>
                        ))}
                      </div>
                    </div>

                    {qualities.length > 0 && (
                      <div>
                        <p className="text-[10px] text-mecha-accent font-black uppercase tracking-[0.2em] mb-3">Chất lượng</p>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => handleSetQuality(-1)}
                            className={`px-3 py-2 rounded-md text-[11px] font-bold text-left transition-all ${
                              currentQuality === -1 ? "bg-mecha-accent text-mecha-dark" : "bg-white/5 text-white/70 hover:bg-white/10"
                            }`}
                          >
                            Tự động (Auto)
                          </button>
                          {qualities.map((q) => (
                            <button
                              key={q.index}
                              onClick={() => handleSetQuality(q.index)}
                              className={`px-3 py-2 rounded-md text-[11px] font-bold text-left transition-all ${
                                currentQuality === q.index ? "bg-mecha-accent text-mecha-dark" : "bg-white/5 text-white/70 hover:bg-white/10"
                              }`}
                            >
                              {q.height}p
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
