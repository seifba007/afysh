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
  { id: 'pr1', name: 'Tomates cerises', calibre: 'Cat. I', price: '2.50', unit: 'euro/barquette', origin: 'France', category: 'Legumes' },
  { id: 'pr2', name: 'Carottes', calibre: 'Cat. I', price: '1.20', unit: 'euro/kg', origin: 'France', category: 'Legumes' },
  { id: 'pr3', name: 'Pommes Golden', calibre: 'Cat. Extra', price: '2.80', unit: 'euro/kg', origin: 'France', category: 'Fruits' },
  { id: 'pr4', name: 'Bananes', calibre: 'Cat. I', price: '1.90', unit: 'euro/kg', origin: "Cote d'Ivoire", category: 'Fruits' },
  { id: 'pr5', name: 'Baguette Tradition', calibre: '', price: '1.20', unit: 'euro/piece', origin: 'France', category: 'Boulangerie' },
  { id: 'pr6', name: 'Croissant', calibre: '', price: '1.30', unit: 'euro/piece', origin: 'France', category: 'Boulangerie' },
  { id: 'pr7', name: 'Entrecote', calibre: '', price: '28.00', unit: 'euro/kg', origin: 'France', category: 'Boucherie' },
  { id: 'pr8', name: 'Poulet fermier', calibre: '', price: '12.50', unit: 'euro/kg', origin: 'France', category: 'Volaille' },
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
