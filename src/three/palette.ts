/** Hex equivalents of the CSS oklch tokens, for Three.js (which wants literal colors). */
export const palette = {
  bg: "#010604", // near-black for high contrast with foreground text
  primary: "#3dffa8",
  accent: "#27e3d0",
  dim: "#11724d",
  alert: "#ff5a4d",

  /* Muted, cool scene colors so the background reads as atmospheric depth
     rather than competing green glow. Wireframes are neutral light, not green. */
  grid: "#236b63", // grid section lines — cool teal
  gridCell: "#0a3029", // grid cell lines — very dark teal
  ceiling: "#184f57", // faint ceiling grid (muted cyan)
  rain: "#2aa888", // rain particles — desaturated teal-green
  wire: "#cbe7dd", // floating geometry — light neutral
  wireAlt: "#8fc4bb", // secondary geometry tint
};
