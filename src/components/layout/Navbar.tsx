import React, { useState } from 'react';
import { useApp, NavPage } from '../../context/AppContext';
import { ShieldCheck, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, siteConfig, setIsInquiryModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: NavPage }[] = [
    { label: '홈', page: 'home' },
    { label: '교육과정', page: 'curriculum' },
    { label: '강사진', page: 'instructors' },
    { label: '커뮤니티·자료실', page: 'community' },
  ];

  const handleNavClick = (page: NavPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0B0B0E]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9333EA] to-[#6B21A8] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(147,51,234,0.4)]">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors whitespace-nowrap">
              {siteConfig.siteName}
            </span>
            <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase -mt-0.5">
              AI & OA Institute
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Single-line text links) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-300">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`transition-colors whitespace-nowrap py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9333EA] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Admin Mode Toggle */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
              currentPage === 'admin'
                ? 'bg-purple-950/80 text-purple-200 border-purple-500/50 shadow-[0_0_12px_rgba(147,51,234,0.3)]'
                : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20 bg-white/[0.02]'
            }`}
            title="관리자 설정 및 게시글/SEO 관리"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>관리자 모드</span>
          </button>

          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#9333EA] to-[#7E22CE] rounded-lg hover:from-[#A855F7] hover:to-[#9333EA] shadow-[0_0_20px_rgba(147,51,234,0.35)] transition-all cursor-pointer whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>수강 및 출강 문의</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => handleNavClick('admin')}
            className="p-2 text-xs text-purple-400 border border-purple-500/30 rounded-lg bg-purple-950/40"
            aria-label="관리자"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0E0E12] px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === item.page
                  ? 'bg-purple-950/60 text-purple-200 border border-purple-500/30'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsInquiryModalOpen(true);
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#9333EA] rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.4)]"
            >
              수강 및 출강 문의 신청
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
