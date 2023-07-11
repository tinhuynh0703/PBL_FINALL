import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../storage';
import searchAPI from '../api/searchAPI';
import { Product } from '../../../interfaces/product';
import { RequestState } from '../../../enum';

export interface ProductState {
  loading: RequestState;
  data: Product[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const initialState: ProductState = {
  loading: RequestState.PENDING,
  data: [],
  error: {
    message: '',
    status: null,
  },
};

export const getSearchItems = createAsyncThunk(
  '/products/search?keyword=name',
  async (name: string, { rejectWithValue }) => {
    try {
      const allItems = await searchAPI.getByName(name);
      return allItems.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchItems.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getSearchItems.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getSearchItems.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectSearchState = (state: RootState) => state.search.data;
export const searchLoadingState = (state: RootState) => state.search.loading;
export default searchSlice.reducer;
