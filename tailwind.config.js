/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#3f80e8",
        primaryHover: "#1a5cc7",
        hover: "#8db8fc",
        active: "#1E40AF",
        border: "#2563EB",
        background: "#EAE6E6",
        primaryText: "#00000",
        cardBg: "#bbdefb",
        gradientColorFrom: '#FF9213',
        gradientColorTo: '#ff9c2a',
        authBg: '#E9eef7'
      },
    },
  },
  plugins: [],
}

