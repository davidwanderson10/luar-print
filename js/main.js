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
       desc   : descrição que aparece no modal

     IMAGENS — duas formas:
       a) variacoes: cada imagem tem NOME, PREÇO e (opcional) DESCRIÇÃO próprios
          (ex.: mascote de cada time). Ao clicar na miniatura, o modal mostra o
          nome, o preço e — se houver — a descrição daquela variação.
          O card usa a 1ª imagem e o MENOR preço ("a partir de").
            variacoes: [
              { img: 'ceara.jpg',    nome: 'Ceará',    preco: 'R$ 45', desc: 'Mascote Vozão em resina, 12 cm.' },
              { img: 'flamengo.jpg', nome: 'Flamengo', preco: 'R$ 50' },  // desc é opcional
            ]
       b) imgs + preco: forma simples (galeria sem nome por imagem, preço único).
            imgs: ['cover', '1', '2'], preco: 'R$ 40'

     ONDE FICAM AS FOTOS:
       Coloque os arquivos em  assets/products/<slug>/   (ex.: assets/products/mascotes/).
       No 'img' use o nome do arquivo COM a extensão da foto real: 'ceara.jpg',
       'flamengo.png', 'gremio.webp'. (Sem extensão, o site procura um .svg.)
       Se a variação não tiver 'desc', o modal usa a descrição da categoria (desc do bloco).
     Para adicionar/remover categorias: copie ou apague um bloco { ... }.
     ========================================================================= */
  const PRODUTOS = [
    { slug: 'mascotes', titulo: 'Mascote do seu time', badge: 'Times',
      desc: 'Mascotes e escudos dos principais times do Brasil, do seu coração ao seu balcão. Vários tamanhos e cores.',
      variacoes: [
        // Fotos reais em assets/products/mascotes/. Ajuste nome/preço se precisar
        // e reescreva os 'desc' abaixo. (Conferir os nomes marcados com ⚠️.)
        { img: 'mascotepal.png',  nome: 'Palmeiras',    preco: 'R$ 50', desc: 'Descrição do mascote do Palmeiras.' },
        { img: 'mascotecea.png',  nome: 'Ceará',        preco: 'R$ 45', desc: 'Descrição do mascote do Ceará.' },
        { img: 'mascotefor.png',  nome: 'Fortaleza',    preco: 'R$ 45', desc: 'Descrição do mascote do Fortaleza.' },
        { img: 'mascotefla.png',  nome: 'Flamengo',     preco: 'R$ 50', desc: 'Descrição do mascote do Flamengo.' },
        { img: 'mascotefla2.png', nome: 'Flamengo (2)', preco: 'R$ 50', desc: 'Descrição do segundo modelo do Flamengo.' }, // ⚠️ 2ª foto do Flamengo
        { img: 'mascotecor.png',  nome: 'Corinthians',  preco: 'R$ 50', desc: 'Descrição do mascote do Corinthians.' },
        { img: 'mascotecor2.png', nome: 'Corinthians (2)', preco: 'R$ 50', desc: 'Descrição do segundo modelo do Corinthians.' }, // ⚠️ confira: Corinthians ou Coritiba?
      ] },
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
     Cada slide pode ser de duas formas:
       • string  → mesma imagem no desktop e no celular:
             'assets/slider/slide-2.svg'
       • objeto  → imagem DIFERENTE no celular (melhor responsividade):
             { desktop: 'assets/slider/slider1.png',
               mobile:  'assets/slider/slider1-mobile.png' }
     Tamanhos ideais: DESKTOP 1920x840 (16:7) · CELULAR 1080x1350 (4:5, retrato).
     A ordem abaixo é a ordem de exibição. Comprima as fotos (até ~400 KB)!
     ========================================================================= */
  const SLIDES = [
    // Quando tiver a versão mobile, troque a linha abaixo por:
    // { desktop: 'assets/slider/slider1.png', mobile: 'assets/slider/slider1-mobile.png' },
    'assets/slider/slider1.png',
    'assets/slider/slide-2.svg',
    'assets/slider/slide-3.svg',
    'assets/slider/slide-4.svg',
    'assets/slider/slide-5.svg',
    'assets/slider/slide-6.svg',
  ];

  /* Velocidade do slider. O pedido era "a cada segundo"; deixei em 3s
     porque 1s é rápido demais para ver cada trabalho. Ajuste à vontade. */
  const AUTOPLAY_MS = 3000;

  // Se o nome já vier com extensão (.jpg/.png/.webp), usa como está; senão assume .svg.
  const imgPath = (slug, name) => `assets/products/${slug}/${/\.\w+$/.test(name) ? name : name + '.svg'}`;

  /* Número do WhatsApp (só dígitos, com DDI 55). Usado no botão do modal. */
  const WHATSAPP = '5585991882209';
  /* Monta o link do WhatsApp já com os dados do produto/variação escolhidos. */
  function whatsappLink(titulo, variacao) {
    let msg = `Olá! Vim pelo site da Luar Print e quero encomendar: ${titulo}`;
    if (variacao && variacao.nome) msg += ` — ${variacao.nome}`;
    if (variacao && variacao.preco) msg += ` (${variacao.preco})`;
    msg += '. Pode me ajudar?';
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }

  /* Normaliza o produto para uma lista de variações {img, nome, preco},
     aceitando tanto o formato novo (variacoes) quanto o antigo (imgs + preco). */
  function variacoesOf(p) {
    if (Array.isArray(p.variacoes) && p.variacoes.length) return p.variacoes;
    return (p.imgs || ['cover']).map(n => ({ img: n, nome: '', preco: p.preco || '' }));
  }
  /* "R$ 45" -> 45 ; "R$ 1.250,90" -> 1250.9 ; vazio -> Infinity */
  function precoNum(s) {
    const n = parseFloat(String(s).replace(/[^\d,]/g, '').replace(',', '.'));
    return isNaN(n) ? Infinity : n;
  }
  /* Preço exibido no card: menor preço entre as variações (preservando o texto). */
  function precoCard(p) {
    const vs = variacoesOf(p);
    let melhor = null, min = Infinity;
    vs.forEach(v => { const n = precoNum(v.preco); if (n < min) { min = n; melhor = v; } });
    return melhor && melhor.preco ? melhor.preco : (p.preco || '');
  }

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

    SLIDES.forEach((item, i) => {
      // Cada slide pode ser uma string (mesma imagem em tudo) ou
      // { desktop, mobile } para usar uma foto diferente no celular.
      const desktop = typeof item === 'string' ? item : item.desktop;
      const mobile = typeof item === 'string' ? null : item.mobile;
      const loading = i === 0 ? 'eager' : 'lazy';
      const media = mobile
        ? `<picture>
             <source media="(max-width: 540px)" srcset="${mobile}">
             <img src="${desktop}" alt="Trabalho Luar Print ${i + 1}" loading="${loading}">
           </picture>`
        : `<img src="${desktop}" alt="Trabalho Luar Print ${i + 1}" loading="${loading}">`;
      const slide = document.createElement('div');
      slide.className = 'slider__slide';
      slide.innerHTML = media;
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
    grid.innerHTML = PRODUTOS.map((p, i) => {
      const vs = variacoesOf(p);
      const multi = vs.length > 1;
      const nav = multi ? `
          <button type="button" class="card__nav card__nav--prev" aria-label="Imagem anterior">‹</button>
          <button type="button" class="card__nav card__nav--next" aria-label="Próxima imagem">›</button>
          <div class="card__dots">${vs.map((_, k) =>
            `<span class="card__dot${k === 0 ? ' is-active' : ''}"></span>`).join('')}</div>` : '';
      return `
      <article class="card" data-index="${i}" tabindex="0" role="button" aria-label="${p.titulo}">
        <div class="card__media">
          <span class="card__badge">${p.badge}</span>
          <img src="${imgPath(p.slug, vs[0].img)}" alt="${vs[0].nome || p.titulo}" loading="lazy">
          ${nav}
        </div>
        <div class="card__body">
          <h3 class="card__title">${p.titulo}</h3>
          <p class="card__price">a partir de <b>${precoCard(p)}</b></p>
        </div>
      </article>`;
    }).join('');

    grid.querySelectorAll('.card').forEach(card => {
      const p = PRODUTOS[+card.dataset.index];
      const vs = variacoesOf(p);
      const img = card.querySelector('.card__media img');
      const dots = [...card.querySelectorAll('.card__dot')];
      let idx = 0;

      const show = k => {
        idx = (k + vs.length) % vs.length;
        img.src = imgPath(p.slug, vs[idx].img);
        img.alt = vs[idx].nome || p.titulo;
        dots.forEach((d, di) => d.classList.toggle('is-active', di === idx));
      };
      // Setas navegam sem abrir o modal.
      card.querySelector('.card__nav--prev')?.addEventListener('click', e => { e.stopPropagation(); show(idx - 1); });
      card.querySelector('.card__nav--next')?.addEventListener('click', e => { e.stopPropagation(); show(idx + 1); });

      const open = () => openModal(p, idx);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); show(idx + 1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); show(idx - 1); }
      });
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
  function openModal(p, start = 0) {
    const bigImg = document.getElementById('modalImg');
    const thumbs = document.getElementById('modalThumbs');
    const varEl = document.getElementById('modalVariacao');
    const priceLabel = modalEl.querySelector('.modal__price-label');
    const priceVal = document.getElementById('modalPrice');
    const cta = document.getElementById('modalCta');
    const descEl = document.getElementById('modalDesc');
    document.getElementById('modalTitle').textContent = p.titulo;

    const vs = variacoesOf(p);
    const srcs = vs.map(v => imgPath(p.slug, v.img));

    function select(i) {
      const v = vs[i];
      bigImg.src = srcs[i];
      bigImg.alt = v.nome ? `${p.titulo} — ${v.nome}` : p.titulo;
      varEl.textContent = v.nome || '';
      varEl.style.display = v.nome ? '' : 'none';
      descEl.textContent = v.desc || p.desc;
      priceVal.textContent = v.preco || '';
      // Variação com nome = preço exato daquela peça; sem nome = "a partir de".
      priceLabel.textContent = v.nome ? 'valor' : 'a partir de';
      cta.href = whatsappLink(p.titulo, v);
      thumbs.querySelectorAll('img').forEach((x, xi) => x.classList.toggle('is-active', xi === i));
    }

    thumbs.innerHTML = srcs.map((s, i) =>
      `<img src="${s}" alt="${vs[i].nome || `${p.titulo} ${i + 1}`}" title="${vs[i].nome || ''}">`).join('');
    thumbs.querySelectorAll('img').forEach((t, i) => t.addEventListener('click', () => select(i)));
    select(Math.min(Math.max(start, 0), vs.length - 1));

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
