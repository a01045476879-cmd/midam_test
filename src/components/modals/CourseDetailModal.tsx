import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Clock, Award, CheckCircle, Sparkles, Laptop, BookOpen } from 'lucide-react';

export const CourseDetailModal: React.FC = () => {
  const {
    activeCourseModal,
    setActiveCourseModal,
    setIsInquiryModalOpen,
    setSelectedCourseForInquiry,
  } = useApp();

  if (!activeCourseModal) return null;

  const handleApply = () => {
    setSelectedCourseForInquiry(activeCourseModal.title);
    setActiveCourseModal(null);
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#121216] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header visual banner */}
        <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-slate-900">
          <img
            src={activeCourseModal.image}
            alt={activeCourseModal.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => setActiveCourseModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white hover:bg-black/90 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Category over banner */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs text-purple-300 font-medium mb-1">
              <span>{activeCourseModal.category}</span>
              <span aria-hidden="true">·</span>
              <span>난이도: {activeCourseModal.level}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight text-balance">
              {activeCourseModal.title}
            </h2>
          </div>
        </div>

        {/* Modal body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Quick meta strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06] text-xs">
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <div className="text-[10px] text-gray-400">수강 기간 및 시간</div>
                <div className="font-semibold text-white">{activeCourseModal.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Award className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <div className="text-[10px] text-gray-400">수강료 안내</div>
                <div className="font-semibold text-white">{activeCourseModal.price}</div>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center gap-2 text-gray-300">
              <Laptop className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <div className="text-[10px] text-gray-400">실습 및 활용 툴</div>
                <div className="font-semibold text-white truncate">{activeCourseModal.tools.join(', ')}</div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              과정 개요
            </h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              {activeCourseModal.summary}
            </p>
          </div>

          {/* Target Audience */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              수강 대상
            </h3>
            <div className="p-3 bg-purple-950/20 border border-purple-500/20 rounded-xl text-xs text-purple-200 leading-relaxed">
              {activeCourseModal.target}
            </div>
          </div>

          {/* Key Learning Points */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              핵심 습득 역량
            </h3>
            <ul className="space-y-2">
              {activeCourseModal.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detailed Syllabus */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>상세 주차별 / 모듈별 커리큘럼</span>
            </h3>
            <div className="space-y-3">
              {activeCourseModal.syllabus.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-purple-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-purple-400">
                      {item.weekOrStep}
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 pl-8 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#0E0E12] border-t border-white/[0.08] flex items-center justify-between gap-4">
          <button
            onClick={() => setActiveCourseModal(null)}
            className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#9333EA] to-[#7E22CE] rounded-lg hover:from-[#A855F7] hover:to-[#9333EA] shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>이 과정 수강 및 상담 신청</span>
          </button>
        </div>
      </div>
    </div>
  );
};
