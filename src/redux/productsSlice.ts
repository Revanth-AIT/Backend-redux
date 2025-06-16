// src/redux/productsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

interface ProductState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  list: [],
  loading: false,
  error: null,
};

const API = 'http://localhost:3000/products';
const token = () => localStorage.getItem('token');

export const fetchProducts = createAsyncThunk('products/fetch', async (_, thunkAPI) => {
  try {
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const createProduct = createAsyncThunk('products/create', async (formData: FormData, thunkAPI) => {
  try {
    const res = await axios.post(API, formData, {
      headers: {
        Authorization: `Bearer ${token()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, formData }: { id: string; formData: FormData }, thunkAPI) => {
    try {
      const res = await axios.put(`${API}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token()}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk('products/delete', async (id: string, thunkAPI) => {
  try {
    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return id;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p._id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
