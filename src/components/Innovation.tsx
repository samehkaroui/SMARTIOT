import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header, { Translations as HeaderTranslations } from './Header';

interface InnovationItem {
  title: string;
  description: string;
}

interface InnovationTranslations {
  title: string;
  description: string;
  features: string[];
  latest: string;
  innovations: InnovationItem[];
}

interface InnovationProps {
  translations: {
    en: HeaderTranslations & { innovation: InnovationTranslations };
    fr: HeaderTranslations & { innovation: InnovationTranslations };
    ar: HeaderTranslations & { innovation: InnovationTranslations };
  };
  currentLang: 'en' | 'fr' | 'ar';
  setCurrentLang: (lang: 'en' | 'fr' | 'ar') => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Innovation = ({
  translations,
  currentLang,
  setCurrentLang,
  isMenuOpen,
  setIsMenuOpen
}: InnovationProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const t = translations[currentLang].innovation as InnovationTranslations;

  // Prepare header props
  const headerProps = {
    translations,
    currentLang,
    setCurrentLang,
    isMenuOpen,
    setIsMenuOpen
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 transition-all duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <Header {...headerProps} />
      <div className="pt-24">
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Features */}
        {t.features && t.features.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-green-400">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.features.map((feature: string, index: number) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 hover:border-green-500/30 transition-colors">
                  <p className="text-slate-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Latest Innovations */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-green-400">
            {t.latest}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.innovations.map((item: InnovationItem, index: number) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                <div className="h-48 bg-slate-700/50 flex items-center justify-center">
                  <div className="text-4xl">✨</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-300 mb-4">{item.description}</p>
                  <div className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors cursor-pointer">
                    Read more <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-slate-800/50 rounded-xl p-8 border border-slate-700/50">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Interested in our innovations?
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Contact us to learn more about how our innovative solutions can transform your agricultural operations.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
          >
            Contact Us <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Innovation;
