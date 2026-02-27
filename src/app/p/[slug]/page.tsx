import { getMoviesByFilter, IMG_CDN_URL } from '@/lib/api';
import { MovieCard } from '@/components/ui/MovieCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Pagination } from '@/components/ui/Pagination';
import { FilterBar } from '@/components/ui/FilterBar';

// ── Slug → Display title ────────────────────
const TITLE_MAP: Record<string, string> = {
  'phim-moi': 'Phim Mới Cập Nhật',
  'phim-bo': 'Phim Bộ',
  'phim-le': 'Phim Lẻ',
  'phim-sap-chieu': 'Phim Sắp Chiếu',
  'hoat-hinh': 'Hoạt Hình',
  'tv-shows': 'TV Shows',
  // Categories
  'hanh-dong': 'Phim Hành Động',
  'tinh-cam': 'Phim Tình Cảm',
  'vien-tuong': 'Phim Viễn Tưởng',
  'kinh-di': 'Phim Kinh Dị',
  'hai-huoc': 'Phim Hài Hước',
  'tam-ly': 'Phim Tâm Lý',
  'co-trang': 'Phim Cổ Trang',
  'chien-tranh': 'Phim Chiến Tranh',
  'phieu-luu': 'Phim Phiêu Lưu',
  'am-nhac': 'Phim Âm Nhạc',
  'gia-dinh': 'Phim Gia Đình',
  'the-thao': 'Phim Thể Thao',
  'bi-an': 'Phim Bí Ẩn',
  'hinh-su': 'Phim Hình Sự',
  'vo-thuat': 'Phim Võ Thuật',
  'khoa-hoc': 'Phim Khoa Học',
  'than-thoai': 'Phim Thần Thoại',
  'chinh-kich': 'Phim Chính Kịch',
  // Countries
  'han-quoc': 'Phim Hàn Quốc',
  'trung-quoc': 'Phim Trung Quốc',
  'nhat-ban': 'Phim Nhật Bản',
  'au-my': 'Phim Âu Mỹ',
  'thai-lan': 'Phim Thái Lan',
  'dai-loan': 'Phim Đài Loan',
  'hong-kong': 'Phim Hồng Kông',
  'an-do': 'Phim Ấn Độ',
  'anh': 'Phim Anh',
  'phap': 'Phim Pháp',
  'duc': 'Phim Đức',
  'viet-nam': 'Phim Việt Nam',
};

function formatTitle(slug: string): string {
  return TITLE_MAP[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ── Page ─────────────────────────────────────

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function FilterPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const slug = params.slug;
  const currentPage = Number(searchParams.page) || 1;
  const { items: movies, totalPages } = await getMoviesByFilter(slug, currentPage);
  const title = formatTitle(slug);

  return (
    <div className="flex-grow w-full py-10 px-4 sm:px-6 md:px-12 lg:px-20 border-b border-white/5">
      <SectionHeader>
        {title} <span className="text-mecha-light opacity-50 text-sm ml-2">Trang {currentPage}</span>
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
                 chamfer="tr-bl"
                 time={movie.time}
                 className="w-full"
               />
             ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/p/${slug}`}
            maxVisible={7}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-20 mt-8 bg-mecha-surface/40 border border-white/5 rounded-lg clip-chamfer-tr-bl text-center">
          <p className="text-2xl font-black text-mecha-light uppercase tracking-widest mb-4">KHÔNG CÓ DỮ LIỆU</p>
          <p className="text-gray-400 max-w-md">Không tìm thấy phim nào cho danh mục này.</p>
        </div>
      )}
    </div>
  );
}
