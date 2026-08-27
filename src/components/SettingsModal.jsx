import { X, Key, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SettingsModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  const [key, setKey] = useState(apiKey);

  useEffect(() => {
    setKey(apiKey);
  }, [apiKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(key.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md glass-strong rounded-2xl p-6 shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Settings</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-400" />
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Paste your Gemini API key here..."
              className="input-field"
            />
            <p className="mt-2 text-xs text-slate-500">
              Leave empty to use the system default (server-side). Get a free key at{' '}
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">aistudio.google.com</a>
            </p>
          </div>

          <button
            onClick={handleSave}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
