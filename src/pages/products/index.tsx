import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/productsSlice';
import { RootState, AppDispatch } from '@/redux/store';
import { CircularProgress, Container, Typography, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid';

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      
      <Grid container spacing={2}>
        {list.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>{product.description}</Typography>
                <Typography>₹{product.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;