import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Droplets, CloudRain, Wifi, Settings } from 'lucide-react';

const SolutionsPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const solutions = [
    {
      icon: <Droplets className="w-8 h-8 text-green-400" />,
      title: "Smart Irrigation Systems",
      description: "Automated watering solutions that adjust based on soil moisture levels and weather forecasts, reducing water usage by up to 40%."
    },
    {
      icon: <CloudRain className="w-8 h-8 text-green-400" />,
      title: "Weather Monitoring",
      description: "Real-time weather tracking and predictive analytics to optimize farming operations and protect crops from adverse conditions."
    },
    {
      icon: <Wifi className="w-8 h-8 text-green-400" />,
      title: "IoT Sensors Network",
      description: "Comprehensive sensor network providing real-time data on soil conditions, plant health, and environmental factors."
    },
    {
      icon: <Settings className="w-8 h-8 text-green-400" />,
      title: "Automated Control Systems",
      description: "Remote monitoring and control of agricultural equipment and environmental conditions for optimal growth."
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 transition-all duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-300 hover:text-green-400 mb-8 transition-colors duration-200"
        >
          <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
          <span>Back</span>
        </button>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Agricultural <span className="text-green-400">Technology Solutions</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Discover how our cutting-edge solutions are transforming modern agriculture through innovation and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50">
              <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Sustainable Agriculture for the Future</h2>
              <p className="text-slate-300 mb-6">
                Our comprehensive agricultural solutions leverage the latest technologies to help farmers increase yields, 
                reduce resource consumption, and make data-driven decisions for sustainable farming practices.
              </p>
              <div className="h-px bg-slate-700/50 my-6"></div>
              <div className="flex flex-wrap gap-4">
                <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-lg text-sm font-medium">Precision Farming</div>
                <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-lg text-sm font-medium">Smart Irrigation</div>
                <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-lg text-sm font-medium">Crop Monitoring</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-green-400/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {solution.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{solution.title}</h3>
                    <p className="text-slate-400">{solution.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Transforming Agriculture with Technology</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-slate-300 mb-6">
                The agricultural sector is undergoing a digital revolution, and our solutions are at the forefront of this transformation. 
                By integrating IoT sensors, data analytics, and automation, we're helping farmers around the world achieve better outcomes 
                while reducing their environmental impact.
              </p>
              <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Key Benefits</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-slate-300">Up to 40% reduction in water usage through smart irrigation systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-slate-300">20-30% increase in crop yields through precision farming techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-slate-300">Real-time monitoring and alerts for early detection of crop diseases and pests</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-slate-300">Data-driven insights for optimized resource allocation and decision making</span>
                </li>
              </ul>
              <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600/50">
                <h4 className="text-xl font-semibold text-white mb-3">Ready to transform your farm?</h4>
                <p className="text-slate-300 mb-4">Contact our team of experts to learn how our solutions can be customized for your specific needs.</p>
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
