'use client';

import { useState, useEffect } from 'react';

export const useDevicePixelRatio = () => {
  const [dpi, setDpi] = useState(1);

  useEffect(() => {
    setDpi(window.devicePixelRatio);

    const updateDpi = () => {
      setDpi(window.devicePixelRatio);
    };

    window.addEventListener('resize', updateDpi);

    return () => {
      window.removeEventListener('resize', updateDpi);
    };
  }, []);

  return dpi;
};