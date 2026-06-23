import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { AppContext } from '../App.jsx';
import AffichePreview from '../components/AffichePreview.jsx';
import { TYPO_DEFAULTS } from '../components/AffichePreview.jsx';
import AfficheCanvas, { ELEM_DEFAULTS } from '../components/AfficheCanvas.jsx';
import { COUNTRIES, flagUrl } from '../data/flags.js';
import { regions } from '../data/regions.js';
import { useEntitlements } from '../hooks/useEntitlements.js';
import {
  ArrowLeft, CaretDown, FloppyDisk, Printer, CheckCircle,
  ArrowCounterClockwise, Lock, UploadSimple, X,
  TextAlignLeft, TextAlignCenter, TextAlignRight,
} from '@phosphor-icons/react/dist/ssr';

const FORMAT_SIZES = {
  A4: { w:340, h:480 }, A5: { w:240, h:340 },
  A6: { w:170, h:240 }, A7: { w:120, h:170 },
};
// Physical dimensions in mm for each format
const FORMAT_MM = {
  A4: { w:210, h:297 }, A5: { w:148, h:210 },
  A6: { w:105, h:148 }, A7: { w:74,  h:105 },
};
// mm → px at 96dpi
const mmToPx = mm => Math.round(mm * 3.7795);

const PLANCHE_LAYOUTS = {
  '4x-a6': { cols:2, rows:2, fmt:'A6' },
  '6x-a7': { cols:2, rows:3, fmt:'A7' },
  '2x-a5': { cols:1, rows:2, fmt:'A5' },
  '9x-a7': { cols:3, rows:3, fmt:'A7' },
};

const THEMES_LIST = [
  { id:'promo',          label:'Promo',          color:'#D63B27', dark:true  },
  { id:'prix-simple',    label:'Prix simple',    color:'#FAF7EF', dark:false },
  { id:'ardoise',        label:'Ardoise',        color:'#1B211E', dark:true  },
  { id:'bio',            label:'Bio / Primeur',  color:'#2F7A4D', dark:true  },
  { id:'origine-france', label:'Origine France', color:'#20336B', dark:true  },
  { id:'boulangerie',    label:'Boulangerie',    color:'#C97B2A', dark:true  },
  { id:'fleuriste',      label:'Fleuriste',      color:'#D4537E', dark:true  },
  { id:'boucherie',      label:'Boucherie',      color:'#A32D2D', dark:true  },
  { id:'fromager',       label:'Fromagerie',     color:'#C9A227', dark:true  },
];

const FORMATS  = ['A4','A5','A6','A7'];
const UNITS    = ['kg','pièce','botte','L','100g','barquette','bouquet'];
const CALIBRES = ['','Catégorie Extra','Catégorie 1','Catégorie 2'];
const MENTIONS = ['','Nouveau','Promo','Bio','Local'];

const FONTS = [
  { name:'Fredoka',          label:'Fredoka',          w:600 },
  { name:'Archivo',          label:'Archivo',          w:700 },
  { name:'Oswald',           label:'Oswald',           w:600 },
  { name:'Bebas Neue',       label:'Bebas Neue',       w:400 },
  { name:'Montserrat',       label:'Montserrat',       w:700 },
  { name:'Raleway',          label:'Raleway',          w:600 },
  { name:'Playfair Display', label:'Playfair',         w:700 },
  { name:'Dancing Script',   label:'Dancing Script',   w:700 },
  { name:'Pacifico',         label:'Pacifico',         w:400 },
  { name:'Righteous',        label:'Righteous',        w:400 },
  { name:'Lobster',          label:'Lobster',          w:400 },
  { name:'Impact',           label:'Impact',           w:400 },
  { name:'Georgia',          label:'Georgia',          w:700 },
];

const defaultConfig = {
  theme:'prix-simple', format:'A4', orientation:'portrait',
  produit:'Mon Produit', categorie:'Catégorie', calibre:'',
  prixInt:'2', prixCents:'50', unite:'€/kg',
  ancienPrix:'', origine:'France', mention:'',
  originMode:'flag', flagKey:'france', regionId:'france',
  originePosition:'bottom', unitePosition:'below-right',
  elementAlign:{ header:'left', prix:'center', unite:'center', origine:'left' },
  logoUrl:'', logoPosition:'top-right', logoSize:60,
  photoUrl:'', photoOpacity:0.82,
  typo:{}, ancienPrixTypo:{},
  posterName:'Nouvelle affiche', posterCategory:'', mode:'affiche',
  plancheLayout:'4x-a6', plancheCopies:4,
  bgAccent:false, bgAccentColor:'#20336B',
  elementPositions:{},
  elementScales:{},
};

/* ── Pill tab bar ── */
function Tabs({ value, onChange, accent='#20336B' }) {
  const tabs = [
    { id:'contenu',  label:'Contenu'  },
    { id:'style',    label:'Style'    },
    { id:'layout',   label:'Mise en page' },
  ];
  return (
    <div className="flex border-b border-kraft bg-white flex-shrink-0">
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className="flex-1 py-2.5 text-xs font-semibold transition-colors relative"
          style={{ color: value === t.id ? accent : '#aaa' }}>
          {t.label}
          {value === t.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full" style={{ background: accent }} />}
        </button>
      ))}
    </div>
  );
}

/* ── Collapsible section ── */
function Sec({ title, children, open: defOpen = true }) {
  const [open, setOpen] = useState(defOpen);
  return (
    <div className="border border-kraft rounded-xl overflow-hidden mb-2">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-white hover:bg-kraft/40 transition-colors"
        style={{ color:'#999' }}>
        {title}
        <CaretDown size={11} weight="bold" style={{ transition:'transform .2s', transform:open?'rotate(180deg)':'none', color:'#ccc' }} />
      </button>
      {open && <div className="px-3 pt-1.5 pb-3 space-y-2.5 bg-white">{children}</div>}
    </div>
  );
}

/* ── Label + children ── */
function Field({ label, children }) {
  return (
    <div>
      <div className="text-[11px] font-semibold mb-1" style={{ color:'#666' }}>{label}</div>
      {children}
    </div>
  );
}

/* ── Text input ── */
function TxtInput({ value, onChange, placeholder, type='text' }) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg border border-kraft text-sm outline-none"
      style={{ background:'#FAF7EF' }} />
  );
}

/* ── Select ── */
function Sel({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg border border-kraft text-sm outline-none"
      style={{ background:'#FAF7EF' }}>
      {options.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}

/* ── Radio row ── */
function Radio({ name, options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map(([v,l]) => (
        <label key={v} className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color:'#444' }}>
          <input type="radio" name={name} value={v} checked={value===v} onChange={() => onChange(v)} />
          {l}
        </label>
      ))}
    </div>
  );
}

/* ── Alignment buttons ── */
function AlignBtns({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[['left', TextAlignLeft], ['center', TextAlignCenter], ['right', TextAlignRight]].map(([v,Icon]) => (
        <button key={v} onClick={() => onChange(v)}
          className="flex-1 flex items-center justify-center py-1.5 rounded-lg border transition-colors"
          style={{ background:value===v?'#20336B':'#fff', borderColor:value===v?'#20336B':'#E7DCC4', color:value===v?'#fff':'#888' }}>
          <Icon size={13} />
        </button>
      ))}
    </div>
  );
}

/* ── Visual font picker ── */
function FontPicker({ value, onChange }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5 }}>
      {FONTS.map(f => (
        <button key={f.name} onClick={() => onChange(f.name)}
          style={{
            fontFamily: f.name + ', sans-serif',
            fontWeight: f.w,
            fontSize: 12,
            padding: '6px 6px',
            borderRadius: 8,
            border: '1.5px solid',
            borderColor: value === f.name ? '#20336B' : '#E7DCC4',
            background: value === f.name ? '#EEF1FA' : '#fff',
            color: value === f.name ? '#20336B' : '#333',
            cursor: 'pointer',
            textAlign: 'center',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>
          {f.label}
        </button>
      ))}
    </div>
  );
}

/* ── Image upload widget ── */
function ImgUpload({ label, value, onChange, onRemove }) {
  const ref = useRef(null);
  const handle = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };
  return value ? (
    <div className="flex items-center gap-3 p-2 rounded-xl border border-kraft bg-white">
      <img src={value} alt={label} className="w-12 h-12 object-contain rounded-lg border border-kraft bg-kraft/30" />
      <div className="flex-1 text-xs font-medium truncate" style={{ color:'#555' }}>{label} chargé</div>
      <button onClick={onRemove} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50" style={{ color:'#D63B27' }}>
        <X size={12} weight="bold" />
      </button>
    </div>
  ) : (
    <>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handle} />
      <button type="button" onClick={() => ref.current?.click()}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-kraft hover:bg-kraft transition-colors text-xs font-medium"
        style={{ color:'#999' }}>
        <UploadSimple size={14} /> {label}
      </button>
    </>
  );
}

/* ── Per-element style card ── */
function ElemCard({ label, elKey, typo, onTypo, align, onAlign, defAlign }) {
  const [open, setOpen] = useState(false);
  const def = TYPO_DEFAULTS[elKey] || { size:14, family:'Archivo', weight:600 };
  const v   = typo || {};
  return (
    <div className="border border-kraft rounded-xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-white hover:bg-kraft/30 transition-colors">
        <span className="text-sm font-semibold" style={{ color:'#20336B' }}>{label}</span>
        <div className="flex items-center gap-2">
          <span style={{ fontFamily:(v.family||def.family)+',sans-serif', fontSize:11, color: v.color || '#888', fontWeight:600 }}>
            {v.size||def.size}px
          </span>
          <CaretDown size={11} weight="bold" style={{ transition:'transform .2s', transform:open?'rotate(180deg)':'none', color:'#ccc' }} />
        </div>
      </button>
      {open && (
        <div className="px-3 py-3 space-y-3 border-t border-kraft bg-white">
          <Field label="Police">
            <FontPicker value={v.family||def.family} onChange={f => onTypo({...v, family:f})} />
          </Field>
          <Field label={`Taille — ${v.size||def.size}px`}>
            <input type="range" min={7} max={100} value={v.size||def.size}
              onChange={e => onTypo({...v, size:+e.target.value})} className="w-full" />
          </Field>
          <Field label="Épaisseur">
            <div className="flex gap-1">
              {[[400,'Normal'],[600,'Semibold'],[700,'Gras'],[900,'Black']].map(([w,l]) => (
                <button key={w} onClick={() => onTypo({...v, weight:w})}
                  className="flex-1 py-1 rounded-lg border text-xs transition-colors"
                  style={{ fontWeight:w, background:(v.weight||def.weight)===w?'#20336B':'#fff', color:(v.weight||def.weight)===w?'#fff':'#555', borderColor:(v.weight||def.weight)===w?'#20336B':'#E7DCC4' }}>
                  {l}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Couleur">
            <div className="flex items-center gap-2">
              <input type="color" value={v.color||'#1B211E'} onChange={e => onTypo({...v, color:e.target.value})}
                className="w-9 h-9 rounded-lg cursor-pointer border border-kraft" />
              <span className="text-xs font-mono" style={{ color:'#aaa' }}>{v.color || '(thème auto)'}</span>
              {v.color && <button onClick={() => onTypo({...v, color:undefined})} className="text-xs px-2 py-1 rounded-lg border border-kraft hover:bg-kraft" style={{ color:'#888' }}>Auto</button>}
            </div>
          </Field>
          <Field label={`Espacement lettres — ${v.letterSpacing ?? 0}px`}>
            <input type="range" min={-5} max={20} value={v.letterSpacing ?? 0}
              onChange={e => onTypo({...v, letterSpacing:+e.target.value})} className="w-full" />
          </Field>
          {elKey !== 'categorie' && (
            <Field label={`Opacité — ${Math.round((v.opacity ?? 1) * 100)}%`}>
              <input type="range" min={10} max={100} value={Math.round((v.opacity ?? 1) * 100)}
                onChange={e => onTypo({...v, opacity:+e.target.value/100})} className="w-full" />
            </Field>
          )}
          <Field label="Casse">
            <div className="flex gap-1">
              {[['none','Aa'],['uppercase','AA'],['capitalize','Aa+']].map(([val,lbl]) => (
                <button key={val} onClick={() => onTypo({...v, textTransform:val})}
                  className="flex-1 py-1 rounded-lg border text-xs transition-colors"
                  style={{ background:(v.textTransform||'none')===val?'#20336B':'#fff', color:(v.textTransform||'none')===val?'#fff':'#555', borderColor:(v.textTransform||'none')===val?'#20336B':'#E7DCC4' }}>
                  {lbl}
                </button>
              ))}
            </div>
          </Field>
          {onAlign && (
            <Field label="Alignement">
              <AlignBtns value={align||defAlign||'left'} onChange={onAlign} />
            </Field>
          )}
          <button onClick={() => onTypo({})}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-kraft hover:bg-kraft transition-colors"
            style={{ color:'#888' }}>
            <ArrowCounterClockwise size={11} /> Réinitialiser
          </button>
        </div>
      )}
    </div>
  );
}

/* ══ MAIN EDITOR ══ */
const TRADE_COLORS = {
  primeur:     '#2F7A4D',
  boulangerie: '#C97B2A',
  fleuriste:   '#D4537E',
  boucherie:   '#A32D2D',
  fromager:    '#C9A227',
  services:    '#20336B',
};

const TRADE_DEFAULTS = {
  primeur:     { theme:'bio',          unite:'€/kg',      produit:'Fraises Gariguette', categorie:'Fruits',   origine:'France'    },
  boulangerie: { theme:'boulangerie',  unite:'€/pièce',   produit:'Pain de campagne',   categorie:'Pains',    origine:'France'    },
  fleuriste:   { theme:'fleuriste',    unite:'€/bouquet', produit:'Roses rouges',       categorie:'Fleurs',   origine:'Pays-Bas'  },
  boucherie:   { theme:'boucherie',    unite:'€/kg',      produit:'Côte de bœuf',       categorie:'Bœuf',     origine:'France'    },
  fromager:    { theme:'fromager',     unite:'€/100g',    produit:'Comté 24 mois',      categorie:'Fromages', origine:'France'    },
  services:    { theme:'prix-simple',  unite:'€/pièce',   produit:'Mon Produit',        categorie:'',         origine:'France'    },
};

export default function Editeur({ navigate }) {
  const { posters, setPosters, user } = useContext(AppContext);
  const ent = useEntitlements();
  const trade    = user?.trade || 'services';
  const tradeColor = TRADE_COLORS[trade] || '#20336B';
  const tradeInit  = TRADE_DEFAULTS[trade] || {};
  const [config, setConfig] = useState({ ...defaultConfig, ...tradeInit });
  const [tab, setTab]         = useState('contenu');
  const [saved, setSaved]     = useState(false);
  const [autoMsg, setAutoMsg] = useState('');
  const [selectedElems, setSelectedElems] = useState([]);
  const [flagSearch, setFlagSearch] = useState('');
  const isFirst = useRef(true);

  const set  = useCallback((k, v) => setConfig(p => ({...p, [k]:v})), []);
  // Just update elementAlign — AfficheCanvas measures actual element widths and
  // calls onPositionChange back with pixel-perfect positions.
  const setEA = (k, v) => setConfig(p => ({ ...p, elementAlign: { ...p.elementAlign, [k]: v } }));
  const setTypo = (k, v) => setConfig(p => ({...p, typo:{...p.typo,[k]:v}}));
  const setAP   = (k, v) => setConfig(p => ({...p, ancienPrixTypo:{...p.ancienPrixTypo,[k]:v}}));

  // Inject print styles
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'afych-print-style';
    style.textContent = `
      @media print {
        body > *:not(#afych-print-clone) { display: none !important; }
        #afych-print-clone {
          position: fixed !important;
          top: 0 !important; left: 0 !important;
          overflow: hidden !important;
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
      }
    `;
    document.head.appendChild(style);

    // Separate tag so handlePrint can update @page size per format
    const ps = document.createElement('style');
    ps.id = 'afych-page-size';
    ps.textContent = '@page { size: A4 portrait; margin: 0; }';
    document.head.appendChild(ps);

    return () => {
      document.getElementById('afych-print-style')?.remove();
      document.getElementById('afych-page-size')?.remove();
    };
  }, []);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    const t = setTimeout(() => { setAutoMsg('Sauvegardé'); setTimeout(() => setAutoMsg(''), 2000); }, 1400);
    return () => clearTimeout(t);
  }, [config]);

  const save = () => {
    const poster = {
      id: Date.now().toString(),
      name: config.posterName,
      category: config.posterCategory,
      theme: config.theme,
      produit: config.produit,
      categorie: config.categorie,
      prix: config.prixInt + ',' + config.prixCents,
      unite: config.unite,
      origine: config.origine,
      mention: config.mention,
      flagKey: config.originMode === 'flag' ? config.flagKey : '',
      createdAt: new Date().toLocaleDateString('fr-FR'),
    };
    setPosters(p => [...p, poster]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePrint = async () => {
    let sourceEl, natW, natH, pageMM;

    if (config.mode === 'affiche') {
      sourceEl = document.getElementById('afych-poster-inner');
      if (!sourceEl) return;
      // Natural canvas size (pixels) and real physical page
      const orientation = config.orientation || 'portrait';
      const fmtMM = FORMAT_MM[config.format] || FORMAT_MM.A4;
      pageMM = orientation === 'portrait'
        ? { w: fmtMM.w, h: fmtMM.h }
        : { w: fmtMM.h, h: fmtMM.w };
      natW = canvasW;
      natH = canvasH;
    } else {
      // Planche: always prints on A4, content = full paper (labels + margins)
      sourceEl = document.getElementById('afych-planche-inner');
      if (!sourceEl) return;
      pageMM = { w: 210, h: 297 };
      natW = sourceEl.offsetWidth  || paperNatW;
      natH = sourceEl.offsetHeight || paperNatH;
    }

    const pageWpx = mmToPx(pageMM.w);
    const pageHpx = mmToPx(pageMM.h);
    const scale = Math.min(pageWpx / natW, pageHpx / natH);

    // Update @page size to match the real format
    const pageStyle = document.getElementById('afych-page-size');
    if (pageStyle) pageStyle.textContent = `@page { size: ${pageMM.w}mm ${pageMM.h}mm; margin: 0; }`;

    const clone = sourceEl.cloneNode(true);
    clone.style.cssText = `
      width:${natW}px;height:${natH}px;
      transform:scale(${scale});transform-origin:top left;
      position:absolute;top:0;left:0;
    `;

    const container = document.createElement('div');
    container.id = 'afych-print-clone';
    container.style.cssText = `
      position:fixed;top:0;left:0;
      width:${pageWpx}px;height:${pageHpx}px;
      overflow:hidden;background:white;z-index:99999;
    `;
    container.appendChild(clone);
    document.body.appendChild(container);

    // Convert external flag images to data URLs so they print reliably
    const flagImgs = clone.querySelectorAll('img[src*="flagcdn.com"]');
    await Promise.all([...flagImgs].map(img => new Promise(resolve => {
      const toDataUrl = (src) => {
        fetch(src)
          .then(r => r.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onload = () => { img.src = reader.result; resolve(); };
            reader.onerror = resolve;
            reader.readAsDataURL(blob);
          })
          .catch(resolve);
      };
      if (img.complete && img.naturalWidth > 0) {
        toDataUrl(img.src);
      } else {
        img.onload = () => toDataUrl(img.src);
        img.onerror = resolve;
      }
    })));

    const afterPrint = () => {
      container.remove();
      window.removeEventListener('afterprint', afterPrint);
    };
    window.addEventListener('afterprint', afterPrint);
    window.print();
  };

  const fmt     = FORMAT_SIZES[config.format] || FORMAT_SIZES.A4;
  const canvasW = config.orientation === 'portrait' ? fmt.w : fmt.h;
  const canvasH = config.orientation === 'portrait' ? fmt.h : fmt.w;

  const handlePositionChange = useCallback((key, pos) => {
    setConfig(p => ({ ...p, elementPositions: { ...p.elementPositions, [key]: pos } }));
  }, []);

  const handleResize = useCallback((key, scale) => {
    setConfig(p => ({ ...p, elementScales: { ...p.elementScales, [key]: scale } }));
  }, []);

  const resetPositions = () => {
    setConfig(p => ({
      ...p,
      elementPositions: {},
      elementScales: {},
      elementAlign: { header:'left', prix:'center', unite:'center', origine:'left' },
    }));
    setSelectedElems([]);
  };

  const hasCustomPositions = Object.keys(config.elementPositions || {}).length > 0
    || Object.keys(config.elementScales || {}).length > 0;

  const previewCfg = {
    ...config,
    prix: config.prixInt + ',' + config.prixCents,
    flagKey: config.originMode === 'flag' ? config.flagKey : '',
    regionId: config.originMode === 'region' ? config.regionId : '',
    watermark: ent.hasWatermark ? ent.hasWatermark() : false,
  };

  /* ── CONTENU tab ── */
  const ContenuTab = () => (
    <>
      <Sec title="Produit">
        <Field label="Calibre">
          <Sel value={config.calibre} onChange={v => set('calibre',v)}
            options={CALIBRES.map(c => [c, c||'---'])} />
        </Field>
        <Field label="Catégorie"><TxtInput value={config.categorie} onChange={v => set('categorie',v)} /></Field>
        <Field label="Nom du produit"><TxtInput value={config.produit} onChange={v => set('produit',v)} /></Field>
        <Field label="Mention">
          <Sel value={config.mention} onChange={v => set('mention',v)}
            options={MENTIONS.map(m => [m, m||'Aucune'])} />
        </Field>
      </Sec>

      <Sec title="Prix">
        <Field label="Prix">
          <div className="flex items-center gap-1.5">
            <input type="number" value={config.prixInt} onChange={e => set('prixInt',e.target.value)} min={0}
              className="w-20 px-2 py-2 rounded-lg border border-kraft text-sm text-center outline-none font-mono" style={{ background:'#FAF7EF' }} />
            <span className="font-bold text-lg" style={{ color:'#20336B' }}>,</span>
            <input type="number" value={config.prixCents} onChange={e => set('prixCents',e.target.value)} min={0} max={99}
              className="w-14 px-2 py-2 rounded-lg border border-kraft text-sm text-center outline-none font-mono" style={{ background:'#FAF7EF' }} />
            <span className="font-bold" style={{ color:'#20336B' }}>€</span>
          </div>
        </Field>
        <Field label="Unité">
          <Sel value={config.unite} onChange={v => set('unite',v)} options={UNITS.map(u => [u,u])} />
        </Field>
        <Field label="Ancien prix (barré)">
          <div className="flex items-center gap-2">
            <TxtInput value={config.ancienPrix} onChange={v => set('ancienPrix',v)} placeholder="Ex: 3,90" />
            {config.ancienPrix && (
              <button onClick={() => set('ancienPrix','')} className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 hover:bg-red-50" style={{ color:'#D63B27' }}>
                <X size={13} weight="bold" />
              </button>
            )}
          </div>
        </Field>
      </Sec>

      <Sec title="Origine">
        <Field label="Texte d'origine"><TxtInput value={config.origine} onChange={v => set('origine',v)} /></Field>
        <Field label="Position">
          <Radio name="origPos" value={config.originePosition} onChange={v => set('originePosition',v)}
            options={[['bottom','Pied de page'],['top-right','Haut droite']]} />
        </Field>
        <Field label="Visuel">
          <Radio name="origMode" value={config.originMode} onChange={v => set('originMode',v)}
            options={[['none','Aucun'],['flag','Drapeau'],['region','Région FR']]} />
        </Field>
        {config.originMode === 'flag' && (() => {
          const entries = Object.entries(COUNTRIES);
          const filtered = flagSearch.trim()
            ? entries.filter(([,c]) => c.label.toLowerCase().includes(flagSearch.toLowerCase()))
            : entries;
          const selected = COUNTRIES[config.flagKey];
          return (
            <div className="pt-1 space-y-2">
              {selected && (
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background:'#EEF1FA', color:'#20336B' }}>
                  <img src={flagUrl(config.flagKey, 20)} alt={selected.label} style={{ width:20, height:'auto', borderRadius:2, flexShrink:0 }} />
                  {selected.label}
                </div>
              )}
              <input
                type="text"
                value={flagSearch}
                onChange={e => setFlagSearch(e.target.value)}
                placeholder="Rechercher un pays…"
                className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                style={{ borderColor:'#E7DCC4', background:'#FAF7EF' }}
              />
              <div className="flex flex-col gap-0.5 max-h-48 overflow-y-auto">
                {filtered.map(([k,c]) => (
                  <button key={k} onClick={() => { set('flagKey',k); setFlagSearch(''); }}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-left transition-all"
                    style={{ background: config.flagKey===k ? '#EEF1FA' : 'transparent', fontWeight: config.flagKey===k ? 700 : 400, color: config.flagKey===k ? '#20336B' : '#333' }}>
                    <img src={flagUrl(k, 20)} alt={c.label} style={{ width:20, height:'auto', borderRadius:2, flexShrink:0 }} />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
        {config.originMode === 'region' && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(regions||[]).map(r => (
              <button key={r.id} onClick={() => set('regionId',r.id)}
                className="px-2 py-1 rounded-full text-[11px] font-semibold border transition-all"
                style={{ background:config.regionId===r.id?r.color:'#fff', color:config.regionId===r.id?'#fff':'#444', borderColor:config.regionId===r.id?r.color:'#E7DCC4' }}>
                {r.name}
              </button>
            ))}
          </div>
        )}
      </Sec>

      <Sec title="Nom de l'affiche" open={false}>
        <Field label="Nom"><TxtInput value={config.posterName} onChange={v => set('posterName',v)} /></Field>
        <Field label="Catégorie d'espace"><TxtInput value={config.posterCategory} onChange={v => set('posterCategory',v)} placeholder="Ex: Fruits, Promo..." /></Field>
      </Sec>
    </>
  );

  /* ── STYLE tab ── */
  const StyleTab = () => (
    <>
      <Sec title="Thème">
        <div className="grid grid-cols-1 gap-1.5">
          {THEMES_LIST.map(th => (
            <button key={th.id} onClick={() => set('theme', th.id)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl border-2 transition-all text-left"
              style={{ borderColor:config.theme===th.id?'#20336B':'transparent', background: config.theme===th.id?'#EEF1FA':'#fff' }}>
              <div className="w-8 h-8 rounded-lg flex-shrink-0 border border-black/10" style={{ background:th.color }} />
              <span className="text-sm font-semibold" style={{ color:config.theme===th.id?'#20336B':'#333' }}>{th.label}</span>
              {config.theme===th.id && <CheckCircle size={16} weight="fill" style={{ color:'#20336B', marginLeft:'auto' }} />}
            </button>
          ))}
        </div>
      </Sec>


      <Sec title="Typographie">
        {ent.canCustomizeFonts && ent.canCustomizeFonts() ? (
          <div className="space-y-2">
            <ElemCard label="Catégorie"     elKey="categorie" typo={config.typo.categorie} onTypo={v=>setTypo('categorie',v)} align={config.elementAlign?.header}  onAlign={v=>setEA('header',v)}  defAlign="left"   />
            <ElemCard label="Produit"       elKey="produit"   typo={config.typo.produit}   onTypo={v=>setTypo('produit',v)}   align={config.elementAlign?.header}  onAlign={v=>setEA('header',v)}  defAlign="left"   />
            <ElemCard label="Prix"          elKey="prix"      typo={config.typo.prix}      onTypo={v=>setTypo('prix',v)}      align={config.elementAlign?.prix}    onAlign={v=>setEA('prix',v)}    defAlign="center" />
            <ElemCard label="Unité"         elKey="unite"     typo={config.typo.unite}     onTypo={v=>setTypo('unite',v)}     align={config.elementAlign?.unite}   onAlign={v=>setEA('unite',v)}   defAlign="center" />
            <ElemCard label="Origine"       elKey="origine"   typo={config.typo.origine}   onTypo={v=>setTypo('origine',v)}   align={config.elementAlign?.origine} onAlign={v=>setEA('origine',v)} defAlign="left"   />

            {/* Old price card */}
            {config.ancienPrix && (
              <div className="border border-kraft rounded-xl overflow-hidden">
                <div className="px-3 py-2 bg-white font-semibold text-sm" style={{ color:'#20336B' }}>Ancien prix (barré)</div>
                <div className="px-3 py-3 space-y-3 border-t border-kraft bg-white">
                  <Field label="Police">
                    <FontPicker value={config.ancienPrixTypo?.family||config.typo?.prix?.family||'Fredoka'} onChange={f => setAP('family',f)} />
                  </Field>
                  <Field label={`Taille — ${config.ancienPrixTypo?.size || Math.round((config.typo?.prix?.size||72)*0.42)}px`}>
                    <input type="range" min={10} max={80} value={config.ancienPrixTypo?.size || Math.round((config.typo?.prix?.size||72)*0.42)}
                      onChange={e => setAP('size', +e.target.value)} className="w-full" />
                  </Field>
                  <Field label="Couleur">
                    <div className="flex items-center gap-2">
                      <input type="color" value={config.ancienPrixTypo?.color||'#1B211E'} onChange={e => setAP('color',e.target.value)}
                        className="w-9 h-9 rounded-lg cursor-pointer border border-kraft" />
                      <span className="text-xs font-mono" style={{ color:'#aaa' }}>{config.ancienPrixTypo?.color||'(auto)'}</span>
                    </div>
                  </Field>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-start gap-2 p-3 rounded-xl border border-dashed border-kraft text-xs" style={{ color:'#888' }}>
            <Lock size={14} style={{ color:'#bbb', flexShrink:0, marginTop:1 }} />
            <span>Typographie avancée disponible en <button onClick={() => navigate('billing')} className="font-semibold underline" style={{ color:'#20336B' }}>Plan Pro</button></span>
          </div>
        )}
      </Sec>
    </>
  );

  /* ── MISE EN PAGE tab ── */
  const LayoutTab = () => (
    <>
      <Sec title="Format">
        <div className="flex gap-1 mb-2.5">
          {FORMATS.map(f => (
            <button key={f} onClick={() => set('format',f)}
              className="flex-1 py-1.5 text-xs rounded-lg border font-bold transition-colors"
              style={{ background:config.format===f?'#20336B':'#fff', color:config.format===f?'#fff':'#555', borderColor:config.format===f?'#20336B':'#E7DCC4' }}>
              {f}
            </button>
          ))}
        </div>
        <Radio name="orient" value={config.orientation} onChange={v => set('orientation',v)}
          options={[['portrait','Portrait'],['landscape','Paysage']]} />
      </Sec>

      <Sec title="Position des éléments">
        <Field label="En-tête (catégorie + produit)">
          <AlignBtns value={config.elementAlign?.header||'left'} onChange={v => setEA('header',v)} />
        </Field>
        <Field label="Bloc prix">
          <AlignBtns value={config.elementAlign?.prix||'center'} onChange={v => setEA('prix',v)} />
        </Field>
        <Field label="Position de l'unité">
          <Radio name="unitePos" value={config.unitePosition} onChange={v => set('unitePosition',v)}
            options={[['above-left','Haut gauche'],['below-right','Bas droite']]} />
        </Field>
        <Field label="Alignement origine">
          <AlignBtns value={config.elementAlign?.origine||'left'} onChange={v => setEA('origine',v)} />
        </Field>
      </Sec>

      {config.mode === 'planche' && (
        <Sec title="Planche d'étiquettes">
          <Field label="Disposition">
            <div className="grid grid-cols-2 gap-1.5">
              {[
                ['4x-a6','4× A6 / A4','2×2'],
                ['6x-a7','6× A7 / A4','2×3'],
                ['2x-a5','2× A5 / A4','1×2'],
                ['9x-a7','9× A7 / A4','3×3'],
              ].map(([id,label,grid]) => (
                <button key={id} onClick={() => set('plancheLayout',id)}
                  className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl border-2 text-center transition-all"
                  style={{ borderColor:config.plancheLayout===id?'#20336B':'#E7DCC4', background:config.plancheLayout===id?'#EEF1FA':'#fff' }}>
                  <span className="text-xs font-bold" style={{ color:config.plancheLayout===id?'#20336B':'#333', fontFamily:'Fredoka' }}>{grid}</span>
                  <span className="text-[10px]" style={{ color:'#888' }}>{label}</span>
                </button>
              ))}
            </div>
          </Field>
        </Sec>
      )}

      <Sec title="Logo" open={false}>
        <ImgUpload label="Uploader votre logo" value={config.logoUrl} onChange={v => set('logoUrl',v)} onRemove={() => set('logoUrl','')} />
        {config.logoUrl && (
          <>
            <Field label="Position">
              <Radio name="logoPos" value={config.logoPosition} onChange={v => set('logoPosition',v)}
                options={[['top-right','Haut D'],['top-left','Haut G'],['bottom-right','Bas D'],['bottom-left','Bas G'],['bottom-center','Bas Centre']]} />
            </Field>
            <Field label={`Taille — ${config.logoSize}px`}>
              <input type="range" min={24} max={120} value={config.logoSize} onChange={e => set('logoSize',+e.target.value)} className="w-full" />
            </Field>
          </>
        )}
      </Sec>

      <Sec title="Photo de fond" open={false}>
        <ImgUpload label="Uploader une photo" value={config.photoUrl} onChange={v => set('photoUrl',v)} onRemove={() => set('photoUrl','')} />
        {config.photoUrl && (
          <Field label={`Opacité — ${Math.round(config.photoOpacity*100)}%`}>
            <input type="range" min={20} max={100} value={Math.round(config.photoOpacity*100)} onChange={e => set('photoOpacity',+e.target.value/100)} className="w-full" />
          </Field>
        )}
      </Sec>
    </>
  );

  const scaledW = canvasW;
  const scaledH = canvasH;

  // Planche canvas rendering
  const PAPER_MARGIN = 24; // white margin around cells on the paper
  const pl = PLANCHE_LAYOUTS[config.plancheLayout] || PLANCHE_LAYOUTS['4x-a6'];
  const subFmt = FORMAT_SIZES[pl.fmt] || FORMAT_SIZES.A6;
  // Each cell: render affiche at full A4 (340×480) then scale down to cell size
  const CELL_BASE_W = 340, CELL_BASE_H = 480;
  const cellScale = Math.min(subFmt.w / CELL_BASE_W, subFmt.h / CELL_BASE_H);
  const cellW = Math.round(CELL_BASE_W * cellScale);
  const cellH = Math.round(CELL_BASE_H * cellScale);
  // Paper natural dimensions (includes margins)
  const paperNatW = pl.cols * cellW + PAPER_MARGIN * 2;
  const paperNatH = pl.rows * cellH + PAPER_MARGIN * 2;
  const plancheScale = Math.min(560 / paperNatW, 500 / paperNatH, 1);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background:'#D9D5CE', fontFamily:'Archivo' }}>

      {/* ══ LEFT PANEL ══ */}
      <div className="w-96 bg-white border-r border-kraft flex flex-col overflow-hidden flex-shrink-0" style={{ boxShadow:'2px 0 12px rgba(0,0,0,0.08)' }}>

        {/* Header */}
        <div className="px-4 py-3 border-b flex items-center gap-2 flex-shrink-0" style={{ background: tradeColor, borderColor: tradeColor }}>
          <button onClick={() => navigate('espace')} className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition-opacity" style={{ color:'rgba(255,255,255,0.9)' }}>
            <ArrowLeft size={16} weight="bold" /> 
          </button>
          <span style={{ fontFamily:'Fredoka', fontSize:20, color:'#fff', marginLeft:4 }}>Éditeur</span>
          <div className="flex ml-auto rounded-xl overflow-hidden border text-xs" style={{ borderColor:'rgba(255,255,255,0.3)' }}>
            {['affiche','planche'].map(m => (
              <button key={m} onClick={() => set('mode',m)}
                className="px-3 py-1.5 font-semibold capitalize transition-colors"
                style={{ background:config.mode===m?'rgba(255,255,255,0.25)':'transparent', color:'#fff' }}>
                {m === 'affiche' ? 'Affiche' : 'Planche'}
              </button>
            ))}
          </div>
        </div>

        <Tabs value={tab} onChange={setTab} accent={tradeColor} />

        {/* Scrollable content — call as functions (not JSX) to avoid remount on every render */}
        <div className="flex-1 overflow-y-auto p-3">
          {tab === 'contenu'  && ContenuTab()}
          {tab === 'style'    && StyleTab()}
          {tab === 'layout'   && LayoutTab()}
        </div>
      </div>

      {/* ══ RIGHT: preview ══ */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="bg-white border-b border-kraft px-5 py-2.5 flex items-center gap-2.5 flex-shrink-0">
          <input type="text" value={config.posterName} onChange={e => set('posterName',e.target.value)}
            className="font-bold text-base border-b border-transparent hover:border-kraft focus:border-indigo-300 outline-none bg-transparent min-w-0"
            style={{ color:'#20336B', fontFamily:'Fredoka', maxWidth:220 }} />
          <input type="text" value={config.posterCategory} onChange={e => set('posterCategory',e.target.value)}
            placeholder="Catégorie..."
            className="text-xs border border-kraft rounded-lg px-2.5 py-1.5 outline-none"
            style={{ background:'#FAF7EF', color:'#666', width:130 }} />
          <div className="flex-1" />
          {autoMsg && (
            <span className="flex items-center gap-1 text-xs font-semibold" style={{ color:'#2F7A4D' }}>
              <CheckCircle size={13} weight="fill" /> {autoMsg}
            </span>
          )}
          <button onClick={save}
            className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-xl font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: saved ? '#2F7A4D' : tradeColor }}>
            <FloppyDisk size={14} weight="bold" />
            {saved ? 'Sauvegardé !' : 'Sauvegarder'}
          </button>
          <button onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-xl font-bold border-2 transition-colors hover:bg-kraft"
            style={{ borderColor: tradeColor, color: tradeColor }}>
            <Printer size={14} weight="bold" /> Imprimer
          </button>
          {hasCustomPositions && (
            <button onClick={resetPositions}
              className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl font-semibold border transition-colors hover:bg-red-50"
              style={{ borderColor:'#e5b0b0', color:'#c0392b' }}
              title="Réinitialiser les positions des éléments">
              <ArrowCounterClockwise size={13} weight="bold" /> Reset
            </button>
          )}
        </div>

        {/* Canvas area */}
        <div className="flex-1 overflow-auto flex flex-col items-center justify-center" style={{ background:'#D9D5CE' }} onClick={() => setSelectedElems([])}>

          {config.mode === 'affiche' ? (
            <>
              {/* Poster — no border-radius, no outer shadow */}
              <div style={{
                width: scaledW, height: scaledH,
                borderRadius: 0,
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'width 0.2s, height 0.2s',
              }}>
                {/* Inner div at natural size, scaled via CSS transform */}
                <div id="afych-poster-inner" style={{ width: canvasW, height: canvasH }} onClick={e => e.stopPropagation()}>
                  <AfficheCanvas config={previewCfg} onPositionChange={handlePositionChange} onResize={handleResize} onSelect={setSelectedElems} selectedIds={selectedElems} />
                </div>
              </div>
            </>
          ) : (
            /* ── PLANCHE MODE ── */
            <div style={{
              background: '#fff',
              boxShadow: '0 8px 40px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.10)',
              width: Math.round(paperNatW * plancheScale),
              height: Math.round(paperNatH * plancheScale),
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
            }}>
              {/* Scaled inner paper — includes margin */}
              <div id="afych-planche-inner" style={{
                transform: `scale(${plancheScale})`,
                transformOrigin: 'top left',
                width: paperNatW,
                height: paperNatH,
                background: '#fff',
                position: 'relative',
                padding: PAPER_MARGIN,
                boxSizing: 'border-box',
              }}>
                {/* Grid of cells */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${pl.cols},${cellW}px)`,
                  gridTemplateRows: `repeat(${pl.rows},${cellH}px)`,
                  width: pl.cols * cellW,
                  height: pl.rows * cellH,
                }}>
                  {Array.from({length: pl.cols * pl.rows}).map((_, i) => {
                    const col = i % pl.cols;
                    const row = Math.floor(i / pl.cols);
                    const isLastCol = col === pl.cols - 1;
                    const isLastRow = row === pl.rows - 1;
                    return (
                      <div key={i} style={{
                        width: cellW, height: cellH,
                        overflow: 'hidden',
                        position: 'relative',
                        boxSizing: 'border-box',
                      }}>
                        {/* Affiche rendered at natural size then CSS-scaled to cell */}
                        <div style={{ width: CELL_BASE_W, height: CELL_BASE_H, transform:`scale(${cellScale})`, transformOrigin:'top left' }}>
                          <AffichePreview config={previewCfg} />
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          )}

          {/* Format info */}
          <div className="mt-4 text-center flex-shrink-0 flex items-center justify-center gap-3">
            <span className="text-[11px] font-medium" style={{ color:'rgba(27,33,30,0.55)', fontFamily:'Archivo', letterSpacing:'0.02em' }}>
              {config.format} {config.orientation === 'portrait' ? 'Portrait' : 'Paysage'} · {canvasW}×{canvasH}px
            </span>
          </div>
        </div>
      </div>

      {/* ══ INSPECTOR PANEL ══ */}
      {false && (() => {
        const ELEM_LABEL = { header:'En-tête', prix:'Prix', ancienPrix:'Ancien prix', unite:'Unité', mention:'Mention', origine:'Origine', logo:'Logo' };
        const ALIGN_KEYS = { header:'header', prix:'prix', unite:'unite', origine:'origine' };
        const elKey    = selectedElem === 'ancienPrix' ? null : selectedElem; // typo key
        const isLogo   = selectedElem === 'logo';
        const typoVal  = elKey && !isLogo ? (config.typo[elKey] || {}) : {};
        const defaults = TYPO_DEFAULTS[elKey] || {};
        const curSize  = typoVal.size  ?? defaults.size  ?? 16;
        const curFont  = typoVal.family ?? defaults.family ?? 'Archivo';
        const curColor = typoVal.color  ?? null;
        const curPos   = config.elementPositions[selectedElem] || ELEM_DEFAULTS[selectedElem] || { x:5, y:5 };
        const curScale = config.elementScales[selectedElem] ?? 1;
        const alignKey = ALIGN_KEYS[selectedElem];
        const curAlign = alignKey ? (config.elementAlign?.[alignKey] || 'left') : null;

        const updateTypo = (k, v) => {
          if (!elKey || isLogo) return;
          setConfig(p => ({ ...p, typo: { ...p.typo, [elKey]: { ...p.typo[elKey], [k]: v } } }));
        };
        const isPro = ent.canCustomizeFonts?.() || ent.plan !== 'free';

        return (
          <div className="flex-shrink-0 bg-white border-l border-kraft flex flex-col overflow-hidden"
            style={{ width: 240, boxShadow: '-2px 0 12px rgba(0,0,0,0.07)' }}>

            {/* Header */}
            <div className="px-4 py-3 border-b border-kraft flex items-center justify-between flex-shrink-0"
              style={{ background: tradeColor }}>
              <span className="text-sm font-bold text-white" style={{ fontFamily:'Fredoka' }}>
                {ELEM_LABEL[selectedElem] || selectedElem}
              </span>
              <button onClick={() => setSelectedElem(null)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors">
                <X size={14} color="white" weight="bold" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4">

              {/* Position */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color:'#999' }}>Position</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[10px] mb-1" style={{ color:'#888' }}>X %</div>
                    <input type="number" min={0} max={95} step={0.5}
                      value={Math.round(curPos.x * 10) / 10}
                      onChange={e => handlePositionChange(selectedElem, { x: +e.target.value, y: curPos.y })}
                      className="w-full px-2 py-1.5 rounded-lg border border-kraft text-sm outline-none"
                      style={{ background:'#FAF7EF' }} />
                  </div>
                  <div>
                    <div className="text-[10px] mb-1" style={{ color:'#888' }}>Y %</div>
                    <input type="number" min={0} max={95} step={0.5}
                      value={Math.round(curPos.y * 10) / 10}
                      onChange={e => handlePositionChange(selectedElem, { x: curPos.x, y: +e.target.value })}
                      className="w-full px-2 py-1.5 rounded-lg border border-kraft text-sm outline-none"
                      style={{ background:'#FAF7EF' }} />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-[10px] mb-1" style={{ color:'#888' }}>Échelle — {Math.round(curScale * 100)}%</div>
                  <input type="range" min={20} max={400} step={1}
                    value={Math.round(curScale * 100)}
                    onChange={e => handleResize(selectedElem, +e.target.value / 100)}
                    className="w-full" />
                </div>
              </div>

              {/* Alignment */}
              {curAlign && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color:'#999' }}>Alignement</div>
                  <div className="flex gap-1">
                    {[['left', TextAlignLeft], ['center', TextAlignCenter], ['right', TextAlignRight]].map(([v, Icon]) => (
                      <button key={v} onClick={() => setEA(alignKey, v)}
                        className="flex-1 flex items-center justify-center py-1.5 rounded-lg border transition-colors"
                        style={{ background: curAlign===v ? tradeColor : '#fff', borderColor: curAlign===v ? tradeColor : '#E7DCC4', color: curAlign===v ? '#fff' : '#888' }}>
                        <Icon size={13} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Typography — only for text elements */}
              {elKey && !isLogo && (
                <>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color:'#999' }}>Taille</div>
                    <div className="flex items-center gap-2">
                      <input type="range" min={8} max={160} step={1}
                        value={curSize}
                        onChange={e => updateTypo('size', +e.target.value)}
                        className="flex-1" />
                      <span className="text-xs font-semibold w-8 text-right" style={{ color:'#444' }}>{curSize}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color:'#999' }}>Police</div>
                      {!isPro && <span className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background:'#FFF3CD', color:'#C97B2A' }}><Lock size={8} weight="bold" />Pro</span>}
                    </div>
                    {isPro ? (
                      <select value={curFont} onChange={e => updateTypo('family', e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-kraft text-sm outline-none"
                        style={{ background:'#FAF7EF', fontFamily: curFont }}>
                        {FONTS.map(f => (
                          <option key={f.name} value={f.name} style={{ fontFamily: f.name }}>{f.label}</option>
                        ))}
                      </select>
                    ) : (
                      <button onClick={() => navigate('billing')}
                        className="w-full text-xs py-2 rounded-xl border-2 border-dashed font-semibold transition-colors hover:bg-kraft"
                        style={{ borderColor:'#C97B2A', color:'#C97B2A' }}>
                        Passer à Pro pour débloquer
                      </button>
                    )}
                  </div>

                  {/* Color — Pro only */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color:'#999' }}>Couleur</div>
                      {!isPro && <span className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background:'#FFF3CD', color:'#C97B2A' }}><Lock size={8} weight="bold" />Pro</span>}
                    </div>
                    {isPro ? (
                      <div className="flex items-center gap-2">
                        <input type="color"
                          value={curColor || (elKey === 'prix' ? '#20336B' : '#1B211E')}
                          onChange={e => updateTypo('color', e.target.value)}
                          className="w-10 h-8 rounded-lg border border-kraft cursor-pointer p-0.5" />
                        {curColor && (
                          <button onClick={() => updateTypo('color', undefined)}
                            className="text-[10px] px-2 py-1 rounded-lg border border-kraft hover:bg-kraft transition-colors"
                            style={{ color:'#888' }}>
                            Réinitialiser
                          </button>
                        )}
                      </div>
                    ) : (
                      <button onClick={() => navigate('billing')}
                        className="w-full text-xs py-2 rounded-xl border-2 border-dashed font-semibold transition-colors hover:bg-kraft"
                        style={{ borderColor:'#C97B2A', color:'#C97B2A' }}>
                        Passer à Pro pour débloquer
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })()}

      {/* Hidden print area */}
      <div id="afych-print-root" style={{ display:'none' }}>
        {config.mode === 'affiche' ? (
          <div style={{ width: canvasW + 'px', height: canvasH + 'px' }}>
            <AffichePreview config={previewCfg} />
          </div>
        ) : (
          (() => {
            const pl2 = PLANCHE_LAYOUTS[config.plancheLayout] || PLANCHE_LAYOUTS['4x-a6'];
            const subFmt2 = FORMAT_SIZES[pl2.fmt] || FORMAT_SIZES.A6;
            return (
              <div style={{ width:(pl2.cols*subFmt2.w)+'px', height:(pl2.rows*subFmt2.h)+'px', display:'grid', gridTemplateColumns:`repeat(${pl2.cols},${subFmt2.w}px)`, gridTemplateRows:`repeat(${pl2.rows},${subFmt2.h}px)` }}>
                {Array.from({length:pl2.cols*pl2.rows}).map((_,i) => (
                  <div key={i} style={{ width:subFmt2.w, height:subFmt2.h, overflow:'hidden' }}>
                    <AffichePreview config={{...previewCfg, format:pl2.fmt}} />
                  </div>
                ))}
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
