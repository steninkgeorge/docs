import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
        dim_gray: {
          DEFAULT: '#72726c',
          100: '#171716',
          200: '#2e2e2c',
          300: '#454541',
          400: '#5c5c57',
          500: '#72726c',
          600: '#909089',
          700: '#acaca7',
          800: '#c8c8c4',
          900: '#e3e3e2'
        },
        davys_gray: {
          DEFAULT: '#4e5352',
          100: '#101111',
          200: '#202221',
          300: '#2f3232',
          400: '#3f4342',
          500: '#4e5352',
          600: '#717876',
          700: '#949a99',
          800: '#b8bcbb',
          900: '#dbdddd'
        },
        outer_space: {
          DEFAULT: '#3a4345',
          100: '#0c0d0e',
          200: '#171b1c',
          300: '#23282a',
          400: '#2e3638',
          500: '#3a4345',
          600: '#5d6c6f',
          700: '#829397',
          800: '#acb7b9',
          900: '#d5dbdc'
        },
        onyx: {
          DEFAULT: '#383b39',
          100: '#0b0c0c',
          200: '#171817',
          300: '#222423',
          400: '#2e302e',
          500: '#383b39',
          600: '#5f6561',
          700: '#868d88',
          800: '#aeb3b0',
          900: '#d7d9d7'
        },
        gunmetal: {
          DEFAULT: '#252b2e',
          100: '#070809',
          200: '#0f1112',
          300: '#16191b',
          400: '#1d2224',
          500: '#252b2e',
          600: '#4a575d',
          700: '#71838c',
          800: '#a0acb3',
          900: '#cfd6d9'
        },
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
