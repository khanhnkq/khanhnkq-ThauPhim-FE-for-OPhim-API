import { advancedSearchMovies, IMG_CDN_URL } from '@/lib/api';
import { MovieCard } from '@/components/ui/MovieCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FilterBar } from '@/components/ui/FilterBar';
import { Pagination } from '@/components/ui/Pagination';

type Props = {
  searchParams: Promise<{ 
    q?: string, 
    category?: string, 
    country?: string, 
    year?: string, 
    type?: string,
    sortField?: string,
    sortType?: string,
    page?: string 
  }>;
};

export default async function SearchPage(props: Props) {
  const searchParams = await props.searchParams;
  const q = searchParams.q || '';
  const category = searchParams.category || '';
  const country = searchParams.country || '';
  const year = searchParams.year || '';
  const type = searchParams.type || '';
  const sortField = searchParams.sortField || 'modified';
  const sortType = searchParams.sortType || 'desc';
  const page = Number(searchParams.page) || 1;

  const result = await advancedSearchMovies({
    keyword: q,
    category,
    country,
    year,
    type,
    sortField,
    sortType,
    page
  });
  
  const searchResults = result.items || [];
  const totalPages = result.totalPages || 1;

  return (
    <div className="flex-grow w-full py-10 px-4 sm:px-6 md:px-12 lg:px-20 border-b border-white/5">
      <SectionHeader>
        {q ? (
          <>Kết quả tìm kiếm cho: <span className="text-mecha-light uppercase">{q}</span></>
        ) : (
          <>Kết quả Lọc Phim</>
        )}
      </SectionHeader>
      
      <div className="mt-8">
        <FilterBar />
      </div>

      {searchResults.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-8">
             {searchResults.map((movie) => (
               <MovieCard 
                 key={movie._id}
                 title={movie.name}
                 img={`${IMG_CDN_URL}${movie.thumb_url}`}
                 slug={movie.slug}
                 originName={movie.origin_name}
                 lang={movie.lang}
                 episode_current={movie.episode_current}
                 chamfer="tr-bl"
                 time={movie.time}
                 className="w-full"
               />
             ))}
          </div>

          <Pagination 
            currentPage={page} 
            totalPages={totalPages > 0 ? totalPages : 1} 
            basePath="/search" 
            searchParams={{ q, category, country, year, type, sortField, sortType }}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-20 mt-8 bg-mecha-surface/40 border border-white/5 rounded-lg clip-chamfer-tr-bl text-center">
          <p className="text-2xl font-black text-mecha-light uppercase tracking-widest mb-4">KHÔNG TÌM THẤY DỮ LIỆU</p>
          <p className="text-gray-400 max-w-md">Không có mục nào khớp với tìm kiếm của bạn. Hãy thử dùng các từ khóa khác.</p>
        </div>
      )}
    </div>
  );
}
