// Country flags using Unicode emoji — works in all modern browsers and renders in print via SVG text
// Key = internal id, value = { emoji, label }

export const COUNTRIES = {
  // ── Europe ──
  france:        { emoji: '🇫🇷', label: 'France' },
  espagne:       { emoji: '🇪🇸', label: 'Espagne' },
  italie:        { emoji: '🇮🇹', label: 'Italie' },
  portugal:      { emoji: '🇵🇹', label: 'Portugal' },
  belgique:      { emoji: '🇧🇪', label: 'Belgique' },
  'pays-bas':    { emoji: '🇳🇱', label: 'Pays-Bas' },
  allemagne:     { emoji: '🇩🇪', label: 'Allemagne' },
  suisse:        { emoji: '🇨🇭', label: 'Suisse' },
  autriche:      { emoji: '🇦🇹', label: 'Autriche' },
  luxembourg:    { emoji: '🇱🇺', label: 'Luxembourg' },
  royaume_uni:   { emoji: '🇬🇧', label: 'Royaume-Uni' },
  irlande:       { emoji: '🇮🇪', label: 'Irlande' },
  suede:         { emoji: '🇸🇪', label: 'Suède' },
  norvege:       { emoji: '🇳🇴', label: 'Norvège' },
  danemark:      { emoji: '🇩🇰', label: 'Danemark' },
  finlande:      { emoji: '🇫🇮', label: 'Finlande' },
  pologne:       { emoji: '🇵🇱', label: 'Pologne' },
  tchequie:      { emoji: '🇨🇿', label: 'Tchéquie' },
  slovaquie:     { emoji: '🇸🇰', label: 'Slovaquie' },
  hongrie:       { emoji: '🇭🇺', label: 'Hongrie' },
  roumanie:      { emoji: '🇷🇴', label: 'Roumanie' },
  bulgarie:      { emoji: '🇧🇬', label: 'Bulgarie' },
  grece:         { emoji: '🇬🇷', label: 'Grèce' },
  croatie:       { emoji: '🇭🇷', label: 'Croatie' },
  serbie:        { emoji: '🇷🇸', label: 'Serbie' },
  ukraine:       { emoji: '🇺🇦', label: 'Ukraine' },
  russie:        { emoji: '🇷🇺', label: 'Russie' },
  islande:       { emoji: '🇮🇸', label: 'Islande' },
  // ── Afrique du Nord & Moyen-Orient ──
  maroc:         { emoji: '🇲🇦', label: 'Maroc' },
  tunisie:       { emoji: '🇹🇳', label: 'Tunisie' },
  algerie:       { emoji: '🇩🇿', label: 'Algérie' },
  egypte:        { emoji: '🇪🇬', label: 'Égypte' },
  libye:         { emoji: '🇱🇾', label: 'Libye' },
  mauritanie:    { emoji: '🇲🇷', label: 'Mauritanie' },
  turquie:       { emoji: '🇹🇷', label: 'Turquie' },
  israel:        { emoji: '🇮🇱', label: 'Israël' },
  liban:         { emoji: '🇱🇧', label: 'Liban' },
  jordanie:      { emoji: '🇯🇴', label: 'Jordanie' },
  arabie_saoudite: { emoji: '🇸🇦', label: 'Arabie Saoudite' },
  emirats:       { emoji: '🇦🇪', label: 'Émirats Arabes Unis' },
  iran:          { emoji: '🇮🇷', label: 'Iran' },
  irak:          { emoji: '🇮🇶', label: 'Irak' },
  // ── Afrique subsaharienne ──
  senegal:       { emoji: '🇸🇳', label: 'Sénégal' },
  cote_divoire:  { emoji: '🇨🇮', label: "Côte d'Ivoire" },
  mali:          { emoji: '🇲🇱', label: 'Mali' },
  cameroun:      { emoji: '🇨🇲', label: 'Cameroun' },
  nigeria:       { emoji: '🇳🇬', label: 'Nigéria' },
  ghana:         { emoji: '🇬🇭', label: 'Ghana' },
  ethiopie:      { emoji: '🇪🇹', label: 'Éthiopie' },
  kenya:         { emoji: '🇰🇪', label: 'Kenya' },
  afrique_sud:   { emoji: '🇿🇦', label: 'Afrique du Sud' },
  madagascar:    { emoji: '🇲🇬', label: 'Madagascar' },
  // ── Amériques ──
  etats_unis:    { emoji: '🇺🇸', label: 'États-Unis' },
  canada:        { emoji: '🇨🇦', label: 'Canada' },
  mexique:       { emoji: '🇲🇽', label: 'Mexique' },
  bresil:        { emoji: '🇧🇷', label: 'Brésil' },
  argentine:     { emoji: '🇦🇷', label: 'Argentine' },
  chili:         { emoji: '🇨🇱', label: 'Chili' },
  colombie:      { emoji: '🇨🇴', label: 'Colombie' },
  perou:         { emoji: '🇵🇪', label: 'Pérou' },
  cuba:          { emoji: '🇨🇺', label: 'Cuba' },
  // ── Asie & Océanie ──
  chine:         { emoji: '🇨🇳', label: 'Chine' },
  japon:         { emoji: '🇯🇵', label: 'Japon' },
  coree_sud:     { emoji: '🇰🇷', label: 'Corée du Sud' },
  inde:          { emoji: '🇮🇳', label: 'Inde' },
  vietnam:       { emoji: '🇻🇳', label: 'Vietnam' },
  thailand:      { emoji: '🇹🇭', label: 'Thaïlande' },
  indonesie:     { emoji: '🇮🇩', label: 'Indonésie' },
  australie:     { emoji: '🇦🇺', label: 'Australie' },
  nouvelle_zelande: { emoji: '🇳🇿', label: 'Nouvelle-Zélande' },
};

// Legacy compat — SVG flags replaced by emoji spans rendered inline
export const flags = Object.fromEntries(
  Object.entries(COUNTRIES).map(([k, v]) => [
    k,
    `<span style="font-size:20px;line-height:1;display:inline-block">${v.emoji}</span>`
  ])
);

export const flagLabels = Object.fromEntries(
  Object.entries(COUNTRIES).map(([k, v]) => [k, v.label])
);
