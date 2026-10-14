import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Clock, Youtube, BookOpen, Instagram, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteConfig, setCurrentPage, setIsInquiryModalOpen } = useApp();

  return (
    <footer className="border-t border-white/[0.08] bg-[#070709] text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission (Col 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#9333EA] to-[#6B21A8] flex items-center justify-center text-white font-bold text-xs shadow-[0_0_12px_rgba(147,51,234,0.3)]">
                M
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {siteConfig.siteName}
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed pr-6 max-w-md">
              {siteConfig.instituteIntro}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500/40 transition-colors"
                title="공식 유튜브 채널"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/40 transition-colors"
                title="네이버 공식 블로그"
              >
                <BookOpen className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                title="인스타그램 공식 계정"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-500/40 transition-colors"
                title="카카오톡 채널 상담"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
              교육 프로그램
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('curriculum');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  ChatGPT 비즈니스 자동화
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('curriculum');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  실무 엑셀 & 파워쿼리
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('curriculum');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  생성형 AI 기초 프롬프트
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('curriculum');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  기업 및 공공기관 맞춤 출강
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
              연구소 안내
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('instructors');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  전문 강사진 프로필
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('community');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  공지사항 및 모집요강
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('community');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  무료 실무 학습자료실
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  1:1 수강 및 단체출강 문의
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
              고객지원 & 상담
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="font-mono">{siteConfig.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="font-mono">{siteConfig.contactEmail}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-gray-500">
                <Clock className="w-3 h-3 text-gray-500 shrink-0" />
                <span>{siteConfig.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>상호: {siteConfig.siteName}</span>
            <span>·</span>
            <span>대표자: {siteConfig.ceoName}</span>
            <span>·</span>
            <span>사업자등록번호: {siteConfig.businessNumber}</span>
          </div>
          <div>
            © 2026 {siteConfig.siteName}. All Rights Reserved. Designed for Professional Excellence.
          </div>
        </div>
      </div>
    </footer>
  );
};
