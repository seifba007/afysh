import React, { useState, createContext } from 'react';
import Landing from './pages/Landing.jsx';
import Auth from './pages/Auth.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Espace from './pages/Espace.jsx';
import Catalogue from './pages/Catalogue.jsx';
import Editeur from './pages/Editeur.jsx';
import Billing from './pages/Billing.jsx';
import { mockPosters, mockProducts } from './lib/mockData.js';

export const AppContext = createContext(null);

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState('free');
  const [posters, setPosters] = useState(mockPosters);
  const [products, setProducts] = useState(mockProducts);
  const [editingPosterId, setEditingPosterId] = useState(null);

  const navigate = (page, posterId = null) => {
    setEditingPosterId(posterId);
    setCurrentPage(page);
  };

  const ctx = {
    user, setUser,
    plan, setPlan,
    posters, setPosters,
    products, setProducts,
    currentPage, navigate,
    editingPosterId, setEditingPosterId,
  };

  const pages = { landing: Landing, auth: Auth, onboarding: Onboarding, espace: Espace, catalogue: Catalogue, editeur: Editeur, billing: Billing };
  const Page = pages[currentPage] || Landing;

  return (
    <AppContext.Provider value={ctx}>
      <Page navigate={navigate} />
    </AppContext.Provider>
  );
}
