import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, User, Eye, Download, Star, Share2 } from 'lucide-react';

export const PostDetailModal: React.FC = () => {
  const { activePostModal, setActivePostModal, incrementPostViews, showToast } = useApp();

  useEffect(() => {
    if (activePostModal) {
      incrementPostViews(activePostModal.id);
    }
  }, [activePostModal?.id]);

  if (!activePostModal) return null;

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      showToast('게시글 링크가 클립보드에 복사되었습니다.', 'success');
    } catch {
      showToast('링크 복사를 완료했습니다.', 'info');
    }
  };

  const handleDownload = () => {
    showToast(`"${activePostModal.downloadName || '자료 파일'}" 다운로드가 시작되었습니다.`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#121216] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top header */}
        <div className="p-6 border-b border-white/[0.08] relative">
          <button
            onClick={() => setActivePostModal(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Unboxed metadata without pills */}
          <div className="flex items-center gap-2 text-xs text-purple-400 font-medium mb-2">
            <span>{activePostModal.category}</span>
            <span aria-hidden="true">·</span>
            <span>{activePostModal.type === 'notice' ? '공지사항' : activePostModal.type === 'column' ? '실무 칼럼' : activePostModal.type === 'resource' ? '학습자료' : '수강후기'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug pr-8">
            {activePostModal.title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gray-500" />
              <span>{activePostModal.author}</span>
              {activePostModal.companyOrRole && (
                <span className="text-gray-500">({activePostModal.companyOrRole})</span>
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{activePostModal.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-gray-500" />
              <span className="tabular-nums">{activePostModal.views} 회</span>
            </span>
            {activePostModal.rating && (
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-semibold">{activePostModal.rating}.0 / 5.0</span>
              </span>
            )}
          </div>
        </div>

        {/* Post content body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Resource Download Box if available */}
          {activePostModal.downloadUrl && (
            <div className="p-4 rounded-xl bg-purple-950/25 border border-purple-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    {activePostModal.downloadName || '학습 교안 및 템플릿'}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    파일 크기: {activePostModal.fileSize || '3.5 MB'} · 공식 라이선스 무상 배포
                  </div>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#9333EA] hover:bg-[#7E22CE] rounded-lg transition-colors cursor-pointer shrink-0"
              >
                다운로드
              </button>
            </div>
          )}

          {/* Main article text */}
          <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-line font-normal space-y-4">
            {activePostModal.content}
          </div>

          {/* Tags */}
          {activePostModal.tags && activePostModal.tags.length > 0 && (
            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-gray-400">
              <span className="text-gray-500">태그:</span>
              <div className="flex flex-wrap gap-1.5">
                {activePostModal.tags.map((tag, idx) => (
                  <span key={idx} className="text-purple-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 sm:p-6 bg-[#0E0E12] border-t border-white/[0.08] flex items-center justify-between">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-white rounded-lg border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>공유하기</span>
          </button>
          <button
            onClick={() => setActivePostModal(null)}
            className="px-5 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
