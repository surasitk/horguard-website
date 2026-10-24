/* Horguard — ส่วนราคา (CMS)
   ข้อมูลมาจาก Supabase RPC get_public_pricing() (anon) ซึ่ง Super Admin แก้ได้ใน Force → แพ็กเกจและราคา
   · HTML ในหน้าเป็นข้อมูลชุดเริ่มต้น (SEED) ที่เรนเดอร์ไว้ล่วงหน้า → ไม่มี JS หรือโหลดไม่สำเร็จก็ยังเห็นราคา
   · โหลดสำเร็จ → เรนเดอร์ใหม่จากข้อมูลจริง · เปลี่ยนภาษา TH/EN → เรนเดอร์ใหม่
   · คีย์ที่ใช้คือ publishable key (สาธารณะ อ่านได้เฉพาะ RPC ที่เปิดให้ anon) */
(function (root) {
  var API = 'https://ybghyacwfdlezanewvgn.supabase.co/rest/v1/rpc/get_public_pricing';
  var KEY = 'sb_publishable_3N3Kmklfadf7myfIXuEoIw_3rZnqzcQ';
  var LINE = 'https://lin.ee/5e7WMZj';

  var SEED = {
    plans: [
      { id: 'starter', name: 'Starter', tagline: 'สำหรับบริษัทที่เริ่มต้น ไม่เกิน 80 คน', price_monthly: 2490, price_yearly: 24900, setup_fee: 5000, setup_fee_note: null,
        included_users: 30, overage_per_user: 79, support_text: 'LINE OA', badge: null, highlight: false, cta_label: 'ขอดูเดโม', cta_url: null,
        limits: { max_field_users: 80, max_properties: 5, max_checkpoints_per_property: 10, max_staff_accounts: 2, max_client_accounts: 3, broadcasts_per_month: 4, media_retention_days: 30, report_lookback_months: 3, own_line_oa: false },
        features: ['รวมผู้ใช้หน้างาน 30 คน', 'คนเกิน คิดเพิ่มคนละ 79฿', '5 โครงการ · จุดตรวจ 10 จุดต่อโครงการ', 'แอดมิน + ผจก.โซน 2 บัญชี', 'บัญชีลูกค้า 3 บัญชี', 'ประกาศกลุ่มผ่าน LINE 4 ครั้ง/เดือน', 'เก็บรูปและเสียง 30 วัน · รายงานย้อนหลัง 3 เดือน'] },
      { id: 'business', name: 'Business', tagline: 'สำหรับบริษัท 50–300 คน หลายโครงการ', price_monthly: 6900, price_yearly: 69000, setup_fee: 10000, setup_fee_note: null,
        included_users: 100, overage_per_user: 65, support_text: 'LINE OA ในเวลาทำการ ตอบภายใน 4 ชม.', badge: 'แนะนำ', highlight: true, cta_label: 'ทดลองใช้ฟรี 30 วัน', cta_url: null,
        limits: { max_field_users: 300, max_properties: 30, max_checkpoints_per_property: 30, max_staff_accounts: 10, max_client_accounts: 30, broadcasts_per_month: 20, media_retention_days: 90, report_lookback_months: 12, own_line_oa: false },
        features: ['รวมผู้ใช้หน้างาน 100 คน', 'คนเกิน คิดเพิ่มคนละ 65฿', '30 โครงการ · จุดตรวจ 30 จุดต่อโครงการ', 'แอดมิน + ผจก.โซน 10 บัญชี', 'บัญชีลูกค้า 30 บัญชี', 'ประกาศกลุ่มผ่าน LINE 20 ครั้ง/เดือน', 'เก็บรูปและเสียง 90 วัน · รายงานย้อนหลัง 12 เดือน'] },
      { id: 'enterprise', name: 'Enterprise', tagline: 'สำหรับบริษัทใหญ่ 300 คนขึ้นไป', price_monthly: 16900, price_yearly: 169000, setup_fee: null, setup_fee_note: 'ตามขอบเขตงาน',
        included_users: 300, overage_per_user: 49, support_text: 'ผู้ดูแลเฉพาะ + SLA', badge: null, highlight: false, cta_label: 'คุยกับทีมขาย', cta_url: null,
        limits: { max_field_users: null, max_properties: null, max_checkpoints_per_property: null, max_staff_accounts: null, max_client_accounts: null, broadcasts_per_month: null, media_retention_days: 365, report_lookback_months: null, own_line_oa: true },
        features: ['รวมผู้ใช้หน้างาน 300 คน', 'คนเกิน คิดเพิ่มคนละ 49฿', 'โครงการและจุดตรวจไม่จำกัด', 'แอดมิน ผจก.โซน และบัญชีลูกค้าไม่จำกัด', 'ประกาศกลุ่มผ่าน LINE ไม่จำกัด (fair use)', 'เก็บรูปและเสียง 1 ปี · รายงานย้อนหลังไม่จำกัด', 'LINE OA แบรนด์ตัวเอง (เพิ่มเงินได้)'] }
    ],
    addons: [
      { name: '+5 โครงการ', description: 'เพิ่มเพดานโครงการโดยไม่ต้องอัปเกรด', price: 500, unit: 'เดือน' },
      { name: 'ขยายเก็บรูปและเสียงเป็น 1 ปี', description: 'สำหรับ Starter และ Business', price: 1000, unit: 'เดือน' }
    ],
    content: {
      title: 'ราคาเดียว ฟีเจอร์ครบทุกแพ็กเกจ',
      subtitle: 'SOS ตรวจพิกัดน่าสงสัย และ geofence มีครบทุกแพ็กเกจ ต่างกันแค่จำนวนผู้ใช้และเพดานการใช้งาน',
      vat_note: 'ราคาไม่รวม VAT', months_free_yearly: 2, trial_days: 30, trial_plan: 'business',
      counting_rule: 'นับเฉพาะผู้ใช้หน้างาน (รปภ. หัวหน้ากะ สแปร์ สายตรวจ) ที่เข้างานอย่างน้อย 1 ครั้งในเดือน · เจ้าของ แอดมิน ผจก.โซน และลูกค้าไม่นับ',
      notes: ['จ่ายรายปี ลด 2 เดือน', 'ค่าเริ่มระบบยกเว้นให้เมื่อจ่ายรายปี', 'ทดลองใช้ฟรี 30 วัน แบบ Business'],
      limit_labels: { max_field_users: 'เพดานผู้ใช้หน้างาน', max_properties: 'โครงการ', max_checkpoints_per_property: 'จุดตรวจ QR ต่อโครงการ', max_staff_accounts: 'บัญชีแอดมิน + ผจก.โซน',
        max_client_accounts: 'บัญชีลูกค้า (Client dashboard)', broadcasts_per_month: 'ประกาศกลุ่มผ่าน LINE ต่อเดือน', media_retention_days: 'เก็บรูป selfie / เสียง SOS (วัน)',
        report_lookback_months: 'ดูรายงานย้อนหลัง (เดือน)', own_line_oa: 'LINE OA แบรนด์ตัวเอง' }
    }
  };

  // ป้ายตารางที่แสดงจริง (ไม่ใส่หน่วยในวงเล็บ เพราะค่าในช่องมีหน่วยแล้ว)
  var ROWS = ['max_field_users', 'max_properties', 'max_checkpoints_per_property', 'max_staff_accounts', 'max_client_accounts', 'broadcasts_per_month', 'media_retention_days', 'report_lookback_months', 'support', 'own_line_oa'];
  var L = {
    th: { unlimited: 'ไม่จำกัด', fair: 'ไม่จำกัด (fair use)', perMonth: '/เดือน', perYear: '/ปี', avg: 'เฉลี่ย', month: 'เดือน', yearOr: 'หรือ', save: 'ลด', months: 'เดือน',
      users: function (n) { return 'รวมผู้ใช้หน้างาน ' + n + ' คน'; }, over: function (p) { return 'คนเกิน คิดเพิ่มคนละ ' + p; },
      cap: function (n) { return n == null ? 'ผู้ใช้ไม่จำกัด' : 'เพดานผู้ใช้ ' + n + ' คน'; },
      setup: function (v) { return 'ค่าเริ่มระบบ ' + v; }, setupWaived: 'ยกเว้นเมื่อจ่ายรายปี', noSetup: 'ไม่มีค่าเริ่มระบบเมื่อจ่ายรายปี',
      contact: 'ติดต่อฝ่ายขาย', ppl: function (n) { return n + ' คน'; }, times: function (n) { return n + ' ครั้ง/เดือน'; }, days: function (d) { return d % 365 === 0 ? (d / 365) + ' ปี' : d + ' วัน'; },
      mo: function (n) { return n + ' เดือน'; }, yes: '✓ เพิ่มเงินได้', no: '–', support: 'Support', head: 'เพดานการใช้งาน',
      labels: { max_field_users: 'เพดานผู้ใช้หน้างาน', max_properties: 'โครงการ', max_checkpoints_per_property: 'จุดตรวจ QR ต่อโครงการ', max_staff_accounts: 'บัญชีแอดมิน + ผจก.โซน',
        max_client_accounts: 'บัญชีลูกค้า (Client dashboard)', broadcasts_per_month: 'ประกาศกลุ่มผ่าน LINE', media_retention_days: 'เก็บรูป selfie / เสียง SOS',
        report_lookback_months: 'ดูรายงานย้อนหลัง', support: 'Support', own_line_oa: 'LINE OA แบรนด์ตัวเอง' },
      notesTitle: ['นับใครเป็นผู้ใช้', 'ซื้อเพิ่มได้ ไม่ต้องอัปเกรด', 'เงื่อนไข'] },
    en: { unlimited: 'Unlimited', fair: 'Unlimited (fair use)', perMonth: '/month', perYear: '/year', avg: 'avg.', month: 'month', yearOr: 'or', save: 'save', months: 'months',
      users: function (n) { return n + ' field users included'; }, over: function (p) { return 'Extra users ' + p + ' each'; },
      cap: function (n) { return n == null ? 'No user cap' : 'Up to ' + n + ' users'; },
      setup: function (v) { return 'Setup fee ' + v; }, setupWaived: 'waived on yearly billing', noSetup: 'No setup fee on yearly billing',
      contact: 'Contact sales', ppl: function (n) { return n + ' users'; }, times: function (n) { return n + ' / month'; }, days: function (d) { return d % 365 === 0 ? (d / 365) + (d === 365 ? ' year' : ' years') : d + ' days'; },
      mo: function (n) { return n + ' months'; }, yes: '✓ Add-on', no: '–', support: 'Support', head: 'Usage limits',
      labels: { max_field_users: 'Field user cap', max_properties: 'Sites', max_checkpoints_per_property: 'QR checkpoints per site', max_staff_accounts: 'Admin + zone manager accounts',
        max_client_accounts: 'Client dashboard accounts', broadcasts_per_month: 'LINE group announcements', media_retention_days: 'Selfie / SOS audio retention',
        report_lookback_months: 'Report history', support: 'Support', own_line_oa: 'Your own branded LINE OA' },
      notesTitle: ['Who counts as a user', 'Add-ons, no upgrade needed', 'Terms'],
      en: {
        title: 'One price. Every feature in every plan.',
        subtitle: 'SOS, suspicious-location checks and geofencing come with every plan. Plans differ only in users and usage limits.',
        vat: 'Prices exclude VAT',
        counting: 'Only field users (guards, shift leaders, spares, patrol supervisors) who clock in at least once in the month count. Owners, admins, zone managers and clients don’t.',
        notes: ['Pay yearly, get 2 months free', 'Setup fee waived on yearly billing', '30-day free trial on Business'],
        tag: { starter: 'For companies getting started, up to 80 users', business: 'For companies with 50–300 users across many sites', enterprise: 'For large companies with 300+ users' },
        support: { starter: 'LINE OA', business: 'LINE OA, business hours, reply within 4 hrs', enterprise: 'Dedicated manager + SLA' },
        cta: { starter: 'Book a demo', business: 'Try free for 30 days', enterprise: 'Talk to sales' },
        badge: 'Popular',
        addons: { '+5 โครงการ': '+5 sites', 'ขยายเก็บรูปและเสียงเป็น 1 ปี': 'Keep photos and audio for 1 year' }
      } }
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function baht(n) { return n == null ? '' : Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 }) + '฿'; }

  function yearly(p, c) {
    if (p.price_yearly != null) return Number(p.price_yearly);
    if (p.price_monthly == null) return null;
    return Number(p.price_monthly) * (12 - Number((c && c.months_free_yearly) || 0));
  }

  function cell(key, p, t) {
    var v = p.limits ? p.limits[key] : undefined;
    switch (key) {
      case 'max_field_users': return v == null ? t.unlimited : t.ppl(v);
      case 'broadcasts_per_month': return v == null ? t.fair : t.times(v);
      case 'media_retention_days': return v == null ? t.unlimited : t.days(Number(v));
      case 'report_lookback_months': return v == null ? t.unlimited : t.mo(v);
      case 'own_line_oa': return v ? t.yes : t.no;
      case 'support': return p.support_text || t.no;
      default: return v == null ? t.unlimited : String(v);
    }
  }

  function features(p, t, lang) {
    if (lang === 'th' && Array.isArray(p.features) && p.features.length) {
      return p.features.filter(function (f) { return !/^(รวมผู้ใช้|คนเกิน)/.test(f); }).slice(0, 5);
    }
    var l = p.limits || {}, out = [];
    out.push((l.max_properties == null ? t.unlimited + ' ' : l.max_properties + ' ') + (lang === 'en' ? 'sites · ' : 'โครงการ · ') +
      (l.max_checkpoints_per_property == null ? t.unlimited : l.max_checkpoints_per_property) + (lang === 'en' ? ' checkpoints per site' : ' จุดตรวจต่อโครงการ'));
    out.push((l.max_staff_accounts == null ? t.unlimited : l.max_staff_accounts) + (lang === 'en' ? ' admin accounts · ' : ' แอดมิน · ') +
      (l.max_client_accounts == null ? t.unlimited : l.max_client_accounts) + (lang === 'en' ? ' client accounts' : ' บัญชีลูกค้า'));
    out.push((lang === 'en' ? 'LINE announcements: ' : 'ประกาศกลุ่ม LINE: ') + cell('broadcasts_per_month', p, t));
    out.push((lang === 'en' ? 'Photo & audio kept ' : 'เก็บรูปและเสียง ') + cell('media_retention_days', p, t) + (lang === 'en' ? ' · history ' : ' · รายงาน ') + cell('report_lookback_months', p, t));
    if (l.own_line_oa) out.push(t.labels.own_line_oa);
    if (lang === 'en') out = out.map(function (x) { return x.replace(/(.) Unlimited/g, '$1 unlimited').replace(/: Unlimited/g, ': unlimited'); });
    return out;
  }

  function render(data, opt) {
    data = data || SEED; opt = opt || {};
    var lang = opt.lang === 'en' ? 'en' : 'th', cycle = opt.cycle === 'yearly' ? 'yearly' : 'monthly';
    var t = L[lang], E = L.en.en, c = data.content || SEED.content, plans = data.plans || [];
    var mf = Number(c.months_free_yearly || 0);

    var cards = plans.map(function (p) {
      var price, per, sub;
      if (p.price_monthly == null) { price = t.contact; per = ''; sub = ''; }
      else if (cycle === 'yearly') {
        var y = yearly(p, c); price = baht(y); per = t.perYear;
        sub = t.avg + ' ' + baht(Math.round(y / 12)) + t.perMonth + (mf ? ' · ' + t.save + ' ' + mf + ' ' + t.months : '');
      } else {
        price = baht(p.price_monthly); per = t.perMonth;
        var yy = yearly(p, c); sub = yy ? t.yearOr + ' ' + baht(yy) + t.perYear + (mf ? ' (' + t.save + ' ' + mf + ' ' + t.months + ')' : '') : '';
      }
      var setup = cycle === 'yearly' ? t.noSetup
        : (p.setup_fee != null ? t.setup(baht(p.setup_fee)) : (p.setup_fee_note ? (lang === 'en' ? 'Setup fee by scope' : 'ค่าเริ่มระบบ' + p.setup_fee_note) : ''))
          + ((p.setup_fee != null || p.setup_fee_note) && cycle !== 'yearly' ? ' · ' + t.setupWaived : '');
      var tag = lang === 'en' ? (E.tag[p.id] || p.tagline || '') : (p.tagline || '');
      var cta = lang === 'en' ? (E.cta[p.id] || p.cta_label || 'Talk to us') : (p.cta_label || 'ทักไลน์');
      var badge = p.badge ? (lang === 'en' ? E.badge : p.badge) : '';
      var feats = features(p, t, lang).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('');
      return '<article class="pr-card' + (p.highlight ? ' hot' : '') + '" data-plan="' + esc(p.id) + '">' +
        '<div class="pr-top"><h3>' + esc(p.name) + '</h3>' + (badge ? '<span class="pr-badge">' + esc(badge) + '</span>' : '') + '</div>' +
        '<p class="pr-tag">' + esc(tag) + '</p>' +
        '<p class="pr-price"><b>' + esc(price) + '</b>' + (per ? '<span>' + esc(per) + '</span>' : '') + '</p>' +
        '<p class="pr-sub">' + esc(sub) + '</p>' +
        '<div class="pr-users"><b>' + esc(t.users(p.included_users)) + '</b><span>' + esc(t.over(baht(p.overage_per_user))) + '</span><span>' + esc(t.cap(p.limits ? p.limits.max_field_users : null)) + '</span></div>' +
        '<ul class="pr-feat">' + feats + '</ul>' +
        '<p class="pr-setup">' + esc(setup) + '</p>' +
        '<a class="btn ' + (p.highlight ? 'btn-lamp' : 'btn-ghost') + ' pr-cta" href="' + esc(p.cta_url || LINE) + '" target="_blank" rel="noopener" data-i="pricing.' + esc(p.id) + '">' + esc(cta) + '</a>' +
        '</article>';
    }).join('');

    var hot = plans.map(function (p) { return p.highlight ? ' hot' : ''; });
    var head = '<div class="pr-row pr-hd" role="row"><div class="pr-l" role="columnheader">' + esc(t.head) + '</div>' +
      plans.map(function (p, i) { return '<div class="pr-v' + hot[i] + '" role="columnheader">' + esc(p.name) + '</div>'; }).join('') + '</div>';
    var rows = ROWS.map(function (k) {
      return '<div class="pr-row" role="row"><div class="pr-l" role="rowheader">' + esc(t.labels[k]) + '</div>' +
        plans.map(function (p, i) {
          var v = k === 'support' && lang === 'en' ? (E.support[p.id] || p.support_text || '–') : cell(k, p, t);
          return '<div class="pr-v' + hot[i] + '" role="cell" data-plan="' + esc(p.name) + '">' + esc(v) + '</div>';
        }).join('') + '</div>';
    }).join('');

    var addons = (data.addons || []).map(function (a) {
      var n = lang === 'en' ? (E.addons[a.name] || a.name) : a.name;
      return '<li>' + esc(n) + ' · ' + esc(baht(a.price)) + (a.unit ? (lang === 'en' ? '/month' : '/' + a.unit) : '') + '</li>';
    }).join('');
    var notes = (lang === 'en' ? E.notes : (c.notes || [])).concat([lang === 'en' ? E.vat : (c.vat_note || 'ราคาไม่รวม VAT')]);

    return {
      title: lang === 'en' ? E.title : (c.title || SEED.content.title),
      subtitle: lang === 'en' ? E.subtitle : (c.subtitle || ''),
      vat: lang === 'en' ? E.vat : (c.vat_note || ''),
      cards: cards,
      table: head + rows,
      notes: '<div class="pr-note"><h3>' + esc(t.notesTitle[0]) + '</h3><p>' + esc(lang === 'en' ? E.counting : c.counting_rule) + '</p></div>' +
             '<div class="pr-note"><h3>' + esc(t.notesTitle[1]) + '</h3><ul>' + addons + '</ul></div>' +
             '<div class="pr-note"><h3>' + esc(t.notesTitle[2]) + '</h3><ul>' + notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul></div>',
      ld: plans.filter(function (p) { return p.price_monthly != null; }).map(function (p) {
        return { '@type': 'Offer', name: p.name, price: Number(p.price_monthly), priceCurrency: 'THB',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: Number(p.price_monthly), priceCurrency: 'THB', unitText: 'MONTH', valueAddedTaxIncluded: false } };
      })
    };
  }

  root.HGPricing = { SEED: SEED, render: render };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.HGPricing; return; }

  // ---------- browser ----------
  var el = document.getElementById('pricing'); if (!el) return;
  var state = { data: SEED, cycle: 'monthly' };
  function q(s) { return el.querySelector(s); }
  function paint() {
    var r = render(state.data, { lang: document.documentElement.lang, cycle: state.cycle });
    q('[data-pr="title"]').textContent = r.title;
    q('[data-pr="subtitle"]').textContent = r.subtitle;
    q('[data-pr="vat"]').textContent = r.vat;
    q('[data-pr="cards"]').innerHTML = r.cards;
    q('[data-pr="table"]').innerHTML = r.table;
    q('[data-pr="notes"]').innerHTML = r.notes;
  }
  el.querySelectorAll('[data-cycle]').forEach(function (b) {
    b.addEventListener('click', function () {
      state.cycle = b.getAttribute('data-cycle');
      el.querySelectorAll('[data-cycle]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      paint();
      if (window.gtag) window.gtag('event', 'pricing_cycle', { cycle: state.cycle });
    });
  });
  new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  function load() {
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: KEY, Authorization: 'Bearer ' + KEY }, body: '{}' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (d) { if (d && Array.isArray(d.plans) && d.plans.length) { state.data = d; el.setAttribute('data-source', 'cms'); paint(); } })
      .catch(function () { el.setAttribute('data-source', 'seed'); });
  }
  if (document.documentElement.lang === 'en') paint();
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); load(); } }, { rootMargin: '800px 0px' });
    io.observe(el);
  } else load();
})(typeof window !== 'undefined' ? window : globalThis);
