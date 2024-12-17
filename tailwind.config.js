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
      height: {
        "1/12": '8.333333%',
        "2/12": '16.666667%',
        "4/12": '33.333333%',
        "5/12": '41.666667%',
        "11/12": '91.666667%',

      }
    },
  },
  plugins: [],
}
