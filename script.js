/* =====================================================
   BÉNIN AUTO MOTO PRESTIGE — SCRIPT.JS
===================================================== */
document.addEventListener('DOMContentLoaded', () => {

  const WHATSAPP_NUMBER = '2290198554017';

  /* ---------- Header sticky + burger ---------- */
  const header = document.getElementById('siteHeader');
  const onScrollHeader = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  const burger = document.getElementById('burgerBtn');
  const mainNav = document.getElementById('mainNav');
  burger.addEventListener('click', () => mainNav.classList.toggle('open'));
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });

  /* Highlight active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('.stat-number');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  const statsSection = document.getElementById('stats');
  if (statsSection) statsObserver.observe(statsSection);

  /* =====================================================
     ICONES SVG DE VÉHICULES (line-art, sans images externes)
  ===================================================== */
  const carIcon = (accent) => `
    <svg viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 78 Q22 50 55 45 L78 22 Q92 12 118 12 L150 12 Q172 12 184 30 L196 45 Q212 48 212 66 V78"
            stroke="${accent}" stroke-width="3"/>
      <path d="M20 78 H196" stroke="${accent}" stroke-width="3"/>
      <circle cx="62" cy="82" r="16" stroke="${accent}" stroke-width="3"/>
      <circle cx="158" cy="82" r="16" stroke="${accent}" stroke-width="3"/>
      <path d="M80 22 L88 44 H150 L156 22" stroke="${accent}" stroke-width="2"/>
    </svg>`;

  const pickupIcon = (accent) => `
    <svg viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 80 V56 Q14 46 24 46 H86 L104 20 Q112 12 128 12 H150 Q160 12 160 24 V46 H196 Q206 46 206 58 V80"
            stroke="${accent}" stroke-width="3"/>
      <path d="M14 80 H206 M104 46 V20" stroke="${accent}" stroke-width="3"/>
      <circle cx="58" cy="84" r="16" stroke="${accent}" stroke-width="3"/>
      <circle cx="168" cy="84" r="16" stroke="${accent}" stroke-width="3"/>
    </svg>`;

  const suvIcon = (accent) => `
    <svg viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 78 Q18 44 48 40 L66 18 Q76 10 96 10 H160 Q182 10 190 30 L198 42 Q210 44 210 62 V78"
            stroke="${accent}" stroke-width="3"/>
      <path d="M18 78 H210 M70 40 H196 M96 18 V40" stroke="${accent}" stroke-width="2.4"/>
      <circle cx="62" cy="82" r="17" stroke="${accent}" stroke-width="3"/>
      <circle cx="168" cy="82" r="17" stroke="${accent}" stroke-width="3"/>
    </svg>`;

  const motoIcon = (accent) => `
    <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="46" cy="90" r="24" stroke="${accent}" stroke-width="3"/>
      <circle cx="174" cy="90" r="24" stroke="${accent}" stroke-width="3"/>
      <path d="M46 90 L84 56 H118 L100 90" stroke="${accent}" stroke-width="3"/>
      <path d="M118 56 L142 40 H160 M118 56 L138 90 H174" stroke="${accent}" stroke-width="3"/>
      <path d="M84 56 L70 34 H90" stroke="${accent}" stroke-width="3"/>
      <path d="M100 90 H138" stroke="${accent}" stroke-width="3"/>
    </svg>`;

  const scooterIcon = (accent) => `
    <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="52" cy="92" r="22" stroke="${accent}" stroke-width="3"/>
      <circle cx="168" cy="92" r="22" stroke="${accent}" stroke-width="3"/>
      <path d="M52 92 L96 92 L130 46 H150" stroke="${accent}" stroke-width="3"/>
      <path d="M130 46 L120 30 H140" stroke="${accent}" stroke-width="3"/>
      <path d="M96 92 H168 M96 92 V70 H130" stroke="${accent}" stroke-width="3"/>
    </svg>`;

  /* =====================================================
     DONNÉES — VOITURES
  ===================================================== */
  const IMG = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

  const cars = [
    { name:'Toyota Corolla', year:'2022', km:'32 000 km', trans:'Automatique', fuel:'Essence', price:'8 900 000', icon:carIcon, badge:'Berline', img:IMG('photo-1559385988-439b04de16f8') },
    { name:'Toyota Hilux', year:'2023', km:'18 500 km', trans:'Manuelle', fuel:'Diesel', price:'19 500 000', icon:pickupIcon, badge:'Pick-up', img:IMG('photo-1551171128-2618b95729db') },
    { name:'Mercedes C300', year:'2021', km:'41 000 km', trans:'Automatique', fuel:'Essence', price:'17 200 000', icon:carIcon, badge:'Berline', img:IMG('photo-1544567430-6b7131655bb1') },
    { name:'BMW X5', year:'2022', km:'27 300 km', trans:'Automatique', fuel:'Essence', price:'24 800 000', icon:suvIcon, badge:'SUV', img:IMG('photo-1698316731602-a321713789cd') },
    { name:'Hyundai Tucson', year:'2023', km:'12 000 km', trans:'Automatique', fuel:'Essence', price:'14 300 000', icon:suvIcon, badge:'SUV', img:IMG('photo-1547559418-8d7437f53b5b') },
    { name:'Honda CR-V', year:'2021', km:'38 700 km', trans:'Automatique', fuel:'Essence', price:'13 700 000', icon:suvIcon, badge:'SUV', img:IMG('photo-1684849311607-ad25cec710a7') },
  ];

  /* =====================================================
     DONNÉES — MOTOS
  ===================================================== */
  const motos = [
    { name:'Boxer BM150', cc:'150 cc', conso:'2.1 L/100km', price:'950 000', icon:scooterIcon, img:IMG('photo-1693826775276-53d4b1d758a3') },
    { name:'Haojue HJ125', cc:'125 cc', conso:'1.9 L/100km', price:'780 000', icon:scooterIcon, img:IMG('photo-1747227231297-829a32781f65') },
    { name:'TVS Apache', cc:'160 cc', conso:'2.3 L/100km', price:'1 250 000', icon:motoIcon, img:IMG('photo-1666929436278-bc660d25825d') },
    { name:'Bajaj Pulsar', cc:'150 cc', conso:'2.2 L/100km', price:'1 100 000', icon:motoIcon, img:IMG('photo-1747227231297-829a32781f65') },
    { name:'Yamaha MT-15', cc:'155 cc', conso:'2.4 L/100km', price:'1 650 000', icon:motoIcon, img:IMG('photo-1666929436278-bc660d25825d') },
    { name:'Honda CB125', cc:'125 cc', conso:'1.8 L/100km', price:'890 000', icon:scooterIcon, img:IMG('photo-1693826775276-53d4b1d758a3') },
  ];

  const GOLD = '#C9A24B';

  const waLink = (label) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour, je suis intéressé(e) par : ' + label)}`;

  /* ---------- Génération des cartes voitures ---------- */
  const carGrid = document.getElementById('carGrid');
  cars.forEach((c, i) => {
    const card = document.createElement('article');
    card.className = 'vcard reveal';
    card.innerHTML = `
      <span class="vcard-corner tl"></span>
      <span class="vcard-corner br"></span>
      <span class="vcard-badge">${c.badge}</span>
      <div class="vcard-icon">
        <img src="${c.img}" alt="${c.name}" loading="lazy" data-fallback-type="car" data-fallback-index="${i}">
      </div>
      <h3>${c.name}</h3>
      <div class="vcard-year">Modèle ${c.year} — Certifié</div>
      <div class="spec-grid">
        <div><span class="label">Année</span><span class="value">${c.year}</span></div>
        <div><span class="label">Kilométrage</span><span class="value">${c.km}</span></div>
        <div><span class="label">Transmission</span><span class="value">${c.trans}</span></div>
        <div><span class="label">Carburant</span><span class="value">${c.fuel}</span></div>
      </div>
      <div class="vcard-price">${c.price} <small>FCFA</small></div>
      <div class="vcard-actions">
        <a href="#contact" class="btn btn-ghost">Voir détails</a>
        <a href="${waLink(c.name)}" target="_blank" rel="noopener" class="btn btn-whatsapp">WhatsApp</a>
      </div>`;
    carGrid.appendChild(card);
    revealObserver.observe(card);
  });

  /* ---------- Génération des cartes motos ---------- */
  const motoGrid = document.getElementById('motoGrid');
  motos.forEach((m, i) => {
    const card = document.createElement('article');
    card.className = 'vcard reveal';
    card.innerHTML = `
      <span class="vcard-corner tl"></span>
      <span class="vcard-corner br"></span>
      <span class="vcard-badge">Moto</span>
      <div class="vcard-icon">
        <img src="${m.img}" alt="${m.name}" loading="lazy" data-fallback-type="moto" data-fallback-index="${i}">
      </div>
      <h3>${m.name}</h3>
      <div class="vcard-year">Neuve — Garantie incluse</div>
      <div class="spec-grid">
        <div><span class="label">Cylindrée</span><span class="value">${m.cc}</span></div>
        <div><span class="label">Consommation</span><span class="value">${m.conso}</span></div>
      </div>
      <div class="vcard-price">${m.price} <small>FCFA</small></div>
      <div class="vcard-actions">
        <a href="${waLink(m.name)}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="flex:1">Commander sur WhatsApp</a>
      </div>`;
    motoGrid.appendChild(card);
    revealObserver.observe(card);
  });

  /* ---------- Repli automatique sur le dessin SVG si la photo est manquante ---------- */
  // 'error' ne remonte pas (bubble) sur les <img>, donc on écoute en phase de capture.
  document.addEventListener('error', (e) => {
    const img = e.target;
    if (!(img.tagName === 'IMG' && img.dataset.fallbackType)) return;
    const list = img.dataset.fallbackType === 'car' ? cars : motos;
    const item = list[parseInt(img.dataset.fallbackIndex, 10)];
    if (item && item.icon) {
      img.closest('.vcard-icon').innerHTML = item.icon(GOLD);
    }
  }, true);

  /* =====================================================
     TÉMOIGNAGES — slider automatique
  ===================================================== */
  const track = document.getElementById('testiTrack');
  const dotsWrap = document.getElementById('testiDots');
  const slides = track.querySelectorAll('.testi-slide');
  let testiIndex = 0;
  let testiTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('button');

  function goToSlide(i) {
    testiIndex = i;
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    resetTimer();
  }
  function nextSlide() { goToSlide((testiIndex + 1) % slides.length); }
  function resetTimer() {
    clearInterval(testiTimer);
    testiTimer = setInterval(nextSlide, 5000);
  }
  resetTimer();

  /* =====================================================
     FORMULAIRE DE CONTACT
  ===================================================== */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const text = `Bonjour, je m'appelle ${name}. ${message}`;
    formNote.textContent = 'Merci ! Nous vous redirigeons vers WhatsApp...';
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
      form.reset();
      formNote.textContent = 'Message prêt à être envoyé sur WhatsApp.';
    }, 700);
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
