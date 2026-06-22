import React, { useState, useEffect, useRef } from 'react';
import Logo from '../components/Logo.jsx';
import {
  Leaf, Grains, Flower, Knife, Package, Wrench,
  Lightning, PaintBrush, Flag, Printer, GridFour, CloudArrowUp,
  Sparkle, Check, CaretDown, ArrowRight,
} from '@phosphor-icons/react/dist/ssr';

const TRADES = [
  { id: 'primeur',     label: 'Primeur',     color: '#2F7A4D', grad: 'linear-gradient(135deg,#1a4d2e,#2F7A4D)', Icon: Leaf,    product: 'Fraises Gariguette', cat: 'Fruits',    prix: '3,50', unite: '€/kg'      },
  { id: 'boulangerie', label: 'Boulangerie', color: '#C97B2A', grad: 'linear-gradient(135deg,#7a3a00,#C97B2A)', Icon: Grains,  product: 'Baguette Tradition', cat: 'Pains',     prix: '1,20', unite: '€/pièce'   },
  { id: 'fleuriste',   label: 'Fleuriste',   color: '#D4537E', grad: 'linear-gradient(135deg,#8a1a45,#D4537E)', Icon: Flower,  product: 'Roses rouges',       cat: 'Fleurs',    prix: '12',   unite: '€/bouquet' },
  { id: 'boucherie',   label: 'Boucherie',   color: '#A32D2D', grad: 'linear-gradient(135deg,#5a0a0a,#A32D2D)', Icon: Knife,   product: 'Côte de bœuf',       cat: 'Bœuf',      prix: '28',   unite: '€/kg'      },
  { id: 'fromager',    label: 'Fromagerie',  color: '#C9A227', grad: 'linear-gradient(135deg,#7a5a00,#C9A227)', Icon: Package, product: 'Comté 24 mois',       cat: 'Fromages',  prix: '4,50', unite: '€/100g'    },
  { id: 'services',    label: 'Services',    color: '#20336B', grad: 'linear-gradient(135deg,#0d1930,#20336B)', Icon: Wrench,  product: 'Coupe Homme',         cat: 'Coiffure',  prix: '18',   unite: '€/coupe'   },
];

const FEATURES = [
  { Icon: Lightning,     title: 'Création en 2 minutes',   desc: 'Interface intuitive, pas besoin de graphiste. Vos affiches professionnelles en quelques clics.' },
  { Icon: PaintBrush,   title: 'Thèmes professionnels',   desc: 'Promo, Ardoise, Bio, Origine France — des designs adaptés à chaque commerce.' },
  { Icon: Flag,         title: 'Drapeaux & origines',     desc: "Affichez l'origine avec le drapeau ou la région française, automatiquement." },
  { Icon: Printer,      title: 'Impression directe',      desc: 'Imprimez depuis votre navigateur, A4 à A7. Compatible toutes imprimantes.' },
  { Icon: GridFour,     title: "Planches d'étiquettes",   desc: 'Imprimez plusieurs étiquettes sur une feuille A4. Gain de papier assuré. (Pro+)' },
  { Icon: CloudArrowUp, title: 'Sauvegarde cloud',        desc: "Retrouvez vos affiches depuis n'importe quel appareil, à tout moment." },
];

const FAQS = [
  { q: 'Faut-il installer un logiciel ?',                             a: 'Non, Afych fonctionne entièrement dans votre navigateur. Aucune installation requise.' },
  { q: 'Puis-je utiliser mon propre logo ?',                          a: 'Oui, avec les plans Pro et Premium vous pouvez uploader votre logo et le positionner sur chaque affiche.' },
  { q: "Les affiches sont-elles imprimables en haute qualité ?",      a: "Oui, nos affiches sont optimisées pour l'impression A4, A5, A6 et A7. Le plan Pro ajoute l'export PDF HD, et Premium ajoute le PDF CMJN." },
  { q: "Puis-je annuler mon abonnement à tout moment ?",              a: "Absolument. Pas d'engagement, annulation en un clic depuis votre espace client." },
  { q: "Qu'arrive-t-il à mes affiches si je passe au plan gratuit ?", a: 'Vos 3 premières affiches sont conservées. Les suivantes sont archivées et accessibles en cas de réabonnement.' },
];

const FREE_FEATURES    = ['3 affiches max', '25 produits', '5 exports / mois', 'Filigrane Afych', 'Templates basiques', 'Impression directe'];
const PRO_FEATURES     = ['50 affiches', 'Catalogue illimité', 'Exports illimités', 'Export PDF HD', 'Sans filigrane', 'Planches étiquettes', 'Logo personnalisé', 'Typographie sur mesure', 'Tous les thèmes métiers'];
const PREMIUM_FEATURES = ['Tout du plan Pro', 'Affiches illimitées', 'Export PDF CMJN', 'Génération CSV en lot', 'Codes QR / promo', 'Support prioritaire'];

function useFadeIn(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  };
  return [ref, style];
}

const HERO_CARDS = [
  { grad: 'linear-gradient(145deg,#bfad94,#d4c8ae)', textColor: '#1B211E', label: 'Tomates Cœur de Bœuf', cat: 'Légumes', prix: '2,50', unit: '€/kg',      finalRot: -8,  finalScale: 0.92, finalTY: 18,  ry: -6,  shadow: '0,0,0' },
  { grad: 'linear-gradient(145deg,#0d1930,#1e3270)',  textColor: '#fff',    label: 'Baguette Tradition',    cat: 'Pains',   prix: '1,20', unit: '€/pièce',   finalRot:  0,  finalScale: 1.10, finalTY: 0,   ry:  0,  shadow: '20,40,100' },
  { grad: 'linear-gradient(145deg,#163d24,#2a6b42)',  textColor: '#fff',    label: 'Roses rouges',          cat: 'Fleurs',  prix: '12',   unit: '€/bouquet', finalRot:  8,  finalScale: 0.92, finalTY: 18,  ry:  6,  shadow: '0,0,0' },
];

function lerp(a, b, t) { return a + (b - a) * t; }
function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
function easeOutBack(t) { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }

function HeroPosterCards() {
  const ref     = useRef(null);
  const rawRef  = useRef(0);   // raw scroll progress 0→1
  const smoothRef = useRef(0); // smoothed progress
  const rafRef  = useRef(null);
  const [tick, setTick] = useState(0); // trigger re-render

  // Floating animation clock
  const clockRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      rawRef.current = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.85)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      clockRef.current += dt;
      // Exponential smoothing — very fast catch-up
      const speed = 8;
      smoothRef.current += (rawRef.current - smoothRef.current) * Math.min(1, speed * dt);
      setTick(t => t + 1);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const sp = smoothRef.current; // smoothed 0→1
  const t  = clockRef.current;

  return (
    <div ref={ref} style={{
      display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'flex-end',
      perspective: 1100, perspectiveOrigin: '50% 55%',
      marginBottom: 20, minHeight: 260,
    }}>
      {HERO_CARDS.map((c, i) => {
        const side = i - 1; // -1, 0, 1

        // Entry animation: cards start stacked flat/below, fly up and fan out
        const eA = easeOutExpo(sp);          // fast initial motion
        const eB = easeOutBack(Math.min(1, sp * 1.1)); // slight overshoot for pop

        const startRX = 55, startRY = side * 70, startTY = 120, startScale = 0.55, startOpacity = 0;
        const rotX   = lerp(startRX,       0,            eA);
        const rotY   = lerp(startRY,       c.ry,         eA);
        const ty     = lerp(startTY,       c.finalTY,    eB);
        const sc     = lerp(startScale,    c.finalScale, eB);
        const rot2d  = lerp(0,             c.finalRot,   eA);
        const op     = lerp(startOpacity,  1,            Math.min(1, sp * 3));

        // Floating idle animation after entry (only when sp > 0.8)
        const floatStrength = Math.max(0, (sp - 0.8) * 5);
        const floatY  = Math.sin(t * 1.4 + i * 1.2) * 5  * floatStrength;
        const floatRX = Math.sin(t * 0.9 + i * 0.8) * 2  * floatStrength;
        const floatRY = Math.cos(t * 1.1 + i * 1.0) * 3  * floatStrength;

        const shadowSpread = lerp(10, 40, eA);
        const shadowY2     = lerp(4,  24, eA);

        return (
          <div key={i} style={{
            background: c.grad,
            width: 158, height: 218,
            borderRadius: 20,
            flexShrink: 0,
            position: 'relative', overflow: 'hidden',
            opacity: op,
            transform: `translateY(${ty + floatY}px) rotate(${rot2d}deg) scale(${sc}) rotateX(${rotX + floatRX}deg) rotateY(${rotY + floatRY}deg)`,
            boxShadow: `0 ${shadowY2}px ${shadowSpread}px rgba(${c.shadow},${lerp(0.08, 0.28, eA)})`,
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
          }}>
            {/* Gloss sheen */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.14) 0%,transparent 55%)', borderRadius: 20, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.10)', borderRadius: 20 }} />
            <div style={{ position: 'relative', zIndex: 1, color: c.textColor, display: 'flex', flexDirection: 'column', height: '100%', padding: '17px 16px' }}>
              <div style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.55, marginBottom: 5 }}>{c.cat}</div>
              <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.25, marginBottom: 'auto', opacity: 0.95 }}>{c.label}</div>
              <div>
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 42, fontWeight: 700, lineHeight: 1 }}>{c.prix}<span style={{ fontSize: 21 }}> €</span></div>
                <div style={{ fontSize: 11, opacity: 0.65, marginTop: 3 }}>{c.unit}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Landing({ navigate }) {
  const [activeTrade, setActiveTrade] = useState('primeur');
  const [openFaq, setOpenFaq]         = useState(null);

  const trade = TRADES.find(t => t.id === activeTrade) || TRADES[0];

  const [heroRef,    heroStyle]    = useFadeIn(0);
  const [tradeRef,   tradeStyle]   = useFadeIn(0);
  const [featRef,    featStyle]    = useFadeIn(0);
  const [stepsRef,   stepsStyle]   = useFadeIn(0);
  const [pricingRef, pricingStyle] = useFadeIn(0);
  const [faqRef,     faqStyle]     = useFadeIn(0);
  const [ctaRef,     ctaStyle]     = useFadeIn(0);

  return (
    <div style={{ fontFamily: 'Archivo, sans-serif', background: '#FAF7EF', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── Sticky Nav ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,247,239,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E7DCC4' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo size={36} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => navigate('auth')}
              style={{ fontSize: 14, fontWeight: 500, padding: '7px 16px', borderRadius: 10, border: 'none', background: 'transparent', color: '#555', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = '#E7DCC4'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Connexion
            </button>
            <button
              onClick={() => navigate('auth')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, padding: '9px 20px', borderRadius: 12, border: 'none', background: '#20336B', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 16px rgba(32,51,107,0.3)' }}>
              Essai gratuit <ArrowRight size={14} weight="bold" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{ maxWidth: 1152, margin: '0 auto', padding: '80px 24px 40px', textAlign: 'center', ...heroStyle }}>
        {/* Pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #E7DCC4', borderRadius: 999, padding: '5px 16px 5px 10px', fontSize: 13, fontWeight: 600, color: '#20336B', marginBottom: 28, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <span style={{ background: '#C9A227', borderRadius: 999, padding: '2px 8px', color: '#fff', fontSize: 11, fontWeight: 800 }}>NOUVEAU</span>
          7 jours d'essai gratuit · Sans engagement
        </div>

        <h1 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)', fontWeight: 700, color: '#20336B', lineHeight: 1.08, marginBottom: 22, letterSpacing: '-0.01em' }}>
          Créez vos affiches de rayon<br />
          <span style={{ color: '#2F7A4D' }}>en 2 minutes chrono</span>
        </h1>
        <p style={{ fontSize: 18, color: '#666', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Des affiches de prix professionnelles pour primeurs, boulangers, fleuristes et tous les commerçants de proximité.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 72 }}>
          <button
            onClick={() => navigate('auth')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '15px 36px', borderRadius: 14, border: 'none', background: '#20336B', color: '#fff', fontSize: 17, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 28px rgba(32,51,107,0.35)' }}>
            Commencer gratuitement <ArrowRight size={18} weight="bold" />
          </button>
          <button
            style={{ padding: '15px 32px', borderRadius: 14, border: '2px solid #E7DCC4', background: '#fff', color: '#1B211E', fontSize: 17, fontWeight: 600, cursor: 'pointer' }}>
            Voir une démo
          </button>
        </div>

        {/* 3D scroll-animated poster mockups */}
        <HeroPosterCards /><br/>
        <p style={{ fontSize: 12, color: '#bbb', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Aperçu des affiches générées</p>
      </section>

      {/* ── Trade Selector ── */}
      <section ref={tradeRef} style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px', ...tradeStyle }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 34, color: '#20336B', marginBottom: 10 }}>Fait pour votre commerce</h2>
          <p style={{ fontSize: 15, color: '#888' }}>Des thèmes, couleurs et formats pensés pour chaque activité.</p>
        </div>

        {/* Trade pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 48 }}>
          {TRADES.map(({ id, label, color, Icon }) => {
            const active = activeTrade === id;
            return (
              <button key={id} onClick={() => setActiveTrade(id)} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '9px 20px', borderRadius: 999,
                border: `2px solid ${active ? color : '#E7DCC4'}`,
                background: active ? color : '#fff',
                color: active ? '#fff' : '#555',
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
                transform: active ? 'scale(1.06)' : 'scale(1)',
                transition: 'all 0.18s ease',
                boxShadow: active ? `0 6px 20px ${color}55` : 'none',
              }}>
                <Icon size={16} weight={active ? 'fill' : 'regular'} />
                {label}
              </button>
            );
          })}
        </div>

        {/* Poster preview */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div key={trade.id} style={{
            width: 280, height: 200,
            borderRadius: 22,
            background: trade.grad,
            boxShadow: `0 24px 64px ${trade.color}55`,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px 28px',
            color: '#fff',
            position: 'relative', overflow: 'hidden',
            transition: 'background 0.4s ease, box-shadow 0.4s ease',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', borderRadius: 22 }} />
            {/* top */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.65, marginBottom: 6 }}>{trade.cat}</div>
              <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2, opacity: 0.95 }}>{trade.product}</div>
            </div>
            {/* bottom */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 46, fontWeight: 700, lineHeight: 1 }}>
                {trade.prix}<span style={{ fontSize: 24 }}> €</span>
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 3 }}>{trade.unite}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section ref={featRef} style={{ background: '#fff', borderTop: '1px solid #E7DCC4', borderBottom: '1px solid #E7DCC4', ...featStyle }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '72px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 34, color: '#20336B', marginBottom: 10 }}>Tout ce dont vous avez besoin</h2>
            <p style={{ fontSize: 15, color: '#888' }}>Conçu pour les commerçants, pas pour les graphistes.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <div key={i} style={{ background: '#FAF7EF', borderRadius: 18, padding: '24px', border: '1px solid #E7DCC4' }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: '#EEF1FA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={22} weight="duotone" style={{ color: '#20336B' }} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#20336B', marginBottom: 6 }}>{title}</h3>
                <p style={{ fontSize: 13, color: '#777', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section ref={stepsRef} style={{ maxWidth: 900, margin: '0 auto', padding: '72px 24px', ...stepsStyle }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 34, color: '#20336B', marginBottom: 10 }}>Simple comme bonjour</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 48 }}>
          {[
            { n: '1', title: 'Choisir',       desc: 'Sélectionnez un thème parmi nos designs professionnels adaptés à votre métier.' },
            { n: '2', title: 'Personnaliser', desc: "Saisissez le produit, le prix, l'origine. Votre affiche se met à jour en temps réel." },
            { n: '3', title: 'Imprimer',      desc: "Imprimez directement depuis votre navigateur ou exportez en PDF haute qualité." },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#20336B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontFamily: 'Fredoka, sans-serif', fontSize: 28, fontWeight: 700, color: '#fff', boxShadow: '0 8px 24px rgba(32,51,107,0.3)' }}>
                {s.n}
              </div>
              <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 22, color: '#20336B', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#777', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" ref={pricingRef} style={{ background: '#fff', borderTop: '1px solid #E7DCC4', borderBottom: '1px solid #E7DCC4', ...pricingStyle }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '72px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 34, color: '#20336B', marginBottom: 8 }}>Tarifs simples et transparents</h2>
            <p style={{ fontSize: 14, color: '#999' }}>Sans engagement · Changez de plan à tout moment</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 24, alignItems: 'start' }}>
            {/* Free */}
            <div style={{ background: '#FAF7EF', borderRadius: 22, padding: 28, border: '1px solid #E7DCC4' }}>
              <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 24, color: '#20336B', marginBottom: 4 }}>Gratuit</div>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 20 }}>Pour découvrir Afych</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 40, fontWeight: 700, color: '#1B211E' }}>0 €</span>
                <span style={{ fontSize: 12, color: '#999' }}>/ mois</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {FREE_FEATURES.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, color: '#555' }}>
                    <Check size={14} weight="bold" style={{ color: '#2F7A4D', flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('auth')}
                style={{ width: '100%', padding: '11px 0', borderRadius: 12, border: '1.5px solid #20336B', background: 'transparent', color: '#20336B', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Commencer gratuitement
              </button>
            </div>

            {/* Pro */}
            <div style={{ background: '#20336B', borderRadius: 22, padding: 28, border: '2px solid #20336B', position: 'relative', boxShadow: '0 16px 56px rgba(32,51,107,0.30)' }}>
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#C9A227', color: '#fff', fontSize: 11, fontWeight: 800, padding: '5px 14px', borderRadius: 999, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
                LE PLUS CHOISI
              </div>
              <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 24, color: '#fff', marginBottom: 4 }}>Pro</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>Pour les commerçants actifs</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 40, fontWeight: 700, color: '#fff' }}>9,90 €</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>HT/mois</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#C9A227', marginBottom: 20 }}>7 jours gratuits, sans CB</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {PRO_FEATURES.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, color: 'rgba(255,255,255,0.88)' }}>
                    <Check size={14} weight="bold" style={{ color: '#7EE8A2', flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('auth')}
                style={{ width: '100%', padding: '11px 0', borderRadius: 12, border: 'none', background: '#fff', color: '#20336B', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Essayer Pro — 7 jours gratuits
              </button>
            </div>

            {/* Premium */}
            <div style={{ background: '#FAF7EF', borderRadius: 22, padding: 28, border: '1px solid #E7DCC4' }}>
              <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 24, color: '#20336B', marginBottom: 4 }}>Premium</div>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 20 }}>Pour les pros du commerce</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 40, fontWeight: 700, color: '#1B211E' }}>19,90 €</span>
                <span style={{ fontSize: 12, color: '#999' }}>HT/mois</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {PREMIUM_FEATURES.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, color: '#555' }}>
                    <Check size={14} weight="bold" style={{ color: '#2F7A4D', flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('auth')}
                style={{ width: '100%', padding: '11px 0', borderRadius: 12, border: '1.5px solid #20336B', background: 'transparent', color: '#20336B', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Choisir Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} style={{ maxWidth: 700, margin: '0 auto', padding: '72px 24px', ...faqStyle }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 34, color: '#20336B', marginBottom: 10 }}>Questions fréquentes</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1px solid #E7DCC4', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '17px 22px', textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#1B211E' }}>
                {faq.q}
                <CaretDown size={15} weight="bold" style={{ color: '#20336B', flexShrink: 0, marginLeft: 12, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 22px 18px', fontSize: 14, color: '#666', lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section ref={ctaRef} style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px 72px', ...ctaStyle }}>
        <div style={{ background: 'linear-gradient(135deg,#16234A,#20336B,#2d4a96)', borderRadius: 28, padding: '64px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 38, color: '#fff', marginBottom: 14 }}>Prêt à créer vos affiches ?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
              Rejoignez des milliers de commerçants qui font confiance à Afych.
            </p>
            <button
              onClick={() => navigate('auth')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 40px', borderRadius: 14, border: 'none', background: '#fff', color: '#20336B', fontSize: 17, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 28px rgba(0,0,0,0.20)' }}>
              Créer mon compte gratuit <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid #E7DCC4', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Logo size={28} />
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#999' }}>
            {['CGU', 'Confidentialité', 'Contact'].map(l => (
              <a key={l} href="#" style={{ color: '#999', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#20336B'} onMouseLeave={e => e.currentTarget.style.color = '#999'}>{l}</a>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#bbb', margin: 0 }}>© 2025 Afych</p>
        </div>
      </footer>
    </div>
  );
}
