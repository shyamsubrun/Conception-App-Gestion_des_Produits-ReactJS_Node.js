import React, { useEffect, useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice'; // Import Redux actions
import axios from 'axios';

const ProductList = ({ token }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products); // Redux state
  const [editingRow, setEditingRow] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    price: 0,
    rating: 0,
    warranty_years: 0,
    available: true,
  });

  // Charger les produits au chargement du composant
  useEffect(() => {
    if (token) {
      dispatch(fetchProducts());
    }
  }, [dispatch, token]);

  // Ajouter un produit
  const handleAddProduct = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/products', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchProducts()); // Recharge les produits
      setNewProduct({
        name: '',
        type: '',
        price: 0,
        rating: 0,
        warranty_years: 0,
        available: true,
      });
      setShowAddForm(false);
      console.log('Produit ajouté avec succès:', response.data);
    } catch (error) {
      console.error('Erreur lors de l’ajout du produit:', error);
    }
  };

  // Sauvegarder les modifications
  const handleSave = async (id) => {
    const updatedProduct = {
      ...products.find((product) => product._id === id),
      ...editedProduct[id],
    };

    try {
      await axios.put(`http://localhost:3000/api/products/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchProducts());
      setEditingRow(null);
      setEditedProduct((prevState) => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
      console.log('Produit mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
    }
  };

  // Supprimer un produit
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchProducts()); // Recharge les produits
      console.log('Produit supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
    }
  };

  // Modifier un produit localement
  const handleChange = (id, field, value) => {
    setEditedProduct((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value,
      },
    }));
  };

  // Gérer le formulaire d'ajout
  const handleNewProductChange = (field, value) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [field]: field === 'available' ? value.toLowerCase() === 'oui' : value,
    }));
  };

  if (loading) return <div>Chargement des produits...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <Box>
      {/* Bouton pour afficher ou masquer le formulaire d'ajout */}
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
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
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
            onChange={(e) => handleNewProductChange('price', parseFloat(e.target.value) || 0)}
          />
          <TextField
            label="Note"
            type="number"
            value={newProduct.rating}
            onChange={(e) => handleNewProductChange('rating', parseFloat(e.target.value) || 0)}
          />
          <TextField
            label="Garantie (ans)"
            type="number"
            value={newProduct.warranty_years}
            onChange={(e) => handleNewProductChange('warranty_years', parseInt(e.target.value) || 0)}
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
                      value={editedProduct[product._id]?.name ?? product.name}
                      onChange={(e) => handleChange(product._id, 'name', e.target.value)}
                    />
                  ) : (
                    product.name
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === product._id ? (
                    <TextField
                      value={editedProduct[product._id]?.type ?? product.type}
                      onChange={(e) => handleChange(product._id, 'type', e.target.value)}
                    />
                  ) : (
                    product.type
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === product._id ? (
                    <TextField
                      type="number"
                      value={editedProduct[product._id]?.price ?? product.price}
                      onChange={(e) =>
                        handleChange(product._id, 'price', parseFloat(e.target.value) || 0)
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
                      value={editedProduct[product._id]?.rating ?? product.rating}
                      onChange={(e) =>
                        handleChange(product._id, 'rating', parseFloat(e.target.value) || 0)
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
                      value={editedProduct[product._id]?.warranty_years ?? product.warranty_years}
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
                      value={editedProduct[product._id]?.available
                        ? 'Oui'
                        : product.available
                        ? 'Oui'
                        : 'Non'}
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
                      sx={{ mr: 1 }}
                    >
                      Sauvegarder
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setEditingRow(product._id)}
                      sx={{ mr: 1 }}
                    >
                      Modifier
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(product._id)}
                  >
                    Supprimer
                  </Button>
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
