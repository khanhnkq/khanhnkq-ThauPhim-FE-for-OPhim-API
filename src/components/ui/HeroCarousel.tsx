"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Info } from 'lucide-react';
import { ButtonChamfered } from '@/components/ui/ButtonChamfered';
import { LiveBadge } from '@/components/ui/Badge';
import { IMG_CDN_URL } from '@/lib/api';
import type { OphimMovie } from '@/types/movie.types';
import { parseBadges } from '@/utils/badges';
import { buildWatchUrl } from '@/utils/watchUrl';

interface HeroCarouselProps {
  movies: OphimMovie[];
}

export function HeroCarousel({ movies }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 800);
  }, [animating]);

  const next = useCallback(() => {
    goTo((current + 1) % movies.length);
  }, [current, movies.length, goTo]);



  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  if (!mounted || !movies.length) return (
    <div className="w-full min-h-[500px] lg:min-h-[700px] bg-mecha-dark" />
  );

  const movie = movies[current];

  const { langBadge: langLabel, isThuyetMinh, isUpcoming } = parseBadges(movie.lang, movie.episode_current);

  return (
    <section className="relative w-full min-h-[500px] lg:min-h-[700px] flex flex-col overflow-hidden border-b border-mecha-surface select-none">
      
      {/* Backdrop images – stacked, current one is visible */}
      {movies.map((m, i) => (
        <div
          key={m._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={`${IMG_CDN_URL}${m.poster_url}`}
            alt={m.name}
            fill
            className="object-cover"
            priority={i === 0}
            loading={i === 0 ? 'eager' : 'lazy'}
            unoptimized
          />
          {/* Gradients - Unified cinematic style */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-black/20 z-0" />
        </div>
      ))}

      {/* Thumbnail strip (Aligned with content padding on the right) */}
      <div className="absolute right-6 md:right-12 lg:right-20 bottom-16 md:bottom-24 z-30 hidden lg:flex items-end gap-2 drop-shadow-2xl">
        {movies.map((m, i) => (
          <button
            key={m._id}
            onClick={() => goTo(i)}
            className={`relative w-16 h-24 rounded overflow-hidden border-2 transition-all duration-300 flex-shrink-0 shadow-lg ${
              i === current ? 'border-mecha-accent scale-110' : 'border-white/20 opacity-60 hover:opacity-90'
            }`}
          >
            <Image src={`${IMG_CDN_URL}${m.thumb_url}`} alt={m.name} fill className="object-cover" unoptimized />
          </button>
        ))}
      </div>

      {/* Content – flex-1 pushes it to the bottom of the section */}
      <div className="relative z-20 flex-1 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20 w-full">
        {/* Live badge */}
        <div className="mb-4">
          <LiveBadge>Đang thịnh hành</LiveBadge>
        </div>

        {/* Badges row (IMDb, episode, year, lang…) */}
        <div className="flex flex-wrap items-center gap-2 mb-4 drop-shadow-md">
          {movie.tmdb?.vote_average ? (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/50 rounded text-[11px] font-bold text-yellow-400 uppercase">
              IMDb {movie.tmdb.vote_average.toFixed(1)}
            </span>
          ) : null}
          {!isUpcoming && movie.episode_current && (
            <span className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-[11px] font-medium text-gray-300">
              {movie.episode_current}
            </span>
          )}
          <span className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-[11px] font-medium text-gray-300">
            {movie.year}
          </span>
          {langLabel && (
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold text-white uppercase ${isThuyetMinh ? 'bg-emerald-600/80' : 'bg-gray-700/80'}`}>
              {langLabel}
            </span>
          )}
          {isUpcoming && (
            <span className="px-2 py-0.5 bg-mecha-accent text-mecha-dark rounded text-[11px] font-bold uppercase">
              Sắp chiếu
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          key={movie._id}
          className="text-white text-4xl md:text-6xl lg:text-8xl font-black leading-[0.85] tracking-tighter max-w-[1000px] drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)] mb-4 animate-fade-in uppercase italic"
        >
          {movie.name}
        </h1>

        {/* Origin name */}
        <p className="text-mecha-accent text-base md:text-xl font-bold mb-4 border-l-4 border-mecha-accent pl-4 drop-shadow-lg">
          {movie.origin_name}
        </p>

        {/* Integrated Synopsis in Carousel */}
        <div 
          className="text-gray-300/80 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 max-w-2xl drop-shadow-md mb-8 mecha-content-html"
          dangerouslySetInnerHTML={{ __html: movie.content }}
        />

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 items-center">
          <Link href={buildWatchUrl(movie.slug)}>
            <ButtonChamfered variant="primary" className="h-12 px-8 text-base glow">
              <Play fill="currentColor" size={20} />
              Phát Ngay
            </ButtonChamfered>
          </Link>
          <Link href={`/movie/${movie.slug}`}>
            <ButtonChamfered variant="secondary" className="h-12 px-8 text-base">
              <Info size={20} />
              Chi tiết
            </ButtonChamfered>
          </Link>
        </div>
      </div>
    </section>
  );
}
