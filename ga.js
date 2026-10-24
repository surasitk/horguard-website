/* Horguard — Google Analytics 4 (G-7D9SFEKR57) + Consent Mode v2 + PDPA cookie banner + conversion events.
   Default: analytics/ads storage DENIED until the visitor accepts (PDPA). Choice is kept in localStorage 'hg-consent'.
   Events (for GA4 key events / Google Ads conversions):
     generate_lead  — any click to LINE OA (lin.ee) · params: method=line, cta=<data-i or class>, section=<section id>
     login_click    — click to force.horguard.com / Patrol LIFF
     copy_line_link — "คัดลอกลิงก์" button
     view_faq       — opening a FAQ item · param: question
     lang_switch    — TH/EN toggle */
(function () {
  var ID = 'G-7D9SFEKR57';
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  var saved = null;
  try { saved = localStorage.getItem('hg-consent'); } catch (e) {}
  var granted = saved === 'granted';
  gtag('consent', 'default', {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', !granted);
  gtag('js', new Date());
  gtag('config', ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);

  function setConsent(v) {
    try { localStorage.setItem('hg-consent', v); } catch (e) {}
    var g = v === 'granted' ? 'granted' : 'denied';
    gtag('consent', 'update', { ad_storage: g, ad_user_data: g, ad_personalization: g, analytics_storage: g });
    gtag('set', 'ads_data_redaction', g !== 'granted');
  }
  window.hgConsent = setConsent;

  var T = {
    th: { t: 'เว็บไซต์นี้ใช้คุกกี้เพื่อวัดผลการใช้งานและปรับปรุงเว็บ (Google Analytics) คุณเลือกได้ว่าจะยอมรับหรือไม่', a: 'ยอมรับ', d: 'ไม่ยอมรับ', p: 'ประกาศความเป็นส่วนตัว' },
    en: { t: 'We use cookies to measure visits and improve this site (Google Analytics). You can accept or decline.', a: 'Accept', d: 'Decline', p: 'Privacy notice' }
  };

  function banner() {
    if (saved) return;
    var lang = (document.documentElement.lang || 'th').slice(0, 2) === 'en' ? 'en' : 'th';
    var c = T[lang];
    var css = document.createElement('style');
    css.textContent =
      '.hg-cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:60;max-width:560px;margin:0 auto;background:#00142A;color:#E8EEF6;' +
      'border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:16px 18px;box-shadow:0 20px 50px -20px rgba(0,0,0,.6);' +
      'font:15px/1.6 Anuphan,system-ui,sans-serif;display:grid;gap:12px}' +
      '.hg-cc a{color:#F5A524;text-underline-offset:3px}' +
      '.hg-cc .b{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}' +
      '.hg-cc button{font:inherit;font-weight:600;border-radius:999px;padding:8px 18px;cursor:pointer;border:1px solid rgba(255,255,255,.28);background:transparent;color:#fff}' +
      '.hg-cc button.ok{background:#F5A524;border-color:#F5A524;color:#1A1200}' +
      '.hg-cc button:focus-visible{outline:2px solid #F5A524;outline-offset:2px}' +
      '@media (max-width:520px){.hg-cc{bottom:84px}}';
    document.head.appendChild(css);
    var el = document.createElement('div');
    el.className = 'hg-cc';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookies');
    el.innerHTML = '<div>' + c.t + ' <a href="privacy.html">' + c.p + '</a></div>' +
      '<div class="b"><button type="button" class="no">' + c.d + '</button><button type="button" class="ok">' + c.a + '</button></div>';
    el.querySelector('.ok').onclick = function () { setConsent('granted'); el.remove(); };
    el.querySelector('.no').onclick = function () { setConsent('denied'); el.remove(); };
    document.body.appendChild(el);
  }

  function sectionOf(a) {
    var sec = a.closest('section[id], header, footer, [id]');
    return sec ? (sec.id || sec.tagName.toLowerCase()) : 'page';
  }

  function track() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href], button');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var cta = a.getAttribute('data-i') || (a.className || '').toString().split(' ')[0] || 'link';
      if (/lin\.ee|line\.me\/R\/ti|page\.line\.me/.test(href)) {
        gtag('event', 'generate_lead', { method: 'line', cta: cta, section: sectionOf(a), transport_type: 'beacon' });
      } else if (/force\.horguard\.com|liff\.line\.me/.test(href)) {
        gtag('event', 'login_click', { app: /force/.test(href) ? 'force' : 'patrol', cta: cta, section: sectionOf(a), transport_type: 'beacon' });
      } else if (a.id === 'copy-btn') {
        gtag('event', 'copy_line_link', { section: sectionOf(a) });
      } else if (a.hasAttribute('data-lang') || a.hasAttribute('data-setlang')) {
        gtag('event', 'lang_switch', { lang: a.getAttribute('data-lang') || a.getAttribute('data-setlang') });
      }
    }, true);
    document.querySelectorAll('details').forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (d.open) { var s = d.querySelector('summary'); gtag('event', 'view_faq', { question: s ? s.textContent.trim().slice(0, 100) : '' }); }
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { banner(); track(); });
  else { banner(); track(); }
})();
