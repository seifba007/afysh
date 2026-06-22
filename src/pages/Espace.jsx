import React, { useState, useContext } from 'react';
import { AppContext } from '../App.jsx';
import Logo from '../components/Logo.jsx';
import PosterCard from '../components/PosterCard.jsx';
import { mockCategories } from '../lib/mockData.js';
import {
  CaretDown, CaretRight, Plus, FolderSimplePlus, Image,
  Books, ArrowRight, X,
} from '@phosphor-icons/react/dist/ssr';
import { PLANS } from '../lib/entitlements.js';

/* ── Inline prompt modal ── */
function PromptModal({ title, placeholder = '', onConfirm, onCancel }) {
  const [value, setValue] = useState('');
  const inputRef = React.useRef(null);
  React.useEffect(() => { inputRef.current?.focus(); }, []);

  const confirm = () => { if (value.trim()) onConfirm(value.trim()); };
  const onKey   = (e) => { if (e.key === 'Enter') confirm(); if (e.key === 'Escape') onCancel(); };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', width: '100%', maxWidth: 380, padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 18, color: '#20336B', margin: 0 }}>{title}</h3>
          <button
            onClick={onCancel}
            style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#aaa' }}>
            <X size={15} weight="bold" />
          </button>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKey}
          placeholder={placeholder}
          style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1px solid #E7DCC4', background: '#FAF7EF', fontSize: 14, outline: 'none', marginBottom: 16, boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onCancel}
            style={{ flex: 1, padding: '9px 0', borderRadius: 12, border: '1px solid #E7DCC4', background: 'transparent', fontSize: 13, fontWeight: 600, color: '#666', cursor: 'pointer' }}>
            Annuler
          </button>
          <button
            onClick={confirm}
            disabled={!value.trim()}
            style={{ flex: 1, padding: '9px 0', borderRadius: 12, border: 'none', background: '#20336B', fontSize: 13, fontWeight: 700, color: '#fff', cursor: value.trim() ? 'pointer' : 'default', opacity: value.trim() ? 1 : 0.4 }}>
            Créer
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryTree({ categories, setCategories, onSelect, selected }) {
  const [collapsed, setCollapsed] = useState({});
  const [modal, setModal]         = useState(null); // { type: 'root' | 'child', parentId? }
  const toggle = (id) => setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));

  const handleConfirm = (name) => {
    if (modal.type === 'root') {
      setCategories(prev => [...prev, { id: Date.now().toString(), name, children: [] }]);
    } else {
      setCategories(prev => prev.map(c => c.id === modal.parentId
        ? { ...c, children: [...c.children, { id: Date.now().toString(), name, children: [] }] }
        : c
      ));
    }
    setModal(null);
  };

  const addChild = (parentId) => setModal({ type: 'child', parentId });
  const addRoot  = () => setModal({ type: 'root' });

  return (
    <div>
      {categories.map(cat => (
        <div key={cat.id} style={{ marginBottom: 2 }}>
          <div
            onClick={() => onSelect(cat.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 4, padding: '6px 8px', borderRadius: 8, cursor: 'pointer',
              background: selected === cat.id ? '#EEF1FA' : 'transparent',
            }}
            onMouseEnter={e => { if (selected !== cat.id) e.currentTarget.style.background = '#F5F3EE'; }}
            onMouseLeave={e => { if (selected !== cat.id) e.currentTarget.style.background = 'transparent'; }}>
            <button
              onClick={e => { e.stopPropagation(); toggle(cat.id); }}
              style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: 'none', background: 'transparent', cursor: 'pointer', color: '#aaa', padding: 0 }}>
              {cat.children.length > 0
                ? collapsed[cat.id]
                  ? <CaretRight size={12} weight="bold" />
                  : <CaretDown size={12} weight="bold" />
                : <span style={{ width: 12 }} />}
            </button>
            <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#1B211E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.name}</span>
            <button
              onClick={e => { e.stopPropagation(); addChild(cat.id); }}
              style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, border: 'none', background: 'transparent', cursor: 'pointer', color: '#20336B', opacity: 0, padding: 0 }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0'}>
              <Plus size={12} weight="bold" />
            </button>
          </div>
          {!collapsed[cat.id] && cat.children.length > 0 && (
            <div style={{ marginLeft: 24, borderLeft: '1px solid #E7DCC4', paddingLeft: 8 }}>
              {cat.children.map(child => (
                <div
                  key={child.id}
                  onClick={() => onSelect(child.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', borderRadius: 8, cursor: 'pointer',
                    background: selected === child.id ? '#EEF1FA' : 'transparent',
                  }}
                  onMouseEnter={e => { if (selected !== child.id) e.currentTarget.style.background = '#F5F3EE'; }}
                  onMouseLeave={e => { if (selected !== child.id) e.currentTarget.style.background = 'transparent'; }}>
                  <span style={{ fontSize: 13, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{child.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addRoot}
        style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '6px 8px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 12, color: '#20336B', fontWeight: 600, width: '100%' }}
        onMouseEnter={e => e.currentTarget.style.background = '#EEF1FA'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
        <FolderSimplePlus size={14} weight="bold" />
        Nouvelle catégorie
      </button>

      {modal && (
        <PromptModal
          title={modal.type === 'root' ? 'Nouvelle catégorie' : 'Nouvelle sous-catégorie'}
          placeholder={modal.type === 'root' ? 'Ex : Fruits, Légumes…' : 'Ex : Agrumes, Salades…'}
          onConfirm={handleConfirm}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
}

export default function Espace({ navigate }) {
  const { user, posters, setPosters, plan } = useContext(AppContext);
  const [categories, setCategories] = useState(mockCategories);
  const [selectedCat, setSelectedCat] = useState(null);

  const planInfo = PLANS[plan];
  const maxPosters = planInfo.maxPosters;
  const posterCount = posters.length;

  // Show upsell when at 2/3 of poster limit
  const showUpsell = plan === 'free' && maxPosters !== Infinity && posterCount >= Math.floor(maxPosters * (2 / 3));

  const filteredPosters = selectedCat
    ? posters.filter(p => {
        const catName = categories.find(c => c.id === selectedCat)?.name
          || categories.flatMap(c => c.children).find(ch => ch.id === selectedCat)?.name;
        return p.category === catName;
      })
    : posters;

  const deleteP = (id) => setPosters(prev => prev.filter(p => p.id !== id));
  const duplicateP = (id) => {
    const p = posters.find(p => p.id === id);
    if (p) setPosters(prev => [...prev, { ...p, id: Date.now().toString(), name: p.name + ' (copie)' }]);
  };

  const planLabel = plan === 'free' ? 'Gratuit' : plan === 'pro' ? 'Pro' : 'Premium';

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#FAF7EF', fontFamily: 'Archivo, sans-serif' }}>

      {/* ── Sidebar ── */}
      <div style={{ width: 220, background: '#fff', borderRight: '1px solid #E7DCC4', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: 16, borderBottom: '1px solid #E7DCC4' }}>
          <button onClick={() => navigate('landing')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
            <Logo size={28} />
          </button>
        </div>

        {/* Category tree */}
        <div style={{ flex: 1, padding: 12, overflowY: 'auto' }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#bbb', margin: '0 0 10px 8px' }}>
            Catégories
          </p>
          <CategoryTree
            categories={categories}
            setCategories={setCategories}
            onSelect={setSelectedCat}
            selected={selectedCat}
          />
        </div>

        {/* Plan upgrade button */}
        <div style={{ padding: 12, borderTop: '1px solid #E7DCC4' }}>
          <button
            onClick={() => navigate('billing')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 12px', borderRadius: 10, border: 'none', background: '#EEF1FA', color: '#20336B', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            <span>Plan {planLabel}</span>
            <ArrowRight size={12} weight="bold" />
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header — white with border */}
        <div style={{ background: '#fff', borderBottom: '1px solid #E7DCC4', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <h1 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 22, color: '#20336B', margin: 0, lineHeight: 1 }}>
              {user?.storeName || user?.name || 'Mon espace'}
            </h1>
            <p style={{ fontSize: 12, color: '#aaa', margin: '2px 0 0' }}>
              {posterCount} affiche{posterCount !== 1 ? 's' : ''}
              {maxPosters !== Infinity && ` sur ${maxPosters}`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => navigate('catalogue')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 12, border: '1px solid #E7DCC4', background: '#fff', color: '#20336B', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              <Books size={16} weight="duotone" />
              Catalogue produits
            </button>
            <button
              onClick={() => navigate('editeur')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 12, border: 'none', background: '#20336B', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              <Plus size={16} weight="bold" />
              Nouvelle affiche
            </button>
          </div>
        </div>

        {/* Upsell banner — shown at 2/3 of poster limit */}
        {showUpsell && (
          <div style={{ margin: '16px 24px 0', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FEF3C7', border: '1px solid #FCD34D', flexShrink: 0 }}>
            <span style={{ fontSize: 13, color: '#92400E', fontWeight: 500 }}>
              Vous avez utilisé {posterCount}/{maxPosters} affiches gratuites.
            </span>
            <button
              onClick={() => navigate('billing')}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 12px', borderRadius: 8, border: 'none', background: '#20336B', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              Passer au Pro <ArrowRight size={12} weight="bold" />
            </button>
          </div>
        )}

        {/* Poster grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {filteredPosters.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 300, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: '#EEF1FA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Image size={32} weight="duotone" style={{ color: '#20336B' }} />
              </div>
              <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 22, color: '#20336B', marginBottom: 8 }}>
                Aucune affiche pour l'instant
              </h3>
              <p style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>Créez votre première affiche en quelques clics.</p>
              <button
                onClick={() => navigate('editeur')}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 12, border: 'none', background: '#20336B', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                <Plus size={16} weight="bold" />
                Créer une affiche
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16, alignItems: 'start' }}>
              {filteredPosters.map(p => (
                <PosterCard
                  key={p.id}
                  poster={p}
                  onOpen={() => navigate('editeur')}
                  onDuplicate={() => duplicateP(p.id)}
                  onDelete={() => deleteP(p.id)}
                />
              ))}
              {/* New poster placeholder card */}
              <button
                onClick={() => navigate('editeur')}
                style={{
                  height: 180,
                  borderRadius: 14,
                  border: '2px dashed #E7DCC4',
                  background: 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer',
                }}>
                <Plus size={28} style={{ color: '#ccc' }} />
                <span style={{ fontSize: 12, color: '#bbb', fontWeight: 500 }}>Nouvelle affiche</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
