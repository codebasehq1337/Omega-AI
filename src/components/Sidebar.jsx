import { Sparkles, History, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ activeTab, onTabChange, onOpenSettings, onLogout }) {
  const tabs = [
    { id: 'generate', label: 'Generate', icon: Sparkles },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <aside className="w-64 glass-strong border-r border-slate-700/30 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-lg">Omega</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-1 border-t border-slate-700/30">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </aside>
  );
}
