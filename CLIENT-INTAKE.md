# Client intake: what to send me

Send everything in one email or a shared folder. Anything missing, I'll leave a tasteful placeholder.

**The basics**
- Café name, tagline (e.g. "Coffee · Pastry · Bakery"), and year opened
- Address, phone, email, Instagram handle
- Opening hours (and any holidays you're closed this year)

**Menu**
- Your menu as a doc, photo or PDF: item names, short descriptions, prices
- Dietary tags if you use them (V / VG / GF)
- Your 5 best-selling or best-looking items, so I know what to feature

**Photos**
- Food and drink: shot from straight above on a plain, light surface works best (a white plate on a table is fine). Phone photos are OK in daylight.
- Interior: 5 photos of your space (front room, window seat, counter, details)
- No photos yet? I'll use licensed stock until you do.

**Booking and links**
- Your reservation link (Resy, OpenTable, Tock, etc.), or "no reservations"
- Google Maps / Google reviews link, Yelp link
- Online ordering, gift card, and catering/private-event links (if any)
- Which email should newsletter sign-ups and event inquiries go to?

**Branding**
- Logo (if you have one) and brand colors/fonts (if you have them). Otherwise I'll pick from the marble + wine + gold palette.

**For delivery**
- A Netlify account (free). I'll deploy the site into it so you can edit text, prices and hours yourself afterwards.
- Your domain name, if you have one.

## Delivery checklist (for me)
- [ ] `demo: false` in `site.config.js` (or delete the line)
- [ ] Replace sample reviews with real ones (or delete the `reviews` block)
- [ ] Real reservation URL and provider; test the "Find a table" button
- [ ] Hours + timezone + holiday closures; check the "Open now" badge
- [ ] Newsletter: `netlifyForms: true` (or a Mailchimp action URL); submit a test sign-up
- [ ] Replace stock interior photos with the client's, or keep credits (see README)
- [ ] Check on a phone: Reserve / Call / Directions bar works
- [ ] Deploy to the client's Netlify, then hand over the edit instructions
