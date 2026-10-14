import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, BookOpen, CheckCircle, Sparkles, Building, Briefcase } from 'lucide-react';

export const InstructorsPage: React.FC = () => {
  const { instructors, setIsInquiryModalOpen, setSelectedCourseForInquiry } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold tracking-wide">
          <span>MIDAM FACULTY</span>
          <span aria-hidden="true">·</span>
          <span>전문 교수진 및 연구진</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          이론을 넘어 실무 현장을 가장 잘 아는 마스터들
        </h1>
        <p className="text-sm text-gray-300 leading-relaxed">
          국내 최정상 테크 기업 및 전문 연구소 출신의 강사진이 수년간 축적된 실무 케이스 스터디를 바탕으로 교육생 여러분의 비즈니스 생산성을 직접 밀착 코칭합니다.
        </p>
      </div>

      {/* Instructors List */}
      <div className="space-y-10">
        {instructors.map((inst) => (
          <div
            key={inst.id}
            className="p-6 sm:p-8 bg-[#121216] border border-white/[0.08] rounded-2xl hover:border-purple-500/40 transition-all hover:shadow-[0_0_35px_rgba(147,51,234,0.15)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Photo & Role Card (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <div className="relative aspect-square w-full max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-xl">
                  <img
                    src={inst.image}
                    alt={inst.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-semibold text-purple-300">
                      {inst.role}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {inst.name} 대표
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCourseForInquiry(`[강사 지정 문의] ${inst.name} 대표 출강 및 코칭`);
                    setIsInquiryModalOpen(true);
                  }}
                  className="w-full max-w-sm mx-auto lg:mx-0 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 rounded-xl transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>{inst.name} 대표 사내 출강 문의</span>
                </button>
              </div>

              {/* Career & Bio (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <div className="text-xs text-purple-400 font-semibold mb-1">
                    {inst.title}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {inst.introduction}
                  </p>
                </div>

                {/* Specialties */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                    <span>전문 연구 및 강의 분야</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {inst.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-lg text-xs text-purple-200"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Timeline */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-purple-400" />
                    <span>주요 경력 및 출강 레퍼런스</span>
                  </h4>
                  <ul className="space-y-2">
                    {inst.career.map((car, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{car}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Books / Publications */}
                {inst.books && inst.books.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                      <span>저서 및 집필 활동</span>
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                      {inst.books.map((b, idx) => (
                        <span
                          key={idx}
                          className="p-2 bg-purple-950/20 border border-purple-500/20 rounded-lg text-purple-200"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
