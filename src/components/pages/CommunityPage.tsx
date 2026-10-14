import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostType } from '../../types';
import { Search, Pin, Download, Eye, Calendar, User, Star, FileText } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { posts, setActivePostModal } = useApp();
  const [selectedTab, setSelectedTab] = useState<'all' | PostType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs: { label: string; value: 'all' | PostType }[] = [
    { label: '전체 보기', value: 'all' },
    { label: '공지사항', value: 'notice' },
    { label: '실무 칼럼', value: 'column' },
    { label: '학습 자료실', value: 'resource' },
    { label: '수강 후기', value: 'review' },
  ];

  const filteredPosts = posts.filter((p) => {
    const matchesTab = selectedTab === 'all' || p.type === selectedTab;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.excerpt.toLowerCase().includes(query) ||
      p.author.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(query)));
    return matchesTab && matchesQuery;
  });

  // Sort pinned first
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold tracking-wide">
          <span>COMMUNITY & KNOWLEDGE BASE</span>
          <span aria-hidden="true">·</span>
          <span>소식 및 실무 자료실</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          연구소 소식과 실무에 바로 쓰는 학습 자료실
        </h1>
        <p className="text-sm text-gray-300 leading-relaxed">
          최신 기수 모집 공고부터 현업 실무자를 위한 프롬프트 가이드, 엑셀 템플릿 무료 배포 및 생생한 교육 후기를 확인하세요.
        </p>
      </div>

      {/* Controls Bar: Tabs + Search */}
      <div className="p-4 bg-[#121216] border border-white/[0.08] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/[0.06]">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedTab(tab.value)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedTab === tab.value
                  ? 'bg-purple-900/60 text-white border border-purple-500/40 shadow-[0_0_12px_rgba(147,51,234,0.3)] font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="제목, 내용, 태그 검색..."
            className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Post Cards Grid */}
      <div className="space-y-4">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePostModal(post)}
              className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group ${
                post.pinned
                  ? 'bg-purple-950/20 border-purple-500/30 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(147,51,234,0.15)]'
                  : 'bg-[#121216] border-white/[0.08] hover:border-purple-500/30'
              }`}
            >
              <div className="space-y-2 flex-1">
                {/* Unboxed Metadata without pills */}
                <div className="flex items-center gap-2 text-xs">
                  {post.pinned && (
                    <span className="flex items-center gap-1 text-purple-400 font-semibold">
                      <Pin className="w-3 h-3 fill-current" />
                      <span>중요 안내</span>
                      <span aria-hidden="true">·</span>
                    </span>
                  )}
                  <span className="text-purple-400 font-medium">{post.category}</span>
                  <span aria-hidden="true" className="text-gray-600">·</span>
                  <span className="text-gray-400">{post.date}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors tracking-tight">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Sub info */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-gray-500" />
                    <span>{post.author}</span>
                    {post.companyOrRole && <span>({post.companyOrRole})</span>}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-gray-500" />
                    <span className="tabular-nums">{post.views} 회</span>
                  </span>
                  {post.rating && (
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{post.rating}.0</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action indicator or download pill */}
              <div className="shrink-0 flex items-center justify-end md:justify-center">
                {post.downloadUrl ? (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-200 bg-purple-950/50 border border-purple-500/40 rounded-lg group-hover:bg-purple-900/60 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    <span>자료 다운로드</span>
                  </span>
                ) : (
                  <span className="text-xs text-gray-500 group-hover:text-purple-300 transition-colors">
                    자세히 보기 →
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center space-y-3 bg-[#121216] border border-white/[0.08] rounded-2xl">
            <FileText className="w-8 h-8 text-gray-500 mx-auto" />
            <p className="text-sm text-gray-400">검색 조건에 맞는 게시글이 없습니다.</p>
            <button
              onClick={() => {
                setSelectedTab('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-950/40 cursor-pointer"
            >
              전체 목록 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
