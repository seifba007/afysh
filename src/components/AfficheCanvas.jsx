import React, { useRef, useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { COUNTRIES, flagUrl } from '../data/flags.js';
import { regions } from '../data/regions.js';

const THEMES = {
  'promo':         { bg:'#C8251A', grad:'linear-gradient(150deg,#7a0a0a 0%,#D63B27 55%,#f26242 100%)', text:'#fff', price:'#FFE566', priceStrike:'rgba(255,255,255,0.55)', overlay:'linear-gradient(to bottom,rgba(0,0,0,0.50) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.60) 100%)' },
  'prix-simple':   { bg:'#FAF7EF', grad:'linear-gradient(150deg,#EDE8DC 0%,#FAF7EF 100%)', text:'#1B211E', price:'#20336B', priceStrike:'rgba(27,33,30,0.40)', overlay:null },
  'ardoise':       { bg:'#1B211E', grad:'linear-gradient(150deg,#080D0B 0%,#1B211E 55%,#2e3d38 100%)', text:'#FAF7EF', price:'#FFD700', priceStrike:'rgba(255,255,255,0.45)', overlay:'linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.60) 100%)' },
  'bio':           { bg:'#1E5C35', grad:'linear-gradient(150deg,#0b2e1a 0%,#2F7A4D 55%,#4db870 100%)', text:'#fff', price:'#D8FFAA', priceStrike:'rgba(255,255,255,0.50)', overlay:'linear-gradient(to bottom,rgba(0,0,0,0.40) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.55) 100%)' },
  'origine-france':{ bg:'#16234A', grad:'linear-gradient(150deg,#070f24 0%,#20336B 55%,#3e5daa 100%)', text:'#fff', price:'#FFD700', priceStrike:'rgba(255,255,255,0.50)', overlay:'linear-gradient(to bottom,rgba(0,0,0,0.40) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.55) 100%)' },
  'boulangerie':   { bg:'#3D1F00', grad:'linear-gradient(150deg,#1a0a00 0%,#C97B2A 55%,#e8a555 100%)', text:'#fff', price:'#FFE8B0', priceStrike:'rgba(255,255,255,0.50)', overlay:'linear-gradient(to bottom,rgba(0,0,0,0.40) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.55) 100%)' },
  'fleuriste':     { bg:'#4A0D28', grad:'linear-gradient(150deg,#2a0617 0%,#D4537E 55%,#f07aab 100%)', text:'#fff', price:'#FFD6E8', priceStrike:'rgba(255,255,255,0.50)', overlay:'linear-gradient(to bottom,rgba(0,0,0,0.40) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.55) 100%)' },
  'boucherie':     { bg:'#1A0000', grad:'linear-gradient(150deg,#0d0000 0%,#A32D2D 55%,#c95050 100%)', text:'#fff', price:'#FFE0A0', priceStrike:'rgba(255,255,255,0.50)', overlay:'linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.60) 100%)' },
  'fromager':      { bg:'#2E2000', grad:'linear-gradient(150deg,#150e00 0%,#C9A227 55%,#e8c250 100%)', text:'#fff', price:'#FFF5C0', priceStrike:'rgba(255,255,255,0.50)', overlay:'linear-gradient(to bottom,rgba(0,0,0,0.40) 0%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.55) 100%)' },
};

const TYPO_DEFAULTS = {
  categorie: { size:12, family:'Archivo', weight:600 },
  produit:   { size:32, family:'Fredoka', weight:700 },
  prix:      { size:72, family:'Fredoka', weight:700 },
  unite:     { size:13, family:'Archivo', weight:600 },
  origine:   { size:12, family:'Archivo', weight:600 },
};

const MENTION_COLORS = { Promo:'#D63B27', Bio:'#2F7A4D', Nouveau:'#4C77CE', Local:'#C9A227' };
const TS = '0 1px 5px rgba(0,0,0,0.65)';

export const ELEM_DEFAULTS = {
  categorie:  { x:5,  y:5   },
  header:     { x:5,  y:11  },
  prix:       { x:5,  y:44  },
  ancienPrix: { x:5,  y:36  },
  unite:      { x:5,  y:62  },
  mention:    { x:5,  y:1.5 },
  origine:    { x:5,  y:88  },
  logo:       { x:76, y:2  },
};

const ELEM_LABELS = {
  categorie:'Catégorie', header:'Produit', prix:'Prix', ancienPrix:'Ancien prix',
  unite:'Unité', mention:'Mention', origine:'Origine', logo:'Logo',
};

const SNAP_X = [0, 25, 50, 75, 100];
const SNAP_Y = [0, 25, 33, 50, 66, 75, 100];
const SNAP_T = 2.5;

function snapVal(v, guides) {
  for (const g of guides) if (Math.abs(v - g) < SNAP_T) return g;
  return v;
}

function splitPrix(val) {
  const s = String(val || '0').replace('.', ',');
  const [i, c='00'] = s.split(',');
  return { int: i || '0', cents: (c+'00').slice(0,2) };
}

// Resize handle positions and their cursor + scale direction
const HANDLES = [
  { id:'tl', cursor:'nw-resize', x:-5, y:-5, dx:-1, dy:-1 },
  { id:'tc', cursor:'n-resize',  x:'50%', y:-5, dx:0,  dy:-1, mx:true },
  { id:'tr', cursor:'ne-resize', x:null, y:-5, right:-5, dx:1,  dy:-1 },
  { id:'ml', cursor:'w-resize',  x:-5, y:'50%', dx:-1, dy:0,  my:true },
  { id:'mr', cursor:'e-resize',  x:null, y:'50%', right:-5, dx:1,  dy:0,  my:true },
  { id:'bl', cursor:'sw-resize', x:-5, y:null, bottom:-5, dx:-1, dy:1  },
  { id:'bc', cursor:'s-resize',  x:'50%', y:null, bottom:-5, dx:0,  dy:1,  mx:true },
  { id:'br', cursor:'se-resize', x:null, y:null, right:-5, bottom:-5, dx:1,  dy:1  },
];

function DragEl({ id, children, canvasRef, positions, onMove, scales, onResize, editable, hidden, onNatSize, onSelect, selectedIds }) {
  const [hovered, setHovered]   = useState(false);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [guides, setGuides]     = useState(null);
  const [natSize, setNatSize]   = useState({ w: 0, h: 0 });
  const innerRef  = useRef(null);
  const moveRef   = useRef(null);
  const resizeRef = useRef(null);
  const isSelected = selectedIds?.includes(id);

  // Measure natural (pre-transform) size after every render — offsetWidth ignores CSS transform
  useLayoutEffect(() => {
    if (innerRef.current) {
      const w = innerRef.current.offsetWidth;
      const h = innerRef.current.offsetHeight;
      if (w !== natSize.w || h !== natSize.h) {
        setNatSize({ w, h });
        onNatSize?.(id, w, h);
      }
    }
  });

  if (hidden) return null;

  const pos   = positions?.[id] || ELEM_DEFAULTS[id] || { x:0, y:0 };
  const scale = scales?.[id] ?? 1;
  const show  = editable && (isSelected || hovered || dragging || resizing);

  /* ── DRAG TO MOVE ── */
  const onMouseDown = (e) => {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    const rect = canvasRef.current.getBoundingClientRect();
    const startX = e.clientX, startY = e.clientY;

    // Snapshot starting positions of ALL selected elements right now (avoids stale closure)
    const isGroup = selectedIds && selectedIds.length > 1 && selectedIds.includes(id);
    const groupStarts = {};
    if (isGroup) {
      selectedIds.forEach(sid => {
        groupStarts[sid] = positions[sid] || ELEM_DEFAULTS[sid] || { x:0, y:0 };
      });
    }

    moveRef.current = { mx:e.clientX, my:e.clientY, px:pos.x, py:pos.y, cw:rect.width, ch:rect.height };
    let moved = false;
    setDragging(true);
    // If already part of a group selection, keep group; otherwise select just this element
    if (!isGroup) onSelect?.([id]);

    const onMove_ = (e) => {
      if (!moved && (Math.abs(e.clientX - startX) > 3 || Math.abs(e.clientY - startY) > 3)) moved = true;
      if (!moved) return;
      const s = moveRef.current;
      const rawX = s.px + (e.clientX - s.mx) / s.cw * 100;
      const rawY = s.py + (e.clientY - s.my) / s.ch * 100;
      const sx = snapVal(rawX, SNAP_X), sy = snapVal(rawY, SNAP_Y);
      const g = [];
      if (sx !== rawX) g.push({ axis:'x', val:sx });
      if (sy !== rawY) g.push({ axis:'y', val:sy });
      setGuides(g.length ? g : null);

      if (isGroup) {
        // Move all selected elements using their snapshotted start positions + current delta
        const dx = sx - s.px;
        const dy = sy - s.py;
        Object.entries(groupStarts).forEach(([sid, sp]) => {
          onMove(sid, { x: Math.max(0, Math.min(95, sp.x + dx)), y: Math.max(0, Math.min(95, sp.y + dy)) });
        });
      } else {
        onMove(id, { x: Math.max(0, Math.min(95, sx)), y: Math.max(0, Math.min(95, sy)) });
      }
    };
    const onUp = () => {
      setDragging(false); setGuides(null);
      window.removeEventListener('mousemove', onMove_);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove_);
    window.addEventListener('mouseup', onUp);
  };

  /* ── RESIZE ── */
  const onResizeDown = (handle, e) => {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    const inner = innerRef.current;
    if (!inner || !canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();

    // naturalW/H = layout size (transform:scale doesn't affect offsetWidth)
    const natW = inner.offsetWidth;
    const natH = inner.offsetHeight;
    const visW = natW * scale;
    const visH = natH * scale;

    resizeRef.current = {
      mx: e.clientX, my: e.clientY,
      scale, natW, natH, visW, visH,
      cw: canvasRect.width, ch: canvasRect.height,
      px: pos.x, py: pos.y,
      handle,
    };
    setResizing(true);

    const onMove_ = (e) => {
      const s = resizeRef.current;
      const dx = (e.clientX - s.mx);
      const dy = (e.clientY - s.my);

      // Determine scale delta based on handle direction
      let dw = dx * s.handle.dx;  // positive = growing
      let dh = dy * s.handle.dy;

      // Uniform scale for corners; single-axis for edges
      let newScale;
      const isCorner = s.handle.dx !== 0 && s.handle.dy !== 0;
      if (isCorner) {
        const diag = (dw + dh) / 2;
        const ref  = (s.visW + s.visH) / 2;
        newScale = Math.max(0.15, Math.min(8, s.scale + diag / ref));
      } else if (s.handle.dy === 0) {
        // horizontal edge — scale by width
        newScale = Math.max(0.15, Math.min(8, s.scale + dw / s.visW));
      } else {
        // vertical edge — scale by height
        newScale = Math.max(0.15, Math.min(8, s.scale + dh / s.visH));
      }

      // Adjust position so the opposite corner stays fixed
      const newVisW = s.natW * newScale;
      const newVisH = s.natH * newScale;
      let newPx = s.px, newPy = s.py;
      if (s.handle.dx === -1) newPx = s.px + (s.visW - newVisW) / s.cw * 100;
      if (s.handle.dy === -1) newPy = s.py + (s.visH - newVisH) / s.ch * 100;

      onResize(id, newScale);
      if (newPx !== s.px || newPy !== s.py) {
        onMove(id, { x: Math.max(0, Math.min(95, newPx)), y: Math.max(0, Math.min(95, newPy)) });
      }
    };
    const onUp = () => {
      setResizing(false);
      window.removeEventListener('mousemove', onMove_);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove_);
    window.addEventListener('mouseup', onUp);
  };

  const handleStyle = (h) => {
    const s = {
      position:'absolute', width:8, height:8,
      background:'#fff', border:'2px solid #0D99FF',
      borderRadius: (h.mx || h.my) ? '50%' : 2,
      cursor: h.cursor, zIndex:202, pointerEvents:'all',
    };
    // corners: offset outside the box by -4px
    if (h.x      !== null && h.x      !== undefined && !h.mx) s.left   = h.x;
    if (h.y      !== null && h.y      !== undefined && !h.my) s.top    = h.y;
    if (h.right  !== undefined) s.right  = h.right;
    if (h.bottom !== undefined) s.bottom = h.bottom;
    // edge midpoints: center on each side
    if (h.mx) { s.left = '50%'; s.marginLeft = -4; s.top = h.y !== null ? h.y : undefined; }
    if (h.my) { s.top  = '50%'; s.marginTop  = -4; s.left = h.x !== null ? h.x : undefined; }
    return s;
  };

  return (
    <>
      {/* Snap guides */}
      {(dragging || resizing) && guides && guides.map((g, i) => (
        <div key={i} style={{
          position:'absolute', zIndex:200, pointerEvents:'none',
          ...(g.axis === 'x'
            ? { left:`${g.val}%`, top:0, width:1, height:'100%', background:'#0D99FF' }
            : { top:`${g.val}%`, left:0, height:1, width:'100%', background:'#0D99FF' }),
        }} />
      ))}

      {/* Outer wrapper sized to the VISUAL (scaled) dimensions so handles sit at real corners */}
      <div
        onMouseDown={onMouseDown}
        onClick={e => e.stopPropagation()}
        onMouseEnter={() => editable && setHovered(true)}
        onMouseLeave={() => { if (!dragging && !resizing) setHovered(false); }}
        style={{
          position:'absolute',
          left:`${pos.x}%`, top:`${pos.y}%`,
          width:  natSize.w ? natSize.w * scale : 'auto',
          height: natSize.h ? natSize.h * scale : 'auto',
          overflow: 'visible',
          cursor: !editable ? 'default' : dragging ? 'grabbing' : 'grab',
          userSelect:'none',
          zIndex: (dragging || resizing) ? 100 : 10,
        }}
      >
        {/* Selection outline */}
        {show && (
          <div style={{
            position:'absolute', inset:-4,
            border: isSelected ? '2px solid #FF6B00' : '1.5px solid #0D99FF',
            borderRadius:2, pointerEvents:'none', zIndex:201,
          }} />
        )}

        {/* Label */}
        {show && (
          <div style={{
            position:'absolute', top:-22, left:0,
            background:'#0D99FF', color:'#fff',
            fontSize:9, fontFamily:'Archivo', fontWeight:600,
            padding:'2px 6px', borderRadius:3,
            whiteSpace:'nowrap', pointerEvents:'none', zIndex:203,
          }}>
            {ELEM_LABELS[id] || id}
            {scale !== 1 && ` · ${Math.round(scale * 100)}%`}
          </div>
        )}

        {/* Resize handles — positioned at corners/edges of the scaled visual box */}
        {show && HANDLES.map(h => (
          <div key={h.id} style={handleStyle(h)} onMouseDown={(e) => onResizeDown(h, e)} />
        ))}

        {/* Inner content, scaled from top-left */}
        <div
          ref={innerRef}
          style={{
            transform: scale !== 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'top left',
            display: 'inline-block',
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default function AfficheCanvas({ config, onPositionChange, onResize, editable = true, onSelect, selectedIds = [] }) {
  const cfg = config || {};
  const canvasRef = useRef(null);
  const [marquee, setMarquee] = useState(null); // {x,y,w,h} in % while dragging

  const theme          = cfg.theme          || 'prix-simple';
  const produit        = cfg.produit        || 'Mon Produit';
  const categorie      = cfg.categorie      || 'Catégorie';
  const calibre        = cfg.calibre        || '';
  const prix           = cfg.prix           || '2,50';
  const unite          = cfg.unite          || '€/kg';
  const ancienPrix     = cfg.ancienPrix     || '';
  const origine        = cfg.origine        || '';
  const mention        = cfg.mention        || '';
  const originMode     = cfg.originMode     || 'none';
  const flagKey        = cfg.flagKey        || '';
  const regionId       = cfg.regionId       || '';
  const typo           = cfg.typo           || {};
  const ancienPrixTypo = cfg.ancienPrixTypo || {};
  const logoUrl        = cfg.logoUrl        || '';
  const logoSize       = cfg.logoSize       || 60;
  const photoUrl       = cfg.photoUrl       || '';
  const photoOpacity   = cfg.photoOpacity   != null ? cfg.photoOpacity : 0.82;
  const watermark      = cfg.watermark      || false;
  const bgAccent       = cfg.bgAccent       != null ? cfg.bgAccent : true;
  const bgAccentColor  = cfg.bgAccentColor  || '#20336B';
  const positions      = cfg.elementPositions || {};
  const scales         = cfg.elementScales    || {};
  const elementAlign   = cfg.elementAlign     || {};

  const hAlign  = elementAlign.header  || 'left';
  const pAlign  = elementAlign.prix    || 'center';
  const uAlign  = elementAlign.unite   || 'center';
  const oAlign  = elementAlign.origine || 'left';

  const th           = THEMES[theme] || THEMES['prix-simple'];
  const hasPhoto     = !!photoUrl;
  const isDark       = theme !== 'prix-simple';
  const isPrixSimple = theme === 'prix-simple';
  const needShadow   = hasPhoto || isDark;

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
  const region = regionId ? (regions||[]).find(r => r.id === regionId) : null;

  const prixColor = isPrixSimple && !hasPhoto
    ? (typo.prix?.color || bgAccentColor)
    : pt.prix.color;

  const onMove = useCallback((key, pos) => onPositionChange?.(key, pos), [onPositionChange]);
  const onRes  = useCallback((key, scale) => onResize?.(key, scale), [onResize]);

  // Store each element's measured natural size so we can compute true center/right positions
  const elemSizesRef = useRef({});
  const onNatSize = useCallback((id, w, h) => { elemSizesRef.current[id] = { w, h }; }, []);

  // When alignment changes, compute pixel-perfect x position based on actual rendered width
  const prevAlignRef = useRef({});
  useEffect(() => {
    if (!canvasRef.current || !onPositionChange) return;
    const canvasW = canvasRef.current.offsetWidth;
    const MARGIN  = 14; // px from edge

    // map each element id → its current alignment value (unite excluded — dragged independently)
    const alignMap = { categorie: hAlign, header: hAlign, prix: pAlign, unite: uAlign, origine: oAlign };

    Object.entries(alignMap).forEach(([id, align]) => {
      if (prevAlignRef.current[id] === align) return; // no change this render
      const size  = elemSizesRef.current[id];
      if (!size || !size.w) return;
      const visW  = size.w * (scales[id] ?? 1);
      const curPos = positions[id] || ELEM_DEFAULTS[id] || { x: 4, y: 30 };

      let newX;
      if (align === 'left')   newX = MARGIN / canvasW * 100;
      if (align === 'center') newX = Math.max(0, (canvasW - visW) / 2 / canvasW * 100);
      if (align === 'right')  newX = Math.max(0, (canvasW - visW - MARGIN) / canvasW * 100);

      if (newX != null) onPositionChange(id, { ...curPos, x: newX });
    });

    prevAlignRef.current = { ...alignMap };
  }, [hAlign, pAlign, uAlign, oAlign]);

  const OriginBadge = () => {
    if (originMode === 'flag' && flagKey && COUNTRIES?.[flagKey])
      return <img src={flagUrl(flagKey, 20)} alt={COUNTRIES[flagKey].label} style={{width:20,height:'auto',borderRadius:2,flexShrink:0,boxShadow:'0 0 0 1px rgba(0,0,0,0.15)'}} />;
    if (originMode === 'region' && region)
      return <span style={{display:'inline-block',background:region.color,color:'#fff',fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:99,flexShrink:0}}>{region.name}</span>;
    return null;
  };

  const dragProps = { canvasRef, positions, onMove, scales, onResize: onRes, editable, onNatSize, onSelect, selectedIds };

  const rootBg = isPrixSimple && !hasPhoto ? '#FAF7EF' : hasPhoto ? '#000' : th.grad;

  /* ── Canvas marquee selection ── */
  const onCanvasMouseDown = (e) => {
    if (!editable) return;
    // Ignore clicks that originated inside a DragEl (they stopPropagation on onClick)
    // so anything reaching here is background/overlay — treat as canvas background click
    const rect = canvasRef.current.getBoundingClientRect();
    const startX = (e.clientX - rect.left) / rect.width * 100;
    const startY = (e.clientY - rect.top)  / rect.height * 100;
    let moved = false;

    setMarquee({ x: startX, y: startY, w: 0, h: 0 });

    const onMove = (ev) => {
      const cx = (ev.clientX - rect.left) / rect.width * 100;
      const cy = (ev.clientY - rect.top)  / rect.height * 100;
      if (!moved && (Math.abs(cx - startX) > 1 || Math.abs(cy - startY) > 1)) moved = true;
      setMarquee({
        x: Math.min(startX, cx), y: Math.min(startY, cy),
        w: Math.abs(cx - startX), h: Math.abs(cy - startY),
      });
    };
    const onUp = (ev) => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      setMarquee(null);
      if (!moved) {
        onSelect?.([]);
        return;
      }
      // Find elements whose bounding box overlaps the marquee rect
      const cx = (ev.clientX - rect.left) / rect.width * 100;
      const cy = (ev.clientY - rect.top)  / rect.height * 100;
      const rx = Math.min(startX, cx), ry = Math.min(startY, cy);
      const rw = Math.abs(cx - startX),  rh = Math.abs(cy - startY);
      const cw = rect.width, ch = rect.height;
      const all = ['categorie','header','prix','ancienPrix','unite','mention','origine','logo'];
      const hits = all.filter(id => {
        const p = positions[id] || ELEM_DEFAULTS[id];
        if (!p) return false;
        // Convert element size from px to % using canvas dimensions
        const sz = elemSizesRef.current[id];
        const ew = sz ? (sz.w / cw * 100) : 10;
        const eh = sz ? (sz.h / ch * 100) : 5;
        // AABB overlap: marquee [rx,rx+rw] x [ry,ry+rh] vs element [p.x,p.x+ew] x [p.y,p.y+eh]
        return p.x < rx + rw && p.x + ew > rx && p.y < ry + rh && p.y + eh > ry;
      });
      onSelect?.(hits.length ? hits : []);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <div
      ref={canvasRef}
      onMouseDown={onCanvasMouseDown}
      style={{ width:'100%', height:'100%', position:'relative', overflow:'hidden', background:rootBg, fontFamily:'Archivo,sans-serif', cursor: editable ? 'default' : 'default' }}
    >
      {/* Background photo */}
      {hasPhoto && (
        <img src={photoUrl} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:photoOpacity,zIndex:0,pointerEvents:'none'}} />
      )}

      {/* Dark overlay */}
      {needShadow && (th.overlay || hasPhoto) && (
        <div style={{position:'absolute',inset:0,zIndex:1,pointerEvents:'none',
          background:hasPhoto ? 'linear-gradient(to bottom,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.06) 42%,rgba(0,0,0,0.68) 100%)' : (th.overlay||'none')
        }} />
      )}

      {/* ── MENTION ── */}
      {mention && (
        <DragEl id="mention" {...dragProps}>
          <span style={{display:'inline-block',background:MENTION_COLORS[mention]||'#C9A227',color:'#fff',fontSize:9,fontWeight:800,padding:'2px 8px',borderRadius:99,textTransform:'uppercase',letterSpacing:'0.08em',boxShadow:'0 1px 4px rgba(0,0,0,0.3)'}}>
            {mention}
          </span>
        </DragEl>
      )}

      {/* ── CATÉGORIE ── */}
      <DragEl id="categorie" {...dragProps}>
        <div style={{
          fontSize:pt.categorie.size, fontFamily:pt.categorie.family, fontWeight:pt.categorie.weight,
          color:pt.categorie.color,
          textTransform:pt.categorie.textTransform!=='none'?pt.categorie.textTransform:'uppercase',
          letterSpacing:pt.categorie.letterSpacing!=null?pt.categorie.letterSpacing+'px':'0.09em',
          opacity:pt.categorie.opacity*0.82, textShadow:needShadow?TS:'none',
          textAlign:hAlign,
        }}>
          {categorie}
        </div>
      </DragEl>

      {/* ── PRODUIT ── */}
      <DragEl id="header" {...dragProps}>
        <div style={{
          fontSize:pt.produit.size, fontFamily:pt.produit.family, fontWeight:pt.produit.weight,
          color:pt.produit.color,
          letterSpacing:pt.produit.letterSpacing!=null?pt.produit.letterSpacing+'px':undefined,
          opacity:pt.produit.opacity, textTransform:pt.produit.textTransform, lineHeight:1.05,
          textShadow:needShadow?TS:'none',
          textAlign:hAlign,
        }}>
          {produit}
        </div>
      </DragEl>

      {/* ── ANCIEN PRIX ── */}
      {ancienPrix && (
        <DragEl id="ancienPrix" {...dragProps}>
          <div style={{display:'flex',alignItems:'flex-start',lineHeight:1,opacity:0.55,textDecoration:'line-through',textDecorationColor:th.priceStrike,textDecorationThickness:2,textShadow:needShadow?TS:'none'}}>
            <span style={{fontSize:apSize,fontFamily:apFamily,color:apColor,fontWeight:700}}>{oldInt}</span>
            <span style={{fontSize:apSize*0.58,fontFamily:apFamily,color:apColor,fontWeight:700,paddingTop:apSize*0.06}}>,{oldCents}€</span>
          </div>
        </DragEl>
      )}

      {/* ── PRIX ── */}
      <DragEl id="prix" {...dragProps}>
        <div style={{display:'flex',alignItems:'flex-start',lineHeight:1}}>
          <span style={{
            fontSize:pt.prix.size, fontFamily:pt.prix.family, fontWeight:pt.prix.weight,
            color:prixColor,
            letterSpacing:pt.prix.letterSpacing!=null?pt.prix.letterSpacing+'px':'-0.02em',
            opacity:pt.prix.opacity, textTransform:pt.prix.textTransform, lineHeight:0.88,
            textShadow:needShadow?'0 2px 10px rgba(0,0,0,0.55)':'none',
          }}>{prixInt}</span>
          <span style={{
            fontSize:pt.prix.size*0.37, fontFamily:pt.prix.family, fontWeight:pt.prix.weight,
            color:prixColor, paddingTop:pt.prix.size*0.055, lineHeight:1, opacity:pt.prix.opacity,
            textShadow:needShadow?'0 2px 10px rgba(0,0,0,0.55)':'none',
          }}>,{prixCents}€</span>
        </div>
      </DragEl>

      {/* ── UNITE ── */}
      <DragEl id="unite" {...dragProps}>
        <div style={{
          fontSize:pt.unite.size, fontFamily:pt.unite.family, fontWeight:pt.unite.weight,
          color:pt.unite.color, opacity:0.75, textShadow:needShadow?TS:'none',
          textAlign: pAlign,
        }}>
          {unite}
        </div>
      </DragEl>

      {/* ── ORIGINE ── */}
      {(origine || originMode !== 'none') && (
        <DragEl id="origine" {...dragProps}>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <OriginBadge />
            {origine && (
              <span style={{
                fontSize:pt.origine.size, fontFamily:pt.origine.family, fontWeight:pt.origine.weight,
                color:pt.origine.color, opacity:0.88, textShadow:needShadow?TS:'none',
              }}>
                {origine}
              </span>
            )}
          </div>
        </DragEl>
      )}

      {/* ── LOGO ── */}
      {logoUrl && (
        <DragEl id="logo" {...dragProps}>
          <img
            src={logoUrl} alt="logo"
            style={{ width:logoSize, height:logoSize, objectFit:'contain', borderRadius:6, display:'block' }}
          />
        </DragEl>
      )}

      {watermark && (
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none',zIndex:30,transform:'rotate(-30deg)'}}>
          <div style={{fontSize:22,fontFamily:'Fredoka',color:isDark?'rgba(255,255,255,0.15)':'rgba(32,51,107,0.12)',fontWeight:700,whiteSpace:'nowrap',userSelect:'none'}}>AFYCH — VERSION GRATUITE</div>
        </div>
      )}

      {/* Marquee selection rectangle */}
      {marquee && marquee.w > 0.5 && (
        <div style={{
          position:'absolute', pointerEvents:'none', zIndex:500,
          left:`${marquee.x}%`, top:`${marquee.y}%`,
          width:`${marquee.w}%`, height:`${marquee.h}%`,
          border:'1.5px dashed #0D99FF',
          background:'rgba(13,153,255,0.08)',
        }} />
      )}
    </div>
  );
}
