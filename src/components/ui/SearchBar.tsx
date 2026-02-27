'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/utils/cn';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={cn(
        "relative flex items-center bg-white/5 border border-white/10 clip-chamfer-tl transition-all overflow-hidden",
        "focus-within:border-mecha-accent/50 focus-within:bg-black/40 focus-within:ring-1 focus-within:ring-mecha-accent/20",
        "w-full max-w-sm hidden md:flex"
      )}
    >
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm kiếm phim..." 
        className="w-full bg-transparent text-sm text-mecha-light placeholder-gray-500 py-2 px-4 outline-none"
      />
      <button 
        type="submit" 
        className="px-4 text-gray-400 hover:text-mecha-accent transition-colors"
        aria-label="Search"
      >
        <Search size={18} />
      </button>
    </form>
  );
}
