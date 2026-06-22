import React, { useState, useContext } from 'react';
import { AppContext } from '../App.jsx';
import Logo from '../components/Logo.jsx';
import {
  ArrowLeft, MagnifyingGlass, Plus, PencilSimple,
  Layout, Trash, X,
} from '@phosphor-icons/react/dist/ssr';

const UNITS    = ['€/kg', '€/pièce', '€/botte', '€/L', '€/100g', '€/barquette', '€/bouquet'];
const CALIBRES = ['', 'Cat. Extra', 'Cat. I', 'Cat. II'];

const emptyForm = { name: '', calibre: '', price: '', unit: '€/kg', origin: 'France', category: '' };

export default function Catalogue({ navigate }) {
  const { products, setProducts } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(emptyForm);
  const [search, setSearch]     = useState('');

  const openAdd  = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (p) => { setForm(p); setEditId(p.id); setShowForm(true); };
  const save = () => {
    if (!form.name) return;
    if (editId) {
      setProducts(prev => prev.map(p => p.id === editId ? { ...form, id: editId } : p));
    } else {
      setProducts(prev => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setShowForm(false);
  };
  const del = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen" style={{ background: '#FAF7EF', fontFamily: 'Archivo' }}>
      {/* Header */}
      <div className="bg-white border-b border-kraft px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('espace')}
          className="flex items-center gap-1 text-sm font-medium hover:underline"
          style={{ color: '#20336B' }}>
          <ArrowLeft size={16} weight="bold" /> Retour
        </button>
        <Logo size={28} />
        <h1 style={{ fontFamily: 'Fredoka', fontSize: 22, color: '#20336B' }}>Catalogue produits</h1>
        <div className="flex-1" />
        <div className="relative">
          <MagnifyingGlass size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
          <input
            type="search"
            placeholder="Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-xl border border-kraft text-sm outline-none"
            style={{ background: '#FAF7EF', width: 200 }}
          />
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-xl font-semibold text-white"
          style={{ background: '#20336B' }}>
          <Plus size={15} weight="bold" /> Ajouter
        </button>
      </div>

      {/* Table */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl border border-kraft overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#FAF7EF', borderBottom: '1px solid #E7DCC4' }}>
                {['Produit', 'Calibre', 'Prix', 'Unité', 'Origine', 'Catégorie', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider" style={{ color: '#888' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F0EBE0' : 'none' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: '#1B211E' }}>{p.name}</td>
                  <td className="px-4 py-3" style={{ color: '#666' }}>{p.calibre || '---'}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#D63B27' }}>{p.price} €</td>
                  <td className="px-4 py-3" style={{ color: '#666' }}>{p.unit}</td>
                  <td className="px-4 py-3" style={{ color: '#666' }}>{p.origin}</td>
                  <td className="px-4 py-3" style={{ color: '#666' }}>{p.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg border border-kraft hover:bg-kraft transition-colors"
                        style={{ color: '#20336B' }}>
                        <PencilSimple size={12} /> Éditer
                      </button>
                      <button
                        onClick={() => navigate('editeur')}
                        className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg border border-kraft hover:bg-kraft transition-colors"
                        style={{ color: '#2F7A4D' }}>
                        <Layout size={12} /> Affiche
                      </button>
                      <button
                        onClick={() => del(p.id)}
                        className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg border border-red-100 hover:bg-red-50 transition-colors"
                        style={{ color: '#D63B27' }}>
                        <Trash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm" style={{ color: '#aaa' }}>
                    Aucun produit trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontFamily: 'Fredoka', fontSize: 20, color: '#20336B' }}>
                {editId ? 'Modifier le produit' : 'Nouveau produit'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-kraft transition-colors"
                style={{ color: '#888' }}>
                <X size={16} weight="bold" />
              </button>
            </div>
            <div className="space-y-3">
              {[['name', 'Nom du produit', 'text'], ['price', 'Prix', 'text'], ['origin', 'Origine', 'text'], ['category', 'Catégorie', 'text']].map(([key, label, type]) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#444' }}>{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-kraft text-sm outline-none"
                    style={{ background: '#FAF7EF' }}
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#444' }}>Calibre</label>
                  <select value={form.calibre} onChange={e => setForm(f => ({ ...f, calibre: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-kraft text-sm outline-none"
                    style={{ background: '#FAF7EF' }}>
                    {CALIBRES.map(c => <option key={c} value={c}>{c || '---'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#444' }}>Unité</label>
                  <select value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-kraft text-sm outline-none"
                    style={{ background: '#FAF7EF' }}>
                    {UNITS.map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2 rounded-xl border border-kraft text-sm font-medium hover:bg-kraft transition-colors"
                style={{ color: '#666' }}>
                Annuler
              </button>
              <button
                onClick={save}
                className="flex-1 py-2 rounded-xl font-semibold text-white text-sm hover:opacity-90 transition-opacity"
                style={{ background: '#20336B' }}>
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
