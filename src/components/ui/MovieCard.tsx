"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { parseBadges } from '@/utils/badges';

interface MovieCardProps {
  title: string;
  img: string;
  slug: string;
  originName?: string;
  lang?: string;
  episode_current?: string;
  time?: string;
  chamfer?: 'none' | 'tl' | 'tr-bl' | 'tl-br';
  className?: string;
}

export function MovieCard({ 
  title, 
  img, 
  slug, 
  originName,
  lang,
  episode_current,
  time,
  chamfer = 'none', 
  className 
}: MovieCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isUpcoming, isThuyetMinh } = parseBadges(lang, episode_current);

  const chamferClass = {
    'none': '',
    'tl': 'clip-chamfer-tl',
    'tr-bl': 'clip-chamfer-tr-bl',
    'tl-br': 'clip-chamfer-tl-br'
  }[chamfer];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("group relative flex flex-col gap-3 shrink-0 cursor-pointer overflow-hidden", className)}
    >
      <Link href={`/movie/${slug}`} className="absolute inset-0 z-20" aria-label={`Xem phim ${title}`} />
      
      {/* Container ảnh */}
      <div className={cn("relative w-full aspect-[2/3] overflow-hidden bg-mecha-surface border-2 border-transparent transition-colors duration-300 group-hover:border-mecha-accent/50", chamferClass)}>
        <Image 
          src={img} 
          alt={title} 
          fill
          unoptimized
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-60",
            isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md scale-110"
          )}
        />
        
        {/* Skeleton while loading */}
        {!isLoaded && (
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
        )}
        
        {/* Runtime (Time) Badge */}
        {time && time.trim() !== "" && time !== "Đang cập nhật" && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-mecha-light px-2 py-0.5 rounded text-[10px] font-bold z-10 border border-white/10 shadow-md">
            {time}
          </div>
        )}
         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
           {isUpcoming ? (
             <div className="bg-mecha-accent text-mecha-dark px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-md">
               Sắp chiếu
             </div>
           ) : (
             <>
               {lang && (
                 <div className={`px-1.5 py-0.5 rounded-sm text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap shadow-md ${isThuyetMinh ? 'bg-emerald-600/90' : 'bg-gray-800/90'}`}>
                   {lang} {episode_current && <span className="ml-0.5">{episode_current}</span>}
                 </div>
               )}
               {!lang && episode_current && (
                  <div className="bg-gray-800/90 px-1.5 py-0.5 rounded-sm text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap shadow-md">
                    {episode_current}
                  </div>
               )}
             </>
           )}
         </div>
         <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </div>
      <div className="flex flex-col items-start gap-1 px-1 mt-2">
        <h4 className="text-mecha-light text-[15px] font-bold group-hover:text-mecha-accent transition-colors line-clamp-1 w-full">{title}</h4>
        {originName && <span className="text-[13px] text-gray-500 line-clamp-1 w-full">{originName}</span>}
      </div>
    </motion.div>
  );
}
