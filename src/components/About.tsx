import { Target, Users, Award, Globe } from 'lucide-react';

interface AboutTranslations {
  about: {
    title: string;
    description: string;
    mission: {
      title: string;
      description: string;
      points: string[];
    };
    vision: {
      title: string;
      description: string;
      quote: string;
    };
    values: Array<{
      title: string;
      description: string;
    }>;
  };
}

interface AboutProps {
  translations: Record<string, AboutTranslations>;
  currentLang: 'en' | 'fr' | 'ar';
}

export default function About({ translations, currentLang }: AboutProps) {
  const t = translations[currentLang];

  const values = [
    {
      icon: Target,
      title: t.about.values[0].title,
      description: t.about.values[0].description,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: t.about.values[1].title,
      description: t.about.values[1].description,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: t.about.values[2].title,
      description: t.about.values[2].description,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: t.about.values[3].title,
      description: t.about.values[3].description,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t.about.title.split(' ')[0]} <span className="text-green-400">{t.about.title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            {t.about.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-6">{t.about.mission.title}</h3>
            <p className="text-lg text-slate-300 mb-6">{t.about.mission.description}</p>
            <div className="space-y-4">
              {t.about.mission.points.map((point: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold mb-6">{t.about.vision.title}</h3>
            <p className="text-slate-300 mb-6">{t.about.vision.description}</p>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-green-400 font-medium">{t.about.vision.quote}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-all duration-300 hover:scale-105 border border-slate-700 hover:border-green-500/50"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-lg flex items-center justify-center mb-4`}>
                <value.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
              <p className="text-slate-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}