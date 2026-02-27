import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  chamfer?: 'tr-bl' | 'tl';
  className?: string;
}

export function ButtonChamfered({
  children,
  variant = 'primary',
  chamfer = 'tr-bl',
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all relative group overflow-hidden';
  
  const variants = {
    primary: 'bg-mecha-accent text-mecha-dark hover:bg-yellow-400 shadow-[0_0_20px_rgba(254,201,61,0.4)] transform hover:-translate-y-0.5',
    secondary: 'bg-mecha-surface/80 hover:bg-mecha-surface backdrop-blur-md border border-white/20 text-mecha-light',
    outline: 'bg-transparent border border-mecha-accent text-mecha-accent hover:bg-mecha-accent hover:text-mecha-dark duration-300'
  };

  const chamfers = {
    'tr-bl': 'clip-chamfer-tr-bl',
    'tl': 'clip-chamfer-tl'
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], chamfers[chamfer], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'outline' && (
        <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-mecha-accent transition-transform duration-300 ease-out z-0" />
      )}
    </button>
  );
}
