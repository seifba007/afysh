import React from 'react';
import { flagUrl, flagLabels } from '../data/flags.js';
import { regions } from '../data/regions.js';

const THEMES = {
  'promo': {
    bg: '#C8251A', grad: 'linear-gradient(150deg,#7a0a0a 0%,#D63B27 55%,#f26242 100%)',
    text: '#fff', price: '#FFE566', priceStrike: 'rgba(255,255,255,0.55)',
    overlay: 'linear-gradient(to bottom,rgba(0,0,0,0.50) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.60) 100%)',
  },
  'prix-simple': {
    bg: '#FAF7EF', grad: 'linear-gradient(150deg,#EDE8DC 0%,#FAF7EF 100%)',
    text: '#1B211E', price: '#20336B', priceStrike: 'rgba(27,33,30,0.40)',
    overlay: null,
  },
  'ardoise': {
    bg: '#1B211E', grad: 'linear-gradient(150deg,#080D0B 0%,#1B211E 55%,#2e3d38 100%)',
    text: '#FAF7EF', price: '#FFD700', priceStrike: 'rgba(255,255,255,0.45)',
    overlay: 'linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.60) 100%)',
  },
  'bio': {
    bg: '#1E5C35', grad: 'linear-gradient(150deg,#0b2e1a 0%,#2F7A4D 55%,#4db870 100%)',
    text: '#fff', price: '#D8FFAA', priceStrike: 'rgba(255,255,255,0.50)',
    overlay: 'linear-gradient(to bottom,rgba(0,0,0,0.40) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.55) 100%)',
  },
  'origine-france': {
    bg: '#16234A', grad: 'linear-gradient(150deg,#070f24 0%,#20336B 55%,#3e5daa 100%)',
    text: '#fff', price: '#FFD700', priceStrike: 'rgba(255,255,255,0.50)',
    overlay: 'linear-gradient(to bottom,rgba(0,0,0,0.40) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.55) 100%)',
  },
  'boulangerie': {
    bg: '#3D1F00', grad: 'linear-gradient(150deg,#1a0a00 0%,#C97B2A 55%,#e8a555 100%)',
    text: '#fff', price: '#FFE8B0', priceStrike: 'rgba(255,255,255,0.50)',
    overlay: 'linear-gradient(to bottom,rgba(0,0,0,0.40) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.55) 100%)',
  },
  'fleuriste': {
    bg: '#4A0D28', grad: 'linear-gradient(150deg,#2a0617 0%,#D4537E 55%,#f07aab 100%)',
    text: '#fff', price: '#FFD6E8', priceStrike: 'rgba(255,255,255,0.50)',
    overlay: 'linear-gradient(to bottom,rgba(0,0,0,0.40) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.55) 100%)',
  },
  'boucherie': {
    bg: '#1A0000', grad: 'linear-gradient(150deg,#0d0000 0%,#A32D2D 55%,#c95050 100%)',
    text: '#fff', price: '#FFE0A0', priceStrike: 'rgba(255,255,255,0.50)',
    overlay: 'linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.60) 100%)',
  },
  'fromager': {
    bg: '#2E2000', grad: 'linear-gradient(150deg,#150e00 0%,#C9A227 55%,#e8c250 100%)',
    text: '#fff', price: '#FFF5C0', priceStrike: 'rgba(255,255,255,0.50)',
    overlay: 'linear-gradient(to bottom,rgba(0,0,0,0.40) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.55) 100%)',
  },
};

export const TYPO_DEFAULTS = {
  categorie: { size: 12,  family: 'Archivo',  weight: 600 },
  produit:   { size: 32,  family: 'Fredoka',  weight: 700 },
  prix:      { size: 72,  family: 'Fredoka',  weight: 700 },
  unite:     { size: 13,  family: 'Archivo',  weight: 600 },
  origine:   { size: 12,  family: 'Archivo',  weight: 600 },
};

const MENTION_COLORS = { Promo:'#D63B27', Bio:'#2F7A4D', Nouveau:'#4C77CE', Local:'#C9A227' };
const ALIGN_MAP = { left:'flex-start', center:'center', right:'flex-end' };
const TS = '0 1px 5px rgba(0,0,0,0.65)';

function splitPrix(val) {
  const s = String(val || '0').replace('.', ',');
  const [i, c='00'] = s.split(',');
  return { int: i || '0', cents: (c+'00').slice(0,2) };
}

export default function AffichePreview({ config }) {
  const cfg = config || {};
  const theme           = cfg.theme           || 'prix-simple';
  const produit         = cfg.produit         || 'Mon Produit';
  const categorie       = cfg.categorie       || 'Catégorie';
  const calibre         = cfg.calibre         || '';
  const prix            = cfg.prix            || '2,50';
  const unite           = cfg.unite           || '€/kg';
  const ancienPrix      = cfg.ancienPrix      || '';
  const origine         = cfg.origine         || 'France';
  const mention         = cfg.mention         || '';
  const originMode      = cfg.originMode      || 'none';
  const flagKey         = cfg.flagKey         || '';
  const regionId        = cfg.regionId        || '';
  const originePosition = cfg.originePosition || 'bottom';
  const unitePosition   = cfg.unitePosition   || 'below-right';
  const elementAlign    = cfg.elementAlign    || {};
  const typo            = cfg.typo            || {};
  const ancienPrixTypo  = cfg.ancienPrixTypo  || {};
  const logoUrl         = cfg.logoUrl         || '';
  const logoPosition    = cfg.logoPosition    || 'top-right';
  const logoSize        = cfg.logoSize        || 60;
  const photoUrl        = cfg.photoUrl        || '';
  const photoOpacity    = cfg.photoOpacity    != null ? cfg.photoOpacity : 0.82;
  const watermark       = cfg.watermark       || false;
  const bgAccent        = cfg.bgAccent        != null ? cfg.bgAccent : true;
  const bgAccentColor   = cfg.bgAccentColor   || '#20336B';
  const bandeauStyle    = cfg.bandeauStyle    || 'vague';

  const th       = THEMES[theme] || THEMES['prix-simple'];
  const hasPhoto = !!photoUrl;
  const isDark   = theme !== 'prix-simple';
  const isPrixSimple = theme === 'prix-simple';

  const get = (key) => ({
    size:          typo[key]?.size          ?? TYPO_DEFAULTS[key].size,
    family:        typo[key]?.family        ?? TYPO_DEFAULTS[key].family,
    weight:        typo[key]?.weight        ?? TYPO_DEFAULTS[key].weight,
    color:         typo[key]?.color         ?? (key === 'prix' ? th.price : th.text),
    letterSpacing: typo[key]?.letterSpacing ?? undefined,
    opacity:       typo[key]?.opacity       ?? 1,
    textTransform: typo[key]?.textTransform ?? 'none',
  });
  const pt = { categorie:get('categorie'), produit:get('produit'), prix:get('prix'), unite:get('unite'), origine:get('origine') };

  const apSize   = ancienPrixTypo.size   || pt.prix.size * 0.42;
  const apFamily = ancienPrixTypo.family || pt.prix.family;
  const apColor  = ancienPrixTypo.color  || th.text;

  const { int:prixInt,  cents:prixCents  } = splitPrix(prix);
  const { int:oldInt,   cents:oldCents   } = splitPrix(ancienPrix);

  const region    = regionId ? (regions||[]).find(r => r.id === regionId) : null;
  const hJust     = ALIGN_MAP[elementAlign.header  || 'left'];
  const pJust     = ALIGN_MAP[elementAlign.prix    || 'center'];
  const oJust     = ALIGN_MAP[elementAlign.origine || 'left'];
  const tAlign    = elementAlign.header || 'left';
  const needShadow = hasPhoto || isDark;

  const OriginBadge = () => {
    if (originMode === 'flag' && flagKey && flagUrl(flagKey)) {
      return <img src={flagUrl(flagKey, 20)} alt={flagLabels[flagKey]||flagKey} style={{width:24,height:'auto',borderRadius:2,flexShrink:0,boxShadow:'0 0 0 1px rgba(0,0,0,0.2)'}} />;
    }
    if (originMode === 'region' && region) {
      return <span style={{display:'inline-block',background:region.color,color:'#fff',fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:99,flexShrink:0}}>{region.name}</span>;
    }
    return null;
  };

  const LogoImg = ({ pos, style={} }) => logoUrl && logoPosition === pos
    ? <img src={logoUrl} alt="logo" style={{objectFit:'contain',borderRadius:6,...style}} />
    : null;

  /* ─────────────────────────────────────────────────────────────
     PRIX-SIMPLE without photo AND bgAccent=true → banded layout
     ───────────────────────────────────────────────────────────── */
  if (isPrixSimple && !hasPhoto && bgAccent) {
    const accentBg = bgAccent ? bgAccentColor : '#20336B';
    const prixColor = typo.prix?.color || accentBg;
    const headerTextColor = '#fff';

    return (
      <div style={{width:'100%',height:'100%',position:'relative',overflow:'hidden',background:'#FAF7EF',fontFamily:'Archivo,sans-serif',display:'flex',flexDirection:'column'}}>

        {/* TOP HEADER BAND */}
        <div style={{
          background: accentBg,
          padding: '10px 14px 12px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: hJust,
          position: 'relative',
        }}>
          {/* Logo top-left inside header */}
          <LogoImg pos="top-left" style={{position:'absolute',top:8,left:10,width:logoSize*0.6,height:logoSize*0.6}} />
          {/* Logo top-right inside header */}
          <LogoImg pos="top-right" style={{position:'absolute',top:8,right:10,width:logoSize*0.6,height:logoSize*0.6}} />

          {mention && (
            <span style={{display:'inline-block',background:MENTION_COLORS[mention]||'#C9A227',color:'#fff',fontSize:9,fontWeight:800,padding:'2px 8px',borderRadius:99,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:5,boxShadow:'0 1px 4px rgba(0,0,0,0.3)'}}>{mention}</span>
          )}
          <div style={{
            fontSize: pt.categorie.size,
            fontFamily: pt.categorie.family,
            fontWeight: pt.categorie.weight,
            color: 'rgba(255,255,255,0.72)',
            textTransform: pt.categorie.textTransform !== 'none' ? pt.categorie.textTransform : 'uppercase',
            letterSpacing: pt.categorie.letterSpacing != null ? pt.categorie.letterSpacing+'px' : '0.12em',
            opacity: pt.categorie.opacity,
            marginBottom: 3,
            textAlign: tAlign,
            paddingLeft: logoUrl&&logoPosition==='top-left' ? logoSize*0.6+12 : 0,
            paddingRight: logoUrl&&logoPosition==='top-right' ? logoSize*0.6+12 : 0,
          }}>
            {categorie}{calibre ? ' · ' + calibre : ''}
          </div>
          <div style={{
            fontSize: pt.produit.size,
            fontFamily: pt.produit.family,
            fontWeight: pt.produit.weight,
            color: headerTextColor,
            letterSpacing: pt.produit.letterSpacing != null ? pt.produit.letterSpacing+'px' : '-0.01em',
            opacity: pt.produit.opacity,
            textTransform: pt.produit.textTransform,
            lineHeight: 1.05,
            textAlign: tAlign,
            paddingLeft: logoUrl&&logoPosition==='top-left' ? logoSize*0.6+12 : 0,
            paddingRight: logoUrl&&logoPosition==='top-right' ? logoSize*0.6+12 : 0,
          }}>
            {produit}
          </div>
          {/* Chevron / wave bottom decoration */}
          <svg viewBox="0 0 100 12" preserveAspectRatio="none" style={{position:'absolute',bottom:-1,left:0,right:0,width:'100%',height:12,display:'block'}}>
            <path d="M0,0 Q25,12 50,6 Q75,0 100,8 L100,12 L0,12 Z" fill="#FAF7EF" />
          </svg>
        </div>

        {/* PRICE BODY */}
        <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:pJust,justifyContent:'center',padding:'8px 14px',position:'relative'}}>

          {originePosition === 'top-right' && (origine || originMode !== 'none') && (
            <div style={{position:'absolute',top:6,right:10,display:'flex',alignItems:'center',gap:5}}>
              <OriginBadge />
              {origine && <span style={{fontSize:pt.origine.size-1,fontFamily:pt.origine.family,color:pt.origine.color,fontWeight:pt.origine.weight,opacity:0.72}}>{origine}</span>}
            </div>
          )}

          {ancienPrix && (
            <div style={{display:'flex',alignItems:'flex-start',lineHeight:1,marginBottom:4,opacity:0.55,textDecoration:'line-through',textDecorationColor:th.priceStrike,textDecorationThickness:2}}>
              <span style={{fontSize:apSize,fontFamily:apFamily,color:apColor,fontWeight:700}}>{oldInt}</span>
              <span style={{fontSize:apSize*0.58,fontFamily:apFamily,color:apColor,fontWeight:700,paddingTop:apSize*0.06}}>,{oldCents}€</span>
            </div>
          )}

          {unitePosition === 'above-left' && (
            <div style={{alignSelf:'flex-start',fontSize:pt.unite.size,fontFamily:pt.unite.family,color:pt.unite.color,fontWeight:pt.unite.weight,opacity:0.72,marginBottom:2}}>{unite}</div>
          )}

          <div style={{display:'flex',alignItems:'flex-start',lineHeight:1}}>
            <span style={{
              fontSize: pt.prix.size,
              fontFamily: pt.prix.family,
              color: prixColor,
              fontWeight: pt.prix.weight,
              letterSpacing: pt.prix.letterSpacing != null ? pt.prix.letterSpacing+'px' : '-0.02em',
              opacity: pt.prix.opacity,
              textTransform: pt.prix.textTransform,
              lineHeight: 0.88,
            }}>{prixInt}</span>
            <span style={{
              fontSize: pt.prix.size * 0.37,
              fontFamily: pt.prix.family,
              color: prixColor,
              fontWeight: pt.prix.weight,
              paddingTop: pt.prix.size * 0.055,
              lineHeight: 1,
              opacity: pt.prix.opacity,
            }}>,{prixCents}€</span>
          </div>

          {unitePosition === 'below-right' && (
            <div style={{alignSelf:'flex-end',fontSize:pt.unite.size,fontFamily:pt.unite.family,color:pt.unite.color,fontWeight:pt.unite.weight,opacity:0.65,marginTop:3}}>{unite}</div>
          )}
        </div>

        {/* FOOTER — bar only shown when originePosition==='bottom', content always shown if origine/flag set */}
        {(originePosition === 'bottom' || originePosition === 'none') && (origine || originMode !== 'none' || logoUrl) && (
          <div style={{
            borderTop: originePosition === 'bottom' ? '1px solid rgba(0,0,0,0.08)' : 'none',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: oJust,
            gap: 6,
            flexShrink: 0,
            background: originePosition === 'bottom' ? 'rgba(0,0,0,0.03)' : 'transparent',
          }}>
            <LogoImg pos="bottom-left" style={{width:Math.min(logoSize,36),height:Math.min(logoSize,36),marginRight:'auto'}} />
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <OriginBadge />
              {origine && <span style={{fontSize:pt.origine.size,fontFamily:pt.origine.family,color:pt.origine.color,fontWeight:pt.origine.weight,opacity:0.80}}>{origine}</span>}
            </div>
            <LogoImg pos="bottom-right"  style={{width:Math.min(logoSize,36),height:Math.min(logoSize,36),marginLeft:'auto'}} />
            <LogoImg pos="bottom-center" style={{width:Math.min(logoSize,36),height:Math.min(logoSize,36)}} />
          </div>
        )}

        {watermark && (
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none',zIndex:30,transform:'rotate(-30deg)'}}>
            <div style={{fontSize:22,fontFamily:'Fredoka',color:'rgba(32,51,107,0.12)',fontWeight:700,whiteSpace:'nowrap',userSelect:'none'}}>AFYCH — VERSION GRATUITE</div>
          </div>
        )}
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     ALL OTHER THEMES (or prix-simple WITH photo)
     → full-bleed gradient/photo with floating text overlay
     ───────────────────────────────────────────────────────────── */
  return (
    <div style={{width:'100%',height:'100%',position:'relative',overflow:'hidden',borderRadius:0,background:hasPhoto?'#000':th.grad,fontFamily:'Archivo,sans-serif'}}>

      {hasPhoto && <img src={photoUrl} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',opacity:photoOpacity,zIndex:0}} />}

      {needShadow && (th.overlay || hasPhoto) && (
        <div style={{position:'absolute',inset:0,zIndex:1,background:hasPhoto?'linear-gradient(to bottom,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.06) 42%,rgba(0,0,0,0.68) 100%)':(th.overlay||'none')}} />
      )}

      <LogoImg pos="top-right" style={{position:'absolute',top:12,right:14,zIndex:10,width:logoSize,height:logoSize}} />
      <LogoImg pos="top-left"  style={{position:'absolute',top:12,left:14,zIndex:10,width:logoSize,height:logoSize}} />

      <div style={{position:'absolute',inset:0,zIndex:5,display:'flex',flexDirection:'column',padding:'14px 16px 12px'}}>

        {/* HEADER */}
        <div style={{flex:'0 0 auto',display:'flex',flexDirection:'column',alignItems:hJust}}>
          {mention && <span style={{display:'inline-block',background:MENTION_COLORS[mention]||'#C9A227',color:'#fff',fontSize:9,fontWeight:800,padding:'2px 8px',borderRadius:99,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6,boxShadow:'0 1px 4px rgba(0,0,0,0.3)'}}>{mention}</span>}

          <div style={{
            fontSize:pt.categorie.size,fontFamily:pt.categorie.family,color:pt.categorie.color,fontWeight:pt.categorie.weight,
            textTransform:pt.categorie.textTransform!=='none'?pt.categorie.textTransform:'uppercase',
            letterSpacing:pt.categorie.letterSpacing!=null?pt.categorie.letterSpacing+'px':'0.09em',
            opacity:pt.categorie.opacity*0.82,textShadow:needShadow?TS:'none',marginBottom:2,textAlign:tAlign,
          }}>
            {categorie}{calibre ? ' — ' + calibre : ''}
          </div>

          <div style={{
            fontSize:pt.produit.size,fontFamily:pt.produit.family,color:pt.produit.color,fontWeight:pt.produit.weight,
            letterSpacing:pt.produit.letterSpacing!=null?pt.produit.letterSpacing+'px':undefined,
            opacity:pt.produit.opacity,textTransform:pt.produit.textTransform,lineHeight:1.05,
            textShadow:needShadow?TS:'none',
            paddingRight:logoUrl&&logoPosition==='top-right'?logoSize+10:0,
            paddingLeft:logoUrl&&logoPosition==='top-left'?logoSize+10:0,
            textAlign:tAlign,
          }}>
            {produit}
          </div>

          {originePosition === 'top-right' && (origine || originMode !== 'none') && (
            <div style={{display:'flex',alignItems:'center',alignSelf:'flex-end',gap:6,marginTop:5}}>
              <OriginBadge />
              {origine && <span style={{fontSize:pt.origine.size,fontFamily:pt.origine.family,color:pt.origine.color,fontWeight:pt.origine.weight,opacity:0.88,textShadow:needShadow?TS:'none'}}>{origine}</span>}
            </div>
          )}
        </div>

        {/* PRICE */}
        <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:pJust,justifyContent:'center'}}>
          {ancienPrix && (
            <div style={{display:'flex',alignItems:'flex-start',lineHeight:1,marginBottom:4,opacity:0.68,textDecoration:'line-through',textDecorationColor:th.priceStrike,textDecorationThickness:2,textShadow:needShadow?TS:'none'}}>
              <span style={{fontSize:apSize,fontFamily:apFamily,color:apColor,fontWeight:700}}>{oldInt}</span>
              <span style={{fontSize:apSize*0.58,fontFamily:apFamily,color:apColor,fontWeight:700,paddingTop:apSize*0.06}}>,{oldCents}€</span>
            </div>
          )}
          {unitePosition === 'above-left' && (
            <div style={{alignSelf:'flex-start',fontSize:pt.unite.size,fontFamily:pt.unite.family,color:pt.unite.color,fontWeight:pt.unite.weight,marginBottom:2,opacity:0.88,textShadow:needShadow?TS:'none'}}>{unite}</div>
          )}
          <div style={{display:'flex',alignItems:'flex-start',lineHeight:1}}>
            <span style={{fontSize:pt.prix.size,fontFamily:pt.prix.family,color:pt.prix.color,fontWeight:pt.prix.weight,letterSpacing:pt.prix.letterSpacing!=null?pt.prix.letterSpacing+'px':undefined,opacity:pt.prix.opacity,textTransform:pt.prix.textTransform,lineHeight:0.88,textShadow:needShadow?'0 2px 10px rgba(0,0,0,0.55)':'none'}}>{prixInt}</span>
            <span style={{fontSize:pt.prix.size*0.37,fontFamily:pt.prix.family,color:pt.prix.color,fontWeight:pt.prix.weight,paddingTop:pt.prix.size*0.055,lineHeight:1,opacity:pt.prix.opacity,textShadow:needShadow?'0 2px 10px rgba(0,0,0,0.55)':'none'}}>,{prixCents}€</span>
          </div>
          {unitePosition === 'below-right' && (
            <div style={{alignSelf:'flex-end',fontSize:pt.unite.size,fontFamily:pt.unite.family,color:pt.unite.color,fontWeight:pt.unite.weight,marginTop:4,opacity:0.88,textShadow:needShadow?TS:'none'}}>{unite}</div>
          )}
        </div>

        {/* FOOTER — bar hidden when originePosition==='none', content still shown */}
        {(originePosition === 'bottom' || originePosition === 'none') && (origine || originMode !== 'none' || logoUrl) && (
          <div style={{flex:'0 0 auto',display:'flex',alignItems:'center',justifyContent:oJust,gap:8,paddingTop: originePosition === 'bottom' ? 4 : 0}}>
            <LogoImg pos="bottom-left" style={{width:Math.min(logoSize,44),height:Math.min(logoSize,44),marginRight:'auto'}} />
            <div style={{display:'flex',alignItems:'center',gap:7}}>
              <OriginBadge />
              {origine && <span style={{fontSize:pt.origine.size,fontFamily:pt.origine.family,color:pt.origine.color,fontWeight:pt.origine.weight,opacity:0.92,textShadow:needShadow?TS:'none'}}>Origine : {origine}</span>}
            </div>
            <LogoImg pos="bottom-right"  style={{width:Math.min(logoSize,44),height:Math.min(logoSize,44),marginLeft:'auto'}} />
            <LogoImg pos="bottom-center" style={{width:Math.min(logoSize,44),height:Math.min(logoSize,44)}} />
          </div>
        )}
      </div>

      {watermark && (
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none',zIndex:30}}>
          <div style={{transform:'rotate(-30deg)',fontSize:22,fontFamily:'Fredoka',color:'rgba(255,255,255,0.15)',fontWeight:700,whiteSpace:'nowrap',userSelect:'none'}}>AFYCH — VERSION GRATUITE</div>
        </div>
      )}
    </div>
  );
}
