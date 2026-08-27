import { useState } from 'react';
import { Copy, Check, Hash, FileText, Share2 } from 'lucide-react';
import { copyToClipboard } from '../lib/utils';

export default function OutputDisplay({ result, onCopy }) {
  const [activeTab, setActiveTab] = useState('listing');
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (text, field) => {
    await copyToClipboard(text);
    setCopiedField(field);
    onCopy?.();
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!result) return null;

  const tabs = [
    { id: 'listing', label: 'Listing', icon: FileText },
    { id: 'seo', label: 'SEO Tags', icon: Hash },
    { id: 'social', label: 'Social Posts', icon: Share2 },
  ];

  return (
    <div className="glass rounded-2xl border border-slate-700/40 overflow-hidden animate-fade-in">
      <div className="flex border-b border-slate-700/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-300 bg-indigo-500/5'
                : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 lg:p-8">
        {activeTab === 'listing' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Optimized Title</label>
                <button
                  onClick={() => handleCopy(result.title, 'title')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {copiedField === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedField === 'title' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/30 text-sm text-slate-200 leading-relaxed">
                {result.title}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Product Description</label>
                <button
                  onClick={() => handleCopy(result.description, 'desc')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {copiedField === 'desc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedField === 'desc' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/30 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {result.description}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                13 High-Volume SEO Tags
              </label>
              <button
                onClick={() => handleCopy(result.tags?.join(', '), 'alltags')}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copiedField === 'alltags' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.tags?.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => handleCopy(tag, `tag-${i}`)}
                  className={`group flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    copiedField === `tag-${i}`
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-800/60 border-slate-700/40 text-slate-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300'
                  }`}
                >
                  {copiedField === `tag-${i}` ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Hash className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400" />
                  )}
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Instagram Caption</label>
                <button
                  onClick={() => handleCopy(result.social_caption, 'ig')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {copiedField === 'ig' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedField === 'ig' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/30 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {result.social_caption}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
