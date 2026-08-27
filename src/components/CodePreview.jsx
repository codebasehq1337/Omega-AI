import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function CodePreview() {
  const [copied, setCopied] = useState(false);

  const code = `def create_listing(product: str) -> str:
    return f"Sell {product} faster with Omega."

features = ["AI Titles", "SEO Tags", "Social Posts"]

for feat in features:
    print(f"Generating {feat}...")

print(create_listing("Handmade Jewelry"))`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto glass rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-slate-700/40">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-700/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-600" />
          <div className="w-3 h-3 rounded-full bg-slate-600" />
          <div className="w-3 h-3 rounded-full bg-slate-600" />
          <span className="ml-3 text-xs text-slate-500 font-mono">omega.py</span>
        </div>
        <button onClick={handleCopy} className="text-slate-500 hover:text-white transition-colors">
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-5 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed">
          <code>
            <span className="text-purple-400">def</span> <span className="text-blue-400">create_listing</span>(<span className="text-orange-300">product</span>: <span className="text-yellow-300">str</span>) -&gt; <span className="text-yellow-300">str</span>:{'\n'}
            {'    '}<span className="text-purple-400">return</span> <span className="text-green-400">f"Sell {'{'}product{'}'} faster with Omega."</span>{'\n'}
            {'\n'}
            <span className="text-orange-300">features</span> = [<span className="text-green-400">"AI Titles"</span>, <span className="text-green-400">"SEO Tags"</span>, <span className="text-green-400">"Social Posts"</span>]{'\n'}
            {'\n'}
            <span className="text-purple-400">for</span> <span className="text-orange-300">feat</span> <span className="text-purple-400">in</span> <span className="text-orange-300">features</span>:{'\n'}
            {'    '}<span className="text-blue-400">print</span>(<span className="text-green-400">f"Generating {'{'}feat{'}'}..."</span>){'\n'}
            {'\n'}
            <span className="text-blue-400">print</span>(<span className="text-blue-400">create_listing</span>(<span className="text-green-400">"Handmade Jewelry"</span>))
          </code>
        </pre>
      </div>
    </div>
  );
}
