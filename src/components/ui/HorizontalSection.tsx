import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { HorizontalMovieCard } from '@/components/ui/HorizontalMovieCard';
import { IMG_CDN_URL } from '@/lib/api';
import type { OphimMovieMeta } from '@/types/movie.types';

interface HorizontalSectionProps {
  title: React.ReactNode;
  viewAllLink: string;
  movies: OphimMovieMeta[];
}

export function HorizontalSection({ title, viewAllLink, movies }: HorizontalSectionProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
      {/* Left Title Column */}
      <div className="w-full lg:w-48 xl:w-56 shrink-0 flex flex-col gap-3 lg:mt-6">
        <h2 className="text-2xl md:text-3xl font-black text-mecha-light tracking-widest leading-tight uppercase italic drop-shadow-md">
          {title}
        </h2>
        <Link 
          href={viewAllLink}
          className="text-xs text-mecha-accent font-bold tracking-widest uppercase hover:underline flex items-center transition-colors"
        >
          Xem toàn bộ <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>

      {/* Right Content Scrollable */}
      <div className="flex-1 w-full overflow-hidden">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-6 scrollbar-custom -mx-4 sm:mx-0 px-4 sm:px-0">
          {movies.slice(0, 10).map((movie) => (
            <HorizontalMovieCard 
              key={movie._id} 
              title={movie.name} 
              img={`${IMG_CDN_URL}${movie.poster_url || movie.thumb_url}`} 
              slug={movie.slug}
              originName={movie.origin_name}
              lang={movie.lang}
              episode_current={movie.episode_current}
              time={movie.time}
              chamfer="tl-br"
              className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
