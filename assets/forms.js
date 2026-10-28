/* PCLUB – formularios (contacto y solicitud de reserva), mapa bajo demanda y precio estimado */
(function () {
  'use strict';
  var CFG = window.PCLUB_FORMS || {};
  var lang = document.documentElement.lang || 'eu';

  function money(n) {
    try { return new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(n); }
    catch (e) { return n.toFixed(2) + ' €'; }
  }
  function status(form, msg, kind) {
    var el = form.querySelector('.form-status');
    if (!el) return;
    el.textContent = msg || '';
    el.className = 'form-status' + (kind ? ' ' + kind : '');
  }

  /* ---------- Datos legales (desde config.js) ---------- */
  var LEG = window.PCLUB_LEGAL || {};
  document.querySelectorAll('[data-legal]').forEach(function (el) {
    var v = LEG[el.getAttribute('data-legal')];
    if (v) { el.textContent = v; el.classList.remove('fill'); }
  });

  /* ---------- Opiniones reales (desde config.js) ---------- */
  var SITE = window.PCLUB_SITE || {};
  var rbox = document.querySelector('[data-reviews]');
  if (rbox) {
    var gbtn = rbox.querySelector('[data-google]');
    if (gbtn && SITE.googleReviewsUrl) { gbtn.href = SITE.googleReviewsUrl; gbtn.target = '_blank'; gbtn.rel = 'noopener'; }
    var list = SITE.reviews || [];
    if (list.length) {
      var grid = rbox.querySelector('.review-grid');
      var pick = function (v) { return (v && typeof v === 'object') ? (v[lang] || v.es || v.en || '') : (v || ''); };
      var DEMO = { eu: 'Adibide-iritzia (erakustaldi-proiektua)', es: 'Opinión de ejemplo (proyecto de demostración)', en: 'Sample review (demo project)', fr: 'Avis d’exemple (projet de démonstration)', de: 'Beispielbewertung (Demoprojekt)' };
      list.forEach(function (r) {
        var card = document.createElement('figure'); card.className = 'review';
        var st = document.createElement('div'); st.className = 'review-stars';
        st.setAttribute('aria-label', (r.stars || 5) + '/5');
        st.textContent = '★★★★★'.slice(0, Math.max(1, Math.min(5, r.stars || 5)));
        var q = document.createElement('blockquote'); q.textContent = pick(r.text);
        var n = document.createElement('figcaption'); n.textContent = r.name + (r.role ? ' · ' + pick(r.role) : '');
        card.appendChild(st); card.appendChild(q); card.appendChild(n);
        if (r.demo) { var d = document.createElement('p'); d.className = 'review-demo'; d.textContent = DEMO[lang] || DEMO.es; card.appendChild(d); }
        grid.appendChild(card);
      });
      rbox.querySelector('.review-empty').hidden = true;
    }
  }

  /* ---------- Mapa bajo demanda (sin conexión a terceros hasta pulsar) ---------- */
  document.querySelectorAll('.map[data-map-src]').forEach(function (box) {
    var btn = box.querySelector('.map-load');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = box.getAttribute('data-map-src');
      f.title = box.getAttribute('data-map-title') || 'Map';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.setAttribute('allowfullscreen', '');
      var c = box.querySelector('.map-consent');
      c.replaceWith(f);
    });
  });

  /* ---------- Estimación de precio (reserva) ---------- */
  var rf = document.getElementById('rf');
  if (rf) {
    var out = document.getElementById('estimate-out');
    var d = rf.elements['data'];
    var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    d.min = today.toISOString().slice(0, 10);
    var lines = document.getElementById('estimate-lines');
    var addLine = function (label, detail, amount) {
      var li = document.createElement('li');
      var l = document.createElement('span'); l.textContent = label + ' · ' + detail;
      var a = document.createElement('span'); a.textContent = money(amount);
      li.appendChild(l); li.appendChild(a); lines.appendChild(li);
    };
    var calc = function () {
      var pc = rf.elements['ordenagailua'].selectedOptions[0];
      var sp = rf.elements['espazioa'].selectedOptions[0];
      var h = parseInt(rf.elements['orduak'].value, 10);
      var n = parseInt(rf.elements['pertsonak'].value, 10);
      lines.textContent = '';
      if (!pc || !h || h < 1 || !n || n < 1) { out.textContent = '—'; return; }
      var price = parseFloat(pc.dataset.price), extra = parseFloat(sp.dataset.extra || 0);
      var base = price * h * n, room = extra * h * n;
      addLine(rf.dataset.lpc, n + ' × ' + h + ' h × ' + money(price), base);
      if (extra > 0) addLine(rf.dataset.lroom, n + ' × ' + h + ' h × ' + money(extra), room);
      out.textContent = money(base + room);
    };
    ['ordenagailua', 'espazioa', 'orduak', 'pertsonak'].forEach(function (n) {
      rf.elements[n].addEventListener('input', calc);
      rf.elements[n].addEventListener('change', calc);
    });
    calc();
  }

  /* Comprueba el horario: lunes cerrado; mar–jue y dom desde las 08:00; vie–sáb 24 h */
  function checkSchedule(form) {
    var dv = form.elements['data'], tv = form.elements['ordua'];
    if (!dv || !dv.value || !tv || !tv.value) return null;
    var day = new Date(dv.value + 'T12:00:00').getDay(); // 0=dom ... 1=lun
    if (day === 1) return form.dataset.closed;
    if ((day === 2 || day === 3 || day === 4 || day === 0) && tv.value < '08:00') return form.dataset.early;
    return null;
  }

  /* ---------- Envío ---------- */
  document.querySelectorAll('form[data-pclub-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.elements['web_site'] && form.elements['web_site'].value) return; // honeypot
      if (!form.checkValidity()) { form.reportValidity(); status(form, form.dataset.invalid, 'err'); return; }
      var problem = checkSchedule(form);
      if (problem) { status(form, problem, 'err'); return; }

      var data = {};
      new FormData(form).forEach(function (v, k) { if (k !== 'web_site' && k !== 'pribatutasuna') data[k] = v; });
      data.subject = form.dataset.subject + (data.gaia ? ' – ' + data.gaia : (data.txapelketa ? ' – ' + data.txapelketa : (data.zenbatekoa ? ' – ' + data.zenbatekoa : '')));
      data.idioma = lang;
      var code = '';
      if (form.getAttribute('data-pclub-form') === 'voucher') {
        var al = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', buf = new Uint32Array(8);
        (window.crypto || {}).getRandomValues ? crypto.getRandomValues(buf) : buf.forEach(function (_, i) { buf[i] = Math.floor(Math.random() * 4294967295); });
        code = 'PCLUB-'; for (var k = 0; k < 8; k++) { code += al.charAt(buf[k] % al.length); if (k === 3) code += '-'; }
        data.codigo = code;
      }
      if (rf && form === rf) data.prezio_estimatua = document.getElementById('estimate-out').textContent;
      data.pribatutasuna = 'onartuta / accepted';

      if (!CFG.endpoint) { // alternativa sin servidor: abrir el correo del usuario
        var lines = Object.keys(data).filter(function (k) { return k !== 'subject'; })
          .map(function (k) { return k + ': ' + data[k]; }).join('\n');
        location.href = 'mailto:' + (CFG.fallbackEmail || 'info@pclub.eus') +
          '?subject=' + encodeURIComponent(data.subject) + '&body=' + encodeURIComponent(lines);
        status(form, form.dataset.fallback + (code ? ' ' + code : ''), 'ok');
        return;
      }
      if (CFG.accessKey) data.access_key = CFG.accessKey;
      if (/formsubmit\.co/.test(CFG.endpoint)) { // opciones de FormSubmit
        data._subject = data.subject; data._template = 'table'; data._captcha = 'false';
        if (data.emaila) data._replyto = data.emaila;
      }
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true; status(form, form.dataset.sending);
      fetch(CFG.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        status(form, form.dataset.ok + (code ? ' ' + code : ''), 'ok');
        form.reset();
        if (rf) { rf.elements['orduak'].value = 2; rf.elements['pertsonak'].value = 1; rf.dispatchEvent(new Event('input')); }
      }).catch(function () {
        status(form, form.dataset.err, 'err');
      }).then(function () { btn.disabled = false; });
    });
  });
})();
