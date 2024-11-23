const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const User = require('../models/User'); // Modèle MongoDB

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Route pour l'inscription
router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe trop court'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Vérifie si l'utilisateur existe déjà
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: 'Utilisateur déjà existant' });
      }

      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crée un nouvel utilisateur
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
      console.error('Erreur lors de la création de l’utilisateur :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
);

// Route pour la connexion
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').exists().withMessage('Mot de passe requis'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Recherche de l'utilisateur
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Utilisateur non trouvé' });
      }

      // Vérifie le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Mot de passe incorrect' });
      }

      // Génère un token JWT
      const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: 'Connexion réussie', token });
    } catch (err) {
      console.error('Erreur serveur :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
);

module.exports = router;
