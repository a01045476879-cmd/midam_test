export type CourseCategory = '전체' | 'AI 실무' | '컴퓨터 OA' | '기업 맞춤 출강';
export type CourseLevel = '입문' | '중급' | '실무 심화' | '임직원 맞춤';

export interface Curriculum {
  id: string;
  title: string;
  category: 'AI 실무' | '컴퓨터 OA' | '기업 맞춤 출강';
  target: string;
  level: CourseLevel;
  duration: string;
  price: string;
  summary: string;
  image: string;
  keyPoints: string[];
  syllabus: { weekOrStep: string; title: string; content: string }[];
  tools: string[];
  featured: boolean;
  active: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  title: string;
  image: string;
  introduction: string;
  career: string[];
  specialties: string[];
  books?: string[];
}

export type PostType = 'notice' | 'column' | 'resource' | 'review';

export interface Post {
  id: string;
  type: PostType;
  category: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  downloadUrl?: string;
  downloadName?: string;
  fileSize?: string;
  views: number;
  pinned?: boolean;
  companyOrRole?: string;
  rating?: number;
}

export type InquiryStatus = 'received' | 'consulting' | 'completed';

export interface Inquiry {
  id: string;
  applicantName: string;
  organization?: string;
  email: string;
  phone: string;
  category: 'AI 실무 과정' | '컴퓨터 OA 과정' | '기업 맞춤 출강' | '1:1 방문 컨설팅' | '기타 문의';
  targetCourse?: string;
  headcount?: string;
  message: string;
  status: InquiryStatus;
  adminNote?: string;
  createdAt: string;
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
}

export interface SocialLinks {
  youtube: string;
  blog: string;
  instagram: string;
  kakao: string;
}

export interface SiteConfig {
  siteName: string;
  englishName: string;
  tagline: string;
  subTagline: string;
  instituteIntro: string;
  accentColor: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  businessNumber: string;
  ceoName: string;
  operatingHours: string;
  socialLinks: SocialLinks;
  seo: SeoSettings;
}
