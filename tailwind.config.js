// tailwind.config.js
export const content = [
  "./index.html", // or any other files containing your JSX
  "./src/**/*.{js,jsx,ts,tsx}", // paths to your JSX/TSX files
];
export const theme = {
  extend: {
    screens: {
      xs: "400px",
    },
    fontFamily: {
      dancing: ["Dancing Script", "cursive"],
      distressed: ["Rubik Distressed", "cursive"],
      melody: ["Hi Melody", "cursive"],
      bilbo: ["Bilbo Swash Caps", "cursive"],
      charm: ["Charm", "cursive"],
      lugrasimo: ["Lugrasimo", "sans-serif"],
      rubikFax: ["Rubik Broken Fax", "cursive"],
    },
  },
};
export const plugins = [];
