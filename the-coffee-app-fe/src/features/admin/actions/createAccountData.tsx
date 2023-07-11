import { RootState } from '../../../storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Account from '../../../interfaces/account';
import accountApi, { UpdateUserParams } from '../api/accountAPI';
import { UserTypeDto } from '../../../interfaces';
import { RequestState } from '../../../enum';

export interface CreateAccountState {
  loading: RequestState;
  data: Account;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const initialState: CreateAccountState = {
  loading: RequestState.PENDING,
  data: {
    id: '',
    username: '',
    password: '',
    name: '',
    email: '',
    phoneNumber: '',
    role: {
      id: '',
      name: '',
    },
    avatarUrl: '',
    available: '',
    freeUnit: 0,
  },
  error: {
    message: '',
    status: null,
  },
};
export const createAccount = createAsyncThunk('/create-account', async (body: UserTypeDto, { rejectWithValue }) => {
  try {
    const account = await accountApi.createAccount(body);
    return account.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.data);
  }
});

export const updateAccount = createAsyncThunk(
  '/update-account',
  async (updateUserParams: UpdateUserParams, { rejectWithValue }) => {
    try {
      const account = await accountApi.updateAccount(updateUserParams);
      return account.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
  },
);

const createAccountSlice = createSlice({
  name: 'createProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data = action.payload;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
        state.error = initialState.error;
      })
      .addCase(updateAccount.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data = action.payload;
        state.error = initialState.error;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectCreateAccountState = (state: RootState) => state.createAccount.data;

export default createAccountSlice.reducer;
