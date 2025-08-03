import { Leaf, Menu, X, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Translations {
  nav: {
    home: string;
    about: string;
    solutions: string;
    products: string;
    services: string;
    industries: string;
    innovation: string;
    contact: string;
  };
  // Add other translation keys as needed
}

interface HeaderProps {
  currentLang: 'en' | 'fr' | 'ar';
  setCurrentLang: (lang: 'en' | 'fr' | 'ar') => void;
  translations: Record<string, Translations>;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Header({ currentLang, setCurrentLang, translations, isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const t = translations[currentLang];

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-green-400">R-IoT SYS</span>
              <span className="text-xs text-green-300 font-medium">AGRO</span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="/#home" className="text-white hover:text-green-400 transition-colors">{t.nav.home}</a>
            <a href="/#about" className="text-white hover:text-green-400 transition-colors">{t.nav.about}</a>
            <a href="/#solutions" className="text-white hover:text-green-400 transition-colors">{t.nav.solutions}</a>
            <a href="/#products" className="text-white hover:text-green-400 transition-colors">{t.nav.products}</a>
            <a href="/#services" className="text-white hover:text-green-400 transition-colors">{t.nav.services}</a>
            <a href="/#industries" className="text-white hover:text-green-400 transition-colors">{t.nav.industries}</a>
            <a href="/innovation" className="text-white hover:text-green-400 transition-colors">{t.nav.innovation}</a>
            <a href="/contact" className="text-white hover:text-green-400 transition-colors">{t.nav.contact}</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Languages className="w-4 h-4 text-slate-400" />
              <select 
                value={currentLang} 
                onChange={(e) => setCurrentLang(e.target.value as 'en' | 'fr' | 'ar')}
                className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="ar">العربية</option>
              </select>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800 rounded-lg mt-2">
              <a href="#home" className="block px-3 py-2 text-base font-medium hover:text-green-400 transition-colors">{t.nav.home}</a>
              <a href="#about" className="block px-3 py-2 text-base font-medium hover:text-green-400 transition-colors">{t.nav.about}</a>
              <a href="#solutions" className="block px-3 py-2 text-base font-medium hover:text-green-400 transition-colors">{t.nav.solutions}</a>
              <a href="#products" className="block px-3 py-2 text-base font-medium hover:text-green-400 transition-colors">{t.nav.products}</a>
              <a href="#services" className="block px-3 py-2 text-base font-medium hover:text-green-400 transition-colors">{t.nav.services}</a>
              <a href="#industries" className="block px-3 py-2 text-base font-medium hover:text-green-400 transition-colors">{t.nav.industries}</a>
              <Link to="/innovation" className="block px-3 py-2 text-base font-medium hover:text-green-400 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.innovation}</Link>
              <Link to="/contact" className="block px-3 py-2 text-base font-medium hover:text-green-400 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}