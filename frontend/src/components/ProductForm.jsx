import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ProductForm = ({ onSave }) => {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Nom" name="name" value={product.name} onChange={handleChange} />
      <TextField label="Type" name="type" value={product.type} onChange={handleChange} />
      <TextField label="Prix" name="price" value={product.price} onChange={handleChange} type="number" />
      <TextField label="Note" name="rating" value={product.rating} onChange={handleChange} type="number" />
      <TextField label="Garantie (ans)" name="warranty_years" value={product.warranty_years} onChange={handleChange} type="number" />
      <Button type="submit" variant="contained">Enregistrer</Button>
    </Box>
  );
};

export default ProductForm;
