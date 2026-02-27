import { Clock, Calendar, Video, Eye, Languages, Film, Tv } from 'lucide-react';

interface MovieMetaGridProps {
  director: string;
  runtime: string;
  releaseYear: string;
  language?: string;
  viewCount?: number;
  type?: string;
  chieurap?: boolean;
}

export function MovieMetaGrid({ director, runtime, releaseYear, language, viewCount, type, chieurap }: MovieMetaGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 bg-mecha-surface/30 p-6 rounded border border-white/5">

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-mecha-accent">
          <Video size={20} />
          <span className="text-xs font-bold uppercase tracking-wider">Đạo diễn</span>
        </div>
        <span className="text-mecha-light font-medium">{director}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-mecha-accent">
          <Clock size={20} />
          <span className="text-xs font-bold uppercase tracking-wider">Thời lượng</span>
        </div>
        <span className="text-mecha-light font-medium">{runtime}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-mecha-accent">
          <Calendar size={20} />
          <span className="text-xs font-bold uppercase tracking-wider">Phát hành</span>
        </div>
        <span className="text-mecha-light font-medium">{releaseYear}</span>
      </div>


      {language && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-mecha-accent">
            <Languages size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">Ngôn ngữ</span>
          </div>
          <span className="text-mecha-light font-medium">{language}</span>
        </div>
      )}
      {viewCount !== undefined && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-mecha-accent">
            <Eye size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">Lượt xem</span>
          </div>
          <span className="text-mecha-light font-medium">{viewCount.toLocaleString('vi-VN')}</span>
        </div>
      )}
      {type && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-mecha-accent">
            {type === 'series' ? <Tv size={20} /> : <Film size={20} />}
            <span className="text-xs font-bold uppercase tracking-wider">Định dạng</span>
          </div>
          <span className="text-mecha-light font-medium">
            {type === 'series' ? 'Phim Bộ' : 'Phim Lẻ'} {chieurap ? '(Chiếu Rạp)' : ''}
          </span>
        </div>
      )}
    </div>
  );
}
