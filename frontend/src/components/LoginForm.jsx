import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    console.log('Données envoyées :', { email, password }); // Log des données
  
    axios
      .post('http://localhost:3000/api/auth/login', { email, password })
      .then((response) => {
        onLogin(response.data.token); // Passe le token à l'application principale
        setError('');
      })
      .catch((error) => {
        setError('Erreur lors de la connexion. Vérifiez vos informations.');
        console.error('Erreur de connexion :', error);
      });
  };
  

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Connexion
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Mot de passe"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Se connecter
      </Button>
    </Box>
  );
};

export default LoginForm;
