import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import productApi from '../api/productAPI';
import { RootState } from '../../../storage';
import { PaginationParams, Product } from '../../../interfaces';
import { RequestState } from '../../../enum';

export interface ProductState {
  loading: RequestState;
  data: {
    products: Product[];
    totalProduct: number;
  };
}
export const initialState: ProductState = {
  loading: RequestState.PENDING,
  data: {
    products: [],
    totalProduct: 0,
  },
};

export const getAllProduct = createAsyncThunk('/products', async () => {
  const allProduct = await productApi.getAllProduct();
  return allProduct.data;
});

export const getProductsPagination = createAsyncThunk(
  '/products?limit=&offset=',
  async (queryParams: PaginationParams, { rejectWithValue }) => {
    try {
      const products = await productApi.getProductPagination(queryParams);
      return products.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const getProductsByCategory = createAsyncThunk('/categories/name-categories/products', async (name: string) => {
  const productByCategory = await productApi.getByCategory(name);
  return productByCategory.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data.products = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state) => {
        state.loading = RequestState.REJECTED;
      })
      .addCase(getProductsPagination.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getProductsPagination.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getProductsPagination.rejected, (state) => {
        state.loading = RequestState.REJECTED;
      });
  },
});

export const selectProductState = (state: RootState) => state.product.data;

export default productSlice.reducer;
