'use client';

import { useEffect, useState } from 'react';
import { KeyboardArrowUp } from '@mui/icons-material';
import { Fab, Zoom } from '@mui/material';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={isVisible}>
      <Fab
        onClick={scrollToTop}
        color="primary"
        size="medium"
        aria-label="Scroll to top"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          boxShadow: 3,
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
};
