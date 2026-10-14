/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { CurriculumPage } from './components/pages/CurriculumPage';
import { InstructorsPage } from './components/pages/InstructorsPage';
import { CommunityPage } from './components/pages/CommunityPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CourseDetailModal } from './components/modals/CourseDetailModal';
import { PostDetailModal } from './components/modals/PostDetailModal';
import { InquiryModal } from './components/modals/InquiryModal';
import { Toast } from './components/common/Toast';
import { MessageSquareText } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentPage, setIsInquiryModalOpen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0E] text-[#F3F4F6] relative selection:bg-[#9333EA] selection:text-white overflow-x-hidden">
      {/* Subtle global ambient glow accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-900/[0.08] blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[500px] bg-indigo-900/[0.06] blur-[150px] pointer-events-none -z-10" />

      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'curriculum' && <CurriculumPage />}
        {currentPage === 'instructors' && <InstructorsPage />}
        {currentPage === 'community' && <CommunityPage />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      {/* Floating Fast Consultation Action */}
      <button
        onClick={() => setIsInquiryModalOpen(true)}
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#181820]/90 hover:bg-[#20202C] border border-purple-500/40 text-purple-200 text-xs font-semibold shadow-[0_0_20px_rgba(147,51,234,0.3)] backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="빠른 교육 및 출강 상담"
      >
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
        <MessageSquareText className="w-4 h-4 text-purple-400" />
        <span>1:1 빠른 교육 상담</span>
      </button>

      {/* Site Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      <CourseDetailModal />
      <PostDetailModal />
      <InquiryModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
