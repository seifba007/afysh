/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: '#20336B',
          light: '#4C77CE',
          dark: '#16234A',
        },
        cream: '#FAF7EF',
        kraft: '#E7DCC4',
        ink: '#1B211E',
        promo: '#D63B27',
        primeur: { DEFAULT: '#2F7A4D', soft: '#E8F5ED' },
        boulangerie: { DEFAULT: '#C97B2A', soft: '#FAF0E6' },
        fleuriste: { DEFAULT: '#D4537E', soft: '#FCF0F4' },
        boucherie: { DEFAULT: '#A32D2D', soft: '#F9EDED' },
        fromager: { DEFAULT: '#C9A227', soft: '#F6EFD6' },
        services: { DEFAULT: '#20336B', soft: '#EEF1FA' },
      },
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        archivo: ['Archivo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
