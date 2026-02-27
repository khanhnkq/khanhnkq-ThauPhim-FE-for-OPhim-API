import Link from 'next/link';
import { Twitter, Youtube, Twitch, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-mecha-surface py-12 px-6">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[#fec93d]">
            <h2 className="text-[#fec93d] text-lg font-bold leading-tight tracking-wider uppercase">THAU<span className="text-white">PHIM</span></h2>
          </div>
          <p className="text-gray-500 text-sm">Điểm đến tối thượng cho những tín đồ yêu thích điện ảnh với hàng ngàn bộ phim hay và đa dạng nhất.</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-mecha-light font-bold uppercase text-sm tracking-wider">Khám phá</h4>
          <Link href="#" className="text-gray-400 hover:text-mecha-accent text-sm transition-colors">Mới phát hành</Link>
          <Link href="#" className="text-gray-400 hover:text-mecha-accent text-sm transition-colors">Thịnh hành</Link>
          <Link href="#" className="text-gray-400 hover:text-mecha-accent text-sm transition-colors">Thể loại</Link>
          <Link href="#" className="text-gray-400 hover:text-mecha-accent text-sm transition-colors">Sắp ra mắt</Link>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-mecha-light font-bold uppercase text-sm tracking-wider">Hỗ trợ</h4>
          <Link href="#" className="text-gray-400 hover:text-mecha-accent text-sm transition-colors">Trung tâm Trợ giúp</Link>
          <Link href="#" className="text-gray-400 hover:text-mecha-accent text-sm transition-colors">Điều khoản Dịch vụ</Link>
          <Link href="#" className="text-gray-400 hover:text-mecha-accent text-sm transition-colors">Chính sách Bảo mật</Link>
          <Link href="#" className="text-gray-400 hover:text-mecha-accent text-sm transition-colors">Liên hệ</Link>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-mecha-light font-bold uppercase text-sm tracking-wider">Kết nối</h4>
          <div className="flex gap-4">
            <Link href="#" className="w-8 h-8 rounded bg-mecha-dark flex items-center justify-center text-gray-400 hover:text-mecha-dark hover:bg-mecha-accent transition-all">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-8 h-8 rounded bg-mecha-dark flex items-center justify-center text-gray-400 hover:text-mecha-dark hover:bg-mecha-accent transition-all">
              <Youtube className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-8 h-8 rounded bg-mecha-dark flex items-center justify-center text-gray-400 hover:text-mecha-dark hover:bg-mecha-accent transition-all">
              <Twitch className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-8 h-8 rounded bg-mecha-dark flex items-center justify-center text-gray-400 hover:text-mecha-dark hover:bg-mecha-accent transition-all">
              <Github className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-600 text-xs border-t border-white/5 pt-8">
          © {new Date().getFullYear()} ThauPhim
      </div>
    </footer>
  );
}
