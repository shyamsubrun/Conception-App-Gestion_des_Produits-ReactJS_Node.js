const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Accès non autorisé, token manquant' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token invalide' });
  }
};

module.exports = authenticateToken;
