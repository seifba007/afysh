import React, { useContext } from 'react';
import { AppContext } from '../App.jsx';
import Logo from '../components/Logo.jsx';
import { PLANS } from '../lib/entitlements.js';
import { ArrowLeft, Check, X, Star } from '@phosphor-icons/react/dist/ssr';

const FEATURES = [
  { label: 'Affiches',            free: '3',       pro: '50',        premium: 'Illimitées'  },
  { label: 'Exports / mois',      free: '5',       pro: 'Illimités', premium: 'Illimités'   },
  { label: 'Catalogue produits',  free: '25',      pro: 'Illimité',  premium: 'Illimité'    },
  { label: 'Thèmes métiers',      free: '1',       pro: 'Tous',      premium: 'Tous'        },
  { label: 'Export PDF HD',       free: false,     pro: true,        premium: true          },
  { label: 'Sans filigrane',      free: false,     pro: true,        premium: true          },
  { label: 'Planches étiquettes', free: false,     pro: true,        premium: true          },
  { label: 'Logo & marque',       free: false,     pro: true,        premium: true          },
  { label: 'Typographie custom',  free: false,     pro: true,        premium: true          },
  { label: 'Historique',          free: false,     pro: '30 jours',  premium: 'Illimité'    },
  { label: 'PDF CMJN',            free: false,     pro: false,       premium: true          },
  { label: 'Génération CSV',      free: false,     pro: false,       premium: true          },
  { label: 'Codes QR / promo',    free: false,     pro: false,       premium: true          },
  { label: 'Support',             free: 'FAQ',     pro: 'Email',     premium: 'Prioritaire' },
];

function FeatureCell({ value }) {
  if (value === true)  return <Check size={16} weight="bold" style={{ color: '#2F7A4D' }} />;
  if (value === false) return <X     size={14} weight="bold" style={{ color: '#ddd'    }} />;
  return <span style={{ fontSize: 13, fontWeight: 500, color: '#555' }}>{value}</span>;
}

const PLAN_META = [
  {
    id: 'free',
    name: 'Gratuit',
    priceHT: '0',
    priceTTC: null,
    period: '',
    desc: 'Pour découvrir Afych',
    highlight: false,
    badge: null,
    trialBadge: null,
  },
  {
    id: 'pro',
    name: 'Pro',
    priceHT: '9,90',
    priceTTC: '11,88',
    period: '/mois',
    desc: 'Pour les commerçants actifs',
    highlight: true,
    badge: 'Le plus choisi',
    trialBadge: '7 jours gratuits',
  },
  {
    id: 'premium',
    name: 'Premium',
    priceHT: '19,90',
    priceTTC: '23,88',
    period: '/mois',
    desc: 'Pour les pros du commerce',
    highlight: false,
    badge: null,
    trialBadge: null,
  },
];

export default function Billing({ navigate }) {
  const { plan, setPlan } = useContext(AppContext);

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7EF', fontFamily: 'Archivo, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E7DCC4', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={() => navigate('espace')}
          style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#20336B', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={16} weight="bold" /> Retour
        </button>
        <div style={{ width: 1, height: 20, background: '#E7DCC4' }} />
        <Logo size={28} />
        <h1 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 22, color: '#20336B', margin: 0 }}>Abonnement</h1>
      </div>

      <div style={{ maxWidth: 1024, margin: '0 auto', padding: '48px 24px' }}>
        <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 34, color: '#20336B', textAlign: 'center', marginBottom: 8 }}>
          Choisissez votre plan
        </h2>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#888', marginBottom: 48 }}>Sans engagement · Changez ou annulez à tout moment</p>

        {/* Plan cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 24, marginBottom: 56 }}>
          {PLAN_META.map(p => {
            const isCurrent = plan === p.id;
            return (
              <div
                key={p.id}
                style={{
                  borderRadius: 20,
                  padding: 28,
                  position: 'relative',
                  background: p.highlight ? '#20336B' : '#fff',
                  border: p.highlight ? '2px solid #20336B' : '1px solid #E7DCC4',
                  boxShadow: p.highlight ? '0 12px 40px rgba(32,51,107,0.22)' : undefined,
                }}>
                {p.badge && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#C9A227', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 999, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={10} weight="fill" />
                    {p.badge.toUpperCase()}
                  </div>
                )}
                {isCurrent && (
                  <div style={{ position: 'absolute', top: 16, right: 16, background: '#E8F5ED', color: '#2F7A4D', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>
                    Plan actuel
                  </div>
                )}

                <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 22, color: p.highlight ? '#fff' : '#20336B', marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: p.highlight ? 'rgba(255,255,255,0.6)' : '#888', marginBottom: 16 }}>{p.desc}</div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 38, fontWeight: 700, color: p.highlight ? '#fff' : '#1B211E' }}>
                    {p.priceHT} €
                  </span>
                  {p.period && (
                    <span style={{ fontSize: 12, color: p.highlight ? 'rgba(255,255,255,0.55)' : '#888' }}>HT{p.period}</span>
                  )}
                </div>

                {p.priceTTC && (
                  <div style={{ fontSize: 11, color: p.highlight ? 'rgba(255,255,255,0.45)' : '#aaa', marginBottom: p.trialBadge ? 8 : 24 }}>
                    ({p.priceTTC} € TTC/mois)
                  </div>
                )}
                {!p.priceTTC && <div style={{ marginBottom: p.trialBadge ? 8 : 24 }} />}

                {p.trialBadge && (
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#C9A227', marginBottom: 20 }}>
                    {p.trialBadge} — sans CB
                  </div>
                )}

                <button
                  onClick={() => !isCurrent && setPlan(p.id)}
                  disabled={isCurrent}
                  style={{
                    width: '100%',
                    padding: '10px 0',
                    borderRadius: 12,
                    border: p.highlight ? 'none' : '1.5px solid #20336B',
                    background: isCurrent ? (p.highlight ? 'rgba(255,255,255,0.15)' : '#F0EBE0') : p.highlight ? '#fff' : '#FAF7EF',
                    color: isCurrent ? (p.highlight ? 'rgba(255,255,255,0.5)' : '#aaa') : p.highlight ? '#20336B' : '#20336B',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: isCurrent ? 'default' : 'pointer',
                  }}>
                  {isCurrent ? 'Plan actuel' : p.highlight ? `Essayer ${p.name} — 7 jours gratuits` : `Choisir ${p.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Feature comparison table */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E7DCC4', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#FAF7EF', borderBottom: '1px solid #E7DCC4' }}>
                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#888' }}>
                  Fonctionnalité
                </th>
                {PLAN_META.map(p => (
                  <th key={p.id} style={{ padding: '14px 16px', textAlign: 'center', fontSize: 12, fontWeight: 800, color: '#20336B', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f, i) => (
                <tr key={i} style={{ borderBottom: i < FEATURES.length - 1 ? '1px solid #F5F0E8' : 'none', background: i % 2 === 0 ? '#fff' : '#FDFBF7' }}>
                  <td style={{ padding: '11px 24px', fontWeight: 500, color: '#333' }}>{f.label}</td>
                  <td style={{ padding: '11px 16px', textAlign: 'center' }}><FeatureCell value={f.free} /></td>
                  <td style={{ padding: '11px 16px', textAlign: 'center' }}><FeatureCell value={f.pro} /></td>
                  <td style={{ padding: '11px 16px', textAlign: 'center' }}><FeatureCell value={f.premium} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom note */}
        <p style={{ textAlign: 'center', fontSize: 12, color: '#bbb', marginTop: 24 }}>
          Tous les prix sont indiqués hors taxes. TVA applicable selon votre pays.
        </p>
      </div>
    </div>
  );
}
