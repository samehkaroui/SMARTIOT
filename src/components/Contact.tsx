import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header, { Translations as HeaderTranslations } from './Header';

interface ContactTranslations {
  title: string;
  description: string;
  startBtn: string;
  consultBtn: string;
  form: {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    submit: string;
  };
  info: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
}

interface ContactProps {
  translations: {
    en: HeaderTranslations & { contact: ContactTranslations };
    fr: HeaderTranslations & { contact: ContactTranslations };
    ar: HeaderTranslations & { contact: ContactTranslations };
  };
  currentLang: 'en' | 'fr' | 'ar';
  setCurrentLang: (lang: 'en' | 'fr' | 'ar') => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Contact = ({
  translations,
  currentLang,
  setCurrentLang,
  isMenuOpen,
  setIsMenuOpen
}: ContactProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Get translations with fallbacks
  const t = {
    title: translations[currentLang]?.contact?.title || 'Contact Us',
    description: translations[currentLang]?.contact?.description || 'Have questions or want to learn more about our solutions? Get in touch with our team.',
    successMessage: 'Your message has been sent successfully!', // Not in translations, using fallback
    errorMessage: 'An error occurred while sending your message. Please try again.', // Not in translations, using fallback
    sending: 'Sending...',
    optional: '(Optional)',
    form: {
      title: 'Send Us a Message',
      name: translations[currentLang]?.contact?.form?.name || 'Full Name',
      email: translations[currentLang]?.contact?.form?.email || 'Email',
      phone: translations[currentLang]?.contact?.form?.phone || 'Phone',
      message: translations[currentLang]?.contact?.form?.message || 'Message',
      submit: translations[currentLang]?.contact?.form?.submit || 'Send Message',
    },
    info: {
      title: 'Contact Information',
      email: 'Email Us',
      phone: 'Call Us',
      address: translations[currentLang]?.contact?.info?.address || '123 Tech Park, Silicon Valley, CA 94025',
      emailValue: translations[currentLang]?.contact?.info?.email || 'info@riotsysagro.com',
      phoneValue: translations[currentLang]?.contact?.info?.phone || '+1 (555) 123-4567',
      hours: translations[currentLang]?.contact?.info?.hours || 'Mon-Fri: 9:00 AM - 6:00 PM'
    }
  };

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent successfully! We will get back to you soon.'
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: 'An error occurred while sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prepare header props - pass through the full translations object
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get in <span className="text-green-400">Touch</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Have questions or want to discuss a project? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">{t.info.title}</h3>
              
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-400/10 p-3 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{t.info.email}</h4>
                    <p className="text-slate-400">{t.info.emailValue}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="bg-green-400/10 p-3 rounded-lg mr-4">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{t.info.phone}</h4>
                    <p className="text-slate-400">{t.info.phoneValue}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-400/10 p-3 rounded-lg mr-4 mt-1">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{t.info.address}</h4>
                    <p className="text-slate-400">{t.info.address}</p>
                    <p className="text-slate-500 text-sm mt-1">{t.info.hours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social) => (
                    <a 
                      key={social}
                      href="#" 
                      className="w-10 h-10 rounded-full bg-slate-700 hover:bg-green-400/10 flex items-center justify-center text-slate-300 hover:text-green-400 transition-colors duration-200"
                      aria-label={social}
                    >
                      <span className="sr-only">{social}</span>
                      <div className="w-5 h-5">
                        {social === 'Twitter' && (
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                          </svg>
                        )}
                        {social === 'LinkedIn' && (
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        )}
                        {social === 'Facebook' && (
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                          </svg>
                        )}
                        {social === 'Instagram' && (
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">{t.form.title}</h3>
            
            {submitStatus && (
              <div className={`p-4 rounded-lg mb-6 ${
                submitStatus.success 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">{t.form.name || 'Name'} <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-200"
                  placeholder={t.form.name || 'Your name'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">{t.form.email || 'Email'} <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-200"
                    placeholder={t.form.email || 'your.email@example.com'}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">{t.form.phone || 'Phone'} {t.optional || '(Optional)'}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-200"
                    placeholder={t.form.phone || '+1 (555) 123-4567'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">{t.form.message || 'Message'} <span className="text-red-400">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-200 resize-none"
                  placeholder={t.form.message || 'Your message here...'}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{t.sending || 'Sending...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Contact;
