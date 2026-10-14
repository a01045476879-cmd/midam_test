import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Curriculum, Post, PostType, InquiryStatus, CourseCategory, CourseLevel } from '../../types';
import {
  Sliders,
  BookOpen,
  FileEdit,
  Mail,
  Globe,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  CheckCircle,
  Eye,
  Share2,
  Search,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    siteConfig,
    updateSiteConfig,
    resetSiteConfig,
    curriculums,
    addCurriculum,
    updateCurriculum,
    deleteCurriculum,
    posts,
    addPost,
    updatePost,
    deletePost,
    inquiries,
    updateInquiryStatus,
    updateInquiryNote,
    deleteInquiry,
    resetAllDataToDefault,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'site' | 'courses' | 'posts' | 'inquiries' | 'seo'>('site');

  // Site Config Form State
  const [siteForm, setSiteForm] = useState(siteConfig);

  // Course Form State (Create / Edit)
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState<Omit<Curriculum, 'id'>>({
    title: '',
    category: 'AI 실무',
    target: '',
    level: '중급',
    duration: '4주 과정',
    price: '400,000원',
    summary: '',
    image: '/src/assets/images/curriculum_ai_automation_1791960263696.jpg',
    keyPoints: ['', '', ''],
    syllabus: [
      { weekOrStep: '1주차', title: '', content: '' },
      { weekOrStep: '2주차', title: '', content: '' },
    ],
    tools: ['ChatGPT', 'Excel'],
    featured: true,
    active: true,
  });

  // Post Form State (Create / Edit)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postForm, setPostForm] = useState<Omit<Post, 'id' | 'views' | 'date'>>({
    type: 'notice',
    category: '일반안내',
    title: '',
    author: 'Midam 교육운영팀',
    excerpt: '',
    content: '',
    tags: ['실무교육'],
    downloadUrl: '',
    downloadName: '',
    fileSize: '',
    pinned: false,
    companyOrRole: '',
    rating: 5,
  });

  // Inquiry Filter & Active Note editing
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [notesState, setNotesState] = useState<{ [id: string]: string }>({});

  // SEO Form State
  const [seoForm, setSeoForm] = useState(siteConfig.seo);

  // Accent color presets
  const colorPresets = [
    { label: '일렉트릭 퍼플 (기본)', value: '#9333EA' },
    { label: '네온 바이올렛', value: '#8A2BE2' },
    { label: '딥 사이언 블루', value: '#0EA5E9' },
    { label: '로열 에메랄드', value: '#10B981' },
    { label: '선셋 앰버', value: '#F59E0B' },
  ];

  // Save Site Config
  const handleSaveSiteConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(siteForm);
  };

  // Course handlers
  const handleOpenAddCourse = () => {
    setEditingCourseId(null);
    setCourseForm({
      title: '',
      category: 'AI 실무',
      target: '',
      level: '중급',
      duration: '4주 과정 (주 1회)',
      price: '450,000원',
      summary: '',
      image: '/src/assets/images/curriculum_ai_automation_1791960263696.jpg',
      keyPoints: ['실무 맞춤형 프로젝트 실습', '1:1 밀착 피드백 제공', '사내 적용 가능한 템플릿 배포'],
      syllabus: [
        { weekOrStep: '1주차', title: '핵심 기본 원리 및 환경 설정', content: '기초 개념 이해 및 실습 준비' },
        { weekOrStep: '2주차', title: '실무 프로젝트 분석 및 적용', content: '현업 케이스 스터디 및 템플릿 완성' },
      ],
      tools: ['ChatGPT', 'Excel', 'Python'],
      featured: false,
      active: true,
    });
    setIsCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course: Curriculum) => {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      category: course.category,
      target: course.target,
      level: course.level,
      duration: course.duration,
      price: course.price,
      summary: course.summary,
      image: course.image,
      keyPoints: [...course.keyPoints],
      syllabus: [...course.syllabus],
      tools: [...course.tools],
      featured: course.featured,
      active: course.active,
    });
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title.trim()) {
      showToast('교육과정 제목을 입력해 주세요.', 'error');
      return;
    }
    if (editingCourseId) {
      updateCurriculum(editingCourseId, courseForm);
    } else {
      addCurriculum(courseForm);
    }
    setIsCourseModalOpen(false);
  };

  // Post handlers
  const handleOpenAddPost = () => {
    setEditingPostId(null);
    setPostForm({
      type: 'notice',
      category: '공지사항',
      title: '',
      author: 'Midam 교육운영팀',
      excerpt: '',
      content: '',
      tags: ['공지', '교육안내'],
      downloadUrl: '',
      downloadName: '',
      fileSize: '',
      pinned: false,
      companyOrRole: '',
      rating: 5,
    });
    setIsPostModalOpen(true);
  };

  const handleOpenEditPost = (post: Post) => {
    setEditingPostId(post.id);
    setPostForm({
      type: post.type,
      category: post.category,
      title: post.title,
      author: post.author,
      excerpt: post.excerpt,
      content: post.content,
      tags: [...post.tags],
      downloadUrl: post.downloadUrl || '',
      downloadName: post.downloadName || '',
      fileSize: post.fileSize || '',
      pinned: !!post.pinned,
      companyOrRole: post.companyOrRole || '',
      rating: post.rating || 5,
    });
    setIsPostModalOpen(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title.trim()) {
      showToast('게시글 제목을 입력해 주세요.', 'error');
      return;
    }
    if (editingPostId) {
      updatePost(editingPostId, postForm);
    } else {
      addPost(postForm);
    }
    setIsPostModalOpen(false);
  };

  // SEO Save
  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig({ seo: seoForm });
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryStatusFilter === 'all') return true;
    return inq.status === inquiryStatusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Top Header */}
      <div className="p-6 bg-[#121216] border border-purple-500/30 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_25px_rgba(147,51,234,0.15)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
            <Sliders className="w-3.5 h-3.5" />
            <span>MIDAM ADMIN CONTROL CENTER</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            통합 관리자 대시보드
          </h1>
          <p className="text-xs text-gray-400">
            사이트 문구, 교육과정, 게시글, 수강 및 출강 문의, SEO 메타 정보를 실시간으로 관리합니다.
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('모든 데이터를 초기 샘플 데이터로 복원하시겠습니까? (직접 추가한 데이터는 초기화됩니다)')) {
              resetAllDataToDefault();
            }
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs text-rose-300 hover:text-white border border-rose-500/30 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>샘플 데이터 전체 복원</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121216] border border-white/[0.08] rounded-xl">
        {[
          { key: 'site', label: '사이트 설정 & 테마', icon: Sliders },
          { key: 'courses', label: '교육과정 관리', icon: BookOpen },
          { key: 'posts', label: '게시글 & 자료실 관리', icon: FileEdit },
          { key: 'inquiries', label: `수강/출강 문의 (${inquiries.length})`, icon: Mail },
          { key: 'seo', label: 'SEO & 소셜 메타 도구', icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#9333EA] text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Site Config & Theme */}
      {activeTab === 'site' && (
        <form onSubmit={handleSaveSiteConfig} className="p-6 sm:p-8 bg-[#121216] border border-white/[0.08] rounded-2xl space-y-6">
          <div className="border-b border-white/[0.06] pb-4">
            <h2 className="text-base font-bold text-white">사이트 기본 정보 및 브랜딩</h2>
            <p className="text-xs text-gray-400">웹사이트에 실시간 반영되는 상호명, 슬로건, 연락처 및 컬러 테마를 설정합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">연구소 명칭 (한글)</label>
              <input
                type="text"
                value={siteForm.siteName}
                onChange={(e) => setSiteForm({ ...siteForm, siteName: e.target.value })}
                className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">영문 명칭</label>
              <input
                type="text"
                value={siteForm.englishName}
                onChange={(e) => setSiteForm({ ...siteForm, englishName: e.target.value })}
                className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">메인 슬로건 (헤드카피)</label>
            <input
              type="text"
              value={siteForm.tagline}
              onChange={(e) => setSiteForm({ ...siteForm, tagline: e.target.value })}
              className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">보조 슬로건 (서브카피)</label>
            <input
              type="text"
              value={siteForm.subTagline}
              onChange={(e) => setSiteForm({ ...siteForm, subTagline: e.target.value })}
              className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">연구소 소개문</label>
            <textarea
              rows={3}
              value={siteForm.instituteIntro}
              onChange={(e) => setSiteForm({ ...siteForm, instituteIntro: e.target.value })}
              className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Accent Color Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-300">포인트 테마 컬러 (Accent Color)</label>
            <div className="flex flex-wrap items-center gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setSiteForm({ ...siteForm, accentColor: preset.value })}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                    siteForm.accentColor === preset.value
                      ? 'border-purple-400 bg-purple-950/50 text-white'
                      : 'border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.value }} />
                  <span>{preset.label}</span>
                </button>
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={siteForm.accentColor}
                  onChange={(e) => setSiteForm({ ...siteForm, accentColor: e.target.value })}
                  className="w-8 h-8 rounded border border-white/10 bg-transparent cursor-pointer"
                />
                <span className="text-xs font-mono text-gray-400">{siteForm.accentColor}</span>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="border-t border-white/[0.06] pt-6 space-y-4">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">대표 연락처 및 사업자 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">대표 전화</label>
                <input
                  type="text"
                  value={siteForm.contactPhone}
                  onChange={(e) => setSiteForm({ ...siteForm, contactPhone: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">대표 이메일</label>
                <input
                  type="email"
                  value={siteForm.contactEmail}
                  onChange={(e) => setSiteForm({ ...siteForm, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">사업자등록번호</label>
                <input
                  type="text"
                  value={siteForm.businessNumber}
                  onChange={(e) => setSiteForm({ ...siteForm, businessNumber: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">연구소 주소</label>
              <input
                type="text"
                value={siteForm.address}
                onChange={(e) => setSiteForm({ ...siteForm, address: e.target.value })}
                className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={resetSiteConfig}
              className="px-4 py-2 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              기본값 복원
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#9333EA] hover:bg-[#7E22CE] rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>설정 저장하기</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Curriculums Management */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">교육과정 관리 ({curriculums.length}개)</h2>
            <button
              onClick={handleOpenAddCourse}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#9333EA] hover:bg-[#7E22CE] rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>신규 교육과정 추가</span>
            </button>
          </div>

          <div className="space-y-3">
            {curriculums.map((course) => (
              <div
                key={course.id}
                className="p-4 sm:p-5 bg-[#121216] border border-white/[0.08] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-12 rounded-lg object-cover shrink-0 border border-white/10"
                  />
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      <span className="text-purple-400 font-semibold">{course.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span>난이도: {course.level}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white truncate">{course.title}</h3>
                    <div className="text-xs text-gray-400 font-mono">{course.price}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  <button
                    onClick={() => updateCurriculum(course.id, { featured: !course.featured })}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                      course.featured
                        ? 'bg-purple-950/60 border-purple-500/40 text-purple-200'
                        : 'border-white/10 text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    추천 {course.featured ? 'ON' : 'OFF'}
                  </button>
                  <button
                    onClick={() => updateCurriculum(course.id, { active: !course.active })}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                      course.active
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'border-white/10 text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    게시 {course.active ? '활성' : '숨김'}
                  </button>
                  <button
                    onClick={() => handleOpenEditCourse(course)}
                    className="p-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="수정"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`"${course.title}" 과정을 삭제하시겠습니까?`)) {
                        deleteCurriculum(course.id);
                      }
                    }}
                    className="p-1.5 rounded-lg border border-rose-500/20 text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Posts & Resources */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">게시글 및 자료실 관리 ({posts.length}건)</h2>
            <button
              onClick={handleOpenAddPost}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#9333EA] hover:bg-[#7E22CE] rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>새 게시글 작성</span>
            </button>
          </div>

          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-[#121216] border border-white/[0.08] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span className="text-purple-400 font-semibold">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>유형: {post.type}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>조회 {post.views}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white truncate">{post.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1">{post.excerpt}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  <button
                    onClick={() => updatePost(post.id, { pinned: !post.pinned })}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                      post.pinned
                        ? 'bg-purple-950/60 border-purple-500/40 text-purple-200'
                        : 'border-white/10 text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    상단고정 {post.pinned ? 'ON' : 'OFF'}
                  </button>
                  <button
                    onClick={() => handleOpenEditPost(post)}
                    className="p-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="수정"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`"${post.title}" 글을 삭제하시겠습니까?`)) {
                        deletePost(post.id);
                      }
                    }}
                    className="p-1.5 rounded-lg border border-rose-500/20 text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Inquiries CRM */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white">수강 및 출강 상담 접수 내역</h2>
              <p className="text-xs text-gray-400">웹사이트 방문자가 접수한 문의 목록입니다.</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/[0.06] text-xs">
              {(['all', 'received', 'consulting', 'completed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setInquiryStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    inquiryStatusFilter === st
                      ? 'bg-purple-900/60 text-white font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {st === 'all' ? '전체' : st === 'received' ? '신규 접수' : st === 'consulting' ? '상담중' : '완료'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 bg-[#121216] border border-white/[0.08] rounded-2xl space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.04] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white">{inq.applicantName}</span>
                      {inq.organization && (
                        <span className="text-xs text-gray-400">({inq.organization})</span>
                      )}
                      <span className="text-xs text-purple-400 font-medium">[{inq.category}]</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-gray-500 font-mono">{inq.createdAt}</span>
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                        className={`text-xs px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          inq.status === 'received'
                            ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                            : inq.status === 'consulting'
                            ? 'bg-purple-950/40 border-purple-500/40 text-purple-300'
                            : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        }`}
                      >
                        <option value="received" className="bg-[#18181C]">신규 접수</option>
                        <option value="consulting" className="bg-[#18181C]">상담 진행중</option>
                        <option value="completed" className="bg-[#18181C]">상담 완료</option>
                      </select>
                      <button
                        onClick={() => {
                          if (confirm('이 문의 내역을 삭제하시겠습니까?')) {
                            deleteInquiry(inq.id);
                          }
                        }}
                        className="p-1 text-gray-500 hover:text-rose-400"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-300">
                    <div>
                      <span className="text-gray-500">연락처: </span>
                      <span className="font-mono text-white">{inq.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">이메일: </span>
                      <span className="font-mono text-white">{inq.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">희망과정/인원: </span>
                      <span className="text-white">{inq.targetCourse || '미지정'} {inq.headcount ? `(${inq.headcount})` : ''}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl text-xs text-gray-300 leading-relaxed">
                    <span className="text-gray-500 block text-[11px] mb-1 font-semibold">문의 내용:</span>
                    {inq.message}
                  </div>

                  {/* Internal Admin Note */}
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="관리자 내부 메모 입력 (예: 3/16 견적서 발송 완료)..."
                      value={notesState[inq.id] !== undefined ? notesState[inq.id] : (inq.adminNote || '')}
                      onChange={(e) => setNotesState({ ...notesState, [inq.id]: e.target.value })}
                      className="flex-1 px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={() => {
                        const note = notesState[inq.id] !== undefined ? notesState[inq.id] : (inq.adminNote || '');
                        updateInquiryNote(inq.id, note);
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-purple-300 hover:text-white border border-purple-500/30 rounded-lg hover:bg-purple-950/40 cursor-pointer"
                    >
                      메모 저장
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-gray-500 bg-[#121216] rounded-2xl border border-white/[0.08]">
                접수된 문의 내역이 없습니다.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: SEO & Social Metadata Tools */}
      {activeTab === 'seo' && (
        <form onSubmit={handleSaveSeo} className="p-6 sm:p-8 bg-[#121216] border border-white/[0.08] rounded-2xl space-y-8">
          <div className="border-b border-white/[0.06] pb-4">
            <h2 className="text-base font-bold text-white">SEO 최적화 및 소셜 미디어 공유 카드 도구</h2>
            <p className="text-xs text-gray-400">구글 검색 엔진 및 카카오톡, 페이스북, 슬랙 공유 시 노출될 메타 정보를 실시간으로 수정하고 시뮬레이션합니다.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Edit inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  페이지 메타 타이틀 (Title Tag)
                </label>
                <input
                  type="text"
                  value={seoForm.metaTitle}
                  onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <span className="text-[11px] text-gray-500 mt-1 block">권장 길이: 30~60자 (현재 {seoForm.metaTitle.length}자)</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  메타 디스크립션 (Meta Description)
                </label>
                <textarea
                  rows={3}
                  value={seoForm.metaDescription}
                  onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <span className="text-[11px] text-gray-500 mt-1 block">권장 길이: 120~160자 (현재 {seoForm.metaDescription.length}자)</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  핵심 검색 키워드 (Meta Keywords)
                </label>
                <input
                  type="text"
                  value={seoForm.keywords}
                  onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  오픈그래프(OG) 대표 썸네일 이미지 URL
                </label>
                <input
                  type="text"
                  value={seoForm.ogImage}
                  onChange={(e) => setSeoForm({ ...seoForm, ogImage: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  표준 웹사이트 URL (Canonical)
                </label>
                <input
                  type="text"
                  value={seoForm.canonicalUrl}
                  onChange={(e) => setSeoForm({ ...seoForm, canonicalUrl: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#9333EA] hover:bg-[#7E22CE] rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>SEO 설정 저장 및 사이트 적용</span>
                </button>
              </div>
            </div>

            {/* Right Live Simulation Previews */}
            <div className="space-y-6">
              {/* Google Search Result Preview */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-300">
                  <Search className="w-3.5 h-3.5 text-purple-400" />
                  <span>Google 검색결과 노출 실시간 미리보기</span>
                </div>
                <div className="p-4 bg-white rounded-xl text-black space-y-1 shadow-sm font-sans">
                  <div className="flex items-center gap-2 text-xs text-[#202124]">
                    <div className="w-4 h-4 rounded-full bg-[#9333EA] text-white text-[9px] flex items-center justify-center font-bold">M</div>
                    <span className="text-[#202124]">{siteConfig.siteName}</span>
                    <span className="text-[#5f6368] text-[11px] truncate">{seoForm.canonicalUrl}</span>
                  </div>
                  <h3 className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer truncate">
                    {seoForm.metaTitle || '페이지 제목'}
                  </h3>
                  <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                    {seoForm.metaDescription || '메타 설명이 여기에 표시됩니다.'}
                  </p>
                </div>
              </div>

              {/* Social Media Sharing Card (OG Card) */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-300">
                  <Share2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>SNS 공유 카드 (카카오톡/슬랙/페이스북) 미리보기</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10 bg-[#16161C] shadow-lg max-w-md">
                  <div className="h-44 bg-slate-800 overflow-hidden relative">
                    <img
                      src={seoForm.ogImage || '/src/assets/images/midam_hero_ai_oa_education_1791960263142.jpg'}
                      alt="OG Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3.5 space-y-1">
                    <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                      {seoForm.canonicalUrl.replace('https://', '')}
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {seoForm.metaTitle}
                    </h4>
                    <p className="text-[11px] text-gray-400 line-clamp-2">
                      {seoForm.metaDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Course Create/Edit Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#121216] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4 my-8 max-h-[85vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">
              {editingCourseId ? '교육과정 수정' : '신규 교육과정 등록'}
            </h3>
            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-300 mb-1">과정명</label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="예: 실무 파이썬 업무자동화 4주 완성"
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">카테고리</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                  >
                    <option value="AI 실무" className="bg-[#18181C]">AI 실무</option>
                    <option value="컴퓨터 OA" className="bg-[#18181C]">컴퓨터 OA</option>
                    <option value="기업 맞춤 출강" className="bg-[#18181C]">기업 맞춤 출강</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">난이도</label>
                  <select
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as CourseLevel })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                  >
                    <option value="입문" className="bg-[#18181C]">입문</option>
                    <option value="중급" className="bg-[#18181C]">중급</option>
                    <option value="실무 심화" className="bg-[#18181C]">실무 심화</option>
                    <option value="임직원 맞춤" className="bg-[#18181C]">임직원 맞춤</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">교육 기간 / 시간</label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">수강료 안내</label>
                  <input
                    type="text"
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">과정 개요 요약</label>
                <textarea
                  rows={2}
                  value={courseForm.summary}
                  onChange={(e) => setCourseForm({ ...courseForm, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">수강 대상</label>
                <input
                  type="text"
                  value={courseForm.target}
                  onChange={(e) => setCourseForm({ ...courseForm, target: e.target.value })}
                  placeholder="예: 반복 보고서 업무에 지친 실무자"
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#9333EA] hover:bg-[#7E22CE] rounded-lg"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Create/Edit Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#121216] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4 my-8 max-h-[85vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">
              {editingPostId ? '게시글 수정' : '새 게시글 및 자료 등록'}
            </h3>
            <form onSubmit={handleSavePost} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">글 유형</label>
                  <select
                    value={postForm.type}
                    onChange={(e) => setPostForm({ ...postForm, type: e.target.value as PostType })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                  >
                    <option value="notice" className="bg-[#18181C]">공지사항</option>
                    <option value="column" className="bg-[#18181C]">실무 칼럼</option>
                    <option value="resource" className="bg-[#18181C]">학습 자료실</option>
                    <option value="review" className="bg-[#18181C]">수강 후기</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">분류 카테고리</label>
                  <input
                    type="text"
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                    placeholder="예: 실무자료, 기수모집"
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">제목</label>
                <input
                  type="text"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  placeholder="게시글 제목"
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">작성자</label>
                  <input
                    type="text"
                    value={postForm.author}
                    onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">소속 / 역할 (후기인 경우)</label>
                  <input
                    type="text"
                    value={postForm.companyOrRole}
                    onChange={(e) => setPostForm({ ...postForm, companyOrRole: e.target.value })}
                    placeholder="예: IT기업 마케팅팀"
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">한 줄 요약 (Excerpt)</label>
                <input
                  type="text"
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">본문 내용</label>
                <textarea
                  rows={6}
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  placeholder="게시글 내용을 작성해 주세요."
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                />
              </div>

              {postForm.type === 'resource' && (
                <div className="grid grid-cols-2 gap-4 p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">배포 파일 명칭</label>
                    <input
                      type="text"
                      value={postForm.downloadName}
                      onChange={(e) => setPostForm({ ...postForm, downloadName: e.target.value })}
                      placeholder="예: Excel_CheatSheet.pdf"
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">파일 링크 / URL</label>
                    <input
                      type="text"
                      value={postForm.downloadUrl}
                      onChange={(e) => setPostForm({ ...postForm, downloadUrl: e.target.value })}
                      placeholder="#download-link"
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinned-check"
                  checked={postForm.pinned}
                  onChange={(e) => setPostForm({ ...postForm, pinned: e.target.checked })}
                  className="rounded border-white/10 bg-black/40 text-purple-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="pinned-check" className="text-xs text-gray-300 cursor-pointer">
                  게시판 상단에 고정하기 (중요 공지)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#9333EA] hover:bg-[#7E22CE] rounded-lg"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
