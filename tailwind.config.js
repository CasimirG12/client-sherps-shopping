/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      animation: {
        slideDownHeight: 'slideInHeight 0.3s ease-out forwards',  // Slide down with height animation
        slideUpHeight: 'slideOutHeight 0.3s ease-in forwards',    // Slide up with height animation
      },
      keyframes: {
        // Slide down animation with height transition
        slideInHeight: {
          '0%': { maxHeight: '0px', opacity: 0, visibility: 'hidden' },    // Start with no height, hidden
          '100%': { maxHeight: '200px', opacity: 1, visibility: 'visible' }, // Expand to full height
        },
        // Slide up animation with height transition
        slideOutHeight: {
          '0%': { maxHeight: '200px', opacity: 1, visibility: 'visible' },   // Start from full height
          '100%': { maxHeight: '0px', opacity: 0, visibility: 'hidden' },     // Collapse to zero height
        },
      },
    },
  },
  plugins: [],
}
