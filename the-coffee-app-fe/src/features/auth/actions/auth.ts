import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Auth from '../api/Token/Auth';
import { LogoutParams, UserParams } from '../api/Token/types';
import { RootState } from '../../../storage';
import http from '../../../services/http-common';
import GetUserData from '../api/UserData/GetUserData';
import { UserInfor } from '../types/userInfor.type';
import { RequestState, ROLE } from '../../../enum';

export interface AuthState {
  loading?: RequestState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  data: UserInfor;
}

export const initialState: AuthState = {
  data: {
    jwtAccessToken: '',
    userInfor: {
      role: '',
      avatarUrl: '',
      freeUnit: 0,
      phoneNumber: '',
      email: '',
      name: '',
      _id: '',
      deviceToken: '',
      cartNumber: 0,
    },
  },
  loading: RequestState.PENDING,
  error: {
    message: '',
    status: null,
  },
};

export const login = createAsyncThunk('/auth/login', async (body: UserParams, { rejectWithValue }) => {
  try {
    const response = await Auth.login(body);
    http.setAuthorizationHeader(response.data.data.jwtAccessToken);
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
});

export const logout = createAsyncThunk('/auth/logout', async (body: LogoutParams, { rejectWithValue }) => {
  try {
    await Auth.logout(body);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
});

export const getFreeUnit = createAsyncThunk('/users/freeunit', async (_, { rejectWithValue }) => {
  try {
    const responseUserFreeUnit = await GetUserData.getFreeUnit();
    return responseUserFreeUnit.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addDeviceToken = createAsyncThunk(
  '/users/deviceToken',
  async (body: { deviceToken: string }, { rejectWithValue }) => {
    try {
      const reponseDeviceToken = await GetUserData.addDeviceToken(body);
      return reponseDeviceToken.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
  },
);

export const updateAvatar = createAsyncThunk('users/avatar', async (avatar: FormData, { rejectWithValue }) => {
  try {
    const responseAvatarUrl = await GetUserData.updateAvatar(avatar);
    return responseAvatarUrl.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateFreeUnit: (state: any, action: PayloadAction<number>) => {
      const newFreeUnit = state.data.userInfor.freeUnit - action.payload;
      state.data.userInfor.freeUnit = newFreeUnit > 0 ? newFreeUnit : 0;
    },
    checkRole: (state: any, action: PayloadAction<ROLE[]>) => {
      if (!action.payload.includes(state.data.userInfor.role as ROLE)) {
        return initialState;
      }
    },
    setDeviceToken: (state: any, action: PayloadAction<string>) => {
      state.data.userInfor.deviceToken = action.payload;
    },
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: any) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(login.fulfilled, (state: any, action) => {
        state.loading = RequestState.FULFILLED;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state: any, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
        state.data = initialState.data;
      })
      .addCase(logout.pending, (state: any) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, (state: any, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      })
      .addCase(getFreeUnit.pending, (state: any) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getFreeUnit.fulfilled, (state: any, action) => {
        state.loading = RequestState.FULFILLED;
        state.data.userInfor.freeUnit = action.payload;
      })
      .addCase(getFreeUnit.rejected, (state: any, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      })
      .addCase(updateAvatar.pending, (state: any) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(updateAvatar.fulfilled, (state: any, action) => {
        state.loading = RequestState.FULFILLED;
        state.data.userInfor.avatarUrl = action.payload;
      })
      .addCase(updateAvatar.rejected, (state: any, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectLoginState = (state: RootState) => state.authData.data.jwtAccessToken;
export const selectUserState = (state: RootState) => state.authData.data.userInfor;
export const { updateFreeUnit, checkRole, resetAuthState, setDeviceToken } = authSlice.actions;
export default authSlice.reducer;
