'use client';

import { useEffect } from 'react';

export const ScrollHandler = () => {
  useEffect(() => {
    const savedHash = window.location.hash;
    if (savedHash) {
      window.location.hash = '';
      window.location.hash = savedHash;
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            const hash = window.location.hash;
            const targetElement = document.querySelector(hash);
            if (targetElement) {
              setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                observer.disconnect();
              }, 300);
            }
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return null;
};
