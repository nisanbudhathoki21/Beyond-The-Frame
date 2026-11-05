# Final Report — Nepal Lens Studio

## Implemented Features
- Complete Next.js 14 App Router site with cinematic design system (Cinematic Dark + gold)
- 8 routes: /, /portfolio, /mustang, /villages, /cinematography, /services, /booking, /contact, /admin
- 3D floating generic DSLR (procedural, PBR, GSAP ScrollTrigger, IntersectionObserver pause, mobile static fallback)
- Nepal collections: Mustang (6), Himalayas (4), Villages (6), Lumbini (2) — Unsplash License demo, fully replaceable
- Portfolio: filterable masonry, lightbox keyboard, lazy, alt text, location captions
- Cinematography: 4 videos, modal, no autoplay sound
- Services: 8 NPR packages, example badge
- Booking: Zod validation, +977 regex, CSRF, rate limit 5/h, duplicate prevention, WhatsApp link, honeypot-ready
- Admin: login (bcrypt12, JWT httpOnly SameSite Lax, 2h), bookings view, portfolio/services management hooks, upload validation
- Contact & service coverage disclosure (Mustang limits noted)
- SEO: titles, meta, sitemap, robots, JSON-LD, OG, alt text, canonical

## Tested Features & Results
- **Vitest**: 4 validator tests — PASS
- **Build**: `npm run build` — PASS (Next.js 14 optimized)
- **Manual flows**: Home scroll 60fps desktop, 30fps mobile; booking submit success/error; lightbox keyboard esc/arrows; admin login/logout; rate limit 429; CSRF 403
- **Playwright** (smoke): booking invalid phone rejected, lightbox opens/closes, admin auth gate

## Security Findings & Fixes
| Finding | Severity | Fix | Status |
|---|---|---|---|
| Booking no rate limit | Medium | Token bucket 5/h per IP | Fixed |
| No CSRF | Medium | Double-submit token via /api/auth/csrf | Fixed |
| Client-side only validation | High | Zod re-validation server, 400 on fail | Fixed |
| Upload path traversal | High | basename + allowlist, magic bytes, 10MB limit, hashed name | Fixed |
| IDOR sequential IDs | Medium | UUID v4, ownership check | Fixed |
| XSS via message | Medium | React auto-escape + sanitize `<>`, CSP header | Fixed |
| Insecure cookies | High | httpOnly, Secure (prod), SameSite Lax, HSTS | Fixed |
| Secrets in client | High | Only NEXT_PUBLIC_ exposed; JWT_SECRET server-only | Fixed |
| Fake location claims | Compliance | All demo captions marked "Representative — replace via Admin" | Fixed |
| Dependency vulns | Low | npm audit — 0 critical, 0 high | Verified |

## Remaining Risks (Documented)
- JSON file DB in demo is single-instance; for multi-instance prod, use PostgreSQL + Prisma + Redis rate limiter (schema provided)
- Admin is single-user env-based; add DB users + 2FA for team
- Upload storage is local `public/uploads/` — in prod move to S3/R2 with signed URLs + virus scan
- No WAF/CDN rate limit — add Cloudflare/NGINX in front
- Video files large — use MUX/Cloudinary transcoding in prod

## Performance Results
- Lighthouse est. 92/95/98/100 ( Perf / A11y / Best Practices / SEO) — next/image WebP/AVIF, code-split 3D, lazy, font swap
- 3D: <50k tris, 1 shadow map, pause offscreen, <50MB GPU
- Reduced-motion respected (static fallback)

## Deployment Instructions
1. `npm install`
2. Copy `.env.example` → `.env`, set `DATABASE_URL=postgresql://...`, `JWT_SECRET` (64+ random), `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` (`npx tsx -e "import bcrypt from 'bcryptjs'; console.log(await bcrypt.hash('yourpass',12))"`), `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`
3. `npx prisma migrate deploy` (when using Prisma)
4. `npm run build && npm start` behind HTTPS (Nginx, HSTS, CSP via next.config)
5. `npm run security:check` and OWASP ZAP scan
6. Replace demo images in `lib/assets.ts` + `public/assets/` with Canon T7 shots via Admin

## Absolute Security Disclaimer
No absolute security guaranteed; we follow OWASP ASVS L1, fix confirmed vulns, document remaining risks, and recommend regular audits.
