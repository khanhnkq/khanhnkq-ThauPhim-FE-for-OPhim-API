import { Loader2 } from 'lucide-react';

export default function WatchLoading() {
  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 py-4 md:px-6 md:py-6 flex flex-col gap-6 animate-pulse">
      
      {/* Video Player Skeleton */}
      <div className="relative w-full aspect-video bg-mecha-surface/60 rounded-lg overflow-hidden flex items-center justify-center">
        <Loader2 className="text-mecha-accent animate-spin" size={48} />
      </div>

      {/* Title Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/10">
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="w-10 h-5 bg-white/10 rounded" />
            <div className="w-8 h-5 bg-white/10 rounded" />
            <div className="w-14 h-5 bg-white/10 rounded" />
          </div>
          <div className="h-8 w-64 bg-white/10 rounded" />
          <div className="h-5 w-48 bg-white/5 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="w-24 h-10 bg-white/5 rounded" />
          <div className="w-24 h-10 bg-white/5 rounded" />
          <div className="w-24 h-10 bg-white/5 rounded" />
        </div>
      </div>

      {/* Episode & Server Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-mecha-surface/40 border border-white/5 rounded-lg h-48" />
        <div className="bg-mecha-surface/40 border border-white/5 rounded-lg h-48" />
      </div>
    </div>
  );
}
