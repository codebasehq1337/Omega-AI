import { useState, useCallback } from 'react';
import { Upload, Wand2, X } from 'lucide-react';

const platforms = ['Etsy', 'Amazon', 'eBay', 'Shopify'];
const tones = ['Persuasive', 'Casual', 'Luxury', 'Playful'];

export default function GeneratorForm({ onGenerate, isGenerating }) {
  const [form, setForm] = useState({
    name: '',
    features: '',
    platform: 'Etsy',
    tone: 'Persuasive',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleImage = (file) => {
    if (!file) return;
    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const onDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleImage(e.dataTransfer.files[0]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    let imageBase64 = null;
    let imageType = null;
    if (imagePreview) {
      imageBase64 = imagePreview;
      imageType = image?.type;
    }

    await onGenerate({ ...form, imageBase64, imageType });
  };

  return (
    <div className="glass rounded-2xl p-6 lg:p-8 border border-slate-700/40">
      <h2 className="text-xl font-semibold mb-1">Create a Listing</h2>
      <p className="text-sm text-slate-400 mb-6">Tell Omega about your product. The more detail, the better the output.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Product Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g., Handcrafted Ceramic Mug Set"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Key Features & Notes</label>
          <textarea
            value={form.features}
            onChange={(e) => setForm({ ...form, features: e.target.value })}
            placeholder="Dishwasher safe, 12oz capacity, minimalist design, gift-ready packaging..."
            rows={4}
            className="input-field resize-none"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Target Platform</label>
            <select
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className="input-field appearance-none cursor-pointer"
            >
              {platforms.map((p) => (
                <option key={p} value={p} className="bg-slate-900">{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tone of Voice</label>
            <select
              value={form.tone}
              onChange={(e) => setForm({ ...form, tone: e.target.value })}
              className="input-field appearance-none cursor-pointer"
            >
              {tones.map((t) => (
                <option key={t} value={t} className="bg-slate-900">{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Product Image (Optional)</label>
          <div
            onDragEnter={onDrag}
            onDragLeave={onDrag}
            onDragOver={onDrag}
            onDrop={onDrop}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              dragActive
                ? 'border-indigo-500 bg-indigo-500/5'
                : imagePreview
                ? 'border-emerald-500/40 bg-emerald-500/5'
                : 'border-slate-700/50 hover:border-slate-600 bg-slate-900/30'
            }`}
          >
            {imagePreview ? (
              <div className="relative inline-block">
                <img src={imagePreview} alt="Preview" className="max-h-48 rounded-lg shadow-lg" />
                <button
                  type="button"
                  onClick={() => { setImage(null); setImagePreview(null); }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(e.target.files?.[0])}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 font-medium">Drop an image here, or click to browse</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </label>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating || !form.name.trim()}
          className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Omega is writing your listing...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate Listing with Omega
            </>
          )}
        </button>
      </form>
    </div>
  );
}
