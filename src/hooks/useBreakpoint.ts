import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

type Breakpoint = keyof typeof breakpoints;

export const useBreakpoint = () => {
  const [screens, setScreens] = useState<Record<Breakpoint, boolean>>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  });

  const updateScreens = () => {
    const width = window.innerWidth;
    setScreens({
      xs: width >= breakpoints.xs,
      sm: width >= breakpoints.sm,
      md: width >= breakpoints.md,
      lg: width >= breakpoints.lg,
      xl: width >= breakpoints.xl,
      xxl: width >= breakpoints.xxl,
    });
  };

  useEffect(() => {
    updateScreens();
    window.addEventListener('resize', updateScreens);
    return () => window.removeEventListener('resize', updateScreens);
  }, []);

  return screens;
};


// --> để responsive ui
