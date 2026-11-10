# Beyond the Frame

Photography site for Nisan Budhathoki (Sunwal, Nepal). Static Next.js site hosted on GitHub Pages. The homepage is a scroll-driven story: each chapter pins to the screen and zooms as you scroll. Chapters use your photos when you add them (first photo of each category) and original illustrations until then.

Live: https://nisanbudhathoki21.github.io/Beyond-The-Frame/

## Run it locally

    npm install
    npm run dev        # http://localhost:3000/Beyond-The-Frame/
    npm test
    npm run build      # writes the site to /out

## Add your photos

1. Put originals in `photos-raw/<category>/`. Categories: `streets`, `vehicles`, `wildlife`, `weddings`, `mountains`. This folder is git-ignored.
2. Run `npm run photos`. It resizes to web size (WebP), reads the camera settings from each photo, and does **not** copy GPS location into the web files.
3. Open `public/photos/manifest.json` and fill in `alt` (what is in the picture), `caption` and `place` for each photo.
4. Commit `public/photos` and push. The site rebuilds itself.

Only photos you took should go in. Do not label other people's pictures as your work or as taken in Nepal.

## Booking form

There is no server. The form checks the details in the browser, then prepares a WhatsApp message and an email for the visitor to send. Nothing is stored.

## Security notes

- Static files only: no database, no login, no secrets, no API keys.
- Content-Security-Policy is set with a meta tag (GitHub Pages cannot send headers). Everything loads from this site; fonts are bundled at build time.
- All external links use `rel="noopener noreferrer"`. Contact details are validated and URL-encoded before use.
- Dependabot and `npm audit` run on every push. Keep two-factor authentication on for your GitHub account; that is the most important protection for this site.

## Custom domain

Buy the domain, add the GitHub Pages DNS records, then in `.github/workflows/deploy.yml` set `SITE_BASE_PATH: ""` and `NEXT_PUBLIC_SITE_URL` to the new address.
