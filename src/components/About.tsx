import React, { useEffect, useRef } from 'react';
import { Code, Layout, Globe, Palette, MonitorSmartphone, Gamepad, Calendar, FileCode, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const frontendServices = [
  {
    id: 1,
    title: 'Sites Vitrines',
    icon: <Globe className="w-5 h-5" />,
    description: 'Présentation d\'entreprise, services, sections personnalisées, formulaire de contact avec EmailJS, design responsive.'
  },
  {
    id: 2,
    title: 'Portfolio Personnel',
    icon: <Layout className="w-5 h-5" />,
    description: 'Présentation de parcours, projets réalisés, CV téléchargeable, contact EmailJS, intégration LinkedIn/GitHub.'
  },
  {
    id: 3,
    title: 'Landing Pages',
    icon: <Calendar className="w-5 h-5" />,
    description: 'Pages d\'événements avec countdown, galerie photo, plan d\'accès Google Maps/Leaflet, RSVP avec EmailJS.'
  },
  {
    id: 4,
    title: 'Blog Statique',
    icon: <MonitorSmartphone className="w-5 h-5" />,
    description: 'Blog avec 11ty/Astro/Hugo, articles en Markdown, commentaires Disqus/Web3Forms.'
  },
  {
    id: 5,
    title: 'Web App Légère',
    icon: <Code className="w-5 h-5" />,
    description: 'Applications comme calculatrice, TODO list, convertisseur, générateur QR code avec LocalStorage et PWA.'
  },
  {
    id: 6,
    title: 'Mini-jeux JavaScript',
    icon: <Gamepad className="w-5 h-5" />,
    description: 'Jeux interactifs : memory, morpion, snake, quiz et autres jeux en JavaScript pur.'
  }
];

const backendServices = [
  {
    id: 1,
    title: 'Scripts Backend Sur Mesure',
    icon: <FileCode className="w-5 h-5" />,
    description: 'Développement de scripts et fonctions backend adaptés à vos besoins spécifiques. Expertise en Java, PHP, Python et autres langages selon vos préférences.'
  },
  {
    id: 2,
    title: 'Solutions Personnalisées',
    icon: <Wrench className="w-5 h-5" />,
    description: 'Développement de solutions backend sur mesure selon vos besoins : bases de données, API, systèmes d\'authentification, traitement de données, et plus encore.'
  }
];

const About = () => {
  const { t } = useTranslation();
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      id="about" 
      className="py-20 bg-gray-100 dark:bg-gray-800"
      ref={servicesRef}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white animate-fade-in">
            {t('about.title')}
          </h2>
          
          <div className="mb-12 animate-slide-up">
            <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
              {t('about.description')}
            </p>
          </div>
          
          <div className="space-y-12">
            {/* Frontend Services */}
            <div className="reveal bg-gray-50/50 dark:bg-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-8 text-gray-900 dark:text-white flex items-center">
                <Code className="w-6 h-6 mr-2 text-gray-500 dark:text-gray-400" />
                Développement Frontend
              </h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                {frontendServices.map((service, index) => (
                  <div 
                    key={service.id}
                    className="reveal p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-md hover-scale bg-gray-50/50 dark:bg-gray-800 backdrop-blur-sm"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="text-gray-500 dark:text-gray-400 mr-3">
                        {service.icon}
                      </div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {service.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Additional Frontend Note */}
              <div className="mt-6 p-4 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800 backdrop-blur-sm">
                <p className="text-gray-700 dark:text-gray-200 text-sm flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                  Et bien d'autres possibilités selon vos besoins spécifiques !
                </p>
              </div>
            </div>

            {/* Backend Services */}
            <div className="reveal bg-gray-50/50 dark:bg-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-8 text-gray-900 dark:text-white flex items-center">
                <FileCode className="w-6 h-6 mr-2 text-gray-500 dark:text-gray-400" />
                Développement Backend
              </h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                {backendServices.map((service, index) => (
                  <div 
                    key={service.id}
                    className="reveal p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-md hover-scale bg-gray-50/50 dark:bg-gray-800 backdrop-blur-sm"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="text-gray-500 dark:text-gray-400 mr-3">
                        {service.icon}
                      </div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {service.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;