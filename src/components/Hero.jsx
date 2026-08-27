import { ArrowRight, Zap } from 'lucide-react';
import PlanetCanvas from './PlanetCanvas';
import CodePreview from './CodePreview';

export default function Hero({ onTryFree }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden">
      <PlanetCanvas />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/40 text-xs font-medium text-slate-400 mb-8 animate-fade-in">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span>3 platforms • 10 seconds • Zero writer's block</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-slide-up">
          <span className="text-gradient">Turn Product Photos</span>
          <br />
          <span className="text-gradient-indigo">into Sales,</span>
          <br />
          <span className="text-slate-500 font-light">One Listing at a Time.</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Omega writes irresistible titles, SEO-rich descriptions, and viral social captions 
          from just a photo and a few notes. Built for sellers who'd rather ship products than stare at blank pages.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button onClick={onTryFree} className="btn-primary flex items-center gap-2 text-base">
            Try Omega Free
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={onTryFree} className="btn-secondary flex items-center gap-2 text-base">
            See it in action
          </button>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CodePreview />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}
