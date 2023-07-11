import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import OrderHistory from '../api/historyAPI';
import { RootState } from '../../../storage';
import Order from '../../../interfaces/order';
import { logout } from '../../auth/actions/auth';
import { OrderStatus, RequestState } from '../../../enum';
import MyCart from "../api/cart";

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
export const getMyCart = createAsyncThunk('/user/carts', async (_, { rejectWithValue }) => {
  try {
    const responseMyCartData = await MyCart.myCart();
    return responseMyCartData.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.data);
  }
});

const myCartSlice = createSlice({
  name: 'myCart',
  initialState,
  reducers: {
    // cancelMyOrder: (state, action: PayloadAction<string>) => {
    //   const index = state.data.findIndex((order) => order.id === action.payload);
    //   state.data[index].orderStatus.name = OrderStatus.CANCELED;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyCart.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getMyCart.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getMyCart.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      });
  },
});

// export const { cancelMyOrder } = myCartSlice.actions;
export const getMyCartState = (state: RootState) => state.myCart.data;
export const getMyCartLoading = (state: RootState) => state.myCart.loading;
export default myCartSlice.reducer;
