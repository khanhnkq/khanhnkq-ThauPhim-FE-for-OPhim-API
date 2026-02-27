import { MovieCardSkeleton, RankCardSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { TrendingUp, Play, Trophy } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full flex flex-col flex-1 overflow-x-hidden bg-background">
      {/* HERO CAROUSEL SKELETON */}
      <section className="relative w-full min-h-[500px] lg:min-h-[700px] flex flex-col justify-end overflow-hidden border-b border-mecha-surface bg-mecha-dark/50 p-6 md:p-12 lg:p-20">
        <Skeleton className="absolute inset-0 bg-white/5" />
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative z-10 max-w-[1000px] flex flex-col gap-6">
          <Skeleton className="h-6 w-32 bg-mecha-accent/20" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-16 md:h-24 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-20 w-full max-w-2xl mt-4" />
          <div className="flex gap-4 mt-8">
            <Skeleton className="h-12 w-40 rounded clip-chamfer-tl-br" />
            <Skeleton className="h-12 w-40 rounded clip-chamfer-tl-br" />
          </div>
        </div>
      </section>

      {/* PHIM MỚI CẬP NHẬT SKELETON */}
      <section className="w-full py-10 px-4 sm:px-6 md:px-12 lg:px-20 border-b border-white/5">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-8 w-64 mb-4" />
          <div className="flex gap-3 sm:gap-4 overflow-x-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <MovieCardSkeleton key={`new-${i}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT GRID + RANKING SIDEBAR SKELETON */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-10 sm:py-12 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="lg:col-span-8 flex flex-col gap-12">
          {/* PHIM BỘ THỊNH HÀNH SKELETON */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-mecha-accent/40 w-5 h-5" />
              <Skeleton className="h-8 w-48" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <MovieCardSkeleton key={`series-${i}`} />
              ))}
            </div>
          </section>

          {/* PHIM LẺ NỔI BẬT SKELETON */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Play className="text-mecha-accent/40 w-5 h-5" />
              <Skeleton className="h-8 w-48" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <MovieCardSkeleton key={`single-${i}`} />
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR SKELETON */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Trophy className="text-mecha-accent/40 w-5 h-5" />
              <Skeleton className="h-8 w-40" />
            </div>
            
            <div className="flex flex-col gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <RankCardSkeleton key={`rank-${i}`} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
