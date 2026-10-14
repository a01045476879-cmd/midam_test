import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Users,
  Award,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Star,
  Quote,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    siteConfig,
    curriculums,
    instructors,
    posts,
    setCurrentPage,
    setActiveCourseModal,
    setActivePostModal,
    setIsInquiryModalOpen,
    setSelectedCourseForInquiry,
  } = useApp();

  const featuredCourses = curriculums.filter((c) => c.active && c.featured).slice(0, 3);
  const recentPosts = posts.filter((p) => p.type === 'notice' || p.type === 'column').slice(0, 3);
  const reviews = posts.filter((p) => p.type === 'review').slice(0, 2);

  const proofMetrics = [
    { value: '3,480+', unit: '명', label: '누적 교육 수료생' },
    { value: '98.7', unit: '%', label: '기업 출강 만족도' },
    { value: '94.2', unit: '%', label: '실무 프로젝트 완수율' },
    { value: '7.4', unit: '시간', label: '주당 평균 업무시간 단축' },
  ];

  const corePrinciples = [
    {
      num: '01',
      title: '현업 직결 100% 실습 중심',
      desc: '단순한 이론 주입이나 명령어 암기가 아닌, 실제 사내 업무 보고서와 데이터셋을 기반으로 바로 적용 가능한 파이프라인을 구축합니다.',
      icon: Zap,
    },
    {
      num: '02',
      title: '소수 정예 1:1 맞춤 피드백',
      desc: '기수당 최대 18명 이하 정원제로 운영되어, 학습자 한 분 한 분의 직무 특성과 보안 환경에 최적화된 개별 솔루션을 코칭합니다.',
      icon: Target,
    },
    {
      num: '03',
      title: '검증된 대기업·공공기관 레퍼런스',
      desc: '삼성, SK, 현대차 출강 및 정부 산하기관 DX 교육을 이끈 전문 강사진이 축적된 실전 노하우를 아낌없이 전수합니다.',
      icon: Award,
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-16 overflow-hidden">
        {/* Layer 1: Multi-stop atmospheric mesh gradients */}
        <div className="absolute top-0 left-1/4 -translate-y-12 w-[650px] h-[450px] bg-gradient-to-br from-purple-900/25 via-indigo-950/20 to-transparent blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[450px] bg-gradient-to-bl from-purple-600/20 via-purple-950/25 to-transparent blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-purple-950/15 blur-[100px] rounded-full pointer-events-none" />

        {/* Layer 2: Geometric architectural grid overlay with radial vignette mask */}
        <div className="absolute inset-0 bg-grid-pattern mask-radial-vignette opacity-70 pointer-events-none" />

        {/* Layer 3: Concentric tech orbit vector arcs & subtle grid coordinates */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[750px] opacity-25"
            viewBox="0 0 1200 750"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Concentric ellipses */}
            <ellipse
              cx="600"
              cy="375"
              rx="560"
              ry="320"
              stroke="#9333EA"
              strokeWidth="1"
              strokeDasharray="6 10"
              opacity="0.3"
            />
            <ellipse
              cx="600"
              cy="375"
              rx="420"
              ry="240"
              stroke="#A855F7"
              strokeWidth="1"
              opacity="0.2"
            />
            <ellipse
              cx="600"
              cy="375"
              rx="280"
              ry="160"
              stroke="#C084FC"
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.25"
            />

            {/* Subtle diagonal tech guide lines */}
            <line
              x1="120"
              y1="80"
              x2="480"
              y2="440"
              stroke="#9333EA"
              strokeWidth="1"
              strokeDasharray="2 6"
              opacity="0.2"
            />
            <line
              x1="1080"
              y1="80"
              x2="720"
              y2="440"
              stroke="#9333EA"
              strokeWidth="1"
              strokeDasharray="2 6"
              opacity="0.2"
            />

            {/* Micro coordinate markers */}
            <circle cx="600" cy="55" r="2.5" fill="#9333EA" opacity="0.6" />
            <circle cx="600" cy="695" r="2.5" fill="#9333EA" opacity="0.6" />
            <circle cx="40" cy="375" r="2.5" fill="#9333EA" opacity="0.6" />
            <circle cx="1160" cy="375" r="2.5" fill="#9333EA" opacity="0.6" />
          </svg>
        </div>

        {/* Hero Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              {/* Unboxed editorial category metadata */}
              <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold tracking-wide">
                <span>MIDAM AI & COMPUTING INSTITUTE</span>
                <span aria-hidden="true">·</span>
                <span>실무 중심 직무 교육</span>
              </div>

              {/* Refined headline with text-wrap: balance */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18] [text-wrap:balance]">
                {siteConfig.tagline}
              </h1>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
                {siteConfig.subTagline}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#9333EA] to-[#7E22CE] rounded-xl hover:from-[#A855F7] hover:to-[#9333EA] shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>수강 및 기업 출강 문의</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('curriculum');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-medium text-gray-300 hover:text-white rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.03] backdrop-blur-md transition-colors cursor-pointer"
                >
                  <span>전체 커리큘럼 살펴보기</span>
                </button>
              </div>

              {/* Trust signals footer note */}
              <div className="pt-4 flex items-center gap-3 text-xs text-gray-400 border-t border-white/[0.08]">
                <FileCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>개인 수강생 교재·템플릿 무상 배포 / 기업 맞춤형 커리큘럼 및 계산서 발행 가능</span>
              </div>
            </div>

            {/* Right Focal Carrier (5 cols) with Layered Depth */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Outer soft ambient backlight aura */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-purple-800/30 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

              {/* Layered container with gradient rim */}
              <div className="relative w-full aspect-[4/3] p-[1px] rounded-2xl bg-gradient-to-br from-purple-500/40 via-purple-900/20 to-white/10 shadow-[0_0_50px_rgba(147,51,234,0.25)]">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-[#121216] relative group">
                  <img
                    src="/src/assets/images/midam_hero_ai_oa_education_1791960263142.jpg"
                    alt="Midam교육 연구소 강의 및 실습 현장"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top-Right Floating Subtle Glass Tag */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-purple-500/30 text-[11px] font-medium text-purple-200 flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    <span>실전 AI & OA 랩</span>
                  </div>

                  {/* Bottom glass caption card */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-black/70 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">현장 실습형 몰입 교육 환경</div>
                      <div className="text-[11px] text-gray-400">강남 테헤란로 메인 연구소 오프라인 랩</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-semibold text-purple-400">1:1 코칭석 완비</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Proof Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 bg-[#121216] border border-white/[0.08] rounded-2xl">
          {proofMetrics.map((metric, idx) => (
            <div key={idx} className="space-y-1 text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-baseline justify-center sm:justify-start gap-1">
                <span className="tabular-nums font-mono text-purple-400">{metric.value}</span>
                <span className="text-sm font-normal text-gray-400">{metric.unit}</span>
              </div>
              <div className="text-xs text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About & 3 Core Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs text-purple-400 font-semibold tracking-wide">
              OUR CORE VALUES
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Midam교육 연구소의 3가지 확고한 교육 원칙
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              수강 후 책장에 꽂아두고 잊혀지는 교육은 하지 않습니다. 학습 다음 날 아침, 실제 모니터 앞에서 손이 먼저 움직이는 실용성을 추구합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {corePrinciples.map((principle) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.num}
                  className="p-6 bg-[#121216] border border-white/[0.08] rounded-2xl hover:border-purple-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-purple-400">
                      {principle.num}.
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Curriculums Bento Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs text-purple-400 font-semibold tracking-wide">
                FEATURED CURRICULUM
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                지금 가장 많은 직장인이 선택한 추천 과정
              </h2>
            </div>
            <button
              onClick={() => {
                setCurrentPage('curriculum');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>전체 교육과정 목록</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-[#121216] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col hover:border-purple-500/40 transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] group"
              >
                {/* Course Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 text-[11px] font-medium text-white px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10">
                    {course.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      <span>{course.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span>난이도: {course.level}</span>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {course.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-gray-500">수강료</div>
                      <div className="text-xs font-bold text-white">{course.price}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveCourseModal(course)}
                        className="px-3 py-1.5 text-xs text-gray-300 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-colors cursor-pointer"
                      >
                        커리큘럼 상세
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCourseForInquiry(course.title);
                          setIsInquiryModalOpen(true);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#9333EA] hover:bg-[#7E22CE] rounded-lg transition-colors cursor-pointer"
                      >
                        신청
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-gradient-to-br from-[#121216] to-[#181820] border border-white/[0.08] rounded-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs text-purple-400 font-semibold tracking-wide">
                FACULTY & ADVISORS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                현업 최전선의 전문 강사진이 직접 전담 지도합니다
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                이론에만 치우친 강사가 아닌, 실제 기업 DX 프로젝트를 컨설팅하고 수천 건의 사내 데이터 문제를 해결해 온 마스터들이 수강생의 러닝 커브를 책임집니다.
              </p>
              <button
                onClick={() => {
                  setCurrentPage('instructors');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 pt-2 cursor-pointer"
              >
                <span>강사진 프로필 및 경력 전체보기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className={`lg:col-span-7 grid ${instructors.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 max-w-lg'} gap-4`}>
              {instructors.slice(0, 2).map((inst) => (
                <div
                  key={inst.id}
                  className="p-5 bg-black/40 border border-white/10 rounded-xl flex items-center gap-4 hover:border-purple-500/30 transition-colors"
                >
                  <img
                    src={inst.image}
                    alt={inst.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-xl object-cover shrink-0 border border-white/10"
                  />
                  <div className="space-y-1 min-w-0">
                    <div className="text-xs text-purple-400 font-medium">{inst.role}</div>
                    <div className="text-base font-bold text-white">{inst.name} 대표</div>
                    <div className="text-xs text-gray-300 truncate">{inst.career[0] || inst.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="text-xs text-purple-400 font-semibold tracking-wide">
              STUDENT & CLIENT REVIEWS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              수강생과 기업 고객이 증명하는 실제 교육 성과
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                onClick={() => setActivePostModal(rev)}
                className="p-6 bg-[#121216] border border-white/[0.08] rounded-2xl hover:border-purple-500/40 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-500">{rev.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    "{rev.title}"
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                    {rev.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{rev.author}</span>
                    <span className="text-gray-500 ml-2">{rev.companyOrRole}</span>
                  </div>
                  <span className="text-purple-400 text-[11px]">후기 전문 보기 →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Notice & Columns Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs text-purple-400 font-semibold tracking-wide">
                INSIGHTS & ANNOUNCEMENTS
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                최신 공지 및 실무 칼럼
              </h2>
            </div>
            <button
              onClick={() => {
                setCurrentPage('community');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 cursor-pointer"
            >
              더보기 →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setActivePostModal(post)}
                className="p-5 bg-[#121216] border border-white/[0.08] rounded-xl hover:border-purple-500/40 transition-colors cursor-pointer space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-purple-400">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="text-[11px] text-gray-500 pt-2 border-t border-white/[0.04]">
                  작성자: {post.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/70 via-[#181824] to-black border border-purple-500/30 text-center space-y-6 relative overflow-hidden shadow-[0_0_40px_rgba(147,51,234,0.2)]">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              업무의 패러다임을 바꿀 준비가 되셨습니까?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              개인 커리어 성장을 위한 주말 정규반부터, 기업의 전사 생산성을 극대화하는 맞춤형 사내 출강까지 Midam교육 연구소가 최적의 해답을 제시합니다.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-semibold text-white bg-[#9333EA] hover:bg-[#A855F7] rounded-xl shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>지금 수강 및 출강 상담 받기</span>
            </button>
            <button
              onClick={() => {
                setCurrentPage('community');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 text-xs sm:text-sm font-medium text-gray-300 hover:text-white rounded-xl border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
            >
              무료 학습자료 둘러보기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
