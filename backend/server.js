const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Déclaré une seule fois
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:3001', // Autorise uniquement le frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization', // Autorise les en-têtes nécessaires
};
app.use(cors(corsOptions));

// Middleware pour traiter le JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch((err) => console.error('Erreur MongoDB :', err));

// Import des routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

// Déclaration des routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Test de l'API
app.get('/', (req, res) => {
  res.send('API Backend Fonctionnelle !');
});

// Exemple pour ajouter un produit
app.get('/api/test-add', async (req, res) => {
  const Product = require('./models/Product');
  const sampleProduct = {
    name: 'Sample Phone',
    type: 'phone',
    price: 123.45,
    rating: 4.5,
    warranty_years: 2,
    available: true,
  };

  try {
    const product = new Product(sampleProduct);
    await product.save();
    res.json({ message: 'Produit ajouté avec succès', product });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l’ajout du produit' });
  }
});

// Exemple pour lister les produits
app.get('/api/test-list', async (req, res) => {
  const Product = require('./models/Product');

  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

// Démarrage du serveur
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
