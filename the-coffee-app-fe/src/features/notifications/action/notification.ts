import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestState } from '../../../enum';
import NotificationPickUpOrderApi, { BodyApiNotificationPickUpOrder } from '../api/sendNotificationPickUpOrder';

export interface NotificationState {
  loading?: RequestState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const initialState: NotificationState = {
  loading: RequestState.PENDING,
  error: {
    message: '',
    status: null,
  },
};

export const sendNotificationRemindPickUpOrder = createAsyncThunk(
  '/notifications/remind',
  async (body: BodyApiNotificationPickUpOrder, { rejectWithValue }) => {
    try {
      const response = await NotificationPickUpOrderApi.send(body);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendNotificationRemindPickUpOrder.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(sendNotificationRemindPickUpOrder.fulfilled, (state) => {
        state.loading = RequestState.FULFILLED;
      })
      .addCase(sendNotificationRemindPickUpOrder.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
