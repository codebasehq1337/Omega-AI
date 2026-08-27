import { CheckCircle } from 'lucide-react';

export default function Toast({ message, visible }) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
      <div className="glass-strong px-5 py-3 rounded-2xl flex items-center gap-3 shadow-2xl shadow-black/40 border border-emerald-500/20">
        <CheckCircle className="w-5 h-5 text-emerald-400" />
        <span className="text-sm font-medium text-slate-200">{message}</span>
      </div>
    </div>
  );
}
