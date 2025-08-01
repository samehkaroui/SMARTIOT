import { Settings, Headphones, Wrench, BookOpen, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
}

interface ServicesTranslations {
  title: string;
  description: string;
  items: ServiceItem[];
  cta: string;
  support: {
    title: string;
    description: string;
    contactBtn: string;
    scheduleBtn: string;
  };
}

interface ServicesProps {
  translations: {
    en: { services: ServicesTranslations };
    fr: { services: ServicesTranslations };
    ar: { services: ServicesTranslations };
  };
  currentLang: 'en' | 'fr' | 'ar';
}

export default function Services({ translations, currentLang }: ServicesProps) {
  const t = translations[currentLang];

  const services = [
    {
      icon: Settings,
      title: t.services.items[0].title,
      description: t.services.items[0].description,
      features: t.services.items[0].features,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Headphones,
      title: t.services.items[1].title,
      description: t.services.items[1].description,
      features: t.services.items[1].features,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Wrench,
      title: t.services.items[2].title,
      description: t.services.items[2].description,
      features: t.services.items[2].features,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BookOpen,
      title: t.services.items[3].title,
      description: t.services.items[3].description,
      features: t.services.items[3].features,
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: t.services.items[4].title,
      description: t.services.items[4].description,
      features: t.services.items[4].features,
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: t.services.items[5].title,
      description: t.services.items[5].description,
      features: t.services.items[5].features,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t.services.title.split(' ')[0]} <span className="text-green-400">{t.services.title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t.services.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-all duration-300 hover:scale-105 border border-slate-700 hover:border-green-500/50"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-slate-300 mb-4">{service.description}</p>
              
              <div className="space-y-2">
                {service.features.map((feature: string, featureIndex: number) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-8">
            <h3 className="text-3xl font-bold mb-4">{t.services.support.title}</h3>
            <p className="text-xl text-slate-300 mb-6">{t.services.support.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-block"
              >
                {t.services.support.contactBtn}
              </Link>
              <button className="border border-green-500 hover:bg-green-500/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                {t.services.support.scheduleBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}