module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0a0a0a',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        amber: {
          500: '#f59e0b',
          400: '#fbbf24',
        },
      },
    },
  },
  plugins: [],
};
