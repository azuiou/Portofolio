import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  scrollToSection: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-50 shadow-md dark:bg-gray-900' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold transition-colors duration-300 dark:text-white">
          Louis<span className="text-blue-600 dark:text-blue-400"> MARLIAC</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {['home', 'about', 'projects', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="capitalize font-medium transition-colors duration-300 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
            >
              {t(`nav.${item}`)}
            </button>
          ))}
          <button 
            onClick={toggleLanguage}
            className="flex items-center justify-center transition-colors duration-300 text-gray-700 dark:text-gray-200"
            aria-label={i18n.language === 'fr' ? 'Switch to English' : 'Passer en Français'}
          >
            <img 
              src={i18n.language === 'fr' ? 'https://flagcdn.com/w40/fr.png' : 'https://flagcdn.com/w40/gb.png'} 
              alt={i18n.language === 'fr' ? 'Français' : 'English'}
              className="w-6 h-4 object-cover rounded"
            />
          </button>
          <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center transition-colors duration-300"
            aria-label={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {isDarkMode ? (
              <Moon className="w-5 h-5 text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button 
            onClick={toggleLanguage}
            className="p-1 transition-colors duration-300 text-gray-700 dark:text-gray-200"
            aria-label={i18n.language === 'fr' ? 'Switch to English' : 'Passer en Français'}
          >
            <img 
              src={i18n.language === 'fr' ? 'https://flagcdn.com/w40/fr.png' : 'https://flagcdn.com/w40/gb.png'} 
              alt={i18n.language === 'fr' ? 'Français' : 'English'}
              className="w-6 h-4 object-cover rounded"
            />
          </button>
          <button 
            onClick={toggleTheme} 
            className="p-1 transition-colors duration-300"
            aria-label={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {isDarkMode ? (
              <Moon className="w-5 h-5 text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
          </button>
          <button onClick={toggleMenu} className="p-1 text-gray-700 dark:text-white">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-50 dark:bg-gray-900 shadow-lg py-4 px-6 flex flex-col space-y-4 border-t border-gray-200 dark:border-gray-800">
            {['home', 'about', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="capitalize font-medium py-2 w-full text-left transition-colors duration-300 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
              >
                {t(`nav.${item}`)}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;