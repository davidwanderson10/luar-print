#!/usr/bin/env bash
# Gera placeholders SVG com a identidade da Luar Print.
# Rode novamente depois se quiser regenerar. Troque os arquivos por fotos reais quando tiver.
set -e
cd "$(dirname "$0")"

NAVY="#16264a"
NAVY_DK="#0d1526"
ORANGE="#e1601c"

# --- marca pequena reutilizável (moon+bulb simplificada) ---
mark() {
  cat <<EOF
  <g transform="translate($1,$2) scale($3)">
    <path d="M30 2a20 20 0 1 0 10 37 16 16 0 1 1 -10 -37z" fill="$NAVY" opacity="0.9"/>
    <rect x="18" y="40" width="24" height="4" rx="2" fill="$NAVY"/>
    <rect x="21" y="47" width="18" height="4" rx="2" fill="$NAVY"/>
    <path d="M30 54 L30 62 L8 62 L8 70" stroke="$ORANGE" stroke-width="4" fill="none" stroke-linecap="round"/>
  </g>
EOF
}

# label centralizado numa arte
art_svg() {
  local file="$1" w="$2" h="$3" label="$4" sub="$5" icon="$6"
  cat > "$file" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $w $h" width="$w" height="$h">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="$NAVY"/>
      <stop offset="1" stop-color="$NAVY_DK"/>
    </linearGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="#ffffff" opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="$w" height="$h" fill="url(#g)"/>
  <rect width="$w" height="$h" fill="url(#dots)"/>
  <circle cx="$((w-60))" cy="60" r="120" fill="$ORANGE" opacity="0.08"/>
  <circle cx="40" cy="$((h-40))" r="90" fill="$ORANGE" opacity="0.06"/>
  <text x="50%" y="42%" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="$((w/8))" fill="$ORANGE">$icon</text>
  <text x="50%" y="60%" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="$((w/16))" fill="#ffffff">$label</text>
  <text x="50%" y="70%" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="$((w/34))" fill="#c9d4ea" opacity="0.85">$sub</text>
  <text x="50%" y="94%" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="$((w/40))" fill="#8ea2c4" letter-spacing="3">LUAR PRINT · imagem ilustrativa</text>
</svg>
EOF
}

# ---- SLIDER (6) ----
art_svg assets/slider/slide-1.svg 1200 675 "Impressão 3D sob medida" "Peças personalizadas em Fortaleza" "◑"
art_svg assets/slider/slide-2.svg 1200 675 "Mascotes de times" "Do escudo à torcida" "⚽"
art_svg assets/slider/slide-3.svg 1200 675 "Maternidade" "Lembrancinhas e topos de bolo" "🍼"
art_svg assets/slider/slide-4.svg 1200 675 "Universo Gamer" "Action figures e suportes" "🎮"
art_svg assets/slider/slide-5.svg 1200 675 "Fé & Devoção" "Santos, terços e presépios" "✝"
art_svg assets/slider/slide-6.svg 1200 675 "Personagens" "Heróis, animes e filmes" "★"

# ---- PRODUTOS (8 categorias, cover + 3 galeria cada) ----
gen_cat() {
  local slug="$1" label="$2" sub="$3" icon="$4"
  mkdir -p "assets/products/$slug"
  art_svg "assets/products/$slug/cover.svg" 600 600 "$label" "$sub" "$icon"
  art_svg "assets/products/$slug/1.svg" 800 600 "$label" "Modelo 1" "$icon"
  art_svg "assets/products/$slug/2.svg" 800 600 "$label" "Modelo 2" "$icon"
  art_svg "assets/products/$slug/3.svg" 800 600 "$label" "Modelo 3" "$icon"
}
gen_cat mascotes   "Mascote do seu time"   "Vários times disponíveis"        "⚽"
gen_cat maternidade "Maternidade"          "Lembrancinhas e decoração"       "🍼"
gen_cat gamers     "Gamers"                "Action figures e suportes"       "🎮"
gen_cat religiao   "Religião"              "Santos, terços e presépios"      "✝"
gen_cat personagens "Personagens"          "Heróis, animes e filmes"         "★"
gen_cat chaveiros  "Chaveiros"             "Nomes, logos e ícones"           "🔑"
gen_cat luminarias "Luminárias 3D"         "Abajur e luminárias temáticas"   "💡"
gen_cat decoracao  "Decoração & Vasos"     "Vasos, quadros e enfeites"       "🏺"

# ---- DEPOIMENTOS (3 prints) ----
art_svg assets/testimonials/t1.svg 500 400 "★★★★★" "Print do cliente" "💬"
art_svg assets/testimonials/t2.svg 500 400 "★★★★★" "Print do cliente" "💬"
art_svg assets/testimonials/t3.svg 500 400 "★★★★☆" "Print do cliente" "💬"

echo "Assets gerados."
