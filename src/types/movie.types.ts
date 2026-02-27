// ──────────────────────────────────────────────
// Ophim API types — Single source of truth
// ──────────────────────────────────────────────

/** Compact movie metadata returned by list endpoints */
export interface OphimMovieMeta {
  tmdb: {
    type: string;
    id: string;
    season: number | null;
    vote_average: number;
    vote_count: number;
  };
  imdb: { id: string; vote_average: number; vote_count: number };
  created: { time: string };
  modified: { time: string };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  thumb_url: string;
  poster_url: string;
  year: number;
  episode_current?: string;
  lang?: string;
  time?: string;
}

/** Wrapper for list API responses */
export interface OphimListResponse {
  status: boolean;
  items: OphimMovieMeta[];
  pathImage: string;
}

/** Episode data within a server */
export interface OphimEpisodeData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

/** A server containing episode data */
export interface OphimEpisodeServer {
  server_name: string;
  server_data: OphimEpisodeData[];
}

/** Full movie detail returned by the detail endpoint */
export interface OphimMovie {
  created: { time: string };
  modified: { time: string };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  thumb_url: string;
  poster_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: { id: string; name: string; slug: string }[];
  country: { id: string; name: string; slug: string }[];
  tmdb?: {
    type: string;
    id: string;
    season: number | null;
    vote_average: number;
    vote_count: number;
  };
}

/** Wrapper for the movie detail API response */
export interface OphimMovieDetails {
  status: boolean;
  msg: string;
  movie: OphimMovie;
  episodes: OphimEpisodeServer[];
}
