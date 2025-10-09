/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        bricolage: ['Bricolage Grotesque', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-slower': 'spin 4s linear infinite',
        'spin-slowest': 'spin 6s linear infinite',
        'spin-smooth': 'spin 2.5s ease-in-out infinite',
        'spin-pulse': 'spin-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'spin-pulse': {
          '0%, 100%': { 
            transform: 'rotate(0deg) scale(1)',
            opacity: '1'
          },
          '50%': { 
            transform: 'rotate(180deg) scale(1.05)',
            opacity: '0.8'
          },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

