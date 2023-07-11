import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import OrderHistory from '../api/historyAPI';
import { RootState } from '../../../storage';
import Order from '../../../interfaces/order';
import { logout } from '../../auth/actions/auth';
import { OrderStatus, RequestState } from '../../../enum';

export interface myOrdersDetails {
  loading: RequestState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  data: Order[];
}
export const initialState: myOrdersDetails = {
  loading: RequestState.PENDING,
  data: [],
  error: {
    message: '',
    status: null,
  },
};
export const getMyOrders = createAsyncThunk('/user/orders', async (_, { rejectWithValue }) => {
  try {
    const responseMyOrderData = await OrderHistory.myOrders();
    return responseMyOrderData.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.data);
  }
});

const myOrderSlice = createSlice({
  name: 'myOrder',
  initialState,
  reducers: {
    cancelMyOrder: (state, action: PayloadAction<string>) => {
      const index = state.data.findIndex((order) => order.id === action.payload);
      state.data[index].orderStatus.name = OrderStatus.CANCELED;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      });
  },
});

export const { cancelMyOrder } = myOrderSlice.actions;
export const getMyOrderState = (state: RootState) => state.myOrder.data;
export const getMyOrderLoading = (state: RootState) => state.myOrder.loading;
export default myOrderSlice.reducer;
