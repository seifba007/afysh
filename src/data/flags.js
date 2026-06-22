// Country flags using flagcdn.com images — works reliably on all platforms including Windows
// Key = internal id, value = { iso, label }
// iso = 2-letter ISO 3166-1 alpha-2 code (lowercase) used by flagcdn.com

export const COUNTRIES = {
  // ── Europe ──
  france:        { iso: 'fr', label: 'France' },
  espagne:       { iso: 'es', label: 'Espagne' },
  italie:        { iso: 'it', label: 'Italie' },
  portugal:      { iso: 'pt', label: 'Portugal' },
  belgique:      { iso: 'be', label: 'Belgique' },
  'pays-bas':    { iso: 'nl', label: 'Pays-Bas' },
  allemagne:     { iso: 'de', label: 'Allemagne' },
  suisse:        { iso: 'ch', label: 'Suisse' },
  autriche:      { iso: 'at', label: 'Autriche' },
  luxembourg:    { iso: 'lu', label: 'Luxembourg' },
  royaume_uni:   { iso: 'gb', label: 'Royaume-Uni' },
  irlande:       { iso: 'ie', label: 'Irlande' },
  suede:         { iso: 'se', label: 'Suède' },
  norvege:       { iso: 'no', label: 'Norvège' },
  danemark:      { iso: 'dk', label: 'Danemark' },
  finlande:      { iso: 'fi', label: 'Finlande' },
  pologne:       { iso: 'pl', label: 'Pologne' },
  tchequie:      { iso: 'cz', label: 'Tchéquie' },
  slovaquie:     { iso: 'sk', label: 'Slovaquie' },
  hongrie:       { iso: 'hu', label: 'Hongrie' },
  roumanie:      { iso: 'ro', label: 'Roumanie' },
  bulgarie:      { iso: 'bg', label: 'Bulgarie' },
  grece:         { iso: 'gr', label: 'Grèce' },
  croatie:       { iso: 'hr', label: 'Croatie' },
  serbie:        { iso: 'rs', label: 'Serbie' },
  ukraine:       { iso: 'ua', label: 'Ukraine' },
  russie:        { iso: 'ru', label: 'Russie' },
  islande:       { iso: 'is', label: 'Islande' },
  // ── Afrique du Nord & Moyen-Orient ──
  maroc:         { iso: 'ma', label: 'Maroc' },
  tunisie:       { iso: 'tn', label: 'Tunisie' },
  algerie:       { iso: 'dz', label: 'Algérie' },
  egypte:        { iso: 'eg', label: 'Égypte' },
  libye:         { iso: 'ly', label: 'Libye' },
  mauritanie:    { iso: 'mr', label: 'Mauritanie' },
  turquie:       { iso: 'tr', label: 'Turquie' },
  israel:        { iso: 'il', label: 'Israël' },
  liban:         { iso: 'lb', label: 'Liban' },
  jordanie:      { iso: 'jo', label: 'Jordanie' },
  arabie_saoudite: { iso: 'sa', label: 'Arabie Saoudite' },
  emirats:       { iso: 'ae', label: 'Émirats Arabes Unis' },
  iran:          { iso: 'ir', label: 'Iran' },
  irak:          { iso: 'iq', label: 'Irak' },
  // ── Afrique subsaharienne ──
  senegal:       { iso: 'sn', label: 'Sénégal' },
  cote_divoire:  { iso: 'ci', label: "Côte d'Ivoire" },
  mali:          { iso: 'ml', label: 'Mali' },
  cameroun:      { iso: 'cm', label: 'Cameroun' },
  nigeria:       { iso: 'ng', label: 'Nigéria' },
  ghana:         { iso: 'gh', label: 'Ghana' },
  ethiopie:      { iso: 'et', label: 'Éthiopie' },
  kenya:         { iso: 'ke', label: 'Kenya' },
  afrique_sud:   { iso: 'za', label: 'Afrique du Sud' },
  madagascar:    { iso: 'mg', label: 'Madagascar' },
  // ── Amériques ──
  etats_unis:    { iso: 'us', label: 'États-Unis' },
  canada:        { iso: 'ca', label: 'Canada' },
  mexique:       { iso: 'mx', label: 'Mexique' },
  bresil:        { iso: 'br', label: 'Brésil' },
  argentine:     { iso: 'ar', label: 'Argentine' },
  chili:         { iso: 'cl', label: 'Chili' },
  colombie:      { iso: 'co', label: 'Colombie' },
  perou:         { iso: 'pe', label: 'Pérou' },
  cuba:          { iso: 'cu', label: 'Cuba' },
  // ── Asie & Océanie ──
  chine:         { iso: 'cn', label: 'Chine' },
  japon:         { iso: 'jp', label: 'Japon' },
  coree_sud:     { iso: 'kr', label: 'Corée du Sud' },
  inde:          { iso: 'in', label: 'Inde' },
  vietnam:       { iso: 'vn', label: 'Vietnam' },
  thailand:      { iso: 'th', label: 'Thaïlande' },
  indonesie:     { iso: 'id', label: 'Indonésie' },
  australie:     { iso: 'au', label: 'Australie' },
  nouvelle_zelande: { iso: 'nz', label: 'Nouvelle-Zélande' },
};

// Returns a flagcdn.com image URL for a given country key
export const flagUrl = (key, size = 20) => {
  const c = COUNTRIES[key];
  if (!c) return null;
  return `https://flagcdn.com/w${size}/${c.iso}.png`;
};

export const flagLabels = Object.fromEntries(
  Object.entries(COUNTRIES).map(([k, v]) => [k, v.label])
);
