import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = ({ onLogout, isLoggedIn }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Gestion des Produits
      </Typography>
      {isLoggedIn && (
        <Button color="inherit" onClick={onLogout}>
          Déconnexion
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

export default Navbar;
