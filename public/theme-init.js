try {
        const savedTheme = localStorage.getItem('theme');
        const theme = ['dark','light','forest','sunset','plum'].includes(savedTheme) ? savedTheme : 'dark';
        document.documentElement.dataset.theme = theme;

      } catch { document.documentElement.dataset.theme = 'dark'; }
