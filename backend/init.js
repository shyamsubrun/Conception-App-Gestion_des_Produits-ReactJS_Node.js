const User = require('./models/User'); // Import du modèle utilisateur
const bcrypt = require('bcryptjs');

// Fonction pour créer un utilisateur par défaut
const createDefaultUser = async () => {
  const defaultEmail = 'test@example.com';
  const defaultPassword = 'password123'; // Changez si nécessaire

  try {
    // Vérifiez si l'utilisateur par défaut existe déjà
    const existingUser = await User.findOne({ email: defaultEmail });
    if (existingUser) {
      console.log('Utilisateur par défaut déjà existant.');
      return;
    }

    // Créez un utilisateur par défaut
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const defaultUser = new User({ email: defaultEmail, password: hashedPassword });
    await defaultUser.save();
    console.log('Utilisateur par défaut créé avec succès :', defaultEmail);
  } catch (error) {
    console.error('Erreur lors de la création de l’utilisateur par défaut :', error);
  }
};

module.exports = { createDefaultUser };
