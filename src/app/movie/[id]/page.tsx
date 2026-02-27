import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Play, Plus, Share2, Youtube, Star } from 'lucide-react';
import React from 'react';
import { ButtonChamfered } from '@/components/ui/ButtonChamfered';
import { EpisodeList } from '@/components/ui/EpisodeList';
import { getMovieDetails, IMG_CDN_URL } from '@/lib/api';
import { buildWatchUrl } from '@/utils/watchUrl';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetails(props: Props) {
  const params = await props.params;
  const data = await getMovieDetails(params.id);
  
  if (!data || !data.movie) {
    notFound();
  }

  const { movie, episodes } = data;
  const watchUrl = buildWatchUrl(movie.slug, { episodes });

  // For EpisodeList component
  const defaultServer = episodes[0];
  const episodeListData = defaultServer?.server_data.map(ep => ({
    id: ep.slug,
    ep: ep.name,
    title: `Tập ${ep.name}`,
    image: movie.thumb_url ? (movie.thumb_url.startsWith('http') ? movie.thumb_url : `${IMG_CDN_URL}${movie.thumb_url}`) : undefined
  })) || [];

  return (
    <div className="flex-grow w-full flex flex-col">
      
      {/* Cinematic Banner Section */}
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[650px] flex flex-col justify-end overflow-hidden border-b border-white/5">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <Image
            src={`${IMG_CDN_URL}${movie.poster_url}`}
            alt={movie.name}
            fill
            className="object-cover opacity-60"
            priority
            unoptimized
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-black/20 z-0" />
        </div>

        {/* Banner Content */}
        <div className="relative z-20 px-4 sm:px-6 md:px-12 lg:px-20 pb-20 md:pb-44 w-full h-full flex flex-col justify-end">
          
          {/* Compact Quick Info Corner (Top Right) */}
          <div className="absolute bottom-8 right-4 sm:right-6 md:right-12 lg:right-20 flex flex-col gap-4 text-right">
             <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-mecha-accent/60 uppercase tracking-widest">Đánh giá</span>
                <div className="flex items-center gap-2 justify-end">
                  <Star size={14} className="text-mecha-accent" fill="currentColor" />
                  <span className="text-2xl font-black text-mecha-light">{(movie.tmdb?.vote_average || 0).toFixed(1)}</span>
                  <span className="text-gray-500 text-xs">/10</span>
                </div>
             </div>

             <div className="flex flex-col gap-0.5 max-w-[200px] sm:max-w-xs ml-auto">
                <span className="text-[10px] font-bold text-mecha-accent/60 uppercase tracking-widest">Thể loại</span>
                <p className="text-xs text-mecha-light/80 font-medium">
                  {movie.category.map(c => c.name).join(" • ")}
                </p>
             </div>

             <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-mecha-accent/60 uppercase tracking-widest">Quốc gia</span>
                <p className="text-xs text-mecha-light/80 font-medium">{movie.country.map(c => c.name).join(", ")}</p>
             </div>

             <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-mecha-accent/60 uppercase tracking-widest">Đạo diễn</span>
                <p className="text-xs text-mecha-light/80 font-medium">{movie.director.join(", ") || "Đang cập nhật"}</p>
             </div>

             <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-mecha-accent/60 uppercase tracking-widest">Phát hành</span>
                <p className="text-xs text-mecha-light/80 font-medium">{movie.year}</p>
             </div>

             {movie.actor && movie.actor.length > 0 && movie.actor[0] !== "" && (
              <div className="flex flex-col gap-1 max-w-[200px] sm:max-w-xs ml-auto border-t border-white/10 pt-3">
                <span className="text-[10px] font-bold text-mecha-accent/60 uppercase tracking-widest">Diễn viên</span>
                <div className="text-[11px] text-gray-400 leading-tight">
                  {movie.actor.slice(0, 5).map((a, i) => (
                    <React.Fragment key={i}>
                      <Link href={`/search?q=${encodeURIComponent(a)}`} className="hover:text-mecha-accent transition-colors">
                        {a}
                      </Link>
                      {i < Math.min(movie.actor.length, 5) - 1 && <span className="mx-1 opacity-20">•</span>}
                    </React.Fragment>
                  ))}
                  {movie.actor.length > 5 && <span className="opacity-30">...</span>}
                </div>
              </div>
            )}
          </div>

          <div className="max-w-4xl">
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-mecha-light tracking-tighter mb-3 uppercase italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                {movie.name}
             </h1>
             <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="h-1 w-12 bg-mecha-accent block" />
                  <p className="text-xl md:text-2xl text-mecha-accent font-bold tracking-widest drop-shadow-md">{movie.origin_name}</p>
                </div>
                {/* Integrated Synopsis in Banner */}
                <div 
                  className="text-gray-300/90 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4 max-w-2xl drop-shadow-md mecha-content-html"
                  dangerouslySetInnerHTML={{ __html: movie.content }}
                />
             </div>
          </div>

        </div>
      </section>

      {/* Interaction & Details Grid */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Poster */}
          <div className="lg:col-span-4 flex flex-col gap-6 -mt-32 md:-mt-44 relative z-30">
            <div className="relative group w-full aspect-[2/3] clip-chamfer-tr-bl overflow-hidden border-2 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-mecha-surface">
              <div className="absolute inset-0 bg-gradient-to-t from-mecha-dark/80 via-transparent to-transparent z-10" />
              <Image 
                alt={movie.name} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                src={`${IMG_CDN_URL}${movie.thumb_url}`}
                fill
                unoptimized
              />
              {movie.time && movie.time.trim() !== "?" && movie.time !== "?" && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-mecha-light px-2 py-0.5 rounded text-[10px] font-bold z-10 border border-white/10 shadow-md">
            {movie.time}
          </div>
        )}
              <div className="absolute bottom-4 left-4 z-20">
                <span className="px-2 py-1 bg-mecha-accent text-mecha-dark text-xs font-bold uppercase tracking-wider">{movie.quality}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Section */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Play & Action Area */}
            <div className="flex flex-col md:flex-row gap-4">
              <Link href={watchUrl} className="flex-[2]">
                <ButtonChamfered variant="primary" className="h-16 w-full text-xl glow">
                  <Play size={28} fill="currentColor" /> PHÁT NGAY
                </ButtonChamfered>
              </Link>
              <div className="flex flex-1 gap-2">
                <ButtonChamfered variant="secondary" className="flex-1 h-16 py-3">
                   <Plus size={20} className="text-mecha-accent" />
                </ButtonChamfered>
                <ButtonChamfered variant="secondary" className="flex-1 h-16 py-3">
                   <Share2 size={20} className="text-mecha-accent" />
                </ButtonChamfered>
              </div>
            </div>

            {/* Episode List Integrated here (Hidden for single movies) */}
            {movie.type !== 'single' && episodeListData.length > 0 && (
              <div className="mt-4">
                <EpisodeList 
                  episodes={episodeListData}
                  activeEpisodeId=""
                  movieSlug={movie.slug}
                  currentServer={defaultServer.server_name}
                  maxHeight="350px"
                  episodeCurrent={movie.episode_current}
                  episodeTotal={movie.episode_total}
                />
              </div>
            )}

            {/* Trailer Button */}
            {movie.trailer_url && (
              <Link href={movie.trailer_url} target="_blank" rel="noopener noreferrer">
                <ButtonChamfered variant="secondary" className="w-full h-12 py-3 text-xs hover:border-red-500/50 hover:text-red-400 transition-colors">
                  <Youtube size={16} className="text-red-500 mr-2" /> Xem Trailer
                </ButtonChamfered>
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
