# Gajendra Rajput — interactive personal portfolio

React and Vite portfolio with a three-chapter story: Connect, Create, Explore. The Three.js scene uses procedural interlocking rings, browser windows, and an orbital sculpture. No external models, image APIs, or paid services are needed.

## Development

Run `npm ci`, then `npm run dev`. Run `npm run build` for a production build. Vercel deploys `main` using `npm run build` and the `dist` output directory. The production domain is https://www.gajendrarajput.in/.

## Design and interaction

Outfit headlines, Manrope body text, charcoal backgrounds, lilac surfaces, and lime accents. Fonts are bundled and self-hosted. Drag the sculpture or focus it and use arrow keys. Chapter tabs support arrow keys, Home, and End. Pause and reset controls are visible. Reduced-motion preferences disable automatic movement. The renderer pauses drawing offscreen and in hidden tabs and limits pixel ratio. CSS artwork provides a fallback if WebGL is unavailable. The mobile menu uses a native modal dialog.

## Content

Contact details and project data live in `src/data/portfolioData.js`. PlantRx uses a real local screenshot. The original résumé PDF remains available under `public/resume/`. No invented projects or portrait assets are included.
