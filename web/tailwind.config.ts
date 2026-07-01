import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        artur: {
          paper: '#f5f0e8',
          ink: '#2c2c2c',
        },
        aza: {
          bg: '#0e0a0a',
          paper: '#efe4d0',
          paper2: '#d9c9a8',
          accent: '#8b1e2b',
          gold: '#b89968',
        },
        el: {
          bg: '#2a1f14',
          paper: '#f4e8d0',
        },
        ziraela: {
          bgDeep: '#050a08',
          bgMid: '#112420',
          paper: '#f3ead0',
          paper2: '#e3d4ad',
          moss: '#3a5e3a',
          gold: '#b89968',
          silver: '#c2c7d4',
          violet: '#8a5cb6',
        },
        placeholder: {
          paper: '#f5f0e8',
          ink: '#4a4a4a',
        },
      },
    },
  },
  plugins: [],
} satisfies Config