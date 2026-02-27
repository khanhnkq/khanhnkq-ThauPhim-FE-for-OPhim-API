import ophimClient from '@/services/axios.client';
import type { OphimMovieMeta, OphimMovieDetails } from '@/types/movie.types';

export interface PaginatedResult {
  items: OphimMovieMeta[];
  totalPages: number;
  currentPage: number;
}

// ── Filter slug → API path mapping ───────────

const FILTER_MAP: Record<string, string> = {
  'phim-moi':  '/danh-sach/phim-moi-cap-nhat',
  'phim-bo':   '/danh-sach/phim-bo',
  'phim-le':   '/danh-sach/phim-le',
  'phim-sap-chieu': '/danh-sach/phim-sap-chieu',
  'hoat-hinh': '/danh-sach/hoat-hinh',
  'tv-shows':  '/danh-sach/tv-shows',
};

// ── Helpers ──────────────────────────────────

/** Fetch a paginated movie list — DRY wrapper for all list endpoints */
async function fetchMovieList(path: string, page: number = 1): Promise<OphimMovieMeta[]> {
  const result = await fetchMovieListWithPagination(path, page);
  return result.items;
}

/** Same as fetchMovieList but also returns pagination metadata */
async function fetchMovieListWithPagination(path: string, page: number = 1): Promise<PaginatedResult> {
  try {
    const { data } = await ophimClient.get(path, { params: { page } });
    if (data?.status === 'success' && data.data?.items) {
      const pagination = data.data.params?.pagination;
      const totalItems = pagination?.totalItems ?? 0;
      const perPage = pagination?.totalItemsPerPage ?? 24;
      return {
        items: data.data.items,
        totalPages: Math.ceil(totalItems / perPage),
        currentPage: page,
      };
    }
    return { items: [], totalPages: 0, currentPage: page };
  } catch {
    return { items: [], totalPages: 0, currentPage: page };
  }
}

// ── Public API ───────────────────────────────

export async function getLatestMovies(page = 1) {
  return fetchMovieList('/danh-sach/phim-moi-cap-nhat', page);
}

export async function getSeriesMovies(page = 1) {
  return fetchMovieList('/danh-sach/phim-bo', page);
}

export async function getSingleMovies(page = 1) {
  return fetchMovieList('/danh-sach/phim-le', page);
}

export async function getMoviesByCategory(categorySlug: string, page = 1) {
  return fetchMovieList(`/the-loai/${categorySlug}`, page);
}

export async function getMoviesByCountry(countrySlug: string, page = 1) {
  return fetchMovieList(`/quoc-gia/${countrySlug}`, page);
}

/** Route a filter slug to the correct API endpoint — returns items + pagination */
export async function getMoviesByFilter(slug: string, page = 1): Promise<PaginatedResult> {
  const endpoint = FILTER_MAP[slug];
  if (endpoint) return fetchMovieListWithPagination(endpoint, page);

  // Try as category first, then country
  const byCategory = await fetchMovieListWithPagination(`/the-loai/${slug}`, page);
  if (byCategory.items.length > 0) return byCategory;
  return fetchMovieListWithPagination(`/quoc-gia/${slug}`, page);
}

export async function searchMovies(keyword: string, limit = 24): Promise<OphimMovieMeta[]> {
  try {
    const { data } = await ophimClient.get('/tim-kiem', {
      params: { keyword, limit },
    });
    if (data?.status === 'success' && data.data?.items) {
      return data.data.items;
    }
    return [];
  } catch {
    return [];
  }
}

export async function advancedSearchMovies(params: {
  keyword?: string;
  category?: string;
  country?: string;
  year?: string;
  type?: string;
  sortField?: string;
  sortType?: string;
  page?: number;
}): Promise<PaginatedResult> {
  try {
    const { data } = await ophimClient.get('/tim-kiem', {
      params: {
        keyword: params.keyword || '',
        limit: 24,
        page: params.page || 1,
        filterCategory: params.category || '',
        filterCountry: params.country || '',
        filterYear: params.year || '',
        filterType: params.type || '',
        sortField: params.sortField || '_id',
        sortType: params.sortType || 'desc',
      },
    });
    if (data?.status === 'success' && data.data?.items) {
      return {
        items: data.data.items,
        totalPages: data.data.params?.pagination?.totalPages || 1,
        currentPage: data.data.params?.pagination?.currentPage || 1,
      };
    }
    return { items: [], totalPages: 1, currentPage: 1 };
  } catch {
    return { items: [], totalPages: 1, currentPage: 1 };
  }
}

export async function getMovieDetails(slug: string): Promise<OphimMovieDetails | null> {
  if (!slug || slug === 'undefined') return null;

  try {
    const { data } = await ophimClient.get(`/phim/${encodeURIComponent(slug)}`);

    // New API format: { status: "success", data: { item: { ...movie, episodes } } }
    if (data?.status === 'success' && data.data?.item) {
      const { episodes, ...movieData } = data.data.item;
      return {
        status: true,
        msg: data.message || '',
        movie: movieData,
        episodes: episodes || [],
      };
    }

    // Legacy format fallback
    if (data?.status === true && data.movie) {
      return data as OphimMovieDetails;
    }

    return null;
  } catch (error) {
    console.error(`[movie.service] getMovieDetails("${slug}"):`, error);
    return null;
  }
}
