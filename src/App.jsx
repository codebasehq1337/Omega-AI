import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import SettingsModal from './components/SettingsModal';
import Toast from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useToast } from './hooks/useToast';

export default function App() {
  const [view, setView] = useState('landing');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useLocalStorage('omega_api_key', '');
  const { toast, showToast } = useToast();

  if (view === 'dashboard') {
    return (
      <>
        <Dashboard onLogout={() => setView('landing')} />
        <SettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          apiKey={apiKey}
          onSaveApiKey={(k) => { setApiKey(k); showToast('Settings saved'); }}
        />
        <Toast message={toast.message} visible={toast.visible} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar
        onNavigate={setView}
        onOpenSettings={() => setSettingsOpen(true)}
        currentView={view}
      />
      <Hero onTryFree={() => setView('dashboard')} />
      <div id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: 'Photo-to-Listing AI', desc: 'Upload a product photo and Omega analyzes visual details to craft descriptions that sell.' },
            { title: 'Platform-Native SEO', desc: 'Every output is calibrated for Etsy, Amazon, eBay, or Shopify — character limits, keyword density, and all.' },
            { title: 'Social in One Click', desc: 'Get a ready-to-post Instagram caption and TikTok hook alongside your listing. No extra tools needed.' },
          ].map((f, i) => (
            <div key={i} className="glass rounded-2xl p-7 border border-slate-700/30 hover:border-indigo-500/20 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={(k) => { setApiKey(k); showToast('Settings saved'); }}
      />
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
