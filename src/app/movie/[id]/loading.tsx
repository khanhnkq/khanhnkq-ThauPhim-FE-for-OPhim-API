import { Skeleton } from "@/components/ui/Skeleton";

export default function MovieDetailLoading() {
  return (
    <div className="flex-grow w-full flex flex-col">
      {/* Cinematic Banner Skeleton */}
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[650px] flex flex-col justify-end overflow-hidden border-b border-mecha-surface bg-mecha-dark/50 p-6 md:p-12 lg:p-20">
        <Skeleton className="absolute inset-0 bg-white/5" />
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative z-10 max-w-4xl flex flex-col gap-4 pb-12">
          <Skeleton className="h-16 md:h-24 w-3/4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-1 w-12 bg-mecha-accent/20" />
            <Skeleton className="h-8 md:h-10 w-1/2" />
          </div>
          <Skeleton className="h-24 w-full mt-4" />
        </div>
      </section>

      {/* Interaction & Details Grid Skeleton */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Poster Skeleton */}
          <div className="lg:col-span-4 flex flex-col gap-6 -mt-32 md:-mt-44 relative z-30">
            <Skeleton className="w-full aspect-[2/3] clip-chamfer-tr-bl border-2 border-transparent bg-mecha-surface/50" />
          </div>

          {/* Right Column: Interaction Section Skeleton */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex flex-wrap gap-4 items-center">
              <Skeleton className="h-14 w-40 rounded clip-chamfer-tl-br" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            <div className="w-full">
              <Skeleton className="h-8 w-48 mb-4 border-l-4 border-mecha-accent/20 pl-4" />
              <div className="flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={`ep-${i}`} className="h-16 w-full rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
