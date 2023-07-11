import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Webhook from '../api/webhookAPI';
import { RootState } from '../../../storage';
import { WebhookParams } from '../types/types';
import { RequestState } from '../../../enum';

export interface WebhookDetail {
  loading: RequestState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  webhookData: string;
}

export const initialState: WebhookDetail = {
  loading: RequestState.PENDING,
  error: {
    message: '',
    status: null,
  },
  webhookData: '',
};

export const getWebhook = createAsyncThunk('/users/get-webhook', async (_, { rejectWithValue }) => {
  try {
    const responseWebhookData = await Webhook.getWebhook();
    return responseWebhookData.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.data);
  }
});

export const updateWebhook = createAsyncThunk(
  '/users/update-webhook',
  async (webHook: WebhookParams, { rejectWithValue }) => {
    try {
      const updateWebhookData = await Webhook.updateWebhook(webHook);
      return updateWebhookData.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
  },
);

const webhookSlice = createSlice({
  name: 'webhook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWebhook.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getWebhook.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.webhookData = action.payload;
      })
      .addCase(getWebhook.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      })
      .addCase(updateWebhook.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(updateWebhook.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.webhookData = action.payload;
      })
      .addCase(updateWebhook.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      });
  },
});
export const selectWebhookData = (state: RootState) => state.webhook.webhookData;
export default webhookSlice.reducer;
