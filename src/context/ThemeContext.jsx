import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Precise button-anchored circular reveal theme transition
  const toggleTheme = (e) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(nextTheme);
      return;
    }

    // Get click button bounding box center or default to pointer coordinates / screen center
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const targetEl = e?.currentTarget || e?.target?.closest('button');
    if (targetEl && typeof targetEl.getBoundingClientRect === 'function') {
      const rect = targetEl.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if (e?.clientX !== undefined && e?.clientY !== undefined) {
      x = e.clientX;
      y = e.clientY;
    }

    // Calculate maximum radius required to cover the furthest viewport corner
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Suppress individual element transitions during theme switch to prevent flicker
    document.documentElement.classList.add('theme-switching');

    // If View Transitions API is supported
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.finished.finally(() => {
        document.documentElement.classList.remove('theme-switching');
      });

      transition.ready.then(() => {
        const isDark = nextTheme === 'dark';
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];

        document.documentElement.animate(
          {
            clipPath: isDark ? clipPath : [...clipPath].reverse()
          },
          {
            duration: 550,
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            pseudoElement: isDark ? '::view-transition-new(root)' : '::view-transition-old(root)'
          }
        );
      });
    } else {
      // Fallback: Custom procedural circular ripple overlay animation anchored to button center
      const ripple = document.createElement('div');
      ripple.className = 'theme-ripple-overlay';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.setProperty('--ripple-radius', `${endRadius * 2.2}px`);
      ripple.style.backgroundColor = nextTheme === 'dark' ? '#000000' : '#FAF8F5';

      document.body.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.classList.add('theme-ripple-active');
      });

      setTimeout(() => {
        setTheme(nextTheme);
      }, 250);

      setTimeout(() => {
        ripple.classList.add('theme-ripple-fade');
        setTimeout(() => {
          if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
          document.documentElement.classList.remove('theme-switching');
        }, 350);
      }, 550);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
