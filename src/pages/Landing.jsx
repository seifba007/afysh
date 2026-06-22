import React, { useState } from 'react';
import Logo from '../components/Logo.jsx';
import {
  Leaf, Grains, Flower, Knife, Package, Wrench,
  Lightning, PaintBrush, Flag, Printer, GridFour, CloudArrowUp,
  Sparkle, Check, CaretDown, ArrowRight,
} from '@phosphor-icons/react/dist/ssr';

const TRADES = [
  { id: 'primeur',     label: 'Primeur',     color: '#2F7A4D', Icon: Leaf,    product: 'Fraises Gariguette', prix: '3,50', unite: '€/kg'      },
  { id: 'boulangerie', label: 'Boulangerie', color: '#C97B2A', Icon: Grains,  product: 'Baguette tradition', prix: '1,20', unite: '€/pièce'   },
  { id: 'fleuriste',   label: 'Fleuriste',   color: '#D4537E', Icon: Flower,  product: 'Roses rouges',       prix: '12',   unite: '€/bouquet' },
  { id: 'boucherie',   label: 'Boucherie',   color: '#A32D2D', Icon: Knife,   product: 'Côte de bœuf',      prix: '28',   unite: '€/kg'      },
  { id: 'fromager',    label: 'Fromagerie',  color: '#C9A227', Icon: Package, product: 'Comté 24 mois',      prix: '4,50', unite: '/100g'     },
  { id: 'services',    label: 'Services',    color: '#20336B', Icon: Wrench,  product: 'Coupe Homme',        prix: '18',   unite: '€/coupe'   },
];

const FEATURES = [
  { Icon: Lightning,     title: 'Création en 2 minutes',   desc: 'Interface intuitive, pas besoin de graphiste. Vos affiches professionnelles en quelques clics.' },
  { Icon: PaintBrush,   title: 'Thèmes professionnels',   desc: 'Promo, Prix simple, Ardoise, Bio, Origine France — des designs adaptés à votre commerce.' },
  { Icon: Flag,         title: 'Drapeaux & origines',     desc: "Affichez l'origine avec le drapeau ou la région française, automatiquement." },
  { Icon: Printer,      title: 'Impression directe',      desc: 'Imprimez depuis votre navigateur, A4 à A7. Compatible toutes imprimantes.' },
  { Icon: GridFour,     title: "Planches d'étiquettes",   desc: 'Imprimez plusieurs étiquettes sur une feuille A4. Gain de papier assuré. (Pro+)' },
  { Icon: CloudArrowUp, title: 'Sauvegarde cloud',        desc: "Retrouvez vos affiches depuis n'importe quel appareil, à tout moment." },
];

const FAQS = [
  { q: 'Faut-il installer un logiciel ?',                         a: 'Non, Afych fonctionne entièrement dans votre navigateur. Aucune installation requise.' },
  { q: 'Puis-je utiliser mon propre logo ?',                      a: 'Oui, avec les plans Pro et Premium vous pouvez uploader votre logo et le positionner sur chaque affiche.' },
  { q: "Les affiches sont-elles imprimables en haute qualité ?",  a: "Oui, nos affiches sont optimisées pour l'impression A4, A5, A6 et A7 en haute résolution. Le plan Pro ajoute l'export PDF HD, et Premium ajoute le PDF CMJN pour l'imprimerie professionnelle." },
  { q: "Puis-je annuler mon abonnement à tout moment ?",          a: "Absolument. Pas d'engagement, annulation en un clic depuis votre espace client." },
  { q: "Qu'arrive-t-il à mes affiches si je passe au plan gratuit ?", a: 'Vos 3 premières affiches sont conservées. Les suivantes sont archivées et accessibles en cas de réabonnement.' },
];

const FREE_FEATURES    = ['3 affiches max', '25 produits', '5 exports / mois', 'Filigrane Afych', 'Templates basiques', 'Impression directe'];
const PRO_FEATURES     = ['50 affiches', 'Catalogue illimité', 'Exports illimités', 'Export PDF HD au mm', 'Sans filigrane', 'Planches étiquettes', 'Logo personnalisé', 'Typographie sur mesure', 'Tous les thèmes métiers', 'Historique 30 jours'];
const PREMIUM_FEATURES = ['Tout du plan Pro', 'Affiches illimitées', 'Export PDF HD + CMJN', 'Génération en lot (CSV)', 'Codes QR / promo', 'Historique illimité', 'Support prioritaire'];

export default function Landing({ navigate }) {
  const [activeTrade, setActiveTrade] = useState('primeur');
  const [openFaq, setOpenFaq] = useState(null);

  const trade = TRADES.find(t => t.id === activeTrade) || TRADES[0];

  return (
    <div style={{ fontFamily: 'Archivo, sans-serif', background: '#FAF7EF', minHeight: '100vh' }}>

      {/* ── Sticky Nav ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #E7DCC4' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 16px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo size={36} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => navigate('auth')}
              style={{ fontSize: 14, fontWeight: 500, padding: '6px 14px', borderRadius: 10, border: 'none', background: 'transparent', color: '#1B211E', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = '#E7DCC4'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Connexion
            </button>
            <button
              onClick={() => navigate('auth')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, padding: '8px 18px', borderRadius: 12, border: 'none', background: '#20336B', color: '#fff', cursor: 'pointer' }}>
              Essai gratuit 7 jours <ArrowRight size={14} weight="bold" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1152, margin: '0 auto', padding: '80px 16px 64px', textAlign: 'center' }}>
        {/* Eyebrow pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #E7DCC4', borderRadius: 999, padding: '5px 16px', fontSize: 13, fontWeight: 600, color: '#20336B', marginBottom: 24 }}>
          <Sparkle size={14} weight="fill" style={{ color: '#C9A227' }} />
          7 jours d'essai gratuit · Sans engagement
        </div>

        <h1 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', fontWeight: 700, color: '#20336B', lineHeight: 1.1, marginBottom: 20 }}>
          Créez vos affiches de rayon<br />en 2 minutes
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>
          Des affiches de prix professionnelles pour primeurs, boulangers, fleuristes et tous les commerçants de proximité.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 64 }}>
          <button
            onClick={() => navigate('auth')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 14, border: 'none', background: '#20336B', color: '#fff', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}>
            Commencer gratuitement <ArrowRight size={18} weight="bold" />
          </button>
          <button
            style={{ padding: '14px 32px', borderRadius: 14, border: '2px solid #E7DCC4', background: 'transparent', color: '#1B211E', fontSize: 17, fontWeight: 600, cursor: 'pointer' }}>
            Voir une démo
          </button>
        </div>

        {/* Floating poster mockups — kraft/indigo/green, NO red backgrounds */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'flex-end' }}>
          {[
            { bg: '#E7DCC4', textColor: '#1B211E', label: 'Tomates Cœur de Bœuf', prix: '2,50', unit: '€/kg',      rotate: '-5deg',  scale: '0.95' },
            { bg: '#20336B', textColor: '#fff',    label: 'Baguette tradition',    prix: '1,20', unit: '€/pièce',   rotate: '0deg',   scale: '1.1'  },
            { bg: '#2F7A4D', textColor: '#fff',    label: 'Roses rouges',          prix: '12',   unit: '€/bouquet', rotate: '5deg',   scale: '0.95' },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: m.bg,
                width: 144,
                height: 196,
                borderRadius: 14,
                transform: `rotate(${m.rotate}) scale(${m.scale})`,
                boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: m.textColor,
                padding: 14,
                flexShrink: 0,
              }}>
              <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 6, textAlign: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{m.label}</div>
              <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 38, fontWeight: 700, lineHeight: 1 }}>{m.prix} €</div>
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>{m.unit}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trade Selector ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 30, color: '#20336B', marginBottom: 20 }}>Fait pour votre commerce</h2>

        {/* Trade buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
          {TRADES.map(({ id, label, color, Icon }) => {
            const active = activeTrade === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTrade(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 18px',
                  borderRadius: 999,
                  border: `2px solid ${active ? color : '#E7DCC4'}`,
                  background: active ? color : '#fff',
                  color: active ? '#fff' : '#555',
                  fontSize: 14, fontWeight: 600,
                  cursor: 'pointer',
                  transform: active ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.15s ease',
                }}>
                <Icon size={16} weight={active ? 'fill' : 'regular'} />
                {label}
              </button>
            );
          })}
        </div>

        {/* Mini poster preview */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            key={trade.id}
            style={{
              width: 200,
              height: 150,
              borderRadius: 16,
              background: trade.color,
              boxShadow: `0 8px 32px ${trade.color}55`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              padding: 16,
              position: 'relative',
              overflow: 'hidden',
            }}>
            {/* Dark overlay for readability */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.22)', borderRadius: 16 }} />
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, opacity: 0.85, marginBottom: 6 }}>{trade.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, opacity: 0.9 }}>{trade.product}</div>
              <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{trade.prix} €</div>
              <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>{trade.unite}</div>
            </div>
          </div>
        </div>
        <p style={{ color: '#666', fontSize: 13, marginTop: 16 }}>
          Thèmes, couleurs et formats pensés pour votre activité.
        </p>
      </section>

      {/* ── Features ── */}
      <section style={{ maxWidth: 1152, margin: '0 auto', padding: '48px 16px' }}>
        <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 34, color: '#20336B', textAlign: 'center', marginBottom: 48 }}>Tout ce dont vous avez besoin</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #E7DCC4' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EEF1FA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <Icon size={22} weight="duotone" style={{ color: '#20336B' }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#20336B', marginBottom: 6 }}>{title}</h3>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Steps ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '48px 16px' }}>
        <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 34, color: '#20336B', textAlign: 'center', marginBottom: 48 }}>Simple comme bonjour</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 40 }}>
          {[
            { n: '1', title: 'Choisir',       desc: 'Sélectionnez un thème parmi nos designs professionnels.' },
            { n: '2', title: 'Personnaliser', desc: "Saisissez le produit, le prix, l'origine. Votre affiche se met à jour en temps réel." },
            { n: '3', title: 'Imprimer',      desc: "Imprimez directement depuis votre navigateur. C'est prêt !" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#20336B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'Fredoka, sans-serif', fontSize: 26, fontWeight: 700, color: '#fff' }}>
                {s.n}
              </div>
              <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 20, color: '#20336B', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" style={{ maxWidth: 1024, margin: '0 auto', padding: '48px 16px' }}>
        <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 34, color: '#20336B', textAlign: 'center', marginBottom: 8 }}>Tarifs simples et transparents</h2>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#888', marginBottom: 48 }}>Sans engagement · Changez de plan à tout moment</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {/* Free */}
          <div style={{ background: '#fff', borderRadius: 20, padding: 28, border: '1px solid #E7DCC4', position: 'relative' }}>
            <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 22, color: '#20336B', marginBottom: 4 }}>Gratuit</div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>Pour découvrir Afych</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 38, fontWeight: 700, color: '#1B211E' }}>0 €</span>
              <span style={{ fontSize: 12, color: '#888' }}>HT/mois</span>
            </div>
            <div style={{ fontSize: 12, color: '#aaa', marginBottom: 24 }}>Pour toujours</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FREE_FEATURES.map((f, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#444' }}>
                  <Check size={14} weight="bold" style={{ color: '#2F7A4D', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('auth')}
              style={{ width: '100%', padding: '10px 0', borderRadius: 12, border: '1.5px solid #20336B', background: '#FAF7EF', color: '#20336B', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Commencer gratuitement
            </button>
          </div>

          {/* Pro — highlighted */}
          <div style={{ background: '#20336B', borderRadius: 20, padding: 28, border: '2px solid #20336B', position: 'relative', boxShadow: '0 12px 40px rgba(32,51,107,0.25)' }}>
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#C9A227', color: '#fff', fontSize: 11, fontWeight: 800, padding: '4px 14px', borderRadius: 999, whiteSpace: 'nowrap' }}>
              LE PLUS CHOISI
            </div>
            <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 22, color: '#fff', marginBottom: 4 }}>Pro</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 16 }}>Pour les commerçants actifs</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 38, fontWeight: 700, color: '#fff' }}>9,90 €</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>HT/mois</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>(11,88 € TTC)</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#C9A227', marginBottom: 20 }}>7 jours gratuits, sans CB</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PRO_FEATURES.map((f, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.9)' }}>
                  <Check size={14} weight="bold" style={{ color: '#7EE8A2', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('auth')}
              style={{ width: '100%', padding: '10px 0', borderRadius: 12, border: 'none', background: '#fff', color: '#20336B', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Essayer Pro — 7 jours gratuits
            </button>
          </div>

          {/* Premium */}
          <div style={{ background: '#fff', borderRadius: 20, padding: 28, border: '1px solid #E7DCC4', position: 'relative' }}>
            <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 22, color: '#20336B', marginBottom: 4 }}>Premium</div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>Pour les pros du commerce</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 38, fontWeight: 700, color: '#1B211E' }}>19,90 €</span>
              <span style={{ fontSize: 12, color: '#888' }}>HT/mois</span>
            </div>
            <div style={{ fontSize: 12, color: '#aaa', marginBottom: 24 }}>(23,88 € TTC)</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PREMIUM_FEATURES.map((f, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#444' }}>
                  <Check size={14} weight="bold" style={{ color: '#2F7A4D', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('auth')}
              style={{ width: '100%', padding: '10px 0', borderRadius: 12, border: '1.5px solid #20336B', background: '#FAF7EF', color: '#20336B', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Choisir Premium
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '48px 16px' }}>
        <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 34, color: '#20336B', textAlign: 'center', marginBottom: 32 }}>Questions fréquentes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1px solid #E7DCC4', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#1B211E' }}>
                {faq.q}
                <CaretDown
                  size={16}
                  weight="bold"
                  style={{ color: '#20336B', flexShrink: 0, marginLeft: 12, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                />
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 20px 16px', fontSize: 14, color: '#666', lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ maxWidth: 1152, margin: '0 auto', padding: '0 16px 64px' }}>
        <div style={{ background: '#20336B', borderRadius: 24, padding: '56px 32px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 38, color: '#fff', marginBottom: 12 }}>Prêt à créer vos affiches ?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 32 }}>
            Rejoignez des milliers de commerçants qui font confiance à Afych.
          </p>
          <button
            onClick={() => navigate('auth')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px', borderRadius: 14, border: 'none', background: '#fff', color: '#20336B', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}>
            Créer mon compte gratuit <ArrowRight size={20} weight="bold" />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid #E7DCC4', padding: '32px 16px' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Logo size={28} />
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#888' }}>
            <a href="#" style={{ color: '#888', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>CGU</a>
            <a href="#" style={{ color: '#888', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>Confidentialité</a>
            <a href="#" style={{ color: '#888', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>Contact</a>
          </div>
          <p style={{ fontSize: 13, color: '#aaa' }}>© 2025 Afych — afych.com</p>
        </div>
      </footer>
    </div>
  );
}
