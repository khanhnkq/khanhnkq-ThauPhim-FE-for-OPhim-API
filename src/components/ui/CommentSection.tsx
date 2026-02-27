import { MessageSquare, Send } from 'lucide-react';

interface CommentSectionProps {
  commentCount: number;
  loadingText?: string;
  placeholder?: string;
}

export function CommentSection({ 
  commentCount, 
  loadingText = "Tải dữ liệu bình luận thành công...",
  placeholder = "Viết bình luận của bạn..."
}: CommentSectionProps) {
  return (
    <div className="bg-mecha-surface/40 border border-white/5 rounded-lg overflow-hidden flex flex-col mt-4">
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-mecha-accent" size={20} />
          <h3 className="text-mecha-light text-sm uppercase tracking-widest font-bold">Bình luận ({commentCount})</h3>
        </div>
      </div>
      
      <div className="p-6 bg-mecha-dark/30">
        <div className="flex gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-mecha-surface border border-white/10 flex items-center justify-center shrink-0">
            <div className="w-6 h-6 rounded-full bg-gray-600" />
          </div>
          <div className="flex-1 relative">
            <input 
              className="w-full bg-mecha-dark border border-white/10 text-white px-4 py-3 rounded focus:border-mecha-accent focus:ring-1 focus:ring-mecha-accent/50 focus:outline-none placeholder:text-gray-600 text-sm font-medium tracking-wide transition-all" 
              placeholder={placeholder} 
              type="text"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-mecha-accent hover:text-yellow-300 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
        
        <div className="space-y-4 opacity-50 italic text-gray-500 text-sm border-l-2 border-dashed border-gray-700 pl-4 py-2">
            {loadingText}
        </div>
      </div>
    </div>
  );
}
