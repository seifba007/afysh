export const PLANS = {
  free: {
    name: 'Gratuit',
    price: 0,
    priceDisplay: '0',
    description: 'Pour découvrir Afych',
    maxPosters: 3,
    maxProducts: 25,
    maxExports: 5,
    canExportPDF: false,
    hasWatermark: true,
    canUsePlanche: false,
    canCustomizeFonts: false,
    canUploadLogo: false,
    allTrades: false,
    canExportCMYK: false,
    canGenerateCSV: false,
    canUseQRCodes: false,
    historyDays: 0,
    support: 'FAQ',
  },
  pro: {
    name: 'Pro',
    price: 9.90,
    priceDisplay: '9,90',
    description: 'Pour les commerçants actifs',
    maxPosters: 50,
    maxProducts: Infinity,
    maxExports: Infinity,
    canExportPDF: true,
    hasWatermark: false,
    canUsePlanche: true,
    canCustomizeFonts: true,
    canUploadLogo: true,
    allTrades: true,
    canExportCMYK: false,
    canGenerateCSV: false,
    canUseQRCodes: false,
    historyDays: 30,
    support: 'Email',
  },
  premium: {
    name: 'Premium',
    price: 19.90,
    priceDisplay: '19,90',
    description: 'Pour les pros du commerce',
    maxPosters: Infinity,
    maxProducts: Infinity,
    maxExports: Infinity,
    canExportPDF: true,
    hasWatermark: false,
    canUsePlanche: true,
    canCustomizeFonts: true,
    canUploadLogo: true,
    allTrades: true,
    canExportCMYK: true,
    canGenerateCSV: true,
    canUseQRCodes: true,
    historyDays: Infinity,
    support: 'Prioritaire',
  },
};

/** Can the user save another poster? */
export function canSave(plan, currentCount) {
  return currentCount < PLANS[plan].maxPosters;
}

/** Can the user export to PDF? */
export function canExport(plan) {
  return PLANS[plan].canExportPDF;
}

/** Does the user's plan add a watermark? */
export function hasWatermark(plan) {
  return PLANS[plan].hasWatermark;
}

/** Can the user use label sheet (planche) mode? */
export function canUsePlanche(plan) {
  return PLANS[plan].canUsePlanche;
}

/** Can the user customize fonts? */
export function canCustomizeFonts(plan) {
  return PLANS[plan].canCustomizeFonts;
}

/** Can the user upload a logo? */
export function canUploadLogo(plan) {
  return PLANS[plan].canUploadLogo;
}

/** Can the user access all trade themes? */
export function canUseAllTrades(plan) {
  return PLANS[plan].allTrades;
}

/** Can the user export PDF in CMYK? */
export function canExportCMYK(plan) {
  return PLANS[plan].canExportCMYK;
}

/** Can the user generate CSV batches? */
export function canGenerateCSV(plan) {
  return PLANS[plan].canGenerateCSV;
}

/** Can the user use QR codes? */
export function canUseQRCodes(plan) {
  return PLANS[plan].canUseQRCodes;
}
