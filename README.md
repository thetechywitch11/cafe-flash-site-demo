# Café website template

A single-page café site: a white marble table, with real overhead photos sliding in and
landing on it as you scroll. French-style lettering (Pinyon Script + Cormorant Garamond),
English copy. No build step, no dependencies. Open `index.html` or drop the folder on any static host.

## Re-skin for a new café (about 10 minutes)
Edit **`site.config.js`** only. Delete any block (e.g. `reviews`) and its section disappears.

| Block | What it controls |
|---|---|
| name, tagline, est., address, phone, email, Instagram | Hero, footer, search-engine data |
| `hours` + `timezone` | Hours table and the live "Open now / Closed · opens …" badge |
| `reservations` | "Book a table" section. `provider` can be Resy, OpenTable or Tock: the date and party size picked on the site are passed to that booking page. Paste the café's own booking URL in `url`. |
| `reviews` | Rating + three quotes + links to Google/Yelp. **The quotes are sample text; replace them with the café's real reviews before launch.** |
| `space` | The scattered interior "prints" gallery (swap in the café's own photos) |
| `faq` | Accordion (also published as FAQ structured data for Google) |
| `extras` | Order online / gift cards / private events cards |
| `newsletter` | Paste a Mailchimp/ConvertKit form `action` URL. Left blank, it just shows a thank-you (demo mode). |
| `scenes` | The menu: each scene = a photo on the table + a menu card. Optional 4th item per line = dietary tags (V, VG, GF) |
| `ui` | Every label on the site, so it can be translated |

The Google Map and "Get directions" link are generated from the address automatically.
On phones a Reserve / Call / Directions bar sticks to the bottom of the screen.
Search-engine structured data (Café, hours, rating, FAQ) is generated from the same config.

Colors and fonts: the `:root` tokens at the top of `style.css`.

## Swapping food photos
Food photos are transparent WebP cutouts shot from above, in `assets/img/`.
1. Drop the original photos (white / clean backgrounds work best) in `tools/raw-photos/`.
2. Edit the job list in `tools/cut-out-photos.py` (crop box + output name) and run it
   (needs `pip install "rembg[cpu,cli]" pillow`). It removes the background and trims to the subject.
3. Convert to WebP and point `site.config.js` at the new filename.
Interior photos (`space-*.webp`) are ordinary cropped photos: 4:3 landscape or 3:4 portrait, about 900px wide.

## Photo credits (all Unsplash License, free for commercial use)
Marble: Rachel Kelli. Latte + croissants on board: Andrea Riezzo. Espresso mug: Mockup Graphics.
Cut croissant: Olga Petnyunene. Macarons: Diana Polekhina. Heart latte-art cup: Coffee with Joshua.
Interior: front room by Amy Vosters, window seat by "T" (tanyabarrow), lilies by Haydn Golden,
pastry case by Mimi Thian, tulips by Yuri Krupenin.
Check each source on unsplash.com before delivering to a client; swap in the café's own photos when you can.

## Deploying (Netlify)
There is no build step. Drag the folder onto Netlify, or connect the repo, with "publish directory" set to the repo root (`netlify.toml` already says so).
- Newsletter sign-ups: set `netlifyForms: true` in `site.config.js`. Sign-ups then show up under **Forms** in the Netlify dashboard.
- Editing after hand-off: everything the café will ever change lives in `site.config.js` (menu, prices, hours, closures, links). Netlify's in-browser editor, or a one-click GitHub edit, is enough.
- Before launch, set `demo: false` (the sample site is marked noindex so it stays out of Google).
- See `CLIENT-INTAKE.md` for what to collect from a client and a delivery checklist.
