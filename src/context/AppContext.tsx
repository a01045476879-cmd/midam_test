import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteConfig,
  Curriculum,
  Instructor,
  Post,
  Inquiry,
  InquiryStatus,
} from '../types';
import {
  initialSiteConfig,
  initialCurriculums,
  initialInstructors,
  initialPosts,
  initialInquiries,
} from '../data/initialData';

export type NavPage = 'home' | 'curriculum' | 'instructors' | 'community' | 'admin';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentPage: NavPage;
  setCurrentPage: (page: NavPage) => void;
  siteConfig: SiteConfig;
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  resetSiteConfig: () => void;
  curriculums: Curriculum[];
  addCurriculum: (curriculum: Omit<Curriculum, 'id'>) => void;
  updateCurriculum: (id: string, updated: Partial<Curriculum>) => void;
  deleteCurriculum: (id: string) => void;
  instructors: Instructor[];
  addInstructor: (instructor: Omit<Instructor, 'id'>) => void;
  updateInstructor: (id: string, updated: Partial<Instructor>) => void;
  deleteInstructor: (id: string) => void;
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'views' | 'date'>) => void;
  updatePost: (id: string, updated: Partial<Post>) => void;
  deletePost: (id: string) => void;
  incrementPostViews: (id: string) => void;
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'status' | 'createdAt'>) => void;
  updateInquiryStatus: (id: string, status: InquiryStatus) => void;
  updateInquiryNote: (id: string, note: string) => void;
  deleteInquiry: (id: string) => void;
  activeCourseModal: Curriculum | null;
  setActiveCourseModal: (course: Curriculum | null) => void;
  activePostModal: Post | null;
  setActivePostModal: (post: Post | null) => void;
  isInquiryModalOpen: boolean;
  setIsInquiryModalOpen: (open: boolean) => void;
  selectedCourseForInquiry: string;
  setSelectedCourseForInquiry: (courseTitle: string) => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  resetAllDataToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [activeCourseModal, setActiveCourseModal] = useState<Curriculum | null>(null);
  const [activePostModal, setActivePostModal] = useState<Post | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [selectedCourseForInquiry, setSelectedCourseForInquiry] = useState<string>('');
  const [toast, setToast] = useState<ToastState | null>(null);

  // LocalStorage initialization with fallbacks
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('midam_site_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.ceoName === '강민재') {
          parsed.ceoName = '오숙경';
        }
        return parsed;
      }
      return initialSiteConfig;
    } catch {
      return initialSiteConfig;
    }
  });

  const [curriculums, setCurriculums] = useState<Curriculum[]>(() => {
    try {
      const saved = localStorage.getItem('midam_curriculums');
      return saved ? JSON.parse(saved) : initialCurriculums;
    } catch {
      return initialCurriculums;
    }
  });

  const [instructors, setInstructors] = useState<Instructor[]>(() => {
    try {
      const saved = localStorage.getItem('midam_instructors');
      if (saved) {
        const parsed: Instructor[] = JSON.parse(saved);
        // If parsed contains old instructor Kang Min-jae or Lee Hye-jin, migrate to Oh Sook-kyung
        if (parsed.some((i) => i.name === '강민재' || i.id === 'lead-lee-hyejin')) {
          return initialInstructors;
        }
        return parsed;
      }
      return initialInstructors;
    } catch {
      return initialInstructors;
    }
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem('midam_posts');
      return saved ? JSON.parse(saved) : initialPosts;
    } catch {
      return initialPosts;
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem('midam_inquiries');
      return saved ? JSON.parse(saved) : initialInquiries;
    } catch {
      return initialInquiries;
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('midam_site_config', JSON.stringify(siteConfig));
    } catch (e) {
      console.error(e);
    }
  }, [siteConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('midam_curriculums', JSON.stringify(curriculums));
    } catch (e) {
      console.error(e);
    }
  }, [curriculums]);

  useEffect(() => {
    try {
      localStorage.setItem('midam_instructors', JSON.stringify(instructors));
    } catch (e) {
      console.error(e);
    }
  }, [instructors]);

  useEffect(() => {
    try {
      localStorage.setItem('midam_posts', JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem('midam_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  // Toast handler
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3200);
  };

  // Site Config Actions
  const updateSiteConfig = (updated: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...updated }));
    showToast('사이트 설정이 저장되었습니다.', 'success');
  };

  const resetSiteConfig = () => {
    setSiteConfig(initialSiteConfig);
    showToast('사이트 기본 설정으로 복원되었습니다.', 'info');
  };

  // Curriculums Actions
  const addCurriculum = (newCourse: Omit<Curriculum, 'id'>) => {
    const id = `course-${Date.now()}`;
    const course: Curriculum = { id, ...newCourse };
    setCurriculums((prev) => [course, ...prev]);
    showToast(`"${course.title}" 교육과정이 등록되었습니다.`, 'success');
  };

  const updateCurriculum = (id: string, updated: Partial<Curriculum>) => {
    setCurriculums((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
    showToast('교육과정 정보가 수정되었습니다.', 'success');
  };

  const deleteCurriculum = (id: string) => {
    setCurriculums((prev) => prev.filter((c) => c.id !== id));
    showToast('교육과정이 삭제되었습니다.', 'info');
  };

  // Instructors Actions
  const addInstructor = (inst: Omit<Instructor, 'id'>) => {
    const id = `inst-${Date.now()}`;
    setInstructors((prev) => [...prev, { id, ...inst }]);
    showToast(`강사 "${inst.name}"님이 등록되었습니다.`, 'success');
  };

  const updateInstructor = (id: string, updated: Partial<Instructor>) => {
    setInstructors((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updated } : i))
    );
    showToast('강사진 정보가 수정되었습니다.', 'success');
  };

  const deleteInstructor = (id: string) => {
    setInstructors((prev) => prev.filter((i) => i.id !== id));
    showToast('강사 프로필이 삭제되었습니다.', 'info');
  };

  // Posts Actions
  const addPost = (newPost: Omit<Post, 'id' | 'views' | 'date'>) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
    const post: Post = {
      id: `post-${Date.now()}`,
      views: 1,
      date: dateStr,
      ...newPost,
    };
    setPosts((prev) => [post, ...prev]);
    showToast('새 게시글이 등록되었습니다.', 'success');
  };

  const updatePost = (id: string, updated: Partial<Post>) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    showToast('게시글이 성공적으로 수정되었습니다.', 'success');
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    showToast('게시글이 삭제되었습니다.', 'info');
  };

  const incrementPostViews = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, views: p.views + 1 } : p))
    );
  };

  // Inquiry Actions
  const addInquiry = (data: Omit<Inquiry, 'id' | 'status' | 'createdAt'>) => {
    const now = new Date();
    const createdAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      status: 'received',
      createdAt,
      ...data,
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    showToast('수강 및 상담 문의가 정상적으로 접수되었습니다. 담당자가 신속히 연락드리겠습니다.', 'success');
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast('문의 처리 상태가 변경되었습니다.', 'info');
  };

  const updateInquiryNote = (id: string, adminNote: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, adminNote } : inq))
    );
    showToast('관리자 메모가 저장되었습니다.', 'success');
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    showToast('문의 내역이 삭제되었습니다.', 'info');
  };

  const resetAllDataToDefault = () => {
    setSiteConfig(initialSiteConfig);
    setCurriculums(initialCurriculums);
    setInstructors(initialInstructors);
    setPosts(initialPosts);
    setInquiries(initialInquiries);
    localStorage.clear();
    showToast('모든 데이터가 초기 샘플 상태로 리셋되었습니다.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        siteConfig,
        updateSiteConfig,
        resetSiteConfig,
        curriculums,
        addCurriculum,
        updateCurriculum,
        deleteCurriculum,
        instructors,
        addInstructor,
        updateInstructor,
        deleteInstructor,
        posts,
        addPost,
        updatePost,
        deletePost,
        incrementPostViews,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        updateInquiryNote,
        deleteInquiry,
        activeCourseModal,
        setActiveCourseModal,
        activePostModal,
        setActivePostModal,
        isInquiryModalOpen,
        setIsInquiryModalOpen,
        selectedCourseForInquiry,
        setSelectedCourseForInquiry,
        toast,
        showToast,
        resetAllDataToDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
