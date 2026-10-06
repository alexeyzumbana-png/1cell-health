/* =========================================================
   1CELL HEALTH — interactions (v18)
   ========================================================= */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover)").matches;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || doc).querySelectorAll(s)); };
  var money = function (n) { return "$" + Number(n).toLocaleString("en-US"); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var meta = function (n) { var m = $('meta[name="' + n + '"]'); return m ? m.getAttribute("content").trim() : ""; };

  var CFG = { endpoint: meta("1cell:form-endpoint"), email: meta("1cell:contact-email") || "contacto@1cellhealth.com" };

  /* =======================================================
     Language
     ======================================================= */
  var ES = window.I18N_ES || {};
  var DYN = {
    en: {
      added: "{n} added to your order", each: "each", remove: "Remove", empty: "Your order is empty.",
      reviewErr: "Please review the highlighted fields.",
      mailTitle: "Almost done", mailBody: "Your email app should open with this request addressed to {e}. Send that email to complete your request.",
      mailFallback: "If nothing opened, write to us at {e} — you can copy the request text below.",
      sentTitle: "Request sent", sentBody: "Thank you. Our team will reply by email.",
      copy: "Copy request text", copied: "Request text copied", again: "Send another request", subtotal: "Subtotal",
      close: "Close"
    },
    es: {
      added: "{n} añadido a tu pedido", each: "c/u", remove: "Quitar", empty: "Tu pedido está vacío.",
      reviewErr: "Revisa los campos marcados.",
      mailTitle: "Casi listo", mailBody: "Tu aplicación de correo debería abrirse con esta solicitud dirigida a {e}. Envía ese correo para completar tu solicitud.",
      mailFallback: "Si no se abrió nada, escríbenos a {e}; puedes copiar el texto de la solicitud abajo.",
      sentTitle: "Solicitud enviada", sentBody: "Gracias. Nuestro equipo te responderá por correo.",
      copy: "Copiar texto de la solicitud", copied: "Texto copiado", again: "Enviar otra solicitud", subtotal: "Subtotal",
      close: "Cerrar"
    }
  };
  var LS_LANG = "1cell_lang", LS_CART = "1cell_cart";
  var lang = "en";
  try { lang = localStorage.getItem(LS_LANG) === "es" ? "es" : "en"; } catch (e) {}
  function t(k, vars) {
    var s = (DYN[lang] && DYN[lang][k]) || DYN.en[k] || k;
    if (vars) Object.keys(vars).forEach(function (v) { s = s.replace("{" + v + "}", vars[v]); });
    return s;
  }

  var txtEls = $$("[data-i18n]"), phEls = $$("[data-i18n-ph]"), ariaEls = $$("[data-i18n-aria]");
  txtEls.forEach(function (el) { el._en = el.innerHTML; });
  phEls.forEach(function (el) { el._en = el.getAttribute("placeholder") || ""; });
  ariaEls.forEach(function (el) { el._en = el.getAttribute("aria-label") || el.getAttribute("alt") || ""; });

  function applyLang(l) {
    lang = l;
    try { localStorage.setItem(LS_LANG, l); } catch (e) {}
    root.setAttribute("lang", l);
    var es = l === "es";
    txtEls.forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      el.innerHTML = es && ES[k] != null ? ES[k] : el._en;
    });
    phEls.forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      el.setAttribute("placeholder", es && ES[k] != null ? ES[k] : el._en);
    });
    ariaEls.forEach(function (el) {
      var k = el.getAttribute("data-i18n-aria"), v = es && ES[k] != null ? ES[k] : el._en;
      if (el.tagName === "IMG") el.setAttribute("alt", v); else el.setAttribute("aria-label", v);
    });
    $$(".langtoggle b").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-lang") === l); });
    splitAll();
    docLabels();
    renderCart();
    root.classList.remove("es-pending");
  }
  var langToggle = $("#langToggle");
  if (langToggle) langToggle.addEventListener("click", function () { applyLang(lang === "en" ? "es" : "en"); });

  /* headlines: word-by-word reveal (keeps <em>, <br> and other inline markup) */
  var SPLIT_SEL = ".hero__title,.h2,.phero h1,.imgband__text,.band h2,.footer__cta";
  function splitNode(node, c) {
    [].slice.call(node.childNodes).forEach(function (ch) {
      if (ch.nodeType === 3) {
        var frag = doc.createDocumentFragment();
        ch.textContent.split(/( +|\n+)/).forEach(function (w) {
          if (!w) return;
          if (/^[ \n]+$/.test(w)) { frag.appendChild(doc.createTextNode(" ")); return; }
          var sl = doc.createElement("span"); sl.className = "sl";
          var sw = doc.createElement("span"); sw.className = "sw"; sw.style.setProperty("--n", c.n++); sw.textContent = w;
          sl.appendChild(sw); frag.appendChild(sl);
        });
        node.replaceChild(frag, ch);
      } else if (ch.nodeType === 1 && ch.tagName !== "BR" && !ch.classList.contains("sl")) splitNode(ch, c);
    });
  }
  function splitAll() {
    if (reduce) return;
    $$(SPLIT_SEL).forEach(function (el) {
      if ($(".sl", el)) return;
      splitNode(el, { n: 0 });
      el.classList.add("is-split");
      if (el._shown) el.classList.add("in");
    });
  }

  /* =======================================================
     Header, menus, drawer
     ======================================================= */
  var header = $("#header"), toTop = $("#toTop");
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle("is-scrolled", y > 4);
    if (toTop) toTop.classList.toggle("show", y > 900);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  var navItems = $$(".nav__item");
  function closeMenus(except) { navItems.forEach(function (i) { if (i !== except) i.classList.remove("open"); }); }
  navItems.forEach(function (item) {
    var link = $(".nav__link", item);
    link.addEventListener("click", function (e) {
      if (!canHover && !item.classList.contains("open")) { e.preventDefault(); closeMenus(item); item.classList.add("open"); }
    });
    $$(".nav__menu a", item).forEach(function (a) { a.addEventListener("click", function () { a.blur(); link.blur(); item.classList.remove("open"); }); });
  });
  doc.addEventListener("click", function (e) { if (!e.target.closest(".nav__item")) closeMenus(); });

  var burger = $("#burger"), drawer = $("#drawer");
  function setDrawer(open) {
    if (!burger || !drawer) return;
    burger.setAttribute("aria-expanded", String(open));
    drawer.hidden = !open;
    doc.body.classList.toggle("no-scroll", open || anyOpen());
    if (open) drawer.style.maxHeight = Math.max(240, window.innerHeight - header.getBoundingClientRect().bottom) + "px";
  }
  if (burger && drawer) {
    burger.addEventListener("click", function () { setDrawer(burger.getAttribute("aria-expanded") !== "true"); });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) setDrawer(false); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 1100 && !drawer.hidden) setDrawer(false); });
  }

  /* =======================================================
     Reveal on scroll
     ======================================================= */
  $$(".flow").forEach(function (f) { $$(".flow__step", f).forEach(function (st, i) { st.style.setProperty("--i", i); }); });
  var reveals = $$("[data-reveal],.reveal-img,.flow," + SPLIT_SEL);
  function show(el) {
    var d = parseInt(el.getAttribute("data-delay") || "0", 10);
    if (d) el.style.setProperty("--d", d / 1000 + "s");
    el._shown = true;
    el.classList.add("in");
  }
  if (reduce || !("IntersectionObserver" in window)) reveals.forEach(show);
  else {
    var seen = false;
    var ro = new IntersectionObserver(function (entries) {
      seen = true;
      entries.forEach(function (en) { if (en.isIntersecting) { show(en.target); ro.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { ro.observe(el); });
    setTimeout(function () { if (!seen) reveals.forEach(show); }, 1500);
  }

  /* in-page section navigation */
  var subLinks = $$(".subnav a[href^='#']");
  if (subLinks.length && "IntersectionObserver" in window) {
    var map = {};
    subLinks.forEach(function (a) { var s = $(a.getAttribute("href")); if (s) map[s.id] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          subLinks.forEach(function (a) { a.classList.remove("is-active"); });
          map[en.target.id].classList.add("is-active");
          var bar = map[en.target.id].parentElement;
          bar.scrollTo({ left: map[en.target.id].offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
        }
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) { so.observe(doc.getElementById(id)); });
  }

  /* accordions: one open at a time per group */
  $$(".accordion").forEach(function (group) {
    var items = $$(".acc", group);
    items.forEach(function (d) { d.addEventListener("toggle", function () { if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; }); }); });
  });

  /* =======================================================
     Toast
     ======================================================= */
  var toast = $("#toast"), toastT;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg; toast.hidden = false;
    requestAnimationFrame(function () { toast.classList.add("show"); });
    clearTimeout(toastT);
    toastT = setTimeout(function () { toast.classList.remove("show"); setTimeout(function () { toast.hidden = true; }, 350); }, 2600);
  }

  /* =======================================================
     Panels: cart drawer + modals (focus handled)
     ======================================================= */
  var overlay = $("#overlay"), cart = $("#cart");
  var lastFocus = null;
  function anyOpen() { return !!$(".modal.open") || !!(cart && cart.classList.contains("open")); }
  function focusables(box) { return $$('a[href],button:not([disabled]),input:not([type="hidden"]),select,textarea,[tabindex]:not([tabindex="-1"])', box).filter(function (el) { return el.offsetParent !== null; }); }
  function lockScroll() { doc.body.classList.toggle("no-scroll", anyOpen() || (drawer && !drawer.hidden)); }

  function openModal(m) {
    if (!m) return;
    lastFocus = doc.activeElement;
    if (cart && cart.classList.contains("open")) closeCart(true);
    m.classList.add("open"); m.setAttribute("aria-hidden", "false");
    lockScroll();
    setTimeout(function () { var f = focusables($(".modal__box", m)); (f[1] || f[0] || m).focus(); }, 60);
  }
  function closeModal(m) {
    if (!m || !m.classList.contains("open")) return;
    m.classList.remove("open"); m.setAttribute("aria-hidden", "true");
    lockScroll();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function openCart() {
    if (!cart) return;
    lastFocus = doc.activeElement;
    overlay.hidden = false; requestAnimationFrame(function () { overlay.classList.add("show"); });
    cart.classList.add("open"); cart.setAttribute("aria-hidden", "false");
    lockScroll();
    setTimeout(function () { cart.focus(); }, 60);
  }
  function closeCart(silent) {
    if (!cart || !cart.classList.contains("open")) return;
    cart.classList.remove("open"); cart.setAttribute("aria-hidden", "true");
    overlay.classList.remove("show"); setTimeout(function () { if (!cart.classList.contains("open")) overlay.hidden = true; }, 260);
    lockScroll();
    if (!silent && lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $$(".modal").forEach(function (m) {
    m.addEventListener("click", function (e) { if (e.target === m) closeModal(m); });
  });
  doc.addEventListener("click", function (e) {
    var c = e.target.closest("[data-close]"); if (!c) return;
    var m = c.closest(".modal"); if (m) closeModal(m); else closeCart();
  });
  if (overlay) overlay.addEventListener("click", function () { closeCart(); });
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var m = $(".modal.open");
      if (m) closeModal(m); else if (cart && cart.classList.contains("open")) closeCart();
      else if (drawer && !drawer.hidden) { setDrawer(false); burger.focus(); }
      closeMenus(); if (doc.activeElement && doc.activeElement.closest && doc.activeElement.closest(".nav")) doc.activeElement.blur();
    }
    if (e.key === "Tab") {
      var box = $(".modal.open .modal__box") || (cart && cart.classList.contains("open") ? cart : null);
      if (!box) return;
      var f = focusables(box); if (!f.length) return;
      if (e.shiftKey && doc.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && doc.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* =======================================================
     Longevity order (cart)
     ======================================================= */
  var CATALOG = {
    pep: { en: "Peptide Line", es: "Línea de péptidos", price: 89, abbr: "PEP" },
    omega: { en: "Omega 3 Premium", es: "Omega 3 Premium", price: 39, abbr: "Ω3" },
    serum: { en: "1CELL Facial Serum", es: "Sérum facial 1CELL", price: 89, img: "assets/img/hero-vial.png" }
  };
  var items = {};
  try {
    var raw = JSON.parse(localStorage.getItem(LS_CART) || "{}");
    Object.keys(raw).forEach(function (k) {
      var q = typeof raw[k] === "number" ? raw[k] : (raw[k] && raw[k].qty);
      if (CATALOG[k] && q > 0) items[k] = Math.min(99, Math.floor(q));
    });
  } catch (e) {}
  function saveCart() { try { localStorage.setItem(LS_CART, JSON.stringify(items)); } catch (e) {} }
  function totals() { var q = 0, s = 0; Object.keys(items).forEach(function (k) { q += items[k]; s += items[k] * CATALOG[k].price; }); return { q: q, s: s }; }
  function pname(k) { return CATALOG[k][lang] || CATALOG[k].en; }

  var cartItems = $("#cartItems"), cartEmpty = $("#cartEmpty"), cartFoot = $("#cartFoot"), cartTotal = $("#cartTotal"),
      cartCount = $("#cartCount"), cartBtn = $("#cartOpen");
  function renderCart() {
    saveCart();
    var tt = totals(), keys = Object.keys(items);
    if (cartBtn) cartBtn.hidden = tt.q === 0 && !doc.body.classList.contains("page-longevity");
    if (cartCount) { cartCount.textContent = tt.q; cartCount.hidden = tt.q === 0; }
    if (cartEmpty) cartEmpty.hidden = keys.length > 0;
    if (cartFoot) cartFoot.hidden = keys.length === 0;
    if (cartTotal) cartTotal.textContent = money(tt.s);
    if (!cartItems) return;
    cartItems.hidden = keys.length === 0;
    cartItems.innerHTML = keys.map(function (k) {
      var p = CATALOG[k], thumb = p.img ? '<img class="citem__img" src="' + p.img + '" alt="" width="60" height="60" />' : '<span class="citem__tile" aria-hidden="true">' + esc(p.abbr) + "</span>";
      return '<div class="citem" data-k="' + k + '">' + thumb +
        '<div class="citem__main"><div class="citem__name">' + esc(pname(k)) + '</div><div class="citem__price">' + money(p.price) + " " + t("each") + "</div>" +
        '<div class="citem__ctrls"><button type="button" data-dec aria-label="−1">−</button><span class="citem__qty">' + items[k] + '</span><button type="button" data-inc aria-label="+1">+</button></div>' +
        '<button type="button" class="citem__rm" data-rm>' + t("remove") + '</button></div><div class="citem__line">' + money(p.price * items[k]) + "</div></div>";
    }).join("");
  }
  if (cartItems) cartItems.addEventListener("click", function (e) {
    var row = e.target.closest(".citem"); if (!row) return;
    var k = row.getAttribute("data-k");
    if (e.target.closest("[data-inc]")) items[k] = Math.min(99, items[k] + 1);
    else if (e.target.closest("[data-dec]")) { items[k]--; if (items[k] <= 0) delete items[k]; }
    else if (e.target.closest("[data-rm]")) delete items[k];
    else return;
    renderCart();
    if (!Object.keys(items).length && cart) cart.focus();
  });
  $$("[data-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var k = btn.getAttribute("data-add"); if (!CATALOG[k]) return;
      items[k] = Math.min(99, (items[k] || 0) + 1);
      renderCart(); showToast(t("added", { n: pname(k) })); openCart();
    });
  });
  if (cartBtn) cartBtn.addEventListener("click", openCart);

  var orderModal = $("#orderModal"), orderSummary = $("#orderSummary");
  function orderLines() {
    var tt = totals();
    return Object.keys(items).map(function (k) { return items[k] + " × " + CATALOG[k].en + " — " + money(CATALOG[k].price * items[k]); })
      .concat(["Subtotal: " + money(tt.s) + " USD"]);
  }
  var orderOpen = $("#orderOpen");
  if (orderOpen) orderOpen.addEventListener("click", function () {
    if (!totals().q) { showToast(t("empty")); return; }
    var tt = totals();
    orderSummary.innerHTML = Object.keys(items).map(function (k) {
      return "<li><span>" + items[k] + " × " + esc(pname(k)) + "</span><b>" + money(CATALOG[k].price * items[k]) + "</b></li>";
    }).join("") + '<li class="total"><span>' + t("subtotal") + "</span><b>" + money(tt.s) + "</b></li>";
    resetForm($('[data-form="order"]', orderModal));
    openModal(orderModal);
  });

  /* =======================================================
     Forms — validation + delivery (endpoint if configured, else email)
     ======================================================= */
  var SUBJECT = { professional: "Professional access request", contact: "Website inquiry", order: "Longevity order request" };
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function labelFor(el, form) {
    var l = el.id && $('label[for="' + el.id + '"]', form);
    if (l) return l.textContent.replace(/\s*\((optional|opcional)\)\s*$/i, "").trim();
    var fs = el.closest("fieldset"); var lg = fs && $("legend", fs);
    return lg ? lg.textContent.trim() : (el.name || "");
  }
  function validate(form) {
    var ok = true, first = null;
    $$(".field", form).forEach(function (f) {
      var el = $("input,select,textarea", f); if (!el) return;
      var v = el.value.trim(), bad = (el.required && !v) || (el.type === "email" && v && !EMAIL_RE.test(v));
      f.classList.toggle("has-err", bad); if (bad) { ok = false; first = first || el; }
    });
    $$("fieldset[data-required]", form).forEach(function (fs) {
      var bad = !$("input:checked", fs);
      fs.classList.toggle("has-err", bad); if (bad) { ok = false; first = first || $("input", fs); }
    });
    if (first) first.focus();
    return ok;
  }
  function collect(form, kind) {
    var lines = [], seen = {};
    $$("input,select,textarea", form).forEach(function (el) {
      if (!el.name || seen[el.name]) return;
      var val;
      if (el.type === "checkbox" || el.type === "radio") {
        seen[el.name] = true;
        val = $$('input[name="' + el.name + '"]:checked', form).map(function (c) { return c.value; }).join(", ");
      } else val = el.value.trim();
      if (val) lines.push(labelFor(el, form) + ": " + val);
    });
    if (kind === "order") lines = ["Order:"].concat(orderLines(), [""], lines);
    lines.push("", "— Sent from 1cellhealth.com (" + location.pathname.replace(/^\//, "") + ", " + lang.toUpperCase() + ")");
    return lines;
  }
  function resetForm(form) {
    if (!form) return;
    form.hidden = false;
    $$(".has-err", form).forEach(function (f) { f.classList.remove("has-err"); });
    var done = form.parentElement.querySelector("[data-form-done]"); if (done) done.hidden = true;
  }
  function showDone(form, mode, text) {
    var done = form.parentElement.querySelector("[data-form-done]"); if (!done) return;
    var mail = '<a href="mailto:' + esc(CFG.email) + '">' + esc(CFG.email) + "</a>";
    done.innerHTML = mode === "sent"
      ? '<h3><svg width="22" height="22" aria-hidden="true"><use href="#i-check"/></svg>' + t("sentTitle") + "</h3><p>" + t("sentBody") + "</p>" +
        '<button type="button" class="btn btn--ghost btn--sm" data-again>' + t("again") + "</button>"
      : '<h3><svg width="22" height="22" aria-hidden="true"><use href="#i-mail"/></svg>' + t("mailTitle") + "</h3><p>" + t("mailBody", { e: mail }) + "</p><p>" + t("mailFallback", { e: mail }) + "</p>" +
        '<div style="display:flex;flex-wrap:wrap;gap:10px"><button type="button" class="btn btn--primary btn--sm" data-copy>' + t("copy") + '</button><button type="button" class="btn btn--ghost btn--sm" data-again>' + t("again") + "</button></div>";
    form.hidden = true; done.hidden = false;
    done.setAttribute("tabindex", "-1"); done.focus();
    var cp = $("[data-copy]", done);
    if (cp) cp.addEventListener("click", function () {
      var write = navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(text) : Promise.reject();
      write.then(function () { showToast(t("copied")); }, function () {
        var ta = doc.createElement("textarea"); ta.value = text; doc.body.appendChild(ta); ta.select();
        try { doc.execCommand("copy"); showToast(t("copied")); } catch (e) {} doc.body.removeChild(ta);
      });
    });
    $("[data-again]", done).addEventListener("click", function () { form.reset(); resetForm(form); var f = focusables(form)[0]; if (f) f.focus(); });
  }
  $$("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) { showToast(t("reviewErr")); return; }
      var kind = form.getAttribute("data-form");
      var subject = "1CELL — " + (SUBJECT[kind] || "Website request");
      var lines = collect(form, kind), text = lines.join("\n");
      var btn = $('button[type="submit"]', form);
      function mailto() { location.href = "mailto:" + CFG.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text); showDone(form, "mail", text); }
      if (!CFG.endpoint) { mailto(); return; }
      var fd = new FormData(form); fd.append("_subject", subject); fd.append("form", kind); fd.append("summary", text);
      if (btn) btn.classList.add("is-busy");
      fetch(CFG.endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); showDone(form, "sent", text); })
        .catch(mailto)
        .then(function () { if (btn) btn.classList.remove("is-busy"); });
    });
    $$("input,select,textarea", form).forEach(function (el) {
      el.addEventListener("input", function () { var f = el.closest(".field,.fieldset"); if (f && f.classList.contains("has-err")) f.classList.remove("has-err"); });
      el.addEventListener("change", function () { var f = el.closest(".fieldset"); if (f) f.classList.remove("has-err"); });
    });
  });

  /* deep links: ?interest=logistics  ?topic=order */
  (function params() {
    var qs = new URLSearchParams(location.search);
    var interest = (qs.get("interest") || "").toLowerCase();
    if (interest) interest.split(",").forEach(function (v) { var c = $('input[name="interest"][value="' + v.replace(/[^a-z-]/g, "") + '"]'); if (c) c.checked = true; });
    var topic = (qs.get("topic") || "").toLowerCase().replace(/[^a-z-]/g, "");
    var sel = topic && $('select[name="topic"]');
    if (sel && $('option[value="' + topic + '"]', sel)) sel.value = topic;
  })();

  /* =======================================================
     Documents + video slots (activate when assets are supplied)
     ======================================================= */
  var docLinks = $$("[data-doc-src]").filter(function (a) { return a.getAttribute("data-doc-src"); });
  docLinks.forEach(function (a) { a.href = a.getAttribute("data-doc-src"); a.target = "_blank"; a.rel = "noopener"; });
  function docLabels() {
    docLinks.forEach(function (a) {
      var label = lang === "es" ? (a.getAttribute("data-doc-view-es") || a.getAttribute("data-doc-view")) : a.getAttribute("data-doc-view");
      var span = $("span", a); if (span && label) span.textContent = label;
    });
  }

  $$(".video[data-video-src]").forEach(function (box) {
    var src = box.getAttribute("data-video-src"); if (!src) return;
    var section = box.closest("[data-video-section]"); if (section) section.hidden = false;
    var v;
    function load() {
      v = doc.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute("playsinline", ""); v.preload = "metadata";
      var poster = box.getAttribute("data-video-poster"); if (poster) v.poster = poster;
      v.addEventListener("loadeddata", function () { box.classList.add("is-ready"); });
      if (reduce) v.controls = true;
      v.src = src; box.appendChild(v);
    }
    if (!("IntersectionObserver" in window)) { load(); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { if (!v) load(); if (!reduce) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
        else if (v) v.pause();
      });
    }, { threshold: 0.25 }).observe(box);
  });

  /* =======================================================
     Leadership profiles
     ======================================================= */
  var profileModal = $("#profileModal");
  $$("[data-profile]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".person"); if (!card || !profileModal) return;
      $("#profilePhoto").innerHTML = $(".person__photo", card).innerHTML;
      $("#profileCred").textContent = $(".person__cred", card).textContent;
      $("#profileName").textContent = $("h3", card).textContent;
      $("#profileRole").textContent = $(".person__role", card).textContent;
      $("#profileText").innerHTML = $(".person__text", card).innerHTML;
      openModal(profileModal);
    });
  });


  /* =======================================================
     Motion: cover, parallax, progress, depth, spotlight
     ======================================================= */
  function whenLoaded(img) {
    if (!img) return;
    var done = function () { img.classList.add("is-loaded"); };
    if (img.complete && img.naturalWidth) done(); else { img.addEventListener("load", done); img.addEventListener("error", done); }
  }
  $$(".hero__bg").forEach(whenLoaded);

  var progressBar = $(".progress span");
  var parEls = $$(".media--par>img,.imgband>img");
  var ticking = false;
  function frame() {
    ticking = false;
    var vh = window.innerHeight, y = window.scrollY || 0, max = doc.documentElement.scrollHeight - vh;
    if (progressBar) progressBar.style.setProperty("--p", max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
    if (reduce) return;
    parEls.forEach(function (img) {
      var box = img.parentElement.getBoundingClientRect();
      if (box.bottom < -200 || box.top > vh + 200) return;
      var prog = (box.top + box.height / 2 - vh / 2) / vh;
      prog = Math.max(-1, Math.min(1, prog));
      img.style.setProperty("--py", (-prog * box.height * 0.12).toFixed(1) + "px");
    });
  }
  function requestFrame() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", requestFrame, { passive: true });

  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine && !reduce) {
    var heroEl = $(".hero"), depthEls = $$(".hero [data-depth]");
    if (heroEl && depthEls.length) {
      heroEl.addEventListener("mousemove", function (e) {
        var cx = e.clientX / window.innerWidth - 0.5, cy = e.clientY / window.innerHeight - 0.5;
        depthEls.forEach(function (el) { var d = parseFloat(el.getAttribute("data-depth")) || 16; el.style.transform = "translate(" + (cx * d).toFixed(1) + "px," + (cy * d).toFixed(1) + "px)"; });
      });
      heroEl.addEventListener("mouseleave", function () { depthEls.forEach(function (el) { el.style.transform = ""; }); });
    }
    $$(".spot").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px"); el.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
    $$(".hero__cta .btn,.band__cta .btn,.footer__actions .btn,.phero__cta .btn,.docs__cta .btn").forEach(function (b) {
      b.addEventListener("mousemove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + "px," + ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + "px)";
      });
      b.addEventListener("mouseleave", function () { b.style.transform = ""; });
    });
  }

  /* animated gradient behind the cover */
  var mesh = $("#mesh");
  if (mesh && !reduce && mesh.getContext) {
    var ctx = mesh.getContext("2d"), W = 0, H = 0, raf = 0, running = false;
    var blobs = [
      { c: [31, 184, 148], r: .5, ox: .72, oy: .32, sx: .00011, sy: .00016, a: .55 },
      { c: [11, 90, 84], r: .62, ox: .3, oy: .6, sx: .00014, sy: .0001, a: .6 },
      { c: [127, 228, 214], r: .38, ox: .62, oy: .72, sx: .0001, sy: .00013, a: .35 },
      { c: [15, 118, 110], r: .45, ox: .9, oy: .55, sx: .00012, sy: .00009, a: .45 }
    ];
    var sizeMesh = function () { var b = mesh.getBoundingClientRect(); W = Math.max(1, b.width / 3); H = Math.max(1, b.height / 3); mesh.width = W; mesh.height = H; };
    var draw = function (now) {
      ctx.clearRect(0, 0, W, H);
      blobs.forEach(function (bl) {
        var x = (bl.ox + Math.sin(now * bl.sx) * .14) * W, y = (bl.oy + Math.cos(now * bl.sy) * .14) * H, rad = bl.r * Math.max(W, H);
        var g = ctx.createRadialGradient(x, y, 0, x, y, rad);
        g.addColorStop(0, "rgba(" + bl.c.join(",") + "," + bl.a + ")"); g.addColorStop(1, "rgba(" + bl.c.join(",") + ",0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      if (running) raf = requestAnimationFrame(draw);
    };
    var start = function () { if (!running) { running = true; raf = requestAnimationFrame(draw); } };
    var stop = function () { running = false; cancelAnimationFrame(raf); };
    sizeMesh(); start();
    window.addEventListener("resize", function () { sizeMesh(); }, { passive: true });
    doc.addEventListener("visibilitychange", function () { if (doc.hidden) stop(); else start(); });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { if (en[0].isIntersecting) start(); else stop(); }).observe(mesh);
  }

  /* =======================================================
     Init
     ======================================================= */
  applyLang(lang);
  onScroll();
  frame();
  $$(".hero__title").forEach(function (h) { requestAnimationFrame(function () { h._shown = true; h.classList.add("in"); }); });
})();
