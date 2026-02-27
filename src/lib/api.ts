// ──────────────────────────────────────────────
// API Constants + Re-exports
// ──────────────────────────────────────────────
// All API logic lives in services/endpoints/movie.service.ts
// Types live in types/movie.types.ts
// This file re-exports for backward compatibility.

export const API_BASE_URL = 'https://ophim1.com';
export const IMG_CDN_URL = 'https://img.ophim.live/uploads/movies/';

// Re-export types
export type {
  OphimMovieMeta,
  OphimListResponse,
  OphimEpisodeServer,
  OphimEpisodeData,
  OphimMovie,
  OphimMovieDetails,
} from '@/types/movie.types';

export type { PaginatedResult } from '@/services/endpoints/movie.service';

// Re-export service functions
export {
  getLatestMovies,
  getSeriesMovies,
  getSingleMovies,
  searchMovies,
  advancedSearchMovies,
  getMovieDetails,
  getMoviesByFilter,
  getMoviesByCategory,
  getMoviesByCountry,
} from '@/services/endpoints/movie.service';
