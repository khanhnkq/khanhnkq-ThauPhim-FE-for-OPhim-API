import { getSeriesMovies, IMG_CDN_URL } from '@/lib/api';
import { MovieCard } from '@/components/ui/MovieCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default async function SeriesPage() {
  const series = await getSeriesMovies(1);
  
  return (
    <div className="flex-grow w-full py-10 px-4 sm:px-6 md:px-12 lg:px-20 border-b border-white/5">
      <SectionHeader>
        Danh Sách TV Series
      </SectionHeader>
      
      {series.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-8">
           {series.map((movie) => (
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
          <p className="text-2xl font-black text-mecha-light uppercase tracking-widest mb-4">KHÔNG TÌM THẤY SERIES</p>
          <p className="text-gray-400 max-w-md">Xin lỗi, hiện chưa có dữ liệu cho phần TV Series.</p>
        </div>
      )}
    </div>
  );
}
