import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../storage';
import Account from '../../../interfaces/account';
import accountAPI from '../api/accountAPI';
import { RequestState } from '../../../enum';

export interface AccountState {
  loading: RequestState;
  data: {
    user: Account[];
    totalUser: number;
  };
}

export const initialState: AccountState = {
  loading: RequestState.PENDING,
  data: {
    user: [],
    totalUser: 0,
  },
};

export const getAllUser = createAsyncThunk('/users', async () => {
  const allUser = await accountAPI.getAllUser();
  return allUser.data;
});

export const getAccountPagination = createAsyncThunk(
  '/users?limit=&offset=',
  async (queryParams: { limit?: number; offset?: number }, { rejectWithValue }) => {
    try {
      const account = await accountAPI.getUserPagination(queryParams);
      return account.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccountPagination.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getAccountPagination.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getAccountPagination.rejected, (state) => {
        state.loading = RequestState.REJECTED;
      });
  },
});

export const selectAccountState = (state: RootState) => state.account.data;

export default accountSlice.reducer;
