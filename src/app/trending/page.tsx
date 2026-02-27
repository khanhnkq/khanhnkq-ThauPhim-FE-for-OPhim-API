import { getLatestMovies, IMG_CDN_URL } from '@/lib/api';
import { MovieCard } from '@/components/ui/MovieCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default async function TrendingPage() {
  const movies = await getLatestMovies(1); 
  
  // Sort movies by view count descending or some dummy logic for trending.
  // Using default latest fetch as a placeholder for trending data.
  const trendingMovies = movies.slice(0, 15);

  return (
    <div className="flex-grow w-full py-10 px-4 sm:px-6 md:px-12 lg:px-20 border-b border-white/5">
      <SectionHeader>
        Phim Thịnh Hành 
      </SectionHeader>
      
      {trendingMovies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-8">
           {trendingMovies.map((movie) => (
             <MovieCard 
               key={movie._id}
               title={movie.name}
               img={`${IMG_CDN_URL}${movie.thumb_url}`}
               slug={movie.slug}
               originName={movie.origin_name}
               lang={movie.lang}
               episode_current={movie.episode_current}
               chamfer="tr-bl"
             />
           ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-20 mt-8 bg-mecha-surface/40 border border-white/5 rounded-lg clip-chamfer-tr-bl text-center">
          <p className="text-2xl font-black text-mecha-light uppercase tracking-widest mb-4">KHÔNG CÓ DỮ LIỆU</p>
          <p className="text-gray-400 max-w-md">Danh sách phim thịnh hành hiện đang trống.</p>
        </div>
      )}
    </div>
  );
}
