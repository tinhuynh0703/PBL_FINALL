import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import categoryApi from '../api/categoryAPI';
import { RootState } from '../../../storage';
import Category from '../../../interfaces/category';
import { RequestState } from '../../../enum';
import { PaginationParams } from '../../../interfaces';
export interface CategoryState {
  loading: RequestState;
  data: {
    categories: Category[];
    totalCategories: number;
  };
}
export const initialState: CategoryState = {
  loading: RequestState.PENDING,
  data: {
    categories: [],
    totalCategories: 0,
  },
};

export const getAllCategory = createAsyncThunk('/categories', async (paginationParams?: PaginationParams) => {
  const allCategory = await categoryApi.getAll(paginationParams);
  return allCategory.data;
});

export const getCategory = createAsyncThunk('/categories/name-categories', async (name: string) => {
  const category = await categoryApi.get(name);
  return category.data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        if (action.payload.totalCategories) {
          state.data = action.payload;
        } else {
          state.data.categories = action.payload;
        }
      })
      .addCase(getAllCategory.rejected, (state) => {
        state.loading = RequestState.REJECTED;
      });
  },
});

export const selectCategoryState = (state: RootState) => state.category.data;

export default categorySlice.reducer;
