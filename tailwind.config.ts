import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-inter)", "sans-serif"],
      serif: ["var(--font-lora)", "serif"],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      background: 'rgb(var(--background) / <alpha-value>)',
      foreground: 'rgb(var(--foreground) / <alpha-value>)',
      primary: 'rgb(var(--primary) / <alpha-value>)',
      muted: 'rgb(var(--muted) / <alpha-value>)',
      card: 'rgb(var(--card) / <alpha-value>)',
      border: 'rgb(var(--border) / <alpha-value>)',
    },
    extend: {
      screens: {
        'xs': '375px',
        'xs-max': {'max': '374px'},
        'sm-max': {'max': '639px'},
        'md-max': {'max': '767px'},
        'lg-max': {'max': '1023px'},
        'xl-max': {'max': '1279px'},
      },
      colors: {
        'agency-dark': '#121212',
        'agency-panel': '#1E1E1E',
        'agency-mint': '#4D9E9A',
        'agency-light': '#EAEAEA',
        'agency-gray': '#A0A0A2',
      },
    },
  },
  plugins: [],
}
export default config 