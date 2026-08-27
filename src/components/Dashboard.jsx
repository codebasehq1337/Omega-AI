import { useState } from 'react';
import GeneratorForm from './GeneratorForm';
import OutputDisplay from './OutputDisplay';
import Sidebar from './Sidebar';
import SettingsModal from './SettingsModal';
import Toast from './Toast';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from '../hooks/useToast';
import { generateListing } from '../lib/gemini';
import { Trash2, Clock } from 'lucide-react';

export default function Dashboard({ onLogout }) {
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useLocalStorage('omega_api_key', '');
  const [history, setHistory] = useLocalStorage('omega_history', []);
  const { toast, showToast } = useToast();

  const handleGenerate = async (data) => {
    setIsGenerating(true);
    try {
      const res = await generateListing(data, apiKey);
      setResult(res);

      const entry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        productName: data.name,
        platform: data.platform,
        ...res,
      };
      setHistory((prev) => [entry, ...prev].slice(0, 50));
      showToast('Listing generated successfully!');
    } catch (err) {
      showToast(err.message || 'Something went wrong. Check your API key.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => showToast('Copied to clipboard!');

  const clearHistory = () => {
    setHistory([]);
    showToast('History cleared');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSettings={() => setSettingsOpen(true)}
        onLogout={onLogout}
      />

      <main className="flex-1 min-h-screen overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8 lg:py-12">
          {activeTab === 'generate' ? (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gradient mb-2">Generate a Listing</h1>
                <p className="text-slate-400">Fill in the details below and let Omega do the heavy lifting.</p>
              </div>

              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <GeneratorForm onGenerate={handleGenerate} isGenerating={isGenerating} />
                </div>
                <div className="lg:col-span-2">
                  {result && <OutputDisplay result={result} onCopy={handleCopy} />}
                  {!result && (
                    <div className="glass rounded-2xl p-8 border border-slate-700/30 flex flex-col items-center justify-center text-center min-h-[300px]">
                      <div className="w-16 h-16 rounded-2xl bg-slate-800/60 flex items-center justify-center mb-4">
                        <Clock className="w-7 h-7 text-slate-600" />
                      </div>
                      <p className="text-slate-500 text-sm">Your generated listing will appear here.</p>
                      <p className="text-slate-600 text-xs mt-1">Start by filling out the form.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gradient mb-2">History</h1>
                  <p className="text-slate-400">Your last {history.length} generations.</p>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center border border-slate-700/30">
                  <p className="text-slate-500">No history yet. Generate your first listing!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="glass rounded-xl p-5 border border-slate-700/30 hover:border-slate-600/50 transition-all cursor-pointer"
                      onClick={() => { setResult(item); setActiveTab('generate'); }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-200 truncate pr-4">{item.productName}</h3>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700/30">
                          {item.platform}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 truncate">{item.title}</p>
                      <p className="text-xs text-slate-600 mt-2">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={setApiKey}
      />
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
