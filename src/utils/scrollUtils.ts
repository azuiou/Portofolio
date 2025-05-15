/**
 * Smoothly scrolls to a target element by its id
 */
export const scrollToElement = (id: string): void => {
  const element = document.getElementById(id);
  
  if (element) {
    const headerOffset = 80; // Accounts for fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};