import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Base path without page query, e.g. "/p/phim-moi" */
  basePath: string;
  /** Extra query parameters to persist */
  searchParams?: Record<string, string | number | undefined>;
  /** Max visible page buttons (default 7) */
  maxVisible?: number;
}

function buildPageUrl(basePath: string, page: number, extraParams?: Record<string, string | number | undefined>) {
  const urlParams = new URLSearchParams();
  if (page > 1) {
    urlParams.set('page', page.toString());
  }
  if (extraParams) {
    Object.entries(extraParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        urlParams.set(key, value.toString());
      }
    });
  }
  const queryString = urlParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/** Calculate which page numbers to show around the current page */
function getPageRange(current: number, total: number, maxVisible: number): number[] {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, current - half);
  let end = start + maxVisible - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const btnBase =
  'flex items-center justify-center min-w-[36px] sm:min-w-[40px] h-9 sm:h-10 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200';
const btnActive =
  'bg-mecha-accent text-mecha-dark border-2 border-mecha-accent shadow-[0_0_15px_rgba(254,201,61,0.4)] clip-chamfer-tl-br';
const btnNormal =
  'bg-mecha-surface/60 text-mecha-light border border-white/10 hover:bg-mecha-accent/20 hover:text-mecha-accent hover:border-mecha-accent/40 rounded';
const btnDisabled =
  'bg-mecha-surface/30 text-gray-700 border border-white/5 cursor-not-allowed pointer-events-none rounded';

export function Pagination({ currentPage, totalPages, basePath, searchParams, maxVisible = 5 }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages, maxVisible);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-8 md:mt-12" aria-label="Pagination">
      {/* First page (Hide on very small screens to save space) */}
      {currentPage > 3 && totalPages > maxVisible && (
        <Link href={buildPageUrl(basePath, 1, searchParams)} className={`${btnBase} ${btnNormal} hidden sm:flex px-2`}>
          <ChevronsLeft size={16} className="sm:w-5 sm:h-5" />
        </Link>
      )}

      {/* Previous */}
      {isFirst ? (
        <div className={`${btnBase} ${btnDisabled} px-2 sm:px-3`}>
          <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
        </div>
      ) : (
        <Link href={buildPageUrl(basePath, currentPage - 1, searchParams)} className={`${btnBase} ${btnNormal} px-2 sm:px-3`}>
          <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
        </Link>
      )}

      {/* Page numbers */}
      {pages[0] > 1 && (
        <>
          <Link href={buildPageUrl(basePath, 1, searchParams)} className={`${btnBase} ${btnNormal}`}>1</Link>
          {pages[0] > 2 && <span className="text-gray-600 px-0.5 sm:px-1">…</span>}
        </>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={buildPageUrl(basePath, p, searchParams)}
          className={`${btnBase} ${p === currentPage ? btnActive : btnNormal} font-mono`}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p}
        </Link>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="text-gray-600 px-0.5 sm:px-1">…</span>}
          <Link href={buildPageUrl(basePath, totalPages, searchParams)} className={`${btnBase} ${btnNormal}`}>{totalPages}</Link>
        </>
      )}

      {/* Next */}
      {isLast ? (
        <div className={`${btnBase} ${btnDisabled} px-2 sm:px-3`}>
          <ChevronRight size={16} className="sm:w-5 sm:h-5" />
        </div>
      ) : (
        <Link href={buildPageUrl(basePath, currentPage + 1, searchParams)} className={`${btnBase} ${btnNormal} px-2 sm:px-3`}>
          <ChevronRight size={16} className="sm:w-5 sm:h-5" />
        </Link>
      )}

      {/* Last page (Hide on very small screens to save space) */}
      {currentPage < totalPages - 2 && totalPages > maxVisible && (
        <Link href={buildPageUrl(basePath, totalPages, searchParams)} className={`${btnBase} ${btnNormal} hidden sm:flex px-2`}>
          <ChevronsRight size={16} className="sm:w-5 sm:h-5" />
        </Link>
      )}
    </nav>
  );
}
