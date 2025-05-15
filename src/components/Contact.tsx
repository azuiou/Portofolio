import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin, Mail } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      icon: <Linkedin className="w-8 h-8" />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/louis-marliac-966484232/',
      color: 'hover:text-gray-900 dark:hover:text-gray-300'
    },
    {
      icon: <Mail className="w-8 h-8" />,
      label: 'Email',
      href: 'mailto:louismarliac.pro@gmail.com',
      color: 'hover:text-gray-900 dark:hover:text-gray-300'
    }
  ];

  return (
    <section 
      id="contact" 
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {t('contact.title')}
          </h2>
          <p className="text-xl mb-12 text-gray-700 dark:text-gray-300">
            {t('contact.subtitle')}
          </p>
          
          <div className="flex justify-center space-x-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`transform transition-all duration-300 text-gray-600 dark:text-gray-400 ${link.color} hover:scale-110`}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;