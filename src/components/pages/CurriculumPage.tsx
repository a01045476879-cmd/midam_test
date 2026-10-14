import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseCategory, CourseLevel } from '../../types';
import { Clock, Award, CheckCircle2, ChevronRight, Sparkles, Filter } from 'lucide-react';

export const CurriculumPage: React.FC = () => {
  const {
    curriculums,
    setActiveCourseModal,
    setIsInquiryModalOpen,
    setSelectedCourseForInquiry,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('전체');
  const [selectedLevel, setSelectedLevel] = useState<string>('전체');

  const categories: CourseCategory[] = ['전체', 'AI 실무', '컴퓨터 OA', '기업 맞춤 출강'];
  const levels = ['전체', '입문', '중급', '실무 심화', '임직원 맞춤'];

  const filteredCourses = curriculums.filter((c) => {
    if (!c.active) return false;
    const matchesCategory = selectedCategory === '전체' || c.category === selectedCategory;
    const matchesLevel = selectedLevel === '전체' || c.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  const handleApply = (courseTitle: string) => {
    setSelectedCourseForInquiry(courseTitle);
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold tracking-wide">
          <span>CURRICULUM OVERVIEW</span>
          <span aria-hidden="true">·</span>
          <span>실무 특화 맞춤 커리큘럼</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          직무 경쟁력을 완성하는 정규 및 맞춤 교육과정
        </h1>
        <p className="text-sm text-gray-300 leading-relaxed">
          초심자도 쉽게 시작하는 입문 과정부터, 부서 전체의 생산성을 비약적으로 혁신하는 실무 심화 및 기업 전용 사내 출강까지 체계적으로 구성되어 있습니다.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-[#121216] border border-white/[0.08] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Segmented Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/[0.06]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-purple-900/60 text-white border border-purple-500/40 shadow-[0_0_12px_rgba(147,51,234,0.3)] font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Level Dropdown */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Filter className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span>난이도 필터:</span>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            {levels.map((lvl) => (
              <option key={lvl} value={lvl} className="bg-[#121216]">
                {lvl === '전체' ? '모든 난이도' : lvl}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-[#121216] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-all hover:shadow-[0_0_35px_rgba(147,51,234,0.15)] group"
            >
              {/* Image banner */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={course.image}
                  alt={course.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-white px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10">
                    {course.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-gray-300">
                  <span className="flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>{course.duration}</span>
                  </span>
                  <span className="bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm text-purple-300">
                    난이도: {course.level}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors">
                    {course.title}
                  </h2>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {course.summary}
                  </p>

                  {/* Target Audience Box */}
                  <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-xs text-gray-400">
                    <span className="font-semibold text-gray-300">추천 대상: </span>
                    {course.target}
                  </div>

                  {/* Key points */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      주요 학습 내용:
                    </div>
                    {course.keyPoints.slice(0, 3).map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tools used */}
                  <div className="pt-2 flex flex-wrap gap-1.5 items-center text-[11px] text-gray-400">
                    <span className="text-gray-500">실습 도구:</span>
                    {course.tools.map((t, idx) => (
                      <span key={idx} className="text-purple-300 font-mono">
                        {t}{idx < course.tools.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer strip */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] text-gray-500">수강료 안내</div>
                    <div className="text-sm font-bold text-white font-mono">{course.price}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCourseModal(course)}
                      className="px-3.5 py-2 text-xs font-medium text-gray-300 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-colors cursor-pointer"
                    >
                      상세 커리큘럼
                    </button>
                    <button
                      onClick={() => handleApply(course.title)}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#9333EA] to-[#7E22CE] hover:from-[#A855F7] hover:to-[#9333EA] rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>수강 신청</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-16 text-center space-y-3 bg-[#121216] border border-white/[0.08] rounded-2xl">
            <p className="text-sm text-gray-400">선택한 조건에 해당하는 교육과정이 없습니다.</p>
            <button
              onClick={() => {
                setSelectedCategory('전체');
                setSelectedLevel('전체');
              }}
              className="px-4 py-2 text-xs text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-950/40 cursor-pointer"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>

      {/* Corporate custom callout */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#161622] via-[#1c1c28] to-[#121216] border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(147,51,234,0.15)]">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-bold text-white">
            사내 맞춤형 단체 출강 또는 1:1 임원 컨설팅이 필요하신가요?
          </h3>
          <p className="text-xs text-gray-300 max-w-xl">
            귀사의 업종과 사내 보안 규정에 맞춘 전용 실습 환경과 맞춤형 커리큘럼을 무상으로 기획해 드립니다.
          </p>
        </div>
        <button
          onClick={() => handleApply('기업 및 공공기관 맞춤형 AI & 컴퓨터 OA 사내 출강')}
          className="px-6 py-3 text-xs font-semibold text-white bg-[#9333EA] hover:bg-[#7E22CE] rounded-xl transition-all cursor-pointer shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.4)]"
        >
          맞춤 출강 제안서 요청
        </button>
      </div>
    </div>
  );
};
