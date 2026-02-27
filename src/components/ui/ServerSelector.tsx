'use client';

import { Radio } from 'lucide-react';
import Link from 'next/link';
import { buildWatchUrl } from '@/utils/watchUrl';

export interface Server {
  id: string;
  name: string;
  isMain?: boolean;
}

interface ServerSelectorProps {
  servers: Server[];
  activeServerId: string;
  movieSlug: string;
  currentEpisode: string;
}

export function ServerSelector({ servers, activeServerId, movieSlug, currentEpisode }: ServerSelectorProps) {
  return (
    <div className="bg-mecha-surface/40 border border-white/5 rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-3">
          <Radio className="text-mecha-accent" size={20} />
          <h3 className="text-mecha-light text-sm uppercase tracking-widest font-bold">Nguồn phát (Servers)</h3>
        </div>
      </div>
      
      <div className="p-4 bg-mecha-dark/30 flex-1">
        <div className="grid grid-cols-2 gap-3">
          {servers.map((server) => {
            const isActive = server.id === activeServerId;

            if (isActive) {
              return (
                <div 
                  key={server.id} 
                  className="group relative bg-mecha-dark border-l-4 border-mecha-accent p-3 flex items-center justify-between hover:bg-white/5 transition-all clip-chamfer-tl"
                >
                  <span className="font-bold text-mecha-light transition-colors text-sm">{server.name}</span>
                  <div className="w-2 h-2 rounded-full bg-mecha-accent animate-pulse" />
                </div>
              );
            }

            return (
              <Link 
                key={server.id} 
                href={buildWatchUrl(movieSlug, { episodeSlug: currentEpisode, serverName: server.id })}
                className="block group relative bg-mecha-dark border-l-4 border-transparent hover:border-gray-500 p-3 flex items-center justify-between hover:bg-white/5 transition-all clip-chamfer-tl cursor-pointer"
              >
                <span className="font-bold text-gray-400 group-hover:text-mecha-light transition-colors text-sm">{server.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
