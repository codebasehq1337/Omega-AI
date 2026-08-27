import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Do I need to know copywriting to use Omega?",
    a: "Not at all. Omega was built for makers and sellers, not writers. You just describe your product in plain English — even bullet points work — and Omega handles the persuasion, structure, and SEO."
  },
  {
    q: "Which platforms does Omega support?",
    a: "Etsy, Amazon, eBay, and Shopify. Each platform gets its own optimized formatting: character limits, keyword strategies, and tone calibration so your listing feels native."
  },
  {
    q: "Can I use my own Gemini API key?",
    a: "Yes. Go to Settings in the app and paste your own Google Gemini API key. This is great if you already have credits and want to use Omega as your interface."
  },
  {
    q: "Is my product data safe?",
    a: "Absolutely. We don't store your images or listing data on our servers. Everything lives in your browser's local storage. Your niche is your niche."
  },
  {
    q: "What happens if I hit my free limit?",
    a: "You'll get a friendly nudge to upgrade. No hard paywalls, no surprise charges. Upgrade to Creator anytime for unlimited generations."
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">Questions? We've got answers.</h2>
          <p className="text-slate-400 text-lg">Everything you need to know before you start.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-300 ${
                open === i ? 'bg-slate-900/60 border-slate-700/50' : 'glass border-slate-700/30 hover:border-slate-600/40'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className={`font-medium ${open === i ? 'text-white' : 'text-slate-300'}`}>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
