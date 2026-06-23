export const mockPosters = [
  {
    id: 'p1',
    name: 'Tomates cerises',
    category: 'Legumes',
    theme: 'prix-simple',
    produit: 'Tomates cerises',
    categorie: 'Legumes',
    prix: '2,50',
    unite: 'euro/barquette',
    origine: 'France',
    mention: 'Local',
    flagKey: 'france',
    createdAt: '2024-01-15',
  },
  {
    id: 'p2',
    name: 'Baguette tradition',
    category: 'Boulangerie',
    theme: 'promo',
    produit: 'Baguette Tradition',
    categorie: 'Boulangerie',
    prix: '1,20',
    ancienPrix: '1,40',
    unite: 'euro/piece',
    origine: 'France',
    mention: 'Promo',
    flagKey: 'france',
    createdAt: '2024-01-14',
  },
  {
    id: 'p3',
    name: 'Roses rouges',
    category: 'Fleurs',
    theme: 'origine-france',
    produit: 'Roses Rouges',
    categorie: 'Fleurs',
    prix: '12,00',
    unite: 'euro/bouquet',
    origine: 'France',
    mention: '',
    flagKey: 'france',
    createdAt: '2024-01-13',
  },
];

export const mockProducts = [
  { id: 'pr1', name: 'Tomates cerises', category: 'Cat. I', price: '2.50', unit: '/barquette', origin: 'France', calibre: 'Legumes' },
  { id: 'pr2', name: 'Carottes', category: 'Cat. I', price: '1.20', unit: '/kg', origin: 'France', calibre: 'Legumes' },
  { id: 'pr3', name: 'Pommes Golden', category: 'Cat. Extra', price: '2.80', unit: '/kg', origin: 'France', calibre: 'Fruits' },
  { id: 'pr4', name: 'Bananes', category: 'Cat. I', price: '1.90', unit: '/kg', origin: "Cote d'Ivoire", calibre: 'Fruits' },
  { id: 'pr5', name: 'Baguette Tradition', category: '', price: '1.20', unit: '/pièce', origin: 'France', calibre: 'Boulangerie' },
  { id: 'pr6', name: 'Croissant', category: '', price: '1.30', unit: '/pièce', origin: 'France', calibre: 'Boulangerie' },
  { id: 'pr7', name: 'Entrecote', category: '', price: '28.00', unit: '/kg', origin: 'France', calibre: 'Boucherie' },
  { id: 'pr8', name: 'Poulet fermier', category: '', price: '12.50', unit: '/kg', origin: 'France', calibre: 'Volaille' },
];

export const mockCategories = [
  {
    id: 'c1',
    name: 'Fruits',
    children: [
      { id: 'c1a', name: 'Agrumes', children: [] },
      { id: 'c1b', name: 'Fruits rouges', children: [] },
      { id: 'c1c', name: 'Fruits secs', children: [] },
    ],
  },
  {
    id: 'c2',
    name: 'Legumes',
    children: [
      { id: 'c2a', name: 'Salades', children: [] },
      { id: 'c2b', name: 'Cruciferes', children: [] },
      { id: 'c2c', name: 'Alliaces', children: [] },
    ],
  },
  {
    id: 'c3',
    name: 'Boulangerie',
    children: [],
  },
];
