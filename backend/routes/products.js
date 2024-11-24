const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Récupérer tous les produits
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Ajouter un produit
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création du produit' });
  }
});

// Mettre à jour un produit
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour du produit' });
  }
});

// Supprimer un produit
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la suppression du produit' });
  }
});

const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

router.get('/test-protected', authenticateToken, (req, res) => {
  res.json({ message: 'Accès autorisé à la route protégée', user: req.user });
});
module.exports = router;
