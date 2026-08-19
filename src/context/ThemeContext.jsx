import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved : 'light';
  });

  const lastButtonCenter = useRef({ x: window.innerWidth - 120, y: 32 });

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

    // Always locate exact theme toggle button bounding box center in DOM
    let x = lastButtonCenter.current.x;
    let y = lastButtonCenter.current.y;

    const btnEl =
      e?.currentTarget ||
      e?.target?.closest('button') ||
      document.querySelector('[title="Toggle Dark / Light Theme"]') ||
      document.querySelector('#theme-toggle-btn');

    if (btnEl && typeof btnEl.getBoundingClientRect === 'function') {
      const rect = btnEl.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
        lastButtonCenter.current = { x, y };
      }
    }

    // Calculate maximum radius required to cover the furthest viewport corner (with 60px safety buffer)
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    ) + 60;

    // Suppress individual element transitions during theme switch to prevent flicker
    document.documentElement.classList.add('theme-switching');

    // If View Transitions API is supported
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        const anim = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 600,
            easing: 'cubic-bezier(0.7, 0, 0.84, 0)',
            fill: 'forwards',
            pseudoElement: '::view-transition-new(root)'
          }
        );

        anim.finished.finally(() => {
          requestAnimationFrame(() => {
            document.documentElement.classList.remove('theme-switching');
          });
        });
      });

      transition.finished.finally(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.remove('theme-switching');
        });
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
