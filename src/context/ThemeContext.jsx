import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved : 'light';
  });

  const lastButtonCenter = useRef({ x: window.innerWidth - 280, y: 36 });
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Helper to locate the exact center of the active Dark/Light theme button
  const getThemeButtonCenter = (e) => {
    let btnEl = null;

    // 1. Check event target / currentTarget first if it's the theme button
    if (e && e.currentTarget && typeof e.currentTarget.getBoundingClientRect === 'function') {
      const isThemeBtn = e.currentTarget.hasAttribute('data-theme-toggle') || e.currentTarget.id === 'theme-toggle-btn' || e.currentTarget.title?.includes('Theme');
      if (isThemeBtn) {
        btnEl = e.currentTarget;
      }
    }

    if (!btnEl && e && e.target && typeof e.target.closest === 'function') {
      btnEl = e.target.closest('[data-theme-toggle="true"], #theme-toggle-btn, [title="Toggle Dark / Light Theme"]');
    }

    // 2. Query DOM for the currently visible theme toggle button
    if (!btnEl) {
      const candidates = document.querySelectorAll('[data-theme-toggle="true"], #theme-toggle-btn, [title="Toggle Dark / Light Theme"]');
      for (const el of candidates) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && r.top < window.innerHeight && r.bottom > 0) {
          btnEl = el;
          break;
        }
      }
    }

    // 3. Extract exact center coordinates
    if (btnEl && typeof btnEl.getBoundingClientRect === 'function') {
      const rect = btnEl.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        lastButtonCenter.current = { x, y };
        return { x, y };
      }
    }

    // Fallback: stored center or computed header theme button region
    return lastButtonCenter.current;
  };

  // Precise button-anchored circular reveal theme transition
  const toggleTheme = (e) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(nextTheme);
      return;
    }

    // Prevent clashing rapid transitions
    if (isTransitioningRef.current) {
      setTheme(nextTheme);
      return;
    }
    isTransitioningRef.current = true;

    // Always accurately anchor to the Dark/Light theme button
    const { x, y } = getThemeButtonCenter(e);

    // Calculate maximum radius required to cover the furthest viewport corner (with safety buffer)
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
            duration: 550,
            easing: 'cubic-bezier(0.7, 0, 0.84, 0)',
            fill: 'forwards',
            pseudoElement: '::view-transition-new(root)'
          }
        );

        anim.finished.finally(() => {
          isTransitioningRef.current = false;
          requestAnimationFrame(() => {
            document.documentElement.classList.remove('theme-switching');
          });
        });
      });

      transition.finished.finally(() => {
        isTransitioningRef.current = false;
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
      }, 200);

      setTimeout(() => {
        ripple.classList.add('theme-ripple-fade');
        setTimeout(() => {
          if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
          isTransitioningRef.current = false;
          document.documentElement.classList.remove('theme-switching');
        }, 300);
      }, 500);
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
