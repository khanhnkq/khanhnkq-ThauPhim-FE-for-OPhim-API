import Image from 'next/image';
import Link from 'next/link';
import { ButtonChamfered } from '@/components/ui/ButtonChamfered';
import { SearchBar } from '@/components/ui/SearchBar';
import { ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Phim Mới', href: '/p/phim-moi' },
  {
    label: 'Thể loại',
    href: '#',
    dropdown: [
      { label: 'Hành Động', href: '/p/hanh-dong' },
      { label: 'Tình Cảm', href: '/p/tinh-cam' },
      { label: 'Viễn Tưởng', href: '/p/vien-tuong' },
      { label: 'Kinh Dị', href: '/p/kinh-di' },
      { label: 'Hài Hước', href: '/p/hai-huoc' },
      { label: 'Hoạt Hình', href: '/p/hoat-hinh' },
      { label: 'Tâm Lý', href: '/p/tam-ly' },
      { label: 'Cổ Trang', href: '/p/co-trang' },
    ],
  },
  { label: 'Phim Lẻ', href: '/p/phim-le' },
  { label: 'Phim Bộ', href: '/p/phim-bo' },
  {
    label: 'Quốc gia',
    href: '#',
    dropdown: [
      { label: 'Hàn Quốc', href: '/p/han-quoc' },
      { label: 'Trung Quốc', href: '/p/trung-quoc' },
      { label: 'Nhật Bản', href: '/p/nhat-ban' },
      { label: 'Âu Mỹ', href: '/p/au-my' },
      { label: 'Thái Lan', href: '/p/thai-lan' },
      { label: 'Việt Nam', href: '/p/viet-nam' },
    ],
  },
  { label: 'Thịnh Hành', href: '/trending', isNew: true },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl">
      <div className="w-full px-6 md:px-12 h-16 flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative w-10 h-10 overflow-hidden clip-chamfer-tl border border-mecha-accent/50 group-hover:border-mecha-accent transition-colors bg-mecha-surface flex items-center justify-center p-1">
            <Image
              src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3djV2cXFlNXE5cTU3Mzk1YTcxYXNoNzVwMnAzdHgwcGZqaGNpdmlxcSZlcD12MV9zdGlja2Vyc19yZWxhdGVkJmN0PXM/Q66dCIgxnb4uzEYDqS/giphy.gif"
              alt="Logo"
              width={36}
              height={36}
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-widest text-[#fec93d] group-hover:text-white transition-colors">
              THAU<span className="text-white">PHIM</span>
            </span>
            <span className="text-[9px] text-[#fec93d]/70 tracking-[0.15em] uppercase">
              Phim Hay Cả Thau
            </span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1 text-[13px] tracking-wider font-medium flex-1 justify-center">
          {NAV_ITEMS.map((item) =>
            item.dropdown ? (
              <div key={item.label} className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-mecha-light/70 hover:text-mecha-accent transition-colors uppercase rounded">
                  {item.label}
                  <ChevronDown size={12} className="opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-1 w-44 bg-mecha-dark/95 border border-white/10 backdrop-blur-md rounded shadow-2xl shadow-black/50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-2.5 text-mecha-light/70 hover:text-mecha-accent hover:bg-mecha-accent/5 transition-colors text-[12px] uppercase tracking-wider border-b border-white/5 last:border-0"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="relative flex items-center gap-1.5 px-3 py-2 text-mecha-light/70 hover:text-mecha-accent transition-colors uppercase rounded"
              >
                {item.label}
                {item.isNew && (
                  <span className="absolute -top-1 -right-1 px-1 py-0 bg-mecha-accent text-mecha-dark text-[8px] font-black rounded-sm uppercase leading-tight">
                    NEW
                  </span>
                )}
              </Link>
            )
          )}
        </nav>

        {/* SEARCH + LOGIN */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <SearchBar />
          <ButtonChamfered variant="outline" className="hidden lg:flex px-5 py-2 text-xs uppercase h-9">
            Đăng nhập
          </ButtonChamfered>
        </div>
      </div>
    </header>
  );
}
