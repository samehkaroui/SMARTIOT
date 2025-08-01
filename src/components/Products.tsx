import { useState } from 'react';
import { Cpu, Wifi, Battery, Shield, Zap, Thermometer, LucideIcon } from 'lucide-react';
import OrderModal from './OrderModal';

interface Product {
  id: string;
  icon: LucideIcon;
  name: string;
  description: string;
  features: string[];
  price: string;
  image: string;
  color: string;
  orderBtn: string;
}

interface ProductItem {
  name: string;
  description: string;
  features: string[];
  price: string;
}

interface ProductsTranslations {
  title: string;
  description: string;
  orderBtn: string;
  items: ProductItem[];
}

interface OrderModalTranslations {
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

interface Translations {
  products: ProductsTranslations;
  orderModal: OrderModalTranslations;
}

interface ProductsProps {
  translations: {
    en: Translations;
    fr: Translations;
    ar: Translations;
  };
  currentLang: 'en' | 'fr' | 'ar';
}

export default function Products({ translations, currentLang }: ProductsProps) {
  const t: Translations = translations[currentLang];
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string | number;
    name: string;
  } | null>(null);
  interface ProductOrderInfo {
    id: string | number;
    name: string;
  }

  const handleOrderClick = (product: ProductOrderInfo) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const handleOrderSubmit = async (orderData: {
    productId: string | number;
    productName: string;
    customerName: string;
    email: string;
    phone: string;
    quantity: number;
    notes: string;
  }) => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit order');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Order submission error:', error);
      throw error;
    }
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedProduct(null);
  };

  const products: Product[] = t.products.items.map((item: ProductItem, index: number): Product => {
    const icons = [Cpu, Wifi, Thermometer, Battery, Shield, Zap];
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-purple-500 to-pink-500",
      "from-yellow-500 to-amber-500",
      "from-red-500 to-orange-500",
      "from-indigo-500 to-purple-500"
    ];
    
    // Define product images
    const productImages = [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'
    ];
    
    return {
      id: `sensor-${index + 1}`,
      icon: icons[index % icons.length],
      name: item.name,
      description: item.description,
      features: item.features,
      price: item.price,
      image: productImages[index % productImages.length] || '/images/sensor1.jpg',
      color: colors[index % colors.length],
      orderBtn: t.products.orderBtn
    };
  });

  return (
    <section id="products" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t.products.title.split(' ')[0]} <span className="text-green-400">{t.products.title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t.products.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((product: Product, index: number) => (
            <div 
              key={index}
              className="bg-slate-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-slate-700 hover:border-green-500/50"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-20`}></div>
                <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${product.color} rounded-lg flex items-center justify-center`}>
                  <product.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                <p className="text-slate-300 mb-4">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {product.features && product.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center space-x-2 text-sm">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-400">{product.price}</div>
                  <button 
                    onClick={() => handleOrderClick({ id: product.id, name: product.name })}
                    className={`bg-gradient-to-r ${product.color} hover:opacity-90 px-6 py-2 rounded-lg font-semibold transition-all duration-300`}
                  >
                    {product.orderBtn}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-800/50 p-8 rounded-xl border border-slate-700">
          <h3 className="text-2xl font-bold mb-4">{t.products.items[0]?.name || 'Custom Solutions'}</h3>
          <p className="text-slate-300 mb-6">
            {t.products.items[0]?.description || 'Contact us for custom IoT solutions tailored to your agricultural needs.'}
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 px-6 py-2 rounded-lg font-semibold">
            {t.products.orderBtn || 'Contact Us'}
          </button>
        </div>
      </div>

      {selectedProduct && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={closeOrderModal}
          productName={selectedProduct.name}
          productId={selectedProduct.id}
          onSubmit={handleOrderSubmit}
          translations={translations}
          currentLang={currentLang}
        />
      )}
    </section>
  );
}