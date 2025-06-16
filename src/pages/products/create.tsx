// src/pages/products/create.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { createProduct } from '@/redux/productsSlice';
import {
  Container, TextField, Button, Typography, Box, Snackbar, Alert
} from '@mui/material';
import { useRouter } from 'next/router';

const CreateProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image) formData.append('image', image);

    try {
      await dispatch(createProduct(formData)).unwrap();
      setOpen(true);
      router.push('/products');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" mb={2}>Create Product</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField fullWidth label="Name" value={name} onChange={e => setName(e.target.value)} margin="normal" />
        <TextField fullWidth label="Description" value={description} onChange={e => setDesc(e.target.value)} margin="normal" />
        <TextField fullWidth label="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} margin="normal" />
        <TextField fullWidth label="Stock" type="number" value={stock} onChange={e => setStock(e.target.value)} margin="normal" />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Image
          <input type="file" hidden onChange={e => setImage(e.target.files?.[0] || null)} />
        </Button>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>Submit</Button>
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>Product created!</Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateProduct;
