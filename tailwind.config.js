export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        page: 'var(--page)',
        pageAlt: 'var(--page-2)',
        panel: 'var(--panel)',
        panelAlt: 'var(--panel-2)',
        line: 'var(--line)',
        ink: 'var(--ink)',
        inkSoft: 'var(--ink-soft)',
        accent: 'var(--accent)',
        accentInk: 'var(--accent-ink)',
        pop: 'var(--pop)',
        popInk: 'var(--pop-ink)',
        scene: 'var(--scene)',
        sceneSoft: 'var(--scene-soft)',
        goa: {
          green: '#0B4A2F',
          deep: '#063521',
          ink: '#042415',
          cream: '#F6E9C6',
          sand: '#E4D6AE',
          yellow: '#FFD21E',
          pink: '#F0186B'
        }
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace']
      }
    }
  }
};
