import { notFound } from 'next/navigation';
import { ThumbsUp, Plus, Share2, FileText } from 'lucide-react';
import { getMovieDetails, IMG_CDN_URL } from '@/lib/api';
import { ButtonChamfered } from '@/components/ui/ButtonChamfered';
import { EpisodeList } from '@/components/ui/EpisodeList';
import { ServerSelector } from '@/components/ui/ServerSelector';
import { CommentSection } from '@/components/ui/CommentSection';
import { VideoPlayer } from '@/components/ui/VideoPlayer';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ server?: string; tap?: string }>;
};

export default async function WatchPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const data = await getMovieDetails(params.id);
  
  if (!data || !data.movie || !data.episodes) {
    notFound();
  }

  const { movie, episodes } = data;

  // Find active server
  const activeServerSlug = searchParams.server || episodes[0]?.server_name || '';
  const currentServer = episodes.find(s => s.server_name === activeServerSlug) || episodes[0];

  // Find active episode
  const episodeSlug = searchParams.tap || currentServer?.server_data[0]?.slug || '';
  const currentEpisode = currentServer?.server_data.find(e => e.slug === episodeSlug) || currentServer?.server_data[0];

  if (!currentServer || !currentEpisode) {
    notFound();
  }

  // Find active episode index to get title properly (often Ophim names them "Tập 1", "Tập 2")
  const episodeName = currentEpisode.name;

  return (
    <div className="flex-1 w-full py-10 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col gap-6">
      
      {/* VIDEO PLAYER AREA */}
      <VideoPlayer
        src={currentEpisode.link_m3u8 || ''}
        fallbackEmbed={currentEpisode.link_embed}
        poster={movie.poster_url ? `${IMG_CDN_URL}${movie.poster_url}` : undefined}
        title={`${movie.name} - Tập ${episodeName}`}
      />

      {/* VIDEO INFO HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-mecha-accent text-mecha-dark tracking-wider">MỚI</span>
            {movie.quality && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-gray-300 border border-white/10 tracking-wider uppercase">{movie.quality}</span>}
            {movie.lang && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-gray-300 border border-white/10 tracking-wider">{movie.lang}</span>}
          </div>
          <h1 className="text-3xl font-black text-mecha-light mb-1 uppercase tracking-tight">{movie.name}</h1>
          <p className="text-gray-400 text-lg font-medium">{movie.origin_name} - <span className="text-gray-200">Tập {episodeName}</span></p>
        </div>
        
        <div className="flex gap-3">
          <ButtonChamfered variant="secondary" className="px-6 py-2 text-sm">
             <ThumbsUp size={18} /> Thích
          </ButtonChamfered>
          <ButtonChamfered variant="secondary" className="px-6 py-2 text-sm">
             <Plus size={18} /> Lưu lại
          </ButtonChamfered>
          <ButtonChamfered variant="secondary" className="px-6 py-2 text-sm">
             <Share2 size={18} /> Chia sẻ
          </ButtonChamfered>
        </div>
      </div>

      {/* COCKPIT PANELS (ACCORDIONS) */}
      <div className="flex flex-col gap-3">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Danh sách tập */}
          <EpisodeList 
            episodes={currentServer.server_data.map(ep => ({
              id: ep.slug,
              ep: ep.name,
              time: "N/A", // Ophim API doesn't provide episode duration
              title: `Tập ${ep.name}`,
              image: movie.thumb_url ? (movie.thumb_url.startsWith('http') ? movie.thumb_url : `${IMG_CDN_URL}${movie.thumb_url}`) : undefined
            }))}
            activeEpisodeId={currentEpisode.slug}
            movieSlug={movie.slug}
            currentServer={currentServer.server_name}
          />

          {/* Trình tự Server */}
          <ServerSelector 
            servers={episodes.map(s => ({
              id: s.server_name,
              name: s.server_name
            }))}
            activeServerId={currentServer.server_name}
            movieSlug={movie.slug}
            currentEpisode={currentEpisode.slug}
          />
        </div>

        {/* Nội dung phim */}
        <div className="bg-mecha-surface/40 border border-white/5 rounded-lg overflow-hidden flex flex-col mt-4">
           <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
             <div className="flex items-center gap-3">
               <FileText className="text-mecha-accent" size={20} />
               <h3 className="text-mecha-light text-sm uppercase tracking-widest font-bold">Nội dung phim</h3>
             </div>
           </div>
           
           <div className="p-6 bg-mecha-dark/30">
              <div 
                className="text-gray-300 leading-relaxed max-w-4xl text-lg mecha-content-html"
                dangerouslySetInnerHTML={{ __html: movie.content }}
              />
              
              <div className="flex flex-wrap gap-12 mt-8">
                 <div>
                    <span className="block text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Thể loại</span>
                    <span className="text-sm text-gray-200 font-medium">{movie.category.map(c => c.name).join(", ")}</span>
                 </div>
                 <div>
                    <span className="block text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Qốc gia</span>
                    <span className="text-sm text-gray-200 font-medium">{movie.country.map(c => c.name).join(", ")}</span>
                 </div>
                 <div>
                    <span className="block text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Năm SX</span>
                    <span className="text-sm text-gray-200 font-medium">{movie.year}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Bình luận */}
        <CommentSection commentCount={342} />

      </div>
    </div>
  );
}
