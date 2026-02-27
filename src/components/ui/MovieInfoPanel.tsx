import Link from 'next/link';
import { Star } from 'lucide-react';
import React from 'react';

interface MovieInfoPanelProps {
  genres: string[];
  studio: string;
  rating: string;
  actors?: string[];
}

export function MovieInfoPanel({ genres, studio, rating, actors }: MovieInfoPanelProps) {
  return (
    <div className="mt-auto">
      <div className="clip-chamfer-tr-bl bg-mecha-surface border border-white/5 p-6 md:p-8">
        <div className="flex flex-wrap gap-8 items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Thể loại</span>
            <div className="flex gap-2 text-mecha-light">
              {genres.map((genre, index) => (
                <React.Fragment key={genre}>
                  <Link href="#" className="hover:text-mecha-accent transition-colors">{genre}</Link>
                  {index < genres.length - 1 && <span className="text-white/20">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hãng phim</span>
            <span className="text-mecha-light font-medium">{studio}</span>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Đánh giá</span>
            <div className="flex items-center gap-1 text-mecha-accent">
              <Star size={18} fill="currentColor" />
              <span className="text-mecha-light font-bold">{rating}</span>
              <span className="text-gray-400 text-sm">/ 10</span>
            </div>
          </div>
        </div>

        {actors && actors.length > 0 && actors[0].trim() !== "" && (
          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Diễn viên</span>
            <div className="flex flex-wrap gap-2 text-mecha-light">
              {actors.map((actor, index) => (
                <React.Fragment key={index}>
                  <Link href={`/search?q=${encodeURIComponent(actor)}`} className="hover:text-mecha-accent transition-colors">
                    {actor}
                  </Link>
                  {index < actors.length - 1 && <span className="text-white/20">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
