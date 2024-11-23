import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import LoginForm from './components/LoginForm';
import { Container, Box } from '@mui/material';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Récupère le token stocké

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Stocke le token dans le localStorage
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Supprime le token du localStorage
  };

  return (
    <>
      <Navbar onLogout={handleLogout} isLoggedIn={!!token} />
      <Container>
        <Box sx={{ my: 4 }}>
          {!token ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <ProductList token={token} /> // Transmet le token ici
          )}
        </Box>
      </Container>
    </>
  );
};

export default App;
