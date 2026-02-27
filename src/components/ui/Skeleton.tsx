import { cn } from "@/utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white/10", className)}
      {...props}
    />
  );
}

export { Skeleton };

export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 w-[140px] sm:w-[180px] md:w-[200px] shrink-0">
      <Skeleton className="w-full aspect-[2/3] clip-chamfer-tr-bl border-2 border-transparent relative overflow-hidden">
        {/* Inner shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </Skeleton>
      <Skeleton className="h-4 w-3/4 mt-2" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export function RankCardSkeleton() {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-white/5">
      <Skeleton className="w-8 h-10 shrink-0 bg-mecha-accent/20" />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="w-8 h-8 rounded-full" />
    </div>
  );
}
