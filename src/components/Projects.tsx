import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const { t } = useTranslation();
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.card-3d');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    projectsRef.current?.addEventListener('mousemove', handleMouseMove);
    return () => projectsRef.current?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      id: 1,
      title: t('projects.projects.bienEtre.title'),
      description: t('projects.projects.bienEtre.description'),
      image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
      demoLink: 'https://bienetrenaturellement.fr'
    },
    {
      id: 2,
      title: t('projects.projects.checkers.title'),
      description: t('projects.projects.checkers.description'),
      image: 'https://th.bing.com/th/id/OIP.53ddths2SuzRkQfIaqtgEQHaHa?rs=1&pid=ImgDetMain',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      demoLink: 'https://azuiou.github.io/Dames/'
    }
  ];

  return (
    <section 
      id="projects" 
      className="py-20 bg-gray-100 dark:bg-gray-900"
      ref={projectsRef}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
            {t('projects.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="card-3d bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 reveal"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 relative z-10"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4 icon-hover" />
                      <span>{t('projects.viewDemo')}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;