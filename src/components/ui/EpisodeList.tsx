'use client';

import { Play, ListOrdered } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { buildWatchUrl } from '@/utils/watchUrl';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export interface Episode {
  id: string;
  ep: string;
  title: string;
  image?: string;
}

interface EpisodeListProps {
  episodes: Episode[];
  activeEpisodeId: string;
  movieSlug: string;
  currentServer: string;
  maxHeight?: string;
  episodeCurrent?: string;
  episodeTotal?: string;
}

export function EpisodeList({ 
  episodes, 
  activeEpisodeId, 
  movieSlug, 
  currentServer, 
  maxHeight = "400px",
  episodeCurrent,
  episodeTotal 
}: EpisodeListProps) {
  return (
    <div className="bg-mecha-surface/40 border border-white/5 rounded-lg overflow-hidden flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-white/5 bg-white/5 gap-2">
        <div className="flex items-center gap-3">
          <ListOrdered className="text-mecha-accent" size={20} />
          <h3 className="text-mecha-light text-sm uppercase tracking-widest font-bold">Danh sách tập</h3>
        </div>
        {(episodeCurrent || episodeTotal) && (
          <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-400">
            {episodeCurrent && (
              <span className="flex items-center gap-1">
                TRẠNG THÁI: <span className="text-mecha-light bg-white/5 px-2 py-0.5 rounded clip-chamfer-tr-bl">{episodeCurrent}</span>
              </span>
            )}
            {episodeTotal && (
              <span className="flex items-center gap-1">
                TỔNG SỐ TẬP: <span className="text-mecha-light bg-white/5 px-2 py-0.5 rounded clip-chamfer-tr-bl">{episodeTotal}</span>
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-mecha-dark/30 flex-1">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-2 scrollbar-custom"
          style={{ maxHeight }}
        >
          
          {episodes.map((ep) => {
            const isActive = ep.id === activeEpisodeId;
            
            if (isActive) {
              return (
                <motion.div variants={itemVariants} key={ep.id}>
                  <div 
                    className="relative bg-mecha-accent text-mecha-dark p-3 clip-chamfer-tr-bl hover:bg-yellow-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(254,201,61,0.2)] h-full"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-16 h-10 bg-black/20 rounded overflow-hidden shrink-0 relative flex items-center justify-center border border-mecha-dark/50">
                        {ep.image ? (
                          <img 
                            src={ep.image} 
                            alt={`Tập ${ep.ep}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Play size={16} fill="currentColor" />
                        )}
                        <div className="absolute inset-0 bg-mecha-accent/20" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="font-bold text-sm">Tập {ep.ep}</span>
                        </div>
                        <p className="text-xs truncate font-medium opacity-90">{ep.title}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div variants={itemVariants} key={ep.id}>
                <Link 
                  href={buildWatchUrl(movieSlug, { episodeSlug: ep.id, serverName: currentServer })}
                  className="block group relative bg-mecha-dark p-3 clip-chamfer-tr-bl border border-white/5 hover:border-mecha-accent/50 hover:bg-white/5 transition-all cursor-pointer h-full"
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-16 h-10 bg-mecha-surface rounded overflow-hidden shrink-0 relative flex items-center justify-center group-hover:bg-mecha-accent/20 transition-colors border border-white/5 group-hover:border-mecha-accent/30">
                      {ep.image ? (
                        <img 
                          src={ep.image} 
                          alt={`Tập ${ep.ep}`}
                          className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-300"
                        />
                      ) : (
                        <Play size={16} className="text-transparent group-hover:text-mecha-accent transition-colors" fill="currentColor" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-gray-300 group-hover:text-mecha-accent transition-colors text-sm">Tập {ep.ep}</span>

                      </div>
                      <p className="text-xs truncate text-gray-500 group-hover:text-gray-300 transition-colors">{ep.title}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
