// src/pages/products/edit/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchProducts, updateProduct } from '@/redux/productsSlice';
import {
  Container, TextField, Button, Typography, Box, CircularProgress, Snackbar, Alert
} from '@mui/material';

const EditProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = router.query;
  const { list, loading } = useSelector((state: RootState) => state.products);

  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!list.length) {
      dispatch(fetchProducts());
    } else if (id) {
      const product = list.find(p => p._id === id);
      if (product) {
        setName(product.name);
        setDesc(product.description);
        setPrice(product.price.toString());
        setStock(product.stock.toString());
      }
    }
  }, [dispatch, id, list]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image) formData.append('image', image);

    try {
      await dispatch(updateProduct({ id: id as string, formData })).unwrap();
      setOpen(true);
      router.push('/products');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !id) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" mb={2}>Edit Product</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField fullWidth label="Name" value={name} onChange={e => setName(e.target.value)} margin="normal" />
        <TextField fullWidth label="Description" value={description} onChange={e => setDesc(e.target.value)} margin="normal" />
        <TextField fullWidth label="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} margin="normal" />
        <TextField fullWidth label="Stock" type="number" value={stock} onChange={e => setStock(e.target.value)} margin="normal" />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload New Image
          <input type="file" hidden onChange={e => setImage(e.target.files?.[0] || null)} />
        </Button>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>Update</Button>
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>Product updated!</Alert>
      </Snackbar>
    </Container>
  );
};

export default EditProduct;
