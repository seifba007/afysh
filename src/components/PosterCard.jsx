import React from 'react';
import { PencilSimple, CopySimple, Trash } from '@phosphor-icons/react/dist/ssr';
import AffichePreview from './AffichePreview.jsx';

const PREVIEW_W = 340;
const PREVIEW_H = 480;
const THUMB_H   = 180;
const SCALE     = THUMB_H / PREVIEW_H;           // ~0.375
const THUMB_W   = Math.round(PREVIEW_W * SCALE); // ~127px — actual rendered width

const THEME_COLORS = {
  'promo': '#D63B27', 'prix-simple': '#20336B', 'ardoise': '#1B211E',
  'bio': '#2F7A4D', 'origine-france': '#20336B',
  'boulangerie': '#C97B2A', 'fleuriste': '#D4537E',
  'boucherie': '#A32D2D', 'fromager': '#C9A227',
};

const THEME_LABELS = {
  'promo': 'Promo', 'prix-simple': 'Prix simple', 'ardoise': 'Ardoise',
  'bio': 'Bio', 'origine-france': 'Origine FR',
  'boulangerie': 'Boulangerie', 'fleuriste': 'Fleuriste',
  'boucherie': 'Boucherie', 'fromager': 'Fromagerie',
};

export default function PosterCard({ poster, onOpen, onDuplicate, onDelete }) {
  const themeColor = THEME_COLORS[poster.theme] || '#20336B';

  const previewCfg = {
    theme:    poster.theme    || 'prix-simple',
    produit:  poster.produit  || poster.name || 'Produit',
    categorie: poster.categorie || 'Catégorie',
    calibre:  poster.calibre  || '',
    prixInt:  poster.prixInt  || (poster.prix ? String(poster.prix).split('.')[0] : '0'),
    prixCents: poster.prixCents || (poster.prix ? String(poster.prix).split('.')[1]?.padEnd(2,'0') : '00'),
    unite:    poster.unite    || '€/kg',
    origine:  poster.origine  || '',
    mention:  poster.mention  || '',
    originMode: poster.flagKey ? 'flag' : 'none',
    flagKey:  poster.flagKey  || '',
    originePosition: 'bottom',
    unitePosition: 'below-right',
    logoUrl:  '',
    photoUrl: '',
    watermark: false,
    typo: {},
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-kraft shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col">

      {/* ── Thumbnail ── */}
      <div
        className="relative cursor-pointer overflow-hidden flex-shrink-0"
        style={{ height: THUMB_H, background: '#EDE8DC' }}
        onClick={onOpen}
      >
        {/* Centered scaled preview — anchored top-left then shifted */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          marginLeft: -(THUMB_W / 2),
          width: THUMB_W,
          height: THUMB_H,
          overflow: 'hidden',
          borderRadius: 0,
        }}>
          <div style={{
            width: PREVIEW_W,
            height: PREVIEW_H,
            transform: `scale(${SCALE})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}>
            <AffichePreview config={previewCfg} />
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 bg-white/95 rounded-xl px-3 py-2 text-xs font-bold shadow-lg"
            style={{ color: themeColor }}>
            <PencilSimple size={13} weight="bold" /> Modifier
          </div>
        </div>

        {/* Mention badge */}
        {poster.mention && (
          <span className="absolute top-2 left-2 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow"
            style={{ background: poster.mention === 'Promo' ? '#D63B27' : poster.mention === 'Bio' ? '#2F7A4D' : '#4C77CE' }}>
            {poster.mention}
          </span>
        )}

        {/* Theme chip */}
        <span className="absolute top-2 right-2 text-[9px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: themeColor + 'ee', color: '#fff' }}>
          {THEME_LABELS[poster.theme] || 'Thème'}
        </span>
      </div>

      {/* ── Accent line ── */}
      <div style={{ height: 3, background: themeColor, flexShrink: 0 }} />

      {/* ── Card footer ── */}
      <div className="px-3 pt-2.5 pb-3 flex flex-col gap-2 flex-1">
        {/* Name + price row */}
        <div className="flex items-center justify-between gap-2">
          <div className="font-bold text-sm truncate leading-tight" style={{ color: '#1B211E' }}>
            {poster.name}
          </div>
          <span className="flex-shrink-0 text-sm font-bold" style={{ color: themeColor, fontFamily:'Fredoka' }}>
            {poster.prix} €
          </span>
        </div>
        {/* Category */}
        <div className="text-[11px] leading-none" style={{ color:'#bbb' }}>
          {poster.category || 'Non classé'} · {poster.createdAt || ''}
        </div>

        {/* Actions */}
        <div className="flex gap-1.5 mt-auto pt-1">
          <button
            onClick={onOpen}
            className="flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: themeColor }}>
            <PencilSimple size={12} weight="bold" className="flex-shrink-0" />
            <span className="truncate">Modifier</span>
          </button>
          <button
            onClick={onDuplicate}
            title="Dupliquer"
            className="flex-shrink-0 flex items-center justify-center rounded-xl border border-kraft hover:bg-kraft transition-colors"
            style={{ width: 34, height: 34 }}>
            <CopySimple size={14} style={{ color:'#888' }} />
          </button>
          <button
            onClick={onDelete}
            title="Supprimer"
            className="flex-shrink-0 flex items-center justify-center rounded-xl border border-red-100 hover:bg-red-50 transition-colors"
            style={{ width: 34, height: 34 }}>
            <Trash size={14} style={{ color:'#D63B27' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
