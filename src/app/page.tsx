import { Star, TrendingUp, Play, Trophy, Tv } from 'lucide-react';
import { HeroCarousel } from '@/components/ui/HeroCarousel';
import { MovieCard } from '@/components/ui/MovieCard';
import { RankCard } from '@/components/ui/RankCard';
import { getLatestMovies, getSeriesMovies, getSingleMovies, getMovieDetails, getMoviesByFilter, getMoviesByCountry, IMG_CDN_URL } from '@/lib/api';
import { HorizontalSection } from '@/components/ui/HorizontalSection';
import type { OphimMovieDetails } from '@/types/movie.types';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonChamfered } from '@/components/ui/ButtonChamfered';

export default async function Home() {
  // Fetch initial lists
  const [latestMoviesRaw, seriesMovies, singleMovies, animeResult, krResult, cnResult, thResult] = await Promise.all([
    getLatestMovies(1),
    getSeriesMovies(1),
    getSingleMovies(1),
    getMoviesByFilter('hoat-hinh', 1).catch(() => ({ items: [] })),
    getMoviesByCountry('han-quoc', 1).catch(() => []),
    getMoviesByCountry('trung-quoc', 1).catch(() => []),
    getMoviesByCountry('thai-lan', 1).catch(() => [])
  ]);

  // Enrich the first 10 movies for the HeroCarousel with full details (for synopsis/content)
  const carouselMoviesRaw = latestMoviesRaw.slice(0, 10);
  const carouselMoviesDetails = await Promise.all(
    carouselMoviesRaw.map(m => getMovieDetails(m.slug))
  );

  // Filter out nulls and extract movie data
  const carouselMovies = carouselMoviesDetails
    .filter((d): d is OphimMovieDetails => d !== null && !!d.movie)
    .map(d => d.movie);

  const latestMovies = latestMoviesRaw;
  const animeMovies = animeResult?.items || [];
  const krMovies = Array.isArray(krResult) ? krResult : [];
  const cnMovies = Array.isArray(cnResult) ? cnResult : [];
  const thMovies = Array.isArray(thResult) ? thResult : [];

  return (
    <div className="w-full flex flex-col flex-1 overflow-x-hidden bg-background">
      {/* HERO CAROUSEL */}
      <HeroCarousel movies={carouselMovies} />

      {/* PHIM MỚI CẬP NHẬT */}
      <section className="w-full py-10 px-4 sm:px-6 md:px-12 lg:px-20 border-b border-white/5">
        <div className="flex flex-col gap-6">
          <SectionHeader 
            rightContent={
              <Link href="/p/phim-moi" className="text-xs text-mecha-accent font-bold tracking-widest uppercase hover:underline">
                Xem tất cả
              </Link>
            }
          >
            Phim mới cập nhật
          </SectionHeader>
          
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
            {latestMovies.slice(0, 15).map((movie) => (
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
              className="min-w-[140px] sm:min-w-[180px] md:min-w-[200px]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* NATION HORIZONTAL SECTIONS */}
      <section className="w-full py-12 px-4 sm:px-6 md:px-12 lg:px-20 border-b border-white/5 bg-mecha-surface/20 flex flex-col gap-16">
        <HorizontalSection 
          title={<>Phim <span className="text-[#e2b7e2]">Hàn Quốc</span> mới</>}
          viewAllLink="/quoc-gia/han-quoc"
          movies={krMovies}
        />
        <HorizontalSection 
          title={<>Phim <span className="text-[#ffe0b2]">Trung Quốc</span> mới</>}
          viewAllLink="/quoc-gia/trung-quoc"
          movies={cnMovies}
        />
        <HorizontalSection 
          title={<>Phim <span className="text-[#f48fb1]">Thái Lan</span> mới</>}
          viewAllLink="/quoc-gia/thai-lan"
          movies={thMovies}
        />
      </section>

      {/* CONTENT GRID + RANKING SIDEBAR */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-10 sm:py-12 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          {/* PHIM BỘ THỊNH HÀNH */}
          <section className="flex flex-col gap-6">
            <SectionHeader 
               icon={<TrendingUp className="text-mecha-accent w-5 h-5" />}
               rightContent={
                <Link href="/p/phim-bo" className="text-xs text-gray-500 hover:text-mecha-accent font-bold tracking-widest uppercase">
                  Xem tất cả
                </Link>
              }
            >
              Phim bộ mới nhất
            </SectionHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {seriesMovies.slice(0, 8).map((movie) => (
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
          </section>

          {/* PHIM LẺ NỔI BẬT */}
          <section className="flex flex-col gap-6">
            <SectionHeader 
               icon={<Play className="text-mecha-accent w-5 h-5" />}
               rightContent={
                <Link href="/p/phim-le" className="text-xs text-gray-500 hover:text-mecha-accent font-bold tracking-widest uppercase">
                  Xem tất cả
                </Link>
              }
            >
              Phim lẻ đặc sắc
            </SectionHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {singleMovies.slice(0, 8).map((movie) => (
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
          </section>

          {/* HOẠT HÌNH */}
          <section className="flex flex-col gap-6">
            <SectionHeader 
               icon={<Tv className="text-mecha-accent w-5 h-5" />}
               rightContent={
                <Link href="/p/hoat-hinh" className="text-xs text-gray-500 hover:text-mecha-accent font-bold tracking-widest uppercase">
                  Xem tất cả
                </Link>
              }
            >
              Anime & Hoạt Hình
            </SectionHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {animeMovies.slice(0, 8).map((movie) => (
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
          </section>

        </div>

        {/* SIDEBAR: RANKING — stacks below content on mobile */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <section className="flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 border-b border-mecha-accent/30 pb-4">
              <Trophy className="text-mecha-accent w-5 h-5" />
              <h3 className="text-mecha-light text-xl font-black uppercase tracking-wider">BXH Hôm Nay</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              {latestMovies.slice(0, 8).map((movie, i) => (
                <RankCard 
                  key={movie._id}
                  rank={i + 1}
                  title={movie.name}
                  genre={`${movie.year} • ${movie.lang || 'HD'}`}
                  rating={(movie.tmdb?.vote_average || 8.5).toFixed(1)}
                  slug={movie.slug}
                  image={`${IMG_CDN_URL}${movie.thumb_url}`}
                />
              ))}
            </div>

            {/* THAOPHIM VIP CALLOUT */}
            <div className="relative overflow-hidden p-6 clip-chamfer-tl-br bg-gradient-to-br from-mecha-accent/20 to-black border border-mecha-accent/30 group">
              <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Nms4Nno5eW93ZzBpZXJqeXN0eW54Mmh5NHVxdzV6ZnVqeXV3Yml0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKL5Wf7U6y8gGzm/giphy.gif')] opacity-10 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Star fill="currentColor" className="text-[#fec93d] w-5 h-5 shadow-[0_0_10px_rgba(254,201,61,0.8)]" />
                  <span className="text-[#fec93d] font-black tracking-widest uppercase">THAUPHIM VIP</span>
                </div>
                <p className="text-white text-sm font-medium">Không quảng cáo, độ phân giải 4K sắc nét.</p>
                <ButtonChamfered variant="primary" className="h-10 text-xs py-0 px-4 mt-2">Nâng cấp ngay</ButtonChamfered>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* BOTTOM BANNER */}
      <section className="w-full py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-mecha-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mecha-accent/5 blur-3xl rounded-full translate-y-1/2 opacity-30" />
        <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
          <SectionHeader className="justify-center items-center text-center w-full">Trải nghiệm xem phim đỉnh cao</SectionHeader>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            ThauPhim không chỉ là nơi xem phim, đó là một không gian giải trí riêng biệt được tối ưu hóa cho những trái tim yêu điện ảnh.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
             <ButtonChamfered variant="secondary" className="px-8 h-11 text-sm">Tìm hiểu thêm</ButtonChamfered>
             <ButtonChamfered variant="primary" className="px-8 h-11 text-sm">Tham gia cộng đồng</ButtonChamfered>
          </div>
        </div>
      </section>
    </div>
  );
}
