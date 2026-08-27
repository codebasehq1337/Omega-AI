import { Check, Zap, Crown, Rocket } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'Dip your toes. No credit card.',
    icon: Zap,
    features: [
      '5 listing generations/month',
      'Etsy, Amazon & eBay support',
      'Basic title & description',
      'Standard speed',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Creator',
    price: '$19',
    period: '/mo',
    description: 'For the solo seller going full-time.',
    icon: Crown,
    features: [
      'Unlimited generations',
      'SEO Keyword Extractor',
      'Social Media Post Builder',
      'Priority generation speed',
      'Save history & favorites',
    ],
    cta: 'Get Creator',
    popular: true,
  },
  {
    name: 'Agency',
    price: '$49',
    period: '/mo',
    description: 'Teams and power sellers scaling fast.',
    icon: Rocket,
    features: [
      'Everything in Creator',
      'Bulk generation (up to 50)',
      'CSV export for listings',
      'Team collaboration (3 seats)',
      'White-label options',
      'Dedicated support',
    ],
    cta: 'Get Agency',
    popular: false,
  },
];

export default function Pricing() {
  const handleSubscribe = (plan) => {
    alert(`Redirecting to Stripe Checkout for ${plan} plan...`);
  };

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">One tool. Three gears.</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Start free. Upgrade when you're ready to scale. No hidden fees, no lock-in.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-slate-900/80 border-indigo-500/40 shadow-xl shadow-indigo-500/10'
                  : 'glass hover:border-slate-600/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-xs font-semibold text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  plan.popular ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  <plan.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <p className="text-xs text-slate-500">{plan.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-500">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.popular ? 'text-indigo-400' : 'text-slate-500'}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.name)}
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                  plan.popular
                    ? 'bg-white text-slate-950 hover:bg-slate-200 shadow-lg shadow-white/10'
                    : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
