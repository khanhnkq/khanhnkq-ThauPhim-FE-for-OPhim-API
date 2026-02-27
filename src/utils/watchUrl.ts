import { OphimEpisodeServer } from '@/lib/api';

/**
 * Build a consistent watch URL with server & episode params.
 * Used by: "XEM PHIM" button, EpisodeList, ServerSelector, etc.
 */
export function buildWatchUrl(
  movieSlug: string,
  options?: {
    episodeSlug?: string;
    serverName?: string;
    episodes?: OphimEpisodeServer[];
  }
): string {
  const { episodeSlug, serverName, episodes } = options || {};

  // Resolve server & episode — fall back to the first server/first ep
  const resolvedServer = serverName || episodes?.[0]?.server_name || '';
  const resolvedEpisode = episodeSlug || episodes?.[0]?.server_data?.[0]?.slug || '';

  const params = new URLSearchParams();
  if (resolvedEpisode) params.set('tap', resolvedEpisode);
  if (resolvedServer) params.set('server', resolvedServer);

  const qs = params.toString();
  return `/watch/${movieSlug}${qs ? `?${qs}` : ''}`;
}
