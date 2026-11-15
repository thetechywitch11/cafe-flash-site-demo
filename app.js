/* Renders the whole page from window.CAFE, runs the loading screen, and drives the
   "slide in from off-screen and land on the table" motion. */
(function () {
  const C = window.CAFE;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const IMG = "assets/img/";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const U = C.ui;
  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const telHref = "tel:" + C.phone.replace(/[^\d+]/g, "");
  const mapsDir = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(C.name + ", " + C.address.join(", "));

  /* ---------- time helpers ---------- */
  const toMin = (s) => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
  const fmt = (s) => { const [h, m] = s.split(":").map(Number); const ap = h >= 12 ? "pm" : "am"; const hh = h % 12 || 12; return hh + (m ? ":" + String(m).padStart(2, "0") : "") + ap; };
  function nowInCafe() {
    const f = new Intl.DateTimeFormat("en-US", { timeZone: C.timezone, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" });
    const p = Object.fromEntries(f.formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { dow: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday), min: (+p.hour % 24) * 60 + +p.minute, date: `${p.year}-${p.month}-${p.day}` };
  }
  const closures = C.closures || [];
  const closureOn = (date) => closures.find((c) => c.date === date);
  const plusDays = (date, n) => { const d = new Date(date + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
  function openStatus() {
    const { dow, min, date } = nowInCafe();
    const closedToday = closureOn(date);
    const today = C.hours.find((h) => h.days.includes(dow));
    if (!closedToday && today && min >= toMin(today.open) && min < toMin(today.close)) return { open: true, text: `Open now · until ${fmt(today.close)}` };
    for (let d = 0; d < 15; d++) {
      const day = (dow + d) % 7, h = C.hours.find((x) => x.days.includes(day));
      if (!h || closureOn(plusDays(date, d)) || (d === 0 && min >= toMin(h.open))) continue;
      const when = d === 0 ? "today" : d === 1 ? "tomorrow" : DAYS[day];
      return { open: false, text: `${closedToday ? closedToday.note || "Closed today" : "Closed"} · opens ${when} at ${fmt(h.open)}` };
    }
    return { open: false, text: "Closed" };
  }
  /* "Open now" badge: set on load, then re-checked every minute and when the tab becomes visible again */
  function updateOpen() {
    const s = openStatus();
    document.querySelectorAll("[data-open]").forEach((el) => { el.innerHTML = `<i class="dot ${s.open ? "on" : ""}"></i>${esc(s.text)}`; });
  }

  /* ---------- basic binding ---------- */
  document.title = `${C.name} — ${C.tagline}`;
  $('meta[name="description"]').content = `${C.name}. ${C.heroSub} ${C.address.join(", ")}.`;
  document.querySelectorAll("[data-bind]").forEach((el) => (el.textContent = C[el.dataset.bind]));
  document.querySelectorAll("[data-ui]").forEach((el) => (el.textContent = U[el.dataset.ui]));
  $("#year").textContent = new Date().getFullYear();
  $("#mbCall").href = telHref; $("#mbDir").href = mapsDir; $("#mbDir").target = "_blank"; $("#mbDir").rel = "noopener";

  if (C.demo) { const m = document.createElement("meta"); m.name = "robots"; m.content = "noindex"; document.head.appendChild(m); } // keep the sample site out of search results

  /* ---------- markup builders ---------- */
  const itemHTML = (it) =>
    `<div class="item" style="left:${it.x}%;top:${it.y}%;width:${it.w}%" data-rot="${it.rot || 0}" data-depth="${it.depth ?? 1}">
       <img src="${IMG}${esc(it.img)}" alt="" decoding="async"></div>`;
  const printHTML = (it) =>
    `<div class="item print" style="left:${it.x}%;top:${it.y}%;width:${it.w}%" data-rot="${it.rot || 0}" data-depth="${it.depth ?? 1}">
       <div class="mv"><img src="${IMG}${esc(it.img)}" alt="${esc(it.cap)}" decoding="async" style="aspect-ratio:${it.ar || "4/3"}"><span class="cap">${esc(it.cap)}</span></div></div>`;
  const linesHTML = (lines) =>
    `<ul class="lines">${lines.map(([n, d, p, t]) =>
      `<li class="line"><span class="n">${esc(n)}${t ? ` <small class="tag">${esc(t)}</small>` : ""}</span><span class="dots"></span><span class="p">${esc(p)}</span>${d ? `<span class="d">${esc(d)}</span>` : ""}</li>`).join("")}</ul>`;
  const head = (k, t, extra = "") => `<p class="kicker">${esc(k)}</p><h2 class="title">${esc(t)}</h2><div class="orn-line"><span>✦</span></div>${extra}`;
  const hoursRows = () => C.hours.map((h) => `<div><dt>${esc(h.label)}</dt><dd>${fmt(h.open)} – ${fmt(h.close)}</dd></div>`).join("");

  const upcomingClosures = () => {
    const { date } = nowInCafe();
    const list = closures.filter((c) => c.date >= date).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
    if (!list.length) return "";
    const nice = (d) => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
    return `<ul class="closures">${list.map((c) => `<li><strong>${nice(c.date)}</strong> ${esc(c.note || "Closed")}</li>`).join("")}</ul>`;
  };

  /* hero + scenes + full menu */
  $("#heroStage").innerHTML = (C.heroItems || []).map(itemHTML).join("");
  $("#scenes").innerHTML = C.scenes.map((s) => `
    <section class="scene ${s.side}">
      <div class="stage">${s.items.map(itemHTML).join("")}</div>
      <article class="card reveal">${head(s.kicker, s.title, `<p class="blurb">${esc(s.blurb)}</p>`)}${linesHTML(s.lines)}</article>
    </section>`).join("");
  $("#carteGrid").innerHTML = C.scenes.map((s) => `<div><h3>${esc(s.title)}</h3>${linesHTML(s.lines.map(([n, , p, t]) => [n, "", p, t]))}</div>`).join("");

  /* the space */
  const SP = C.space;
  if (SP) $("#space").innerHTML = `
    <div class="sec-head reveal">${head(SP.kicker, SP.title, `<p class="blurb">${esc(SP.blurb)}</p>`)}</div>
    <div class="space-stage">${SP.items.map(printHTML).join("")}</div>`;
  else $("#space").remove();

  /* reviews */
  const RV = C.reviews;
  if (RV) $("#reviews").innerHTML = `
    <div class="paper wide reveal">
      ${head(RV.kicker, RV.title)}
      <p class="rating"><span class="stars" aria-label="${esc(RV.rating)} out of 5 stars">★★★★★</span> <strong>${esc(RV.rating)}</strong> <span>on ${esc(RV.source)} · ${esc(RV.count)} reviews</span></p>
      <div class="quotes">${RV.quotes.map((q) => `
        <figure class="quote"><blockquote>“${esc(q.text)}”</blockquote>
        <figcaption>${esc(q.name)} <em>${esc(q.source)}</em></figcaption></figure>`).join("")}</div>
      <div class="btn-row">${RV.links.map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</div>
    </div>`;
  else $("#reviews").remove();

  /* reservations */
  const R = C.reservations;
  if (R) $("#reserve").innerHTML = `
    <div class="paper narrow reveal">
      ${head(R.kicker, R.title, `<p class="blurb">${esc(R.blurb)}</p>`)}
      <form class="res-form" id="resForm">
        <label><span>${esc(U.date)}</span><input type="date" id="resDate" required></label>
        <label><span>${esc(U.party)}</span><select id="resParty">${[1,2,3,4,5,6,7,8].map((n) => `<option value="${n}"${n === 2 ? " selected" : ""}>${n}${n === 8 ? "+" : ""}</option>`).join("")}</select></label>
        <button class="btn btn-solid" type="submit">${esc(U.findTable)}</button>
      </form>
      <ul class="perks">${R.perks.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <p class="res-alt">${esc(R.altText)} <a href="${telHref}">${esc(C.phone)}</a> · <a href="mailto:${esc(C.email)}">${esc(C.email)}</a></p>
      <p class="powered">Reservations by ${esc(R.provider)}</p>
    </div>`;
  else $("#reserve").remove();

  /* visit */
  $("#visit").innerHTML = `
    <div class="paper wide reveal">
      ${head(U.visitKicker, U.visitTitle)}
      <div class="visit-grid">
        <div>
          <h3>${esc(U.hours)}</h3>
          <p class="open-now" data-open></p>
          <dl class="hours">${hoursRows()}</dl>
          ${upcomingClosures()}
          <h3 class="h3-gap">${esc(U.address)}</h3>
          <address>${C.address.map(esc).join("<br>")}</address>
          ${C.getHere ? `<p class="gethere">${esc(C.getHere)}</p>` : ""}
          <div class="btn-row left">
            <a class="btn btn-solid" href="${esc(mapsDir)}" target="_blank" rel="noopener">${esc(U.directions)}</a>
            <a class="btn" href="${telHref}">${esc(U.call)}</a>
          </div>
        </div>
        <div class="map"><iframe title="Map to ${esc(C.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=${encodeURIComponent(C.address.join(", "))}&z=15&output=embed"></iframe></div>
      </div>
    </div>`;

  /* faq */
  const FQ = C.faq;
  if (FQ) $("#faq").innerHTML = `
    <div class="paper narrow reveal">
      ${head(FQ.kicker, FQ.title)}
      <div class="qa-list">${FQ.items.map(([q, a]) => `<details class="qa"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div>`;
  else $("#faq").remove();

  /* extras + newsletter */
  const NL = C.newsletter;
  $("#more").innerHTML = `
    <div class="more-grid reveal">${(C.extras || []).map((e) => `
      <a class="more-card" href="${esc(e.url)}"${/^https?:/.test(e.url) ? ' target="_blank" rel="noopener"' : ""}>
        <span class="mc-t">${esc(e.label)}</span><span class="mc-d">${esc(e.text)}</span><span class="mc-a">→</span></a>`).join("")}</div>
    ${NL ? `<form class="news reveal" id="newsForm" name="newsletter"${NL.action ? ` action="${esc(NL.action)}" method="post" target="_blank"` : ""}>
      <div><h3>${esc(NL.title)}</h3><p>${esc(NL.text)}</p></div>
      <div class="news-row"><input type="email" name="EMAIL" placeholder="you@email.com" required aria-label="Email address"><button class="btn btn-solid" type="submit">${esc(NL.button)}</button></div>
      <p class="news-ok" hidden>${esc(U.thanks)}</p></form>` : ""}`;

  updateOpen();
  setInterval(updateOpen, 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) updateOpen(); });

  /* footer */
  $("#footLinks").innerHTML = [
    `<a href="${esc(C.instagramUrl)}" target="_blank" rel="noopener">${esc(C.instagram)}</a>`,
    `<a href="${telHref}">${esc(C.phone)}</a>`,
    `<a href="mailto:${esc(C.email)}">${esc(C.email)}</a>`,
    `<a href="${esc(mapsDir)}" target="_blank" rel="noopener">${esc(C.address[0])}</a>`,
  ].join("<span>·</span>");

  /* ---------- forms ---------- */
  const tz = C.timezone;
  const resForm = $("#resForm");
  if (resForm) {
    const dateEl = $("#resDate");
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(new Date());
    dateEl.value = today; dateEl.min = today;
    resForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = R.url, sep = u.includes("?") ? "&" : "?", p = (R.provider || "").toLowerCase(), d = dateEl.value, n = $("#resParty").value;
      const url = p === "resy" ? `${u}${sep}date=${d}&seats=${n}`
        : p === "opentable" ? `${u}${sep}covers=${n}&dateTime=${d}T19%3A00`
        : p === "tock" ? `${u}${sep}date=${d}&size=${n}` : u;
      window.open(url, "_blank", "noopener");
    });
  }
  const newsForm = $("#newsForm");
  if (newsForm && !NL.action) newsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const done = () => { $(".news-row", newsForm).hidden = true; $(".news-ok", newsForm).hidden = false; };
    if (NL.netlifyForms) {   // Netlify Forms: emails show up in the Netlify dashboard (needs the hidden form in index.html)
      const body = new URLSearchParams({ "form-name": "newsletter", email: new FormData(newsForm).get("EMAIL") });
      fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body }).then(done).catch(done);
    } else done();           // demo mode
  });

  /* ---------- SEO: structured data ---------- */
  const ld = {
    "@context": "https://schema.org", "@type": "CafeOrCoffeeShop", name: C.name, description: C.heroSub,
    telephone: C.phone, email: C.email, servesCuisine: ["Coffee", "Pastry", "Bakery"],
    address: { "@type": "PostalAddress", streetAddress: C.address[0], addressLocality: C.address[1] },
    openingHoursSpecification: C.hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days.map((d) => DAYS[d]), opens: h.open, closes: h.close })),
    sameAs: [C.instagramUrl],
  };
  if (RV) ld.aggregateRating = { "@type": "AggregateRating", ratingValue: RV.rating, reviewCount: String(RV.count).replace(/,/g, "") };
  if (R) ld.acceptsReservations = true;
  const ldFaq = FQ && { "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FQ.items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  [ld, ldFaq].filter(Boolean).forEach((o) => { const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(o); document.head.appendChild(s); });

  /* ---------- nav + text reveal ---------- */
  const nav = $("#nav");
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------- slide-in motion ----------
     t = 0 : item is parked just off the side of the screen (rotated, as if rolling in)
     t = 1 : item has slid across and is resting on the table.
     Items on the left half of the screen enter from the left, the right half from the right.
     On scroll, t follows the item's position (so scrolling back up slides it back out). */
  const items = [...document.querySelectorAll(".item")].map((el) => ({
    el, img: el.firstElementChild,
    rot: parseFloat(el.dataset.rot), depth: parseFloat(el.dataset.depth),
    hero: !!el.closest(".hero-stage"),
    intro: reduce ? 1 : 0,
  }));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  let vw = innerWidth, vh = innerHeight, ticking = false;

  function frame() {
    ticking = false;
    nav.classList.toggle("solid", scrollY > 30);
    for (const it of items) {
      const r = it.el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const dir = cx < vw / 2 ? -1 : 1;
      const away = dir < 0 ? -(r.right + 80) : vw - r.left + 80; // px needed to be fully off-screen
      const t = reduce ? 1 : it.hero ? it.intro : easeOut(clamp((vh * 1.0 - r.top) / (vh * 0.7)));
      const lift = 1 - t;
      const drift = reduce ? 0 : (r.top + r.height / 2 - vh / 2) * (it.depth - 1) * -0.06 + (it.hero ? scrollY * -0.12 * it.depth : 0);
      const s = it.img.style;
      s.setProperty("--tx", (lift * away).toFixed(1) + "px");
      s.setProperty("--ty", drift.toFixed(1) + "px");
      s.setProperty("--rot", (it.rot + lift * dir * 70).toFixed(2) + "deg");
    }
  }
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", () => { vw = innerWidth; vh = innerHeight; req(); });
  frame();

  function heroIntro() {
    if (reduce) return;
    items.filter((i) => i.hero).forEach((it, n) => {
      setTimeout(() => {
        it.img.style.transition = "transform 1.7s cubic-bezier(.16,1,.3,1)";
        it.intro = 1; frame();
        setTimeout(() => { it.img.style.transition = "none"; }, 1900);
      }, 120 + n * 240);
    });
  }

  /* ---------- loading screen ----------
     Waits for fonts + every photo, shows real progress, holds a minimum time so the
     animation reads, then lifts like a curtain and the hero items slide in. */
  const loader = $("#loader"), bar = $("#ldBar"), pct = $("#ldPct");
  const all = [...(C.heroItems || []), ...C.scenes.flatMap((s) => s.items), ...((C.space && C.space.items) || [])];
  const urls = [...new Set(all.map((i) => IMG + i.img).concat(IMG + "marble.jpg"))];
  const total = urls.length + 1; // +1 for fonts
  let loaded = 0, shown = 0, finished = false;
  const tick = () => loaded++;
  urls.forEach((u) => {
    const im = new Image();
    im.onload = im.onerror = tick;            // load events (not decode) so background tabs can't stall it
    im.src = u;
  });
  Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 4000))]).then(tick);

  const minTime = reduce ? 500 : 2200, t0 = performance.now();
  let last = t0;
  const timer = setInterval(() => {            // timer-driven (rAF is paused in background tabs)
    const now = performance.now(), dt = now - last; last = now;
    const target = (loaded / total) * 100;
    const timeCap = clamp((now - t0) / minTime) * 100;
    shown += (Math.min(target, timeCap) - shown) * (1 - Math.exp(-dt / 160));
    if (shown > 99.4) shown = 100;
    bar.style.transform = `scaleX(${shown / 100})`;
    pct.textContent = Math.round(shown) + "%";
    if (shown >= 100 && !finished) { clearInterval(timer); finish(); }
  }, 33);
  function finish() {
    finished = true;
    setTimeout(() => {
      loader.classList.add("done");
      document.body.classList.remove("loading");
      if (!location.hash) scrollTo(0, 0);
      setTimeout(heroIntro, 450);
      setTimeout(() => loader.remove(), 1500);
    }, 250);
  }
  setTimeout(() => { if (!finished) loaded = total; }, 9000); // never get stuck on a slow network
})();
