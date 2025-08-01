import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroStat {
  value: string;
  label: string;
}

interface HeroTranslations {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  exploreBtn: string;
  demoBtn: string;
  stats: HeroStat[];
}

interface Translations {
  [key: string]: {
    hero: HeroTranslations;
    // Add other translation sections as needed
  };
}

interface HeroProps {
  translations: Translations;
  currentLang: 'en' | 'fr' | 'ar';
  scrollY: number;
}

export default function Hero({ translations, currentLang, scrollY }: HeroProps) {
  const t = translations[currentLang];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900/20 to-emerald-900/20"></div>
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, rgba(132, 204, 22, 0.2) 0%, transparent 50%)`,
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      ></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-4">
            {t.hero.badge}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
          {t.hero.title}
          <br />
          <span className="text-white">{t.hero.subtitle}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          {t.hero.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link 
            to="/solutions" 
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            {t.hero.exploreBtn}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="border border-slate-600 hover:border-slate-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-slate-800 flex items-center gap-2">
            <Play className="w-5 h-5" />
            {t.hero.demoBtn}
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          {t.hero.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-slate-400" />
      </div>
    </section>
  );
}