import { getMoviesByFilter, IMG_CDN_URL } from '@/lib/api';
import { MovieCard } from '@/components/ui/MovieCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FilterBar } from '@/components/ui/FilterBar';
import { Pagination } from '@/components/ui/Pagination';

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function MoviesPage(props: Props) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const { items: movies, totalPages } = await getMoviesByFilter('phim-moi', currentPage);

  return (
    <div className="flex-grow w-full py-10 px-4 sm:px-6 md:px-12 lg:px-20 border-b border-white/5">
      <SectionHeader>
        Danh Sách Phim Mới <span className="text-mecha-light opacity-50 text-sm ml-2">Trang {currentPage}</span>
      </SectionHeader>

      <div className="mt-8">
        <FilterBar />
      </div>
      
      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 mt-8">
             {movies.map((movie) => (
               <MovieCard 
                 key={movie._id} 
              title={movie.name} 
              img={`${IMG_CDN_URL}${movie.thumb_url}`} 
              slug={movie.slug}
              originName={movie.origin_name}
              lang={movie.lang}
              episode_current={movie.episode_current}
              time={movie.time}
              chamfer="tl-br"
                  className="w-full"
               />
             ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/movies"
            maxVisible={7}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-20 mt-8 bg-mecha-surface/40 border border-white/5 rounded-lg clip-chamfer-tr-bl text-center">
          <p className="text-2xl font-black text-mecha-light uppercase tracking-widest mb-4">KHÔNG CÓ DỮ LIỆU</p>
          <p className="text-gray-400 max-w-md">Đã tải hết danh sách phim hoặc có lỗi kết nối.</p>
        </div>
      )}
    </div>
  );
}
