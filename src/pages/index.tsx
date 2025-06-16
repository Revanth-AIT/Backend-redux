// src/pages/products/index.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '@/redux/productsSlice';
import { RootState, AppDispatch } from '@/redux/store';
import Grid from '@mui/material/Grid';


import {
  Container, Typography, Card, CardContent, CardActions,
   Button, CircularProgress
} from '@mui/material';
import { useRouter } from 'next/router';

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { list, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteProduct(id));
  };

  return (
    <Container>
      <Typography variant="h4">Product List</Typography>
      <Button variant="contained" sx={{ my: 2 }} onClick={() => router.push('/products/create')}>Add Product</Button>
      {loading ? <CircularProgress /> : (
        <Grid container spacing={2}>
  {list.map(product => (
    <Grid item xs={12} sm={6} md={4} key={product._id}>
      <Card>
        <CardContent>
          <Typography variant="h6">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography>₹{product.price}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => router.push(`/products/edit/${product._id}`)}>Edit</Button>
          <Button onClick={() => handleDelete(product._id)} color="error">Delete</Button>
        </CardActions>
      </Card>
    </Grid>
  ))}
         </Grid>

      )}
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default ProductList;
