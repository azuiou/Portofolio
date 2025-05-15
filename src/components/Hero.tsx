import React, { useEffect, useRef } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Bubbles from './Bubbles';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const { t } = useTranslation();
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = parallaxRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      const layers = parallaxRef.current.querySelectorAll('.parallax-layer');
      layers.forEach((layer: Element, index) => {
        const depth = (index + 1) * 10;
        const moveX = (x - 0.5) * depth;
        const moveY = (y - 0.5) * depth;
        
        (layer as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      ref={parallaxRef}
      className="relative min-h-screen flex items-center justify-center pt-16 bg-gray-50 dark:bg-gray-900 overflow-hidden parallax"
    >
      <Bubbles />
      
      <div className="container relative mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 relative inline-block">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 shadow-xl mx-auto relative z-10">
              <img 
                src="https://media.licdn.com/dms/image/v2/D4E03AQGCBa8i4iWwRw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1690124946300?e=1752710400&v=beta&t=w3UnxqCgRXLg_8c4aquMSn4HMewrNGdCDUiKAJIuZFA" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full blur-xl opacity-50 animate-pulse"></div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-300 animate-slide-up">
            {t('hero.subtitle')}
          </p>
          <button
            onClick={() => scrollToSection('projects')}
            className="group inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg animate-slide-up"
          >
            {t('hero.cta')}
            <ArrowDownCircle className="w-5 h-5 group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;