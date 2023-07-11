import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestState } from '../../../enum';
import Order from '../../../interfaces/order';
import { RootState } from '../../../storage';
import UpdateStatusOrderApi from '../api/updateOrderApi';

export interface UpdateStatusOrder {
  order: Order;
  loading?: RequestState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}
export const initialState: UpdateStatusOrder = {
  order: {
    product: {
      price: 0,
      name: '',
      id: '',
      images: '',
    },
    quantityBilled: 0,
    orderStatus: {
      id: '',
      name: '',
      value: 0,
    },
    note: '',
    quantity: 0,
    user: {
      id: '',
      name: '',
      phoneNumber: '',
      avatarUrl: '',
    },
    createdAt: '',
    id: '',
    reason: '',
    productPrice: 0,
  },
  loading: RequestState.PENDING,
  error: {
    message: '',
    status: null,
  },
};

export const updateStatusOrder = createAsyncThunk(
  '/orders/{id}',
  async (data: { id: string; newStatus: number; reason?: string }, { rejectWithValue }) => {
    try {
      const response = await UpdateStatusOrderApi.updateStatusOrder(data.id, data.newStatus, data.reason);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

const updateStatusOrderSlice = createSlice({
  name: 'updateStatusOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStatusOrder.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(updateStatusOrder.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.order = action.payload;
      })
      .addCase(updateStatusOrder.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      });
  },
});

export const updateStatusOrderState = (state: RootState) => state.updateStatusOrder.order;

export default updateStatusOrderSlice.reducer;
