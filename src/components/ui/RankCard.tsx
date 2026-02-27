"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { motion } from "framer-motion";

interface RankCardProps {
  rank: number;
  title: string;
  genre: string;
  rating: string;
  slug: string;
  image?: string;
}

export function RankCard({ rank, title, genre, rating, slug, image }: RankCardProps) {
  const isTop3 = rank <= 3;
  
  let colorClass = "text-gray-600";
  let hexagonColorClass = "";
  
  if (rank === 1) {
    colorClass = "text-mecha-accent bg-mecha-accent/10 border-mecha-accent/50 shadow-[0_0_15px_rgba(254,201,61,0.2)]";
    hexagonColorClass = "text-mecha-accent";
  } else if (rank === 2) {
    colorClass = "text-[#C0C0C0] bg-white/5 border-white/20";
    hexagonColorClass = "text-gray-300";
  } else if (rank === 3) {
    colorClass = "text-[#CD7F32] bg-[#CD7F32]/10 border-[#CD7F32]/30";
    hexagonColorClass = "text-orange-400";
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(rank * 0.05, 0.4) }}
    >
      <Link href={`/movie/${slug}`} className="group flex items-center gap-3 p-3 bg-mecha-surface border border-white/5 hover:border-mecha-accent/50 transition-all clip-chamfer-tl cursor-pointer relative overflow-hidden">
        {/* Optional background banner if image is treated as backdrop */}
        {image && (
          <>
            <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale mix-blend-overlay group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-500 blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-mecha-surface via-mecha-surface/80 to-transparent z-0" />
          </>
        )}
        
        <div className={cn("relative z-10 w-12 h-12 flex-shrink-0 flex items-center justify-center font-black", colorClass)}>
           <span className="text-3xl italic z-10">{rank}</span>
           {isTop3 && (
             <svg className={cn("absolute inset-0 opacity-20", hexagonColorClass)} fill="currentColor" viewBox="0 0 100 100">
               <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" opacity="0.2"></path>
               <path d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z" fill="none" stroke="currentColor" strokeWidth="3"></path>
             </svg>
           )}
        </div>
        
        {/* Banner Thumbnail (Small) */}
        {image && (
          <div className="relative z-10 w-16 h-10 flex-shrink-0 rounded overflow-hidden border border-white/10 group-hover:border-mecha-accent/50 transition-colors">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
        )}

        <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-center">
           <h4 className="text-mecha-light font-bold truncate group-hover:text-mecha-accent transition-colors text-sm">{title}</h4>
           <p className="text-gray-500 text-[11px]">{genre}</p>
        </div>
        <span className="relative z-10 text-xs font-bold text-mecha-accent bg-mecha-dark px-2 py-1 rounded border border-white/5">{rating}</span>
      </Link>
    </motion.div>
  );
}
