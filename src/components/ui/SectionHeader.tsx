import { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function SectionHeader({ 
  children, 
  rightContent, 
  icon,
  className 
}: { 
  children: ReactNode; 
  rightContent?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <h3 className="text-mecha-light text-xl font-bold uppercase tracking-widest flex items-center gap-3">
        {icon ? icon : <span className="w-6 h-[2px] bg-mecha-accent" />} 
        {children}
      </h3>
      {rightContent}
    </div>
  );
}
