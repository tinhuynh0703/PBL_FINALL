import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestState } from '../../../enum';
import Order from '../../../interfaces/order';
import { RootState } from '../../../storage';
import OrderAPI from '../api/orderAPI';
import { getOrderByDateParams } from '../api/orderParams';
export interface OrderReport {
  loading: RequestState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  data: {
    listOrder: Order[];
    totalOrder: number;
  };
}

export const initialState: OrderReport = {
  loading: RequestState.PENDING,
  error: {
    message: '',
    status: null,
  },
  data: {
    listOrder: [],
    totalOrder: 0,
  },
};

export const getOrderByDate = createAsyncThunk(
  '/get-order-by-date',
  async (param: getOrderByDateParams, { rejectWithValue }) => {
    try {
      const responseOrderData = await OrderAPI.getOrderByDate(param);
      // eslint-disable-next-line no-console
      return responseOrderData.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
  },
);

const orderByDateSlice = createSlice({
  name: 'get-order-by-date',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderByDate.pending, (state) => {
      state.loading = RequestState.PENDING;
    });
    builder.addCase(getOrderByDate.fulfilled, (state, action) => {
      state.loading = RequestState.FULFILLED;
      state.data = action.payload;
    });
    builder.addCase(getOrderByDate.rejected, (state, action) => {
      state.loading = RequestState.REJECTED;
      state.error = action.payload;
    });
  },
});
export default orderByDateSlice.reducer;
export const selectOrderByDateState = (state: RootState) => state.orderByDate.data;
