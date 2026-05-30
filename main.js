/* Reijo Jaakkola — color-direction switcher + landing page interactions */

/* ---------- color-direction switcher ---------- */
(function () {
  "use strict";

  var THEMES = [
    { id: "bright", name: "Bright Cobalt", vars: {
        "--paper": "#FCFBF8", "--paper-2": "#EEF2FF", "--ink": "#14141C", "--ink-soft": "#33343F",
        "--muted": "#6B6C78", "--muted-2": "#9A9BA6", "--hairline": "rgba(20,20,28,0.12)", "--hairline-2": "rgba(20,20,28,0.06)",
        "--accent": "#2E5BFF", "--accent-ink": "#1C3FCC", "--on-accent": "#ffffff", "--warm": "#FF5A4D", "--ink-block": "#15151F", "--nav-bg": "rgba(252,251,248,0.74)" } },
    { id: "sunset", name: "Coral Pop", vars: {
        "--paper": "#FFF9F4", "--paper-2": "#FFEEEA", "--ink": "#24161A", "--ink-soft": "#43323A",
        "--muted": "#8A7670", "--muted-2": "#B49E98", "--hairline": "rgba(36,22,26,0.12)", "--hairline-2": "rgba(36,22,26,0.06)",
        "--accent": "#FF5A3D", "--accent-ink": "#D8401F", "--on-accent": "#ffffff", "--warm": "#FF9F1C", "--ink-block": "#241317", "--nav-bg": "rgba(255,249,244,0.74)" } },
    { id: "emerald", name: "Emerald", vars: {
        "--paper": "#F8FCF8", "--paper-2": "#E7F7EE", "--ink": "#0F1F18", "--ink-soft": "#2E433A",
        "--muted": "#5F7A6E", "--muted-2": "#8FA89C", "--hairline": "rgba(15,31,24,0.12)", "--hairline-2": "rgba(15,31,24,0.06)",
        "--accent": "#0FA968", "--accent-ink": "#0A8351", "--on-accent": "#ffffff", "--warm": "#FF8A3D", "--ink-block": "#0E1F18", "--nav-bg": "rgba(248,252,248,0.74)" } },
    { id: "violet", name: "Electric Violet", vars: {
        "--paper": "#FCFAFF", "--paper-2": "#F1ECFF", "--ink": "#1B1430", "--ink-soft": "#372E4E",
        "--muted": "#6F6786", "--muted-2": "#9E96B2", "--hairline": "rgba(27,20,48,0.12)", "--hairline-2": "rgba(27,20,48,0.06)",
        "--accent": "#7C4DFF", "--accent-ink": "#5E32D6", "--on-accent": "#ffffff", "--warm": "#FF5AA0", "--ink-block": "#1A1330", "--nav-bg": "rgba(252,250,255,0.74)" } },
    { id: "paper-blue", name: "Paper & Ink", vars: {
        "--paper": "#FBFAF7", "--paper-2": "#F1EEE7", "--ink": "#16140F", "--ink-soft": "#2C2A24",
        "--muted": "#6E6A60", "--muted-2": "#908B7F", "--hairline": "rgba(22,20,15,0.12)", "--hairline-2": "rgba(22,20,15,0.07)",
        "--accent": "#1A4FC4", "--accent-ink": "#123A93", "--on-accent": "#ffffff", "--warm": "#B3261E", "--ink-block": "#16140F", "--nav-bg": "rgba(251,250,247,0.72)" } },
    { id: "sand-terracotta", name: "Sand & Terracotta", vars: {
        "--paper": "#F8F3EB", "--paper-2": "#EFE7D9", "--ink": "#2A2421", "--ink-soft": "#463E37",
        "--muted": "#857969", "--muted-2": "#A99C89", "--hairline": "rgba(42,36,33,0.13)", "--hairline-2": "rgba(42,36,33,0.07)",
        "--accent": "#C2562E", "--accent-ink": "#9C411E", "--on-accent": "#ffffff", "--warm": "#C2562E", "--ink-block": "#2A2019", "--nav-bg": "rgba(248,243,235,0.74)" } },
    { id: "cream-forest", name: "Cream & Forest", vars: {
        "--paper": "#F6F4ED", "--paper-2": "#EAEADF", "--ink": "#1E2723", "--ink-soft": "#37433B",
        "--muted": "#6E7A70", "--muted-2": "#94A096", "--hairline": "rgba(30,39,35,0.13)", "--hairline-2": "rgba(30,39,35,0.07)",
        "--accent": "#2E6F50", "--accent-ink": "#23553D", "--on-accent": "#ffffff", "--warm": "#B5642B", "--ink-block": "#18241E", "--nav-bg": "rgba(246,244,237,0.74)" } },
    { id: "blush-plum", name: "Blush & Plum", vars: {
        "--paper": "#FBF6F4", "--paper-2": "#F2E8E5", "--ink": "#26191F", "--ink-soft": "#41323A",
        "--muted": "#897680", "--muted-2": "#AD9AA3", "--hairline": "rgba(38,25,31,0.12)", "--hairline-2": "rgba(38,25,31,0.06)",
        "--accent": "#9A3B6B", "--accent-ink": "#7A2C53", "--on-accent": "#ffffff", "--warm": "#C2562E", "--ink-block": "#241019", "--nav-bg": "rgba(251,246,244,0.74)" } },
    { id: "linen-ochre", name: "Linen & Ochre", vars: {
        "--paper": "#F6F1E6", "--paper-2": "#ECE4D2", "--ink": "#2A2620", "--ink-soft": "#463F33",
        "--muted": "#847B68", "--muted-2": "#A99E84", "--hairline": "rgba(42,38,32,0.13)", "--hairline-2": "rgba(42,38,32,0.07)",
        "--accent": "#B07D1F", "--accent-ink": "#8C6212", "--on-accent": "#231906", "--warm": "#B5642B", "--ink-block": "#241F16", "--nav-bg": "rgba(246,241,230,0.76)" } },
    { id: "warm-charcoal", name: "Warm Charcoal", vars: {
        "--paper": "#1A1613", "--paper-2": "#241F1A", "--ink": "#F2EBE0", "--ink-soft": "#D8CFC2",
        "--muted": "#9C9183", "--muted-2": "#7C7264", "--hairline": "rgba(242,235,224,0.15)", "--hairline-2": "rgba(242,235,224,0.08)",
        "--accent": "#E0A23C", "--accent-ink": "#C98A26", "--on-accent": "#231806", "--warm": "#E0A23C", "--ink-block": "#0F0C0A", "--nav-bg": "rgba(26,22,19,0.74)" } }
  ];

  var KEY = "rj-theme";
  var root = document.documentElement;

  function apply(theme) {
    Object.keys(theme.vars).forEach(function (k) { root.style.setProperty(k, theme.vars[k]); });
  }
  function byId(id) {
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i];
    return THEMES[0];
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var current = byId(saved || "bright");
  apply(current);

  function swatchDots(t) {
    return '<i style="background:' + t.vars["--paper"] + '"></i><i style="background:' + t.vars["--ink"] + '"></i><i style="background:' + t.vars["--accent"] + '"></i>';
  }
  function swatchBar(t) {
    return '<i style="background:' + t.vars["--paper"] + '"></i><i style="background:' + t.vars["--paper-2"] + '"></i><i style="background:' + t.vars["--accent"] + '"></i><i style="background:' + t.vars["--ink"] + '"></i>';
  }

  function build() {
    var dock = document.createElement("div");
    dock.className = "theme-dock";
    dock.id = "themeDock";
    var cards = THEMES.map(function (t) {
      return '<button class="swatch-card" data-theme="' + t.id + '" aria-label="' + t.name + '">' +
               '<span class="sw-row">' + swatchBar(t) + '</span><span class="sw-name">' + t.name + '</span></button>';
    }).join("");
    dock.innerHTML =
      '<div class="theme-dock__panel" id="themePanel">' +
        '<div class="theme-dock__head">Color direction <span>pick one — applies live</span></div>' +
        '<div class="theme-dock__grid">' + cards + '</div></div>' +
      '<button class="theme-dock__toggle" id="themeToggle" aria-expanded="false">' +
        '<span class="tdi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
          '<circle cx="13.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="17.5" cy="10.5" r="1.2" fill="currentColor" stroke="none"/>' +
          '<circle cx="8.5" cy="7.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r="1.2" fill="currentColor" stroke="none"/>' +
          '<path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-1.8 0-.6-.4-1-.4-1.6 0-.6.5-1.1 1.2-1.1H16a5 5 0 0 0 5-5c0-4.4-4-7.5-9-7.5Z"/></svg></span>' +
        '<span>Color</span><span class="theme-dock__current" id="themeCurrent">' + swatchDots(current) + '</span></button>';
    document.body.appendChild(dock);

    var toggle = dock.querySelector("#themeToggle");
    var currentEl = dock.querySelector("#themeCurrent");
    function markActive() {
      dock.querySelectorAll(".swatch-card").forEach(function (c) {
        c.classList.toggle("active", c.getAttribute("data-theme") === current.id);
      });
    }
    markActive();
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = dock.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    dock.querySelectorAll(".swatch-card").forEach(function (card) {
      card.addEventListener("click", function () {
        current = byId(card.getAttribute("data-theme"));
        apply(current);
        try { localStorage.setItem(KEY, current.id); } catch (e) {}
        currentEl.innerHTML = swatchDots(current);
        markActive();
      });
    });
    document.addEventListener("click", function (e) {
      if (dock.classList.contains("open") && !dock.contains(e.target)) {
        dock.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { dock.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  // color switcher dock removed per review — default theme stays applied above.
  // To bring the picker back, restore: if (document.readyState === "loading") ... build();
})();

/* ---------- landing page interactions ---------- */
(function () {
  "use strict";

  // enable reveal animations only when JS runs (content is visible by default)
  document.documentElement.classList.add("js");

  // year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // nav shadow on scroll
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 12) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // mobile menu
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // expandable lists
  document.querySelectorAll(".more-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.getAttribute("data-target"));
      if (!target) return;
      var open = target.style.display === "block";
      target.style.display = open ? "none" : "block";
      btn.classList.toggle("open", !open);
      var span = btn.querySelector("span");
      if (span) span.textContent = open ? "Show more publications" : "Show fewer";
    });
  });

  // ---- contact form ----
  // To receive messages directly on the site (no email-client hop), paste a
  // form endpoint below — e.g. a free Formspree URL "https://formspree.io/f/xxxx".
  // Leave blank to fall back to opening the visitor's email app pre-filled.
  var FORM_ENDPOINT = "";

  var form = document.getElementById("contactForm");
  if (form) {
    var status = document.getElementById("cfStatus");
    var el = form.elements;

    function setStatus(msg, kind) {
      status.textContent = msg;
      status.className = "cf-status show " + (kind || "");
    }
    function openMailto(d) {
      var subject = "Website message — " + d.topic;
      var body = "Name: " + d.name + "\nEmail: " + d.email +
                 (d.org ? ("\nOrganization: " + d.org) : "") +
                 "\nAbout: " + d.topic + "\n\n" + d.message;
      window.location.href = "mailto:jaakkolareijo@hotmail.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      setStatus("Opening your email app — just hit send and it comes straight to me.", "ok");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = {
        name: el["name"].value.trim(),
        email: el["email"].value.trim(),
        org: el["org"].value.trim(),
        topic: el["topic"].value,
        message: el["message"].value.trim()
      };
      if (!d.name || !d.email || !d.message) {
        setStatus("Please add your name, email, and a short message.", "error");
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) {
        setStatus("That email doesn't look quite right — mind checking it?", "error");
        return;
      }
      var btn = form.querySelector(".cf-submit");
      if (FORM_ENDPOINT) {
        btn.disabled = true; btn.textContent = "Sending…";
        fetch(FORM_ENDPOINT, { method: "POST", headers: { "Accept": "application/json" }, body: new FormData(form) })
          .then(function (r) { if (!r.ok) throw new Error(); return r; })
          .then(function () {
            form.reset(); btn.disabled = false; btn.textContent = "Send message →";
            setStatus("Thanks — your message is on its way. I'll be in touch within a day.", "ok");
          })
          .catch(function () {
            btn.disabled = false; btn.textContent = "Send message →";
            openMailto(d);
          });
      } else {
        openMailto(d);
      }
    });
  }

  // scroll reveal — progressive enhancement only; never gates content
  var reveals = document.querySelectorAll(".reveal");
  function pageIn() {
    if (!document.body || document.body.__faded) return;
    document.body.__faded = true;
    var b = document.body;
    // JS-driven fade: step opacity up with setTimeout so the transition plays
    // even where CSS transitions / requestAnimationFrame are throttled (some
    // embedded + preview iframes). Ends fully visible no matter what.
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      b.style.opacity = "1";
      return;
    }
    var steps = 26, i = 0, dur = 560;
    (function step() {
      i++;
      var t = i / steps;
      if (t > 1) t = 1;
      var eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      b.style.opacity = eased.toFixed(3);
      if (t < 1) setTimeout(step, dur / steps);
    })();
  }
  function showAll() {
    pageIn();
    reveals.forEach(function (el) {
      if (!el.classList.contains("in")) el.classList.add("instant", "in");
    });
  }
  function inViewport(el) {
    var r = el.getBoundingClientRect();
    var h = window.innerHeight || document.documentElement.clientHeight;
    return r.top < h * 0.95 && r.bottom > 0;
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });

    var setupReveals = function () {
      var all = [].slice.call(reveals);
      var firstScreen = all.filter(inViewport);
      // Fallback: if layout reports nothing on-screen yet (can happen the instant
      // the standalone bundle swaps in its document), treat the opening run as
      // first-screen so the page still fades in cleanly.
      if (!firstScreen.length) firstScreen = all.slice(0, 9);

      // The first screen rides the whole-page fade-in, so show it without its own
      // per-element transition; everything below the fold animates on scroll.
      all.forEach(function (el) {
        if (firstScreen.indexOf(el) === -1) {
          el.style.transitionDelay = "0s";
          io.observe(el);
        } else {
          el.classList.add("instant", "in");
        }
      });

      // Force a style flush so the hidden state is committed, THEN fade the whole
      // page in as one smooth motion. We avoid requestAnimationFrame on purpose:
      // some embedded/preview contexts throttle it so it never fires, which would
      // leave the page stuck invisible.
      void document.documentElement.offsetWidth;
      pageIn();
    };

    // let layout settle for a tick before deciding what's on-screen
    setTimeout(setupReveals, 20);

    // safety net: if anything above stalls, make sure the page is visible.
    setTimeout(showAll, 2600);
  } else {
    showAll();
  }
})();

/* ---------- fit rule blocks to their container width ---------- */
(function () {
  var rules = [].slice.call(document.querySelectorAll(".rule"));
  if (!rules.length) return;

  function fit(el) {
    // reset to the CSS base size so we always measure from the same start
    el.style.fontSize = "";
    var cs = window.getComputedStyle(el);
    var base = parseFloat(cs.fontSize);
    var padL = parseFloat(cs.paddingLeft) || 0;
    var padR = parseFloat(cs.paddingRight) || 0;
    var avail = el.clientWidth - padL - padR;
    var content = el.scrollWidth - padL - padR;
    if (content > avail && content > 0) {
      // monospace width scales ~linearly with font-size; 0.99 keeps a hair of slack
      var size = base * (avail / content) * 0.99;
      el.style.fontSize = size.toFixed(2) + "px";
    }
  }

  function fitAll() { rules.forEach(fit); }

  if ("ResizeObserver" in window) {
    var ro = new ResizeObserver(function () { fitAll(); });
    rules.forEach(function (el) {
      var card = el.closest(".proof-card") || el.parentNode;
      ro.observe(card);
    });
  } else {
    window.addEventListener("resize", fitAll);
  }

  // initial pass — and again after webfonts load, since metrics shift
  fitAll();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitAll);
  }
  window.addEventListener("load", fitAll);
})();
