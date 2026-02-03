/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00B87C',
          50: '#E6FFF7',
          100: '#B3FFE6',
          200: '#80FFD4',
          300: '#4DFFC3',
          400: '#1AFFB1',
          500: '#00B87C',
          600: '#009563',
          700: '#00734A',
          800: '#005032',
          900: '#002E19',
        },
        secondary: {
          DEFAULT: '#1E293B',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        brand: {
          green: {
            DEFAULT: 'var(--brand-green)',
            light: 'var(--brand-green-light)',
          },
          orange: {
            DEFAULT: 'var(--brand-orange)',
            light: 'var(--brand-orange-light)',
          },
          blue: {
            DEFAULT: 'var(--brand-blue)',
            dark: 'var(--brand-blue-dark)',
            light: 'var(--brand-blue-light)',
          }
        },
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}