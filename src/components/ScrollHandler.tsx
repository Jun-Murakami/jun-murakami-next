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
            // The hash can be cleared by a client-side redirect (e.g.
            // LegacyAnchorRedirect) after this observer is set up. Stop
            // observing once that happens, otherwise querySelector('') throws.
            if (!hash) {
              observer.disconnect();
              return;
            }
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
