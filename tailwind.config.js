// See https://tailwindcss.com/docs/configuration for details

module.exports = {
  theme: {
    fontFamily: {
      'sans': ['Barlow Semi Condensed', '-apple-system', 'Helvetica', 'Arial', 'sans-serif'],
      'serif': ['Georgia', 'serif'],
      'hand': ['Permanent Marker', 'Marker Felt', 'Comic Sans']
    },
    colors: {
        green: "#37A576",
        seafoam: "#B6DECD",
        secondary: {
          green: '#27ae60',
          darkGreen: '#005561'
        },
        grey: {
          light: '#d8d8d8',
          darkest: '#000000',
        },
        alpha: {
          white: 'rgb(255,255,255,0.9)'
        },
        white: '#ffffff',
        black: {
          full: "#000000",
          alpha: "rgba(1,14,21,.90)"
        }
    },
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      // Adds a new breakpoint in addition to the default breakpoints
      padding: {
        'hero': '25%',
        'heroXL': '35%',
      }
    }
  },
  variants: {
    width: ['responsive'],
    flexDirection: ['responsive'],
  },
  plugins: []
};
