# Gajendra Rajput — personal portfolio

A single-page React/Vite portfolio. The homepage features selected work, a concise professional introduction, and direct contact links.

## Development

- `npm ci`
- `npm run dev`
- `npm run build`
- `npm run preview`

There are no lint or test scripts in this project. Vercel uses the existing `gajendra-portfolio` project, `npm run build`, and `dist` (also specified in `vercel.json`). Production deploys from `main` to www.gajendrarajput.in. The old dashboard implementation has been removed.

## Content and assets

Contact information, résumé, and the featured project come from `src/data/portfolioData.js`. PlantRx is confirmed at https://github.com/gajendrarjpt/plantrx and https://plantrx-gamma.vercel.app. The local WebP is an actual screenshot of the live homepage captured on September 11, 2026; it is not a mockup. The résumé PDF is preserved unchanged.

To add a real portrait, place an optimized photo in `public/images/` and set `profile.portrait` to `{ src: '/images/gajendra.webp', alt: 'Gajendra Rajput' }`. The hero renders an inset photo only when this field is set. With `null`, the typography composition is complete on its own.

## Interaction

Native anchors provide scrolling. Motion supplies short, once-only entrance movement; CSS handles hover feedback. Reduced-motion preferences disable entrance movement, smooth scrolling, and animated hover transitions. The mobile menu uses a native modal dialog plus explicit Tab wrapping, Escape dismissal, scroll locking, and focus restoration. Copy-email feedback reflects the actual clipboard result, including a failure message.

The optional light/dark control remembers the theme locally and still works when browser storage is unavailable. Instrument Serif and Manrope are self-hosted through Fontsource. The palette uses near-white, charcoal, and vermilion, with a matching dark theme. No API keys, backend, external image services, or additional production dependencies are needed.
