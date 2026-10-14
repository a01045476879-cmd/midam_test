import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <aside
      aria-label="알림"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 bg-[#121217]/95 border-purple-500/30 text-white"
    >
      {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
      {toast.type === 'info' && <Info className="w-4 h-4 text-purple-400 shrink-0" />}
      {toast.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
      <span className="text-xs font-medium">{toast.message}</span>
    </aside>
  );
};
