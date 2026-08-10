export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        goa: {
          green: '#0B4A2F',
          deep: '#063521',
          ink: '#042415',
          cream: '#F6E9C6',
          sand: '#E4D6AE',
          yellow: '#FFD21E',
          pink: '#F0186B',
        },
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
}
