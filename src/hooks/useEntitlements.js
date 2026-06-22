import { useContext } from 'react';
import { AppContext } from '../App.jsx';
import {
  PLANS,
  canSave,
  canExport,
  hasWatermark,
  canUsePlanche,
  canCustomizeFonts,
  canUploadLogo,
  canUseAllTrades,
  canExportCMYK,
  canGenerateCSV,
  canUseQRCodes,
} from '../lib/entitlements.js';

export function useEntitlements() {
  const { plan, posters } = useContext(AppContext);

  return {
    plan,
    planInfo: PLANS[plan],
    canSave:           () => canSave(plan, posters.length),
    canExport:         () => canExport(plan),
    hasWatermark:      () => hasWatermark(plan),
    canUsePlanche:     () => canUsePlanche(plan),
    canCustomizeFonts: () => canCustomizeFonts(plan),
    canUploadLogo:     () => canUploadLogo(plan),
    canUseAllTrades:   () => canUseAllTrades(plan),
    canExportCMYK:     () => canExportCMYK(plan),
    canGenerateCSV:    () => canGenerateCSV(plan),
    canUseQRCodes:     () => canUseQRCodes(plan),
  };
}
