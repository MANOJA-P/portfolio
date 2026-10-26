/* Portfolio — interactions
   theme toggle · mobile menu · header state · scroll reveal
   active nav link · stat counters · contact form validation           */
(() => {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  // Guarded so one missing API can't take down all interactivity.
  const mediaMatches = (query) =>
    typeof window.matchMedia === "function" ? window.matchMedia(query).matches : false;
  const prefersReduced = mediaMatches("(prefers-reduced-motion: reduce)");

  /* ---- Theme ---------------------------------------------------------- */
  const root = document.documentElement;
  const toggle = $("#theme-toggle");

  const applyTheme = (theme, persist) => {
    root.dataset.theme = theme;
    toggle?.setAttribute("aria-pressed", String(theme === "light"));
    if (persist) {
      try { localStorage.setItem("theme", theme); } catch { /* private mode */ }
    }
  };

  if (toggle) {
    applyTheme(root.dataset.theme, false);
    toggle.addEventListener("click", () => {
      applyTheme(root.dataset.theme === "light" ? "dark" : "light", true);
    });
  }

  /* ---- Header + mobile menu ------------------------------------------- */
  const header = $("#header");
  const nav = $("#nav");
  const menuBtn = $("#menu-btn");

  const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeMenu = () => {
    nav?.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  };

  menuBtn?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());
  window.addEventListener("resize", () => window.innerWidth > 900 && closeMenu());

  /* ---- Reveal on scroll ---------------------------------------------- */
  const revealables = $$(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("in"));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        // slight stagger for elements entering together
        entry.target.style.transitionDelay = `${Math.min(i * 70, 280)}ms`;
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealables.forEach((el) => revealObserver.observe(el));
  }

  /* ---- Stat counters -------------------------------------------------- */
  const counters = $$("[data-count]");
  const runCounter = (el) => {
    const target = Number(el.dataset.count) || 0;
    const decimals = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || "";
    const format = (value) => value.toFixed(decimals) + (value === target ? suffix : "");
    if (prefersReduced) { el.textContent = format(target); return; }

    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (counters.length && "IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => countObserver.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  /* ---- Footer year ---------------------------------------------------- */
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---- Contact form ---------------------------------------------------
     No backend here. Validation runs live; on success we hand off to the
     visitor's mail client. Swap the block below for a form endpoint
     (Formspree, Netlify Forms, your own API) when you have one.          */
  const form = $("#contact-form");
  const note = $("#form-note");
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setNote = (msg, kind = "") => {
    if (!note) return;
    note.textContent = msg;
    note.className = `form-note ${kind}`.trim();
  };

  const validate = (field) => {
    const value = field.value.trim();
    const ok = field.type === "email" ? EMAIL_RE.test(value) : value.length > 0;
    field.setAttribute("aria-invalid", String(!ok));
    return ok;
  };

  if (form) {
    $$("input, textarea", form).forEach((field) => {
      field.addEventListener("blur", () => validate(field));
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") validate(field);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fields = $$("input, textarea", form);
      const invalid = fields.filter((f) => !validate(f));
      if (invalid.length) {
        setNote("Please fill in every field with a valid email.", "err");
        invalid[0].focus();
        return;
      }

      const to = form.dataset.mailto || "you@example.com";
      const name = $("#name").value.trim();
      const email = $("#email").value.trim();
      const message = $("#message").value.trim();
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      setNote("Opening your email app…", "ok");
      form.reset();
    });
  }
})();
