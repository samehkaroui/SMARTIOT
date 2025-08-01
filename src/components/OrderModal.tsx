import { useState } from 'react';

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

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: string | number;
  onSubmit: (orderData: {
    productId: string | number;
    productName: string;
    customerName: string;
    email: string;
    phone: string;
    quantity: number;
    notes: string;
  }) => Promise<void>;
  translations: {
    en: { orderModal: OrderModalTranslations };
    fr: { orderModal: OrderModalTranslations };
    ar: { orderModal: OrderModalTranslations };
  };
  currentLang: 'en' | 'fr' | 'ar';
}

export default function OrderModal({
  isOpen,
  onClose,
  productName,
  productId,
  onSubmit,
  translations,
  currentLang
}: OrderModalProps) {
  const t = translations[currentLang]?.orderModal || {
    title: 'Place Order',
    product: 'Product',
    name: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    quantity: 'Quantity',
    notes: 'Additional Notes',
    submit: 'Submit Order',
    cancel: 'Cancel',
    success: 'Order placed successfully!',
    error: 'Error placing order. Please try again.'
  };

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    quantity: 1,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error' | null, message: string}>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await onSubmit({
        productId,
        productName,
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        quantity: formData.quantity,
        notes: formData.notes
      });
      
      setSubmitStatus({ type: 'success', message: t.success });
      // Reset form on success
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        quantity: 1,
        notes: ''
      });
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: unknown) {
      console.error('Order submission error:', error);
      const errorMessage = error instanceof Error ? error.message : t.error;
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{t.title}</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-300 mb-1">
            {t.product}
          </label>
          <div className="bg-slate-700 p-3 rounded-lg">
            {productName}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="customerName" className="block text-sm font-medium text-slate-300 mb-1">
              {t.name} *
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              {t.email} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">
              {t.phone}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-slate-300 mb-1">
              {t.quantity}
            </label>
            <select
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num} className="bg-slate-800">
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-1">
              {t.notes}
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {submitStatus.type && (
            <div className={`mb-4 p-3 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {submitStatus.message}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 disabled:opacity-50"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white font-medium hover:opacity-90 disabled:opacity-50`}
            >
              {isSubmitting ? 'Submitting...' : t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
