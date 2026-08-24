/* =========================================================
   LUAR PRINT — main.js
   ========================================================= */
(function () {
  'use strict';

  /* =========================================================================
     👉 PRODUTOS DO PORTFÓLIO — EDITE AQUI
     -------------------------------------------------------------------------
     Cada item vira um card. Ao clicar, abre o modal com galeria, descrição e preço.
       titulo : nome que aparece no card e no modal
       badge  : etiqueta pequena no canto da imagem
       preco  : valor "a partir de" (o texto "a partir de" já é fixo no layout)
       desc   : descrição que aparece no modal
       imgs   : lista de imagens da categoria. Os nomes ('cover','1','2'...)
                apontam para assets/products/<slug>/<nome>.svg
                → troque os arquivos .svg pelas FOTOS REAIS (pode ser .jpg:
                  ex. imgs: ['cover.jpg','1.jpg'] e ajuste imgPath abaixo).
     Para adicionar/remover categorias: copie ou apague um bloco { ... }.
     ========================================================================= */
  const PRODUTOS = [
    { slug: 'mascotes', titulo: 'Mascote do seu time', badge: 'Times', preco: 'R$ 45',
      desc: 'Mascotes e escudos dos principais times do Brasil, do seu coração ao seu balcão. Vários tamanhos e cores.',
      imgs: ['cover', '1', '2', '3'] },
    { slug: 'maternidade', titulo: 'Maternidade', badge: 'Baby', preco: 'R$ 25',
      desc: 'Lembrancinhas, topos de bolo, plaquinhas de porta e enfeites para chá de bebê e nascimento.',
      imgs: ['cover', '1', '2', '3'] },
    { slug: 'gamers', titulo: 'Gamers', badge: 'Games', preco: 'R$ 40',
      desc: 'Action figures, suportes de controle, chaveiros e itens do seu game favorito.',
      imgs: ['cover', '1', '2', '3'] },
    { slug: 'religiao', titulo: 'Religião', badge: 'Fé', preco: 'R$ 30',
      desc: 'Santos, terços, presépios e peças de devoção com acabamento delicado.',
      imgs: ['cover', '1', '2', '3'] },
    { slug: 'personagens', titulo: 'Personagens', badge: 'Pop', preco: 'R$ 50',
      desc: 'Heróis, animes, filmes e desenhos — o personagem que você ama impresso em 3D.',
      imgs: ['cover', '1', '2', '3'] },
    { slug: 'chaveiros', titulo: 'Chaveiros personalizados', badge: 'Chaveiros', preco: 'R$ 12',
      desc: 'Nomes, logos, ícones e o que você imaginar em chaveiros resistentes e coloridos.',
      imgs: ['cover', '1', '2', '3'] },
    { slug: 'luminarias', titulo: 'Luminárias 3D', badge: 'Luz', preco: 'R$ 60',
      desc: 'Abajures e luminárias temáticas que iluminam o ambiente com estilo.',
      imgs: ['cover', '1', '2', '3'] },
    { slug: 'decoracao', titulo: 'Decoração & Vasos', badge: 'Casa', preco: 'R$ 35',
      desc: 'Vasos, quadros, porta-treco e enfeites para deixar sua casa com a sua cara.',
      imgs: ['cover', '1', '2', '3'] },
  ];

  /* =========================================================================
     👉 DEPOIMENTOS — EDITE AQUI
     -------------------------------------------------------------------------
     img   : print do cliente em assets/testimonials/ (troque os t1..t3)
     stars : estrelas cheias/vazias (★ cheia, ☆ vazia)
     nome  : nome do cliente
     texto : o agradecimento/comentário
     A NOTA GERAL (4,8) fica no index.html, na div .rating (--pct e o número).
     ========================================================================= */
  const DEPOIMENTOS = [
    { img: 'assets/testimonials/t1.svg', stars: '★★★★★', nome: 'Ana Beatriz', texto: 'Ficou perfeito! O mascote do time chegou rapidinho e super bem feito.' },
    { img: 'assets/testimonials/t2.svg', stars: '★★★★★', nome: 'Rodrigo Lima', texto: 'Comprei uma luminária de presente e todo mundo amou. Recomendo demais!' },
    { img: 'assets/testimonials/t3.svg', stars: '★★★★☆', nome: 'Mariana Sousa', texto: 'Atendimento nota mil e o acabamento das peças é lindo.' },
  ];

  /* =========================================================================
     👉 SLIDER (topo do site) — EDITE AQUI
     Troque os 6 arquivos assets/slider/slide-1.svg ... slide-6.svg pelas
     fotos reais dos trabalhos. Para mais/menos slides, mude a lista abaixo.
     ========================================================================= */
  const SLIDES = [1, 2, 3, 4, 5, 6].map(n => `assets/slider/slide-${n}.svg`);

  /* Velocidade do slider. O pedido era "a cada segundo"; deixei em 3s
     porque 1s é rápido demais para ver cada trabalho. Ajuste à vontade. */
  const AUTOPLAY_MS = 3000;

  const imgPath = (slug, name) => `assets/products/${slug}/${name}.svg`;

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMenu();
    initSlider();
    renderProdutos();
    renderDepoimentos();
    initModal();
    initForm();
    document.getElementById('year').textContent = new Date().getFullYear();
  });

  /* ---------- Tema ---------- */
  function initTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const icon = btn.querySelector('.theme-toggle__icon');
    const saved = localStorage.getItem('luar-theme');
    const theme = saved || 'dark'; // padrão escuro
    apply(theme);
    btn.addEventListener('click', () => {
      apply(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
    function apply(t) {
      html.setAttribute('data-theme', t);
      icon.textContent = t === 'dark' ? '🌙' : '☀️';
      localStorage.setItem('luar-theme', t);
    }
  }

  /* ---------- Menu mobile ---------- */
  function initMenu() {
    const burger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('.nav__link').forEach(l =>
      l.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }));
  }

  /* ---------- Slider ---------- */
  function initSlider() {
    const track = document.getElementById('sliderTrack');
    const dotsWrap = document.getElementById('sliderDots');
    let index = 0, timer = null;

    SLIDES.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'slider__slide';
      slide.innerHTML = `<img src="${src}" alt="Trabalho Luar Print ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}">`;
      track.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'slider__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
      dot.addEventListener('click', () => go(i, true));
      dotsWrap.appendChild(dot);
    });

    const dots = [...dotsWrap.children];
    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    }
    function go(i, user) { index = (i + SLIDES.length) % SLIDES.length; render(); if (user) restart(); }
    function next() { go(index + 1); }
    function start() { timer = setInterval(next, AUTOPLAY_MS); }
    function stop() { clearInterval(timer); }
    function restart() { stop(); start(); }

    document.getElementById('nextBtn').addEventListener('click', () => go(index + 1, true));
    document.getElementById('prevBtn').addEventListener('click', () => go(index - 1, true));
    const slider = document.getElementById('slider');
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    // Swipe em touch
    let x0 = null;
    slider.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
    slider.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1), true);
      x0 = null;
    });
    start();
  }

  /* ---------- Produtos ---------- */
  function renderProdutos() {
    const grid = document.getElementById('produtosGrid');
    grid.innerHTML = PRODUTOS.map((p, i) => `
      <article class="card" data-index="${i}" tabindex="0" role="button" aria-label="${p.titulo}">
        <div class="card__media">
          <span class="card__badge">${p.badge}</span>
          <img src="${imgPath(p.slug, p.imgs[0])}" alt="${p.titulo}" loading="lazy">
        </div>
        <div class="card__body">
          <h3 class="card__title">${p.titulo}</h3>
          <p class="card__price">a partir de <b>${p.preco}</b></p>
        </div>
      </article>`).join('');

    grid.querySelectorAll('.card').forEach(card => {
      const open = () => openModal(PRODUTOS[+card.dataset.index]);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  /* ---------- Depoimentos ---------- */
  function renderDepoimentos() {
    document.getElementById('depoimentosGrid').innerHTML = DEPOIMENTOS.map(d => `
      <figure class="depo">
        <img src="${d.img}" alt="Depoimento de ${d.nome}" loading="lazy">
        <figcaption class="depo__body">
          <div class="depo__stars">${d.stars}</div>
          <div class="depo__name">${d.nome}</div>
          <p class="depo__text">${d.texto}</p>
        </figcaption>
      </figure>`).join('');
  }

  /* ---------- Modal ---------- */
  let modalEl;
  function initModal() {
    modalEl = document.getElementById('modal');
    modalEl.querySelectorAll('[data-close]').forEach(el =>
      el.addEventListener('click', closeModal));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }
  function openModal(p) {
    const bigImg = document.getElementById('modalImg');
    const thumbs = document.getElementById('modalThumbs');
    document.getElementById('modalTitle').textContent = p.titulo;
    document.getElementById('modalDesc').textContent = p.desc;
    document.getElementById('modalPrice').textContent = p.preco;

    const srcs = p.imgs.map(n => imgPath(p.slug, n));
    bigImg.src = srcs[0]; bigImg.alt = p.titulo;
    thumbs.innerHTML = srcs.map((s, i) =>
      `<img src="${s}" alt="${p.titulo} ${i + 1}" class="${i === 0 ? 'is-active' : ''}">`).join('');
    thumbs.querySelectorAll('img').forEach((t, i) => t.addEventListener('click', () => {
      bigImg.src = srcs[i];
      thumbs.querySelectorAll('img').forEach(x => x.classList.remove('is-active'));
      t.classList.add('is-active');
    }));

    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ---------- Form ---------- */
  function initForm() {
    const form = document.getElementById('orderForm');
    const tel = form.querySelector('input[name="telefone"]');
    tel.addEventListener('input', () => {
      let v = tel.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      else if (v.length > 0) v = `(${v}`;
      tel.value = v;
    });
    // Deixa o envio nativo (FormSubmit) para suportar anexo de arquivo.
    form.addEventListener('submit', () => {
      const btn = form.querySelector('.form__submit');
      btn.textContent = 'Enviando...';
      btn.disabled = true;
    });
  }
})();
