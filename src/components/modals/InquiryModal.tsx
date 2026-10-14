import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, Sparkles, Send, Building2, User, Phone, Mail, FileText } from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const {
    isInquiryModalOpen,
    setIsInquiryModalOpen,
    selectedCourseForInquiry,
    setSelectedCourseForInquiry,
    addInquiry,
    curriculums,
  } = useApp();

  const [applicantName, setApplicantName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<'AI 실무 과정' | '컴퓨터 OA 과정' | '기업 맞춤 출강' | '1:1 방문 컨설팅' | '기타 문의'>('AI 실무 과정');
  const [targetCourse, setTargetCourse] = useState('');
  const [headcount, setHeadcount] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (selectedCourseForInquiry) {
      setTargetCourse(selectedCourseForInquiry);
      if (selectedCourseForInquiry.includes('출강')) {
        setCategory('기업 맞춤 출강');
      } else if (selectedCourseForInquiry.includes('엑셀') || selectedCourseForInquiry.includes('PPT')) {
        setCategory('컴퓨터 OA 과정');
      } else {
        setCategory('AI 실무 과정');
      }
    }
  }, [selectedCourseForInquiry]);

  if (!isInquiryModalOpen) return null;

  const handleClose = () => {
    setIsInquiryModalOpen(false);
    setSelectedCourseForInquiry('');
    setSubmitted(false);
    setErrors({});
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!applicantName.trim()) errs.applicantName = '이름 또는 담당자명을 입력해 주세요.';
    if (!phone.trim()) {
      errs.phone = '연락처를 입력해 주세요.';
    } else if (!/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(phone.trim().replace(/\s/g, ''))) {
      errs.phone = '올바른 휴대폰 번호 형식을 입력해 주세요 (예: 010-1234-5678).';
    }
    if (!email.trim()) {
      errs.email = '이메일 주소를 입력해 주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = '올바른 이메일 형식을 입력해 주세요.';
    }
    if (!message.trim()) {
      errs.message = '문의 내용 또는 희망 사항을 작성해 주세요.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addInquiry({
      applicantName: applicantName.trim(),
      organization: organization.trim() || undefined,
      email: email.trim(),
      phone: phone.trim(),
      category,
      targetCourse: targetCourse || undefined,
      headcount: headcount.trim() || undefined,
      message: message.trim(),
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#121216] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs text-purple-400 font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Midam 빠른 상담 & 수강 신청</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            수강 및 기업 출강 문의
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            문의 내용을 남겨주시면 연구소 전문 어드바이저가 1 영업일 이내에 상세 견적 및 커리큘럼을 안내드립니다.
          </p>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">
              상담 문의가 성공적으로 접수되었습니다
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md mx-auto">
              작성해주신 연락처(<span className="text-purple-300 font-mono">{phone}</span>)와 이메일(
              <span className="text-purple-300 font-mono">{email}</span>)로 맞춤 교육 안내서 및 제안서를 발송해 드리겠습니다.
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#9333EA] hover:bg-[#7E22CE] rounded-lg transition-colors cursor-pointer"
              >
                확인 완료
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            {/* Category selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                문의 유형 선택 <span className="text-purple-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'AI 실무 과정',
                  '컴퓨터 OA 과정',
                  '기업 맞춤 출강',
                  '1:1 방문 컨설팅',
                  '기타 문의',
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat as any)}
                    className={`px-3 py-2 text-xs rounded-lg border text-center transition-all cursor-pointer whitespace-nowrap truncate ${
                      category === cat
                        ? 'bg-purple-950/60 border-purple-500 text-purple-200 font-semibold shadow-[0_0_10px_rgba(147,51,234,0.3)]'
                        : 'border-white/10 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Course selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                희망 교육과정
              </label>
              <select
                value={targetCourse}
                onChange={(e) => setTargetCourse(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="" className="bg-[#18181C] text-gray-400">
                  희망 교육과정을 선택하세요 (선택 사항)
                </option>
                {curriculums.map((c) => (
                  <option key={c.id} value={c.title} className="bg-[#18181C] text-white">
                    [{c.category}] {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Name & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  이름 / 담당자명 <span className="text-purple-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-500" />
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="홍길동"
                    className={`w-full pl-9 pr-3 py-2 bg-white/[0.03] border rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none transition-colors ${
                      errors.applicantName ? 'border-rose-500' : 'border-white/10 focus:border-purple-500'
                    }`}
                  />
                </div>
                {errors.applicantName && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{errors.applicantName}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  소속 / 기업명 (기업 출강 시)
                </label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-500" />
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="예: (주)한국테크 인사팀"
                    className="w-full pl-9 pr-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Contact details: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  휴대폰 번호 <span className="text-purple-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-1234-5678"
                    className={`w-full pl-9 pr-3 py-2 bg-white/[0.03] border rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none transition-colors ${
                      errors.phone ? 'border-rose-500' : 'border-white/10 focus:border-purple-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{errors.phone}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  이메일 주소 <span className="text-purple-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className={`w-full pl-9 pr-3 py-2 bg-white/[0.03] border rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500' : 'border-white/10 focus:border-purple-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{errors.email}</span>
                )}
              </div>
            </div>

            {/* Headcount */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                희망 인원 또는 일정
              </label>
              <input
                type="text"
                value={headcount}
                onChange={(e) => setHeadcount(e.target.value)}
                placeholder="예: 1명 (개인) 또는 임직원 25명 (4월 중 희망)"
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                문의 및 요청 사항 <span className="text-purple-400">*</span>
              </label>
              <div className="relative">
                <FileText className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-500" />
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="교육 목표, 사전 수준, 해결하고 싶은 업무 문제 등을 자유롭게 적어주세요."
                  className={`w-full pl-9 pr-3 py-2 bg-white/[0.03] border rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none transition-colors ${
                    errors.message ? 'border-rose-500' : 'border-white/10 focus:border-purple-500'
                  }`}
                />
              </div>
              {errors.message && (
                <span className="text-[11px] text-rose-400 mt-1 block">{errors.message}</span>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-white bg-gradient-to-r from-[#9333EA] to-[#7E22CE] rounded-lg hover:from-[#A855F7] hover:to-[#9333EA] shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>상담 및 제안서 신청하기</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
