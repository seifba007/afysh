import React, { useState, useContext } from 'react';
import { AppContext } from '../App.jsx';
import Logo from '../components/Logo.jsx';
import { ArrowLeft, Eye, EyeSlash } from '@phosphor-icons/react/dist/ssr';

export default function Auth({ navigate }) {
  const { setUser } = useContext(AppContext);
  const [mode, setMode]         = useState('login');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPwd, setShowPwd]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setUser({ email, name: name || email.split('@')[0], plan: 'free' });
      setLoading(false);
      navigate('onboarding');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FAF7EF' }}>
      <div className="w-full max-w-sm">
        {/* Back to landing */}
        <button
          onClick={() => navigate('landing')}
          className="flex items-center gap-1 text-sm mb-6 hover:underline"
          style={{ color: '#20336B' }}>
          <ArrowLeft size={14} weight="bold" /> Retour à l'accueil
        </button>

        <div className="flex justify-center mb-8">
          <Logo size={48} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-kraft p-8">
          {/* Mode toggle */}
          <div className="flex rounded-xl overflow-hidden border border-kraft mb-6">
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => setMode(m)}
                className="flex-1 py-2 text-sm font-medium transition-colors"
                style={{ background: mode === m ? '#20336B' : 'transparent', color: mode === m ? '#fff' : '#666' }}>
                {m === 'login' ? 'Connexion' : 'Inscription'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#444' }}>
                  Nom de votre commerce
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Primeur du quartier"
                  className="w-full px-3 py-2.5 rounded-xl border border-kraft text-sm outline-none"
                  style={{ background: '#FAF7EF' }}
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#444' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vous@exemple.fr"
                required
                className="w-full px-3 py-2.5 rounded-xl border border-kraft text-sm outline-none"
                style={{ background: '#FAF7EF' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#444' }}>Mot de passe</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2.5 pr-10 rounded-xl border border-kraft text-sm outline-none"
                  style={{ background: '#FAF7EF' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#aaa' }}>
                  {showPwd ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity mt-2"
              style={{ background: '#20336B', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: '#aaa' }}>
          En continuant, vous acceptez nos{' '}
          <a href="#" style={{ color: '#20336B' }}>CGU</a>
        </p>
      </div>
    </div>
  );
}
