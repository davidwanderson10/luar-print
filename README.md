# Luar Print — Landing Page

Site de página única da **Luar Print** (impressão 3D personalizada · Fortaleza/CE).
HTML/CSS/JS puro, sem build. Pronto para GitHub Pages.

## Estrutura
```
luar-print/
├── index.html          # a página inteira
├── css/styles.css      # estilos + temas (claro/escuro)
├── js/main.js          # slider, modal, tema, form, menu
├── assets/
│   ├── logo/favicon.svg
│   ├── slider/         # 6 imagens do slider (slide-1..6)
│   ├── products/<cat>/ # cover + 1,2,3 por categoria
│   └── testimonials/   # prints de depoimentos
└── gen-assets.sh       # (re)gera os placeholders SVG
```

## Rodar localmente
```bash
python -m http.server 5599
# abra http://127.0.0.1:5599
```

## Trocar as imagens pelas reais
As imagens hoje são **placeholders SVG**. Para usar as fotos de verdade:

1. **Slider:** substitua `assets/slider/slide-1.svg` … `slide-6.svg` pelas suas fotos
   (pode manter o nome ou trocar por `.jpg` e ajustar a lista `SLIDES` no `js/main.js`).
2. **Produtos:** em `assets/products/<categoria>/`, troque `cover`, `1`, `2`, `3`.
   Para adicionar mais fotos numa categoria, edite o array `imgs` do produto em `js/main.js`.
3. **Depoimentos:** troque `assets/testimonials/t1..t3` pelos prints dos clientes
   e ajuste nomes/textos em `DEPOIMENTOS` no `js/main.js`.
4. **Logo:** a logo do topo é um SVG inline (adapta ao tema). Se quiser usar o PNG oficial,
   me avise que troco por `<img>`.

Preços, títulos e descrições dos produtos ficam todos em `js/main.js` (array `PRODUTOS`).

## Formulário de encomenda (FormSubmit)
O form envia para **luarprint3d@gmail.com** via [FormSubmit](https://formsubmit.co) — sem servidor.

⚠️ **Ativação (uma vez só):** no primeiro envio, o FormSubmit manda um e-mail de confirmação
para a caixa `luarprint3d@gmail.com`. Basta clicar em **"Activate Form"** e pronto — os próximos
envios chegam direto (inclusive com o anexo).

Depois de ativar, dá pra (opcional):
- Ativar reCAPTCHA (trocar `_captcha` para `true`).
- Definir uma página de "obrigado": adicionar `<input type="hidden" name="_next" value="https://SEU-SITE/#obrigado">`.

## Publicar no GitHub Pages
```bash
git init
git add .
git commit -m "Landing page Luar Print"
git branch -M main
git remote add origin https://github.com/davidwanderson10/luar-print.git
git push -u origin main
```
No GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
O site sai em `https://davidwanderson10.github.io/luar-print/`.

### Domínio próprio (registro.br)
1. Crie um arquivo `CNAME` na raiz com o domínio (ex.: `luarprint.com.br`).
2. No registro.br, aponte o DNS:
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (ou `CNAME` `www` → `davidwanderson10.github.io`)
3. Em Settings → Pages, marque **Enforce HTTPS**.

## Contatos usados no site
- WhatsApp: `55 85 99188-2209` → `https://wa.me/5585991882209`
- E-mail: `luarprint3d@gmail.com`
- Instagram: `@luarprint`
- Local: Fortaleza/CE
