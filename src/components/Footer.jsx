import { Sparkles, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold">Omega</span>
        </div>

        <p className="text-sm text-slate-500">© 2026 Omega. Built for sellers, by sellers.</p>

        <div className="flex items-center gap-4">
          <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
}
