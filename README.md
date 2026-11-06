# Nepal Lens Studio — Premium Photography & Cinematography Website
**Sunwal, Nawalparasi, Nepal** • Canon EOS Rebel T7 • NPR • English + Nepali-ready

A cinematic, editorial, security-first business website celebrating Nepal. Floating 3D DSLR, authentic Nepal imagery, full booking & admin.

## Quick Start
```bash
npm install
npm run dev   # http://localhost:3000
```

## Credentials
- Admin: `admin@nepallens.local` / `admin123` — change via `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH` (bcrypt 12) in `.env`
- Business name, WhatsApp, email, service areas — all configurable in `.env` / `lib/config.ts`

## Features Implemented
- **Cinematic Home** (hero + 14 sections): intro, featured landscapes, Mustang editorial, village documentary, weddings/portraits, cinematography, services NPR, testimonials, booking CTA, contact
- **3D DSLR** — procedural generic DSLR (Three.js/R3F, PBR, ScrollTrigger scrub, reduced-motion + mobile fallback, no content obstruction)
- **Mustang Experience** — dedicated page, editorial gallery, disclosure
- **Village Life** — documentary collection, respectful captions
- **Portfolio** — filterable masonry, lightbox with keyboard, lazy, alt text
- **Cinematography** — video grid, modal, no autoplay sound
- **Services** — 8 packages NPR, example badge, editable
- **Booking** — +977 validated, CSRF, rate limit 5/h, anti-duplicate, WhatsApp link, success/error UX
- **Admin** — httpOnly JWT, bcrypt 12, RBAC, bookings manager, portfolio/services CRUD hooks, upload validation
- **Security** — OWASP ASVS: secure hashing, CSRF, XSS, SQLi (Prisma parameterized), IDOR, upload guards, rate limiting, CSP, HSTS, secure cookies, safe errors, audited deps
- **Performance/A11y/SEO** — next/image WebP/AVIF, lazy, code-split 3D, reduced-motion, keyboard nav, alt text, semantic HTML, sitemap/robots, JSON-LD, Open Graph

## Tech
Next.js 14 • TypeScript • Tailwind (tokens #101010 #191919 #F5F1E8 #A5A5A5 #D6B77A) • Framer Motion • GSAP • Three.js/R3F/drei • Zod • bcryptjs • JWT • Prisma-ready (PostgreSQL prod, JSON demo)

## Tests
```bash
npm test            # Vitest
npm run security:check
```

## Deployment
Set `DATABASE_URL=postgresql://...`, `JWT_SECRET` (64+ chars), `ADMIN_PASSWORD_HASH`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER` (optional). Ensure HTTPS, HSTS, CSP. See `.env.example`.

## Docs
- Architecture: `/ARCHITECTURE.md`
- Asset guide: `public/README.md`
- Acceptance checklist: below

## Final Acceptance — Verified
- [x] Real Nepal assets integrated (Unsplash Nepal collection, replaceable via Admin, captioned)
- [x] Mustang/Himalayan/Village collections functional
- [x] 3D camera renders, follows scroll, mobile fallback, respects reduced-motion
- [x] All pages work, booking validated front+back, admin works, auth+RBAC, security headers, tests pass
