import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Bubbles = () => {
  const bubblesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bubblesRef.current) return;

    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      
      const colors = [
        ['from-gray-400/60', 'to-gray-500/40', 'bg-gradient-to-br'],
        ['from-gray-500/50', 'to-gray-600/30', 'bg-gradient-to-br'],
        ['from-gray-600/40', 'to-gray-700/30', 'bg-gradient-to-br']
      ];
      
      bubble.classList.add(...colors[Math.floor(Math.random() * colors.length)]);
      
      const size = Math.random() * 140 + 120;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      
      // Diviser l'écran en sections pour une meilleure distribution
      const sections = 3;
      const sectionWidth = window.innerWidth / sections;
      const sectionHeight = window.innerHeight / sections;
      
      // Choisir une section aléatoire
      const sectionX = Math.floor(Math.random() * sections);
      const sectionY = Math.floor(Math.random() * sections);
      
      // Position dans la section choisie
      const x = (sectionX * sectionWidth) + (Math.random() * (sectionWidth - size));
      const y = (sectionY * sectionHeight) + (Math.random() * (sectionHeight - size));
      
      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
      
      return bubble;
    };

    const respawnBubble = (bubble: HTMLElement) => {
      gsap.to(bubble, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        onComplete: () => {
          // Nouvelle position dans une section différente
          const sections = 3;
          const size = parseInt(bubble.style.width);
          const sectionWidth = window.innerWidth / sections;
          const sectionHeight = window.innerHeight / sections;
          
          const currentSection = {
            x: Math.floor(parseInt(bubble.style.left) / sectionWidth),
            y: Math.floor(parseInt(bubble.style.top) / sectionHeight)
          };
          
          // Choisir une nouvelle section différente de la section actuelle
          let newSectionX, newSectionY;
          do {
            newSectionX = Math.floor(Math.random() * sections);
            newSectionY = Math.floor(Math.random() * sections);
          } while (newSectionX === currentSection.x && newSectionY === currentSection.y);
          
          const x = (newSectionX * sectionWidth) + (Math.random() * (sectionWidth - size));
          const y = (newSectionY * sectionHeight) + (Math.random() * (sectionHeight - size));
          
          bubble.style.left = `${x}px`;
          bubble.style.top = `${y}px`;
          
          gsap.set(bubble, { x: 0, y: 0, opacity: 0, scale: 0.8 });
          gsap.to(bubble, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            onComplete: () => animate(bubble)
          });
        }
      });
    };

    const animate = (bubble: HTMLElement) => {
      const duration = Math.random() * 3 + 4;
      
      // Mouvement plus aléatoire et plus large
      const xMove = (Math.random() - 0.5) * 300;
      const yMove = (Math.random() - 0.5) * 300;

      const rect = bubble.getBoundingClientRect();
      const currentX = rect.left;
      const currentY = rect.top;

      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;

      let newX = currentX + xMove;
      let newY = currentY + yMove;

      // Garder les bulles dans le viewport
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      gsap.to(bubble, {
        x: newX - currentX,
        y: newY - currentY,
        duration: duration,
        ease: 'sine.inOut',
        onComplete: () => {
          const velocity = Math.abs(xMove) + Math.abs(yMove);
          if (velocity < 100) {
            respawnBubble(bubble);
          } else {
            animate(bubble);
          }
        }
      });
    };

    const bubbles = Array.from({ length: 7 }, () => {
      const bubble = createBubble();
      bubblesRef.current?.appendChild(bubble);
      animate(bubble);
      return bubble;
    });

    const checkCollisions = () => {
      bubbles.forEach((bubble1, i) => {
        const rect1 = bubble1.getBoundingClientRect();
        const center1 = {
          x: rect1.left + rect1.width / 2,
          y: rect1.top + rect1.height / 2
        };

        bubbles.forEach((bubble2, j) => {
          if (i < j) {
            const rect2 = bubble2.getBoundingClientRect();
            const center2 = {
              x: rect2.left + rect2.width / 2,
              y: rect2.top + rect2.height / 2
            };

            const dx = center2.x - center1.x;
            const dy = center2.y - center1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (rect1.width + rect2.width) / 2;

            if (distance < minDistance) {
              const tween1 = gsap.getTweensOf(bubble1)[0];
              const tween2 = gsap.getTweensOf(bubble2)[0];

              if (tween1 && tween2) {
                tween1.kill();
                tween2.kill();

                const angle = Math.atan2(dy, dx);
                const speed = 50; // Augmentation de la vitesse de séparation

                gsap.to(bubble1, {
                  x: `-=${Math.cos(angle) * speed}`,
                  y: `-=${Math.sin(angle) * speed}`,
                  duration: 1.5,
                  ease: 'power1.out',
                  onComplete: () => {
                    const xMove = (Math.random() - 0.5) * 300;
                    const yMove = (Math.random() - 0.5) * 300;
                    gsap.to(bubble1, {
                      x: `+=${xMove}`,
                      y: `+=${yMove}`,
                      duration: Math.random() * 3 + 4,
                      ease: 'sine.inOut',
                      onComplete: () => animate(bubble1)
                    });
                  }
                });

                gsap.to(bubble2, {
                  x: `+=${Math.cos(angle) * speed}`,
                  y: `+=${Math.sin(angle) * speed}`,
                  duration: 1.5,
                  ease: 'power1.out',
                  onComplete: () => {
                    const xMove = (Math.random() - 0.5) * 300;
                    const yMove = (Math.random() - 0.5) * 300;
                    gsap.to(bubble2, {
                      x: `+=${xMove}`,
                      y: `+=${yMove}`,
                      duration: Math.random() * 3 + 4,
                      ease: 'sine.inOut',
                      onComplete: () => animate(bubble2)
                    });
                  }
                });
              }
            }
          }
        });
      });

      requestAnimationFrame(checkCollisions);
    };

    checkCollisions();

    return () => {
      bubbles.forEach(bubble => {
        gsap.killTweensOf(bubble);
        bubble.remove();
      });
    };
  }, []);

  return (
    <div 
      ref={bubblesRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ height: '100vh' }}
    />
  );
};

export default Bubbles;