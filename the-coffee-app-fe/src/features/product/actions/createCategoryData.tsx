import { RootState } from '../../../storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestState } from '../../../enum';
import categoryApi, { UpdateCategoryParams } from '../api/categoryAPI';

export interface CreateCategoryState {
  loading: RequestState;
  data: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const initialState: CreateCategoryState = {
  loading: RequestState.PENDING,
  data: '',
  error: {
    message: '',
    status: null,
  },
};

export const createCategory = createAsyncThunk(
  '/create-category',
  async (body: { name: string }, { rejectWithValue }) => {
    try {
      const categories = await categoryApi.createCategory(body);
      return categories.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
  },
);

export const updateCategory = createAsyncThunk(
  '/update-category',
  async (updateCategoryParams: UpdateCategoryParams, { rejectWithValue }) => {
    try {
      const categories = await categoryApi.updateCategory(updateCategoryParams);
      return categories.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
  },
);

const createCategorySlice = createSlice({
  name: 'categoryForStaff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data = action.payload;
        state.error = initialState.error;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data = action.payload;
        state.error = initialState.error;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectCreateCategoryState = (state: RootState) => state.createCategory.data;
export default createCategorySlice.reducer;
