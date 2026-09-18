# Portfolio security review — 2026-09-18

Scope: current tracked source, npm dependency advisories, generated production files, Vercel configuration, and public website response headers. This is a focused review, not a penetration test or a guarantee of security. Hosting/GitHub account permissions, private environment settings, full historical secret scanning, and the separate PlantRx application are outside this review.

## Findings and fixes

- Missing browser hardening headers on the production HTML response. Added enforced CSP, anti-framing protection, MIME sniffing protection, explicit referrer policy and restrictions on unused browser permissions.
- CSP now restricts executable scripts to this origin and the exact hash of the Person JSON-LD block. Inline event handlers, eval, plugins, frames, form submissions and base-tag overrides are blocked. The early theme initializer moved to a same-origin file to avoid permitting general inline scripts.
- Inline CSS remains allowed because the theme picker and transition coordinates use runtime styles. This exception does not permit inline JavaScript. Images allow same-origin and data URLs; fonts and connections are same-origin.
- Development and preview servers previously listened on all interfaces. Both now bind to 127.0.0.1 by default. This affects local development, not Vercel production hosting.
- Added `npm run check:security` and made it the Vercel build command. It validates the actual built HTML against the configured script hashes, security directives and headers, and checks that source maps are not shipped.

## Checks

- `npm audit --json`: 0 reported advisories across production and development dependencies at review time. Advisory coverage is limited to the registry database.
- Targeted credential-pattern scan of current tracked text files: no matches. This is not an exhaustive secret detector or Git history audit.
- No dangerouslySetInnerHTML, eval, or user-content HTML injection sinks found in current app source. Links are fixed trusted URLs, and new-tab links already use noreferrer.
- Site is a static React portfolio: no authentication, server API, payment processing, database, or contact-form backend is implemented here. Only the chosen theme is stored in localStorage and is allowlisted.
- Existing HTTPS and HSTS observed on the public website. Existing HSTS was retained.
- Build and production-policy checks passed.

When adding analytics, embeds, remote fonts, forms or APIs, explicitly review CSP instead of enabling wildcard script sources or unsafe-eval. Update the JSON-LD hash when its content changes; the build check will detect drift.
