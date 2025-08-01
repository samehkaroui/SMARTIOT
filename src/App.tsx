import { useState, useEffect } from 'react';
import { 
  Shield, 
  Sprout,
  Droplets,
  Thermometer,
  Eye,
  Activity,
  Brain,
  Cpu
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Services from './components/Services';
import Contact from './components/Contact';
import { translations as rawTranslations } from './data/translations';

// Define the complete translations interface
export interface OrderModalTranslations {
  title: string;
  product: string;
  name: string;
  email: string;
  phone: string;
  quantity: string;
  notes: string;
  submit: string;
  cancel: string;
  success: string;
  error: string;
  requiredField: string;
  invalidEmail: string;
}

interface ServicesTranslations {
  title: string;
  description: string;
  items: Array<{
    title: string;
    description: string;
    features: string[];
  }>;
  cta: string;
  support: {
    title: string;
    description: string;
    contactBtn: string;
    scheduleBtn: string;
  };
}

// Type assertion to ensure the translations match our expected structure
const translations = rawTranslations as {
  en: typeof rawTranslations.en & {
    orderModal: OrderModalTranslations;
    services: ServicesTranslations;
  };
  fr: typeof rawTranslations.fr & {
    orderModal: OrderModalTranslations;
    services: ServicesTranslations;
  };
  ar: typeof rawTranslations.ar & {
    orderModal: OrderModalTranslations;
    services: ServicesTranslations;
  };
};
import ApiTest from './components/ApiTest.tsx';
import SolutionsPage from './components/SolutionsPage';
import Innovation from './components/Innovation';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [currentLang, setCurrentLang] = useState<'en' | 'fr' | 'ar'>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solutions = [
    {
      icon: Shield,
      title: t.solutions.items[0].title,
      description: t.solutions.items[0].description
    },
    {
      icon: Sprout,
      title: t.solutions.items[1].title,
      description: t.solutions.items[1].description
    },
    {
      icon: Droplets,
      title: t.solutions.items[2].title,
      description: t.solutions.items[2].description
    },
    {
      icon: Thermometer,
      title: t.solutions.items[3].title,
      description: t.solutions.items[3].description
    }
  ];

  const industries = [
    {
      icon: Sprout,
      title: t.industries.items[0].title,
      description: t.industries.items[0].description,
      color: "from-green-500 to-green-600"
    },
    {
      icon: Droplets,
      title: t.industries.items[1].title,
      description: t.industries.items[1].description,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Eye,
      title: t.industries.items[2].title,
      description: t.industries.items[2].description,
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Activity,
      title: t.industries.items[3].title,
      description: t.industries.items[3].description,
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Brain,
      title: t.industries.items[4].title,
      description: t.industries.items[4].description,
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Cpu,
      title: t.industries.items[5].title,
      description: t.industries.items[5].description,
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  const metrics = [
    { value: "10K+", label: t.metrics.items[0].label },
    { value: "30%", label: t.metrics.items[1].label },
    { value: "25%", label: t.metrics.items[2].label },
    { value: "24/7", label: t.metrics.items[3].label }
  ];

  const MainContent = () => {
    const t = translations[currentLang];
    
    return (
      <div className={`min-h-screen bg-slate-900 text-white overflow-x-hidden ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
        <Header 
          translations={translations}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <main>
          {/* Hero Section */}
          <Hero 
            translations={translations}
            currentLang={currentLang}
            scrollY={scrollY}
          />

          {/* About Section */}
          <About 
            translations={translations}
            currentLang={currentLang}
          />

          {/* Solutions Section */}
          <section id="solutions" className="py-20 bg-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {t.solutions.title.split(' ')[0]} <span className="text-green-400">{t.solutions.title.split(' ')[1]}</span>
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  {t.solutions.description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {solutions.map((solution, index) => (
                  <div 
                    key={index}
                    className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-slate-700 hover:border-green-500/50"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                      <solution.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                    <p className="text-slate-300">{solution.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Products Section */}
          <Products 
            translations={translations}
            currentLang={currentLang}
          />

          {/* Services Section */}
          <Services 
            translations={translations}
            currentLang={currentLang}
          />

          {/* Industries Section */}
          <section id="industries" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {t.industries.title.split(' ')[0]} <span className="text-emerald-400">{t.industries.title.split(' ')[1]}</span>
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  {t.industries.description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industries.map((industry, index) => (
                  <div 
                    key={index}
                    className="group relative bg-slate-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="relative p-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${industry.color} rounded-lg flex items-center justify-center mb-4`}>
                        <industry.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                      <p className="text-slate-300">{industry.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Metrics Section */}
          <section className="py-20 bg-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {t.metrics.title.split(' ')[0]} <span className="text-lime-400">{t.metrics.title.split(' ')[1]}</span>
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  {t.metrics.description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {metrics.map((metric, index) => (
                  <div 
                    key={index}
                    className="text-center bg-slate-800 rounded-xl p-8 hover:bg-slate-700 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      {metric.value}
                    </div>
                    <div className="text-slate-300 text-lg">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {t.contact.title.split('?')[0]} <span className="text-green-400">{t.contact.title.split(' ').slice(-1)[0]}</span>
                </h2>
                <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
                  {t.contact.description}
                </p>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-green-400">R-IoT SYS</span>
                  <span className="text-xs text-green-300 font-medium">AGRO</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-slate-900 border-t border-slate-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="text-slate-400">
                &copy; 2025 R-IoT SYS AGRO. All rights reserved. {t.footer.tagline}
              </div>
            </div>
          </footer>
        </main>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/innovation" element={<Innovation t={t} />} />
        <Route path="/admin/api-test" element={<ApiTest />} />
        <Route path="*" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

export default App;
