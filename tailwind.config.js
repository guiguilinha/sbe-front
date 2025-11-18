/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
        success: "hsl(var(--success))",
        mapa: {
          norte: '#FFEDD5',
          jequitinhonha: '#DBEAFE',
          rio_doce: '#FDE68A',
          centro: '#E0E7FF',
          zona_mata: '#DCFCE7',
          sul: '#CFFAFE',
          centro_oeste: '#FEF9C3',
          triangulo: '#FCDDEC',
          noroeste: '#E9D5FF',
        },
        mapaHover: {
          norte: '#FDBA74',
          jequitinhonha: '#60A5FA',
          rio_doce: '#FBBF24',
          centro: '#818CF8',
          zona_mata: '#34D399',
          sul: '#22D3EE',
          centro_oeste: '#FACC15',
          triangulo: '#F472B6',
          noroeste: '#C084FC',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        campuni: ['Campuni', 'sans-serif'],
        alegreya: ['Alegreya Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 