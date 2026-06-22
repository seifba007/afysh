import React, { useState, useContext } from 'react';
import { AppContext } from '../App.jsx';
import Logo from '../components/Logo.jsx';
import {
  Leaf, Grains, Flower, Knife, Package, Wrench,
  UploadSimple, ArrowRight, CheckCircle, X,
} from '@phosphor-icons/react/dist/ssr';

const TRADES = [
  { id: 'primeur',     label: 'Primeur',     color: '#2F7A4D', Icon: Leaf },
  { id: 'boulangerie', label: 'Boulangerie', color: '#C97B2A', Icon: Grains },
  { id: 'fleuriste',   label: 'Fleuriste',   color: '#D4537E', Icon: Flower },
  { id: 'boucherie',   label: 'Boucherie',   color: '#A32D2D', Icon: Knife },
  { id: 'fromager',    label: 'Fromagerie',  color: '#C9A227', Icon: Package },
  { id: 'services',    label: 'Services',    color: '#20336B', Icon: Wrench },
];

export default function Onboarding({ navigate }) {
  const { setUser, user } = useContext(AppContext);
  const [step, setStep]           = useState(0);
  const [storeName, setStoreName] = useState(user?.name || '');
  const [trade, setTrade]         = useState('');
  const [logo, setLogo]         = useState(null);
  const [logoError, setLogoError] = useState('');
  const fileRef = React.useRef(null);

  const handleLogoFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setLogoError('Fichier trop lourd (max 2 MB)'); return; }
    setLogoError('');
    const reader = new FileReader();
    reader.onload = (ev) => setLogo(ev.target.result);
    reader.readAsDataURL(file);
  };

  const next = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setUser(prev => ({ ...prev, storeName, trade, logo }));
      navigate('espace');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FAF7EF' }}>
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <button onClick={() => navigate('landing')}>
            <Logo size={40} />
          </button>
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map(i => (
            <div key={i} className="h-2 rounded-full transition-all" style={{ background: i <= step ? '#20336B' : '#E7DCC4', width: i === step ? 24 : 8 }} />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-kraft p-8 shadow-sm">

          {/* Step 0 — store name */}
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: 'Fredoka', fontSize: 24, color: '#20336B', marginBottom: 8 }}>
                Bienvenue ! Comment s'appelle votre commerce ?
              </h2>
              <p className="text-sm mb-6" style={{ color: '#888' }}>Ce nom apparaîtra sur vos affiches.</p>
              <input
                type="text"
                value={storeName}
                onChange={e => setStoreName(e.target.value)}
                placeholder="Ex: Primeur du Marché"
                className="w-full px-4 py-3 rounded-xl border border-kraft text-base outline-none mb-4"
                style={{ background: '#FAF7EF' }}
                autoFocus
              />
            </div>
          )}

          {/* Step 1 — trade type */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'Fredoka', fontSize: 24, color: '#20336B', marginBottom: 8 }}>
                Quel est votre type de commerce ?
              </h2>
              <p className="text-sm mb-6" style={{ color: '#888' }}>Nous adapterons les thèmes à votre activité.</p>
              <div className="grid grid-cols-2 gap-3">
                {TRADES.map(({ id, label, color, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTrade(id)}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all"
                    style={{ borderColor: trade === id ? color : '#E7DCC4', background: trade === id ? color + '15' : '#fff' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: trade === id ? color + '25' : '#F5F2EA' }}>
                      <Icon size={18} weight={trade === id ? 'fill' : 'regular'} style={{ color: trade === id ? color : '#888' }} />
                    </div>
                    <div className="font-medium text-sm" style={{ color: trade === id ? color : '#333' }}>{label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — logo upload */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: 'Fredoka', fontSize: 24, color: '#20336B', marginBottom: 8 }}>
                Ajoutez votre logo (optionnel)
              </h2>
              <p className="text-sm mb-6" style={{ color: '#888' }}>Il apparaîtra sur vos affiches. Vous pouvez le faire plus tard.</p>

              {/* Hidden file input */}
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                className="hidden"
                onChange={handleLogoFile}
              />

              {logo ? (
                /* Preview after upload */
                <div className="border-2 border-kraft rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-4">
                    <img src={logo} alt="Logo" className="w-20 h-20 object-contain rounded-lg border border-kraft bg-white" />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 text-sm font-medium mb-1" style={{ color: '#2F7A4D' }}>
                        <CheckCircle size={16} weight="fill" /> Logo chargé avec succès
                      </div>
                      <button
                        onClick={() => setLogo(null)}
                        className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border border-kraft hover:bg-kraft transition-colors mt-1"
                        style={{ color: '#D63B27' }}>
                        <X size={11} weight="bold" /> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Drop zone */
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full border-2 border-dashed border-kraft rounded-xl p-8 text-center hover:bg-kraft transition-colors mb-4 focus:outline-none"
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      const fakeEvt = { target: { files: [file] } };
                      handleLogoFile(fakeEvt);
                    }
                  }}>
                  <div className="flex justify-center mb-3">
                    <UploadSimple size={36} weight="duotone" style={{ color: '#bbb' }} />
                  </div>
                  <p className="text-sm" style={{ color: '#888' }}>Cliquez ou glissez votre logo ici</p>
                  <p className="text-xs mt-1" style={{ color: '#bbb' }}>PNG, JPG ou SVG — max 2 MB</p>
                </button>
              )}
              {logoError && (
                <p className="text-xs mt-2 text-center" style={{ color: '#D63B27' }}>{logoError}</p>
              )}
            </div>
          )}

          <button
            onClick={next}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white mt-4 transition-opacity hover:opacity-90"
            style={{ background: '#20336B' }}>
            {step < 2 ? (
              <>Continuer <ArrowRight size={16} weight="bold" /></>
            ) : (
              <>Accéder à mon espace <ArrowRight size={16} weight="bold" /></>
            )}
          </button>
        </div>

        <p className="text-center text-xs mt-3" style={{ color: '#bbb' }}>Étape {step + 1} sur 3</p>
      </div>
    </div>
  );
}
