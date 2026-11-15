/* ------------------------------------------------------------------
   SITE CONFIG — the ONLY file you edit to re-skin the site for a new café.
   Swap text, prices, links and photo filenames. Photos live in /assets/img.
   Every block below can be deleted and its section simply disappears
   (e.g. remove `reviews` if the café has none yet).
------------------------------------------------------------------- */
window.CAFE = {
  name: "Café Marguerite",
  short: "Marguerite",
  tagline: "Coffee · Pastry · Bakery",
  est: "Since 1987",
  heroLine: "A little corner of Paris, set down on your table.",
  heroSub: "Freshly baked croissants, slow-pulled espresso and a seat by the window.",

  /* ---- Contact & location ---- */
  address: ["14 Rue des Petits Champs", "Brooklyn, New York 11201"],
  phone: "(555) 014-0187",
  email: "hello@cafemarguerite.com",
  instagram: "@cafemarguerite",
  instagramUrl: "https://instagram.com/",
  timezone: "America/New_York",      // used for the live "Open now" badge
  getHere: "Two blocks from the A/C train. Street parking on Rue des Petits Champs; the garage on 3rd is $6 with validation.",

  /* ---- Hours: days are 0 = Sunday … 6 = Saturday, 24-hour times ---- */
  hours: [
    { label: "Monday – Friday", days: [1, 2, 3, 4, 5], open: "07:00", close: "18:00" },
    { label: "Saturday",        days: [6],             open: "08:00", close: "19:00" },
    { label: "Sunday",          days: [0],             open: "08:00", close: "16:00" }
  ],

  /* ---- Holiday / special closures (café's local date). Shows in the "Open now" badge and under the hours. ---- */
  closures: [
    { date: "2026-12-25", note: "Closed for Christmas Day" },
    { date: "2027-01-01", note: "Closed for New Year’s Day" }
  ],

  /* Set to true ONLY on the sample/demo site: adds a noindex tag so it stays out of Google.
     Client sites must have this false (or deleted). */
  demo: true,

  /* ---- Reservations ----
     provider: "Resy" | "OpenTable" | "Tock" | anything (just links out).
     For Resy / OpenTable / Tock the date + party size chosen on the site are
     passed through to the booking page. */
  reservations: {
    kicker: "Reservations",
    title: "Book a table",
    blurb: "Tables are held for 15 minutes. Walk-ins are always welcome, and the window seats go first.",
    provider: "Resy",
    url: "https://resy.com/cities/ny/your-cafe",
    perks: ["Walk-ins welcome", "Groups of 8+ please call", "Highchairs available", "Dog-friendly patio"],
    altText: "Prefer to talk to a human?"
  },

  /* ---- Reviews (SAMPLE TEXT — replace with the café's real reviews) ---- */
  reviews: {
    kicker: "Kind words",
    title: "Loved by the neighborhood",
    rating: "4.8",
    count: "1,240",
    source: "Google",
    url: "https://www.google.com/maps",
    links: [
      { label: "Read reviews on Google", url: "https://www.google.com/maps" },
      { label: "See us on Yelp", url: "https://www.yelp.com" }
    ],
    quotes: [
      { text: "The best croissant I have had outside of Paris. Crackly outside, impossibly soft inside.", name: "Sample Reviewer", source: "Google" },
      { text: "Our Saturday ritual. The café crème is perfect and the window seat is the best table in the neighborhood.", name: "Sample Reviewer", source: "Google" },
      { text: "Gorgeous space, kind staff, and the macarons make a lovely gift box.", name: "Sample Reviewer", source: "Yelp" }
    ]
  },

  /* ---- The space (interior photo prints). x / y / w are % of the table. ---- */
  space: {
    kicker: "The Space",
    title: "Come as you are",
    blurb: "Bentwood chairs, morning light and flowers on every table. Stay for a coffee or the whole afternoon.",
    items: [
      { img: "space-front-room.webp",  ar: "4/3", x: 17, y: 37, w: 28, rot: -4, depth: 1.0, cap: "The front room" },
      { img: "space-window-seat.webp", ar: "3/4", x: 41, y: 62, w: 18, rot: 3,  depth: 1.2, cap: "Window seat, 9am" },
      { img: "space-pastry-case.webp", ar: "4/3", x: 63, y: 27, w: 26, rot: 3,  depth: 0.9, cap: "Fresh from the case" },
      { img: "space-lilies.webp",      ar: "3/4", x: 84, y: 57, w: 17, rot: -3, depth: 1.1, cap: "Flowers, always" },
      { img: "space-tulips.webp",      ar: "4/3", x: 66, y: 78, w: 22, rot: -2, depth: 1.3, cap: "Tulips on the bar" }
    ]
  },

  /* ---- FAQ ---- */
  faq: {
    kicker: "Good to know",
    title: "Questions, answered",
    items: [
      ["Do you take reservations?", "Yes. Book online above for any size party, or just walk in. We hold about a third of our tables for walk-ins."],
      ["Can I host a private event or large group?", "We host parties of up to 30 for birthdays, showers and small meetings. Email us and we will put together a menu."],
      ["Do you have vegan, vegetarian or gluten-free options?", "Yes. Look for V, VG and GF beside each menu item, and tell us about any allergies when you order."],
      ["Are dogs allowed?", "Well-behaved dogs are welcome on the patio. Service animals are welcome everywhere."],
      ["Is there Wi-Fi? Can I work here?", "Free Wi-Fi, and laptops are welcome until 2pm on weekdays. Weekends we save the tables for conversation."],
      ["Do you sell gift cards or take online orders?", "Both. See the links below for gift cards, pre-orders and delivery."]
    ]
  },

  /* ---- More ways to enjoy (delete any you don't need) ---- */
  extras: [
    { label: "Order online", text: "Pickup in 15 minutes or delivery nearby.", url: "https://www.toasttab.com/" },
    { label: "Gift cards",   text: "Digital or in a little paper envelope.",  url: "#" },
    { label: "Private events", text: "Showers, birthdays and small gatherings.", url: "mailto:hello@cafemarguerite.com?subject=Private%20event" }
  ],

  /* ---- Newsletter. Paste your Mailchimp / ConvertKit form action URL below.
     Left blank, the form just shows a thank-you message (demo mode). ---- */
  newsletter: {
    title: "Join the list",
    text: "New seasonal menus, the occasional pastry drop, and nothing else.",
    netlifyForms: false,   // true on Netlify: sign-ups appear under Forms in the Netlify dashboard
    action: "",            // or paste a Mailchimp / ConvertKit form URL here instead
    button: "Sign me up"
  },

  /* ---- Interface labels (change these to translate the whole site) ---- */
  ui: {
    navMenu: "Menu",
    navSpace: "The Space",
    navVisit: "Visit",
    reserve: "Reserve",
    reserveHero: "Reserve a table",
    seeMenu: "See the menu",
    scroll: "Scroll",
    menuKicker: "Everything we serve",
    menuTitle: "The Full Menu",
    menuLegend: "V vegetarian · VG vegan · GF gluten-free",
    visitKicker: "Come see us",
    visitTitle: "A table awaits",
    hours: "Hours",
    address: "Find us",
    directions: "Get directions",
    dirShort: "Directions",
    call: "Call",
    findTable: "Find a table",
    date: "Date",
    party: "Guests",
    made: "Made with love",
    loading: "Setting the table",
    thanks: "Thank you, see you soon!"
  },

  /* Items resting on the table in the opening view (x / y / w are % of the screen) */
  heroItems: [
    { img: "latte-heart.webp",   x: 87, y: 66, w: 25, rot: 14,  depth: 1.3 },
    { img: "croissant-cut.webp", x: 11, y: 79, w: 24, rot: -12, depth: 1.5 },
    { img: "macarons.webp",      x: 9,  y: 24, w: 13, rot: -8,  depth: 1.1 }
  ],

  /* Each "scene" is one stop on the marble table as you scroll.
     items: img, x / y = position inside the stage (%), w = width (% of stage),
            rot = resting rotation, depth = parallax speed.
     lines: [name, description, price, optional dietary tags] */
  scenes: [
    {
      side: "left",
      kicker: "The Coffee",
      title: "Espresso & Cream",
      blurb: "Pulled slow, served hot, poured with a little flourish. Our house blend is roasted weekly in small batches.",
      items: [{ img: "latte-leaf.webp", x: 50, y: 50, w: 72, rot: -8, depth: 0.9 }],
      lines: [
        ["Café Crème", "Espresso, steamed milk, a rosetta on top", "5", "V · GF"],
        ["Hazelnut Macchiato", "Espresso with a splash of milk and hazelnut", "4", "V · GF"],
        ["Long Black", "A long, gentle pour", "4", "VG · GF"]
      ]
    },
    {
      side: "right",
      kicker: "The Bakery",
      title: "Butter Croissants",
      blurb: "Laminated by hand, thirty-six layers of cultured butter, baked golden before the doors open.",
      items: [{ img: "croissants-board.webp", x: 46, y: 50, w: 84, rot: 6, depth: 1.1 }],
      lines: [
        ["Plain Croissant", "Pure butter, crackling crust", "4", "V"],
        ["Almond Croissant", "Twice-baked with frangipane", "6", "V"],
        ["Chocolate Croissant", "Two batons of dark chocolate", "5", "V"]
      ]
    },
    {
      side: "left",
      kicker: "The Classic",
      title: "Espresso",
      blurb: "Short, dark and unapologetic. Taken standing at the counter the way Parisians do.",
      items: [{ img: "espresso.webp", x: 47, y: 50, w: 58, rot: 0, depth: 0.8 }],
      lines: [
        ["Espresso", "Single or double", "3", "VG · GF"],
        ["Macchiato", "A stain of milk foam", "3.5", "V · GF"],
        ["Iced Hazelnut Coffee", "Over ice, with hazelnut", "6", "VG · GF"]
      ]
    },
    {
      side: "right",
      kicker: "Little Sweets",
      title: "Macarons",
      blurb: "Rose, pistachio, salted caramel, chocolate. Baked each morning, a box for the road or a pair for the table.",
      items: [{ img: "macarons.webp", x: 44, y: 50, w: 66, rot: 0, depth: 1.0 }],
      lines: [
        ["Single Macaron", "Choose from six flavors of the day", "3", "V · GF"],
        ["Box of Six", "A small gift box, ribbon included", "17", "V · GF"],
        ["Box of Twelve", "For a larger occasion", "32", "V · GF"]
      ]
    },
    {
      side: "left",
      kicker: "To Share",
      title: "Breakfast",
      blurb: "Pastry, preserves and something sweet from the case. Perfect for sharing, or not.",
      items: [{ img: "croissant-cut.webp", x: 52, y: 50, w: 66, rot: -6, depth: 0.95 }],
      lines: [
        ["Butter & Jam Tartine", "Baguette, cultured butter, seasonal jam", "6", "V"],
        ["Croque Monsieur", "Ham, gruyère, béchamel", "13"],
        ["Pastry Plate", "Three pastries and a café crème", "14", "V"]
      ]
    }
  ]
};
