import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestState } from '../../../enum';
import Order from '../api/orderAPI';
import { updateOrderParams } from '../api/orderParams';
export interface OrderDetail {
  loading: RequestState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const initialState: OrderDetail = {
  loading: RequestState.PENDING,
  error: {
    message: '',
    status: null,
  },
};

export const updateOrder = createAsyncThunk(
  '/update-order',
  async (updateProductParams: updateOrderParams, { rejectWithValue }) => {
    try {
      const responseOrderData = await Order.updateOrder(updateProductParams);
      return responseOrderData.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
  },
);

const updateOrderSlice = createSlice({
  name: 'update-order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateOrder.pending, (state) => {
      state.loading = RequestState.PENDING;
    });
    builder.addCase(updateOrder.fulfilled, (state) => {
      state.loading = RequestState.FULFILLED;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.loading = RequestState.REJECTED;
      state.error = action.payload;
    });
  },
});
export default updateOrderSlice.reducer;
