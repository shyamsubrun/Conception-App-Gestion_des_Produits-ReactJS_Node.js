import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';


const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]); // Liste des produits depuis le backend
  const [editingRow, setEditingRow] = useState(null); // Gestion de l'édition
  const [showAddForm, setShowAddForm] = useState(false); // Affichage du formulaire d'ajout
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    price: 0,
    rating: 0,
    warranty_years: 0,
    available: true,
  }); // Valeurs du formulaire d'ajout

  // Charger les données depuis le backend
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:3000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans le header
          },
        })
        .then((response) => {
          setProducts(response.data); // Stocke les données reçues
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des produits :', error);
        });
    }
  }, [token]); // Dépendance sur le token

  // Gestion de l'ajout de produit
  const handleAddProduct = () => {
    axios
      .post('http://localhost:3000/api/products', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajout du token
        },
      })
      .then((response) => {
        setProducts((prevProducts) => [...prevProducts, response.data]); // Ajoute le produit
        setNewProduct({
          name: '',
          type: '',
          price: 0,
          rating: 0,
          warranty_years: 0,
          available: true,
        });
        setShowAddForm(false);
      })
      .catch((error) => {
        console.error('Erreur lors de l’ajout du produit :', error);
      });
  };

  // Gestion de la sauvegarde
  const handleSave = (id) => {
    const updatedProduct = products.find((product) => product._id === id);

    axios
      .put(`http://localhost:3000/api/products/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajout du token
        },
      })
      .then((response) => {
        console.log('Produit mis à jour :', response.data);
        setEditingRow(null); // Quitte le mode édition
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour :', error);
      });
  };

  // Gestion des modifications locales
  const handleChange = (id, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, [field]: value } : product
      )
    );
  };

  // Gestion des modifications pour le formulaire d'ajout
  const handleNewProductChange = (field, value) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [field]: field === 'available' ? value.toLowerCase() === 'oui' : value,
    }));
  };
  const handleEdit = (id) => {
    setEditingRow(id); // Définit la ligne en cours d'édition
  };
  
  return (
    <Box>
      {/* Bouton pour afficher/masquer le formulaire d'ajout */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddForm(!showAddForm)}
        sx={{ mb: 2 }}
      >
        {showAddForm ? 'Masquer le formulaire' : 'Ajouter un produit'}
      </Button>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}
        >
          <TextField
            label="Nom"
            value={newProduct.name}
            onChange={(e) => handleNewProductChange('name', e.target.value)}
          />
          <TextField
            label="Type"
            value={newProduct.type}
            onChange={(e) => handleNewProductChange('type', e.target.value)}
          />
          <TextField
            label="Prix (€)"
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              handleNewProductChange('price', parseFloat(e.target.value) || 0)
            }
          />
          <TextField
            label="Note"
            type="number"
            value={newProduct.rating}
            onChange={(e) =>
              handleNewProductChange('rating', parseFloat(e.target.value) || 0)
            }
          />
          <TextField
            label="Garantie (ans)"
            type="number"
            value={newProduct.warranty_years}
            onChange={(e) =>
              handleNewProductChange('warranty_years', parseInt(e.target.value) || 0)
            }
          />
          <TextField
            label="Disponible"
            value={newProduct.available ? 'Oui' : 'Non'}
            onChange={(e) => handleNewProductChange('available', e.target.value)}
          />
          <Button variant="contained" color="success" onClick={handleAddProduct}>
            Ajouter
          </Button>
        </Box>
      )}

      {/* Tableau des produits */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Prix (€)</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Garantie (ans)</TableCell>
              <TableCell>Disponible</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  {editingRow === product._id ? (
                    <TextField
                      value={product.name}
                      onChange={(e) =>
                        handleChange(product._id, 'name', e.target.value)
                      }
                    />
                  ) : (
                    product.name
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === product._id ? (
                    <TextField
                      value={product.type}
                      onChange={(e) =>
                        handleChange(product._id, 'type', e.target.value)
                      }
                    />
                  ) : (
                    product.type
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === product._id ? (
                    <TextField
                      type="number"
                      value={product.price}
                      onChange={(e) =>
                        handleChange(
                          product._id,
                          'price',
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  ) : (
                    product.price.toFixed(2)
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === product._id ? (
                    <TextField
                      type="number"
                      value={product.rating}
                      onChange={(e) =>
                        handleChange(
                          product._id,
                          'rating',
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  ) : (
                    product.rating
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === product._id ? (
                    <TextField
                      type="number"
                      value={product.warranty_years}
                      onChange={(e) =>
                        handleChange(
                          product._id,
                          'warranty_years',
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  ) : (
                    product.warranty_years
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === product._id ? (
                    <TextField
                      value={product.available ? 'Oui' : 'Non'}
                      onChange={(e) =>
                        handleChange(
                          product._id,
                          'available',
                          e.target.value.toLowerCase() === 'oui'
                        )
                      }
                    />
                  ) : (
                    product.available ? 'Oui' : 'Non'
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === product._id ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(product._id)}
                    >
                      Sauvegarder
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleEdit(product._id)}
                    >
                      Modifier
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;
