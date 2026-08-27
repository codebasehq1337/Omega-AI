import { useState } from 'react';
import { Sparkles, Menu, X, Settings } from 'lucide-react';

export default function Navbar({ onNavigate, onOpenSettings, currentView }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-700/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Omega</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {currentView === 'landing' ? (
            <>
              <a href="#features" className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50">Features</a>
              <a href="#pricing" className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50">Pricing</a>
              <a href="#faq" className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50">FAQ</a>
              <button onClick={() => onNavigate('dashboard')} className="btn-primary text-sm ml-3">Try Omega Free</button>
            </>
          ) : (
            <>
              <button onClick={() => onNavigate('landing')} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50">Home</button>
              <button onClick={onOpenSettings} className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50">
                <Settings className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        <button className="md:hidden p-2 text-slate-400" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-slate-700/30 px-6 py-4 space-y-2">
          {currentView === 'landing' ? (
            <>
              <a href="#features" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50">Features</a>
              <a href="#pricing" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50">Pricing</a>
              <a href="#faq" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50">FAQ</a>
              <button onClick={() => { onNavigate('dashboard'); setMobileOpen(false); }} className="w-full btn-primary text-sm mt-2">Try Omega Free</button>
            </>
          ) : (
            <>
              <button onClick={() => { onNavigate('landing'); setMobileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50">Home</button>
              <button onClick={() => { onOpenSettings(); setMobileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50">Settings</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
