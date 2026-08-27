import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Maya Chen',
    role: 'Etsy Seller, 12k sales',
    text: "I used to spend 45 minutes writing one listing. Now I upload a photo, add two bullet points, and Omega gives me something better than I could write in an hour. My conversion rate jumped 23% last month.",
    stars: 5,
  },
  {
    name: 'Jake Morrison',
    role: 'Amazon FBA, Home & Garden',
    text: "The SEO tags alone are worth the $19. I was guessing keywords before. Omega pulls terms I never would have thought of — and they actually rank. First page on three products this quarter.",
    stars: 5,
  },
  {
    name: 'Sofia Reyes',
    role: 'eBay Vintage Reseller',
    text: "I was skeptical because I've tried AI tools before and they sound like robots. Omega's 'Persuasive' tone actually sounds like me. Customers have messaged saying my descriptions got them to buy.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">Loved by sellers who ship.</h2>
          <p className="text-slate-400 text-lg">Real people. Real stores. Real revenue.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-7 hover:border-slate-600/50 transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
