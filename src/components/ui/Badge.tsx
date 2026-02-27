import { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function SectionBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-mecha-accent font-bold text-sm tracking-widest uppercase">{children}</span>
      <div className="h-[1px] flex-1 bg-white/10" />
    </div>
  );
}

export function LiveBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1 bg-mecha-accent/10 border border-mecha-accent/30 rounded w-fit backdrop-blur-sm", className)}>
      <span className="w-2 h-2 rounded-full bg-mecha-accent animate-pulse" />
      <span className="text-mecha-accent text-xs font-bold uppercase tracking-widest">{children}</span>
    </div>
  );
}
