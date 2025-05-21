import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

const initialState = {
  isAuthorized: false,
  user: {
    name: '',
    email: ''
  } as TUser,
  isLoading: true,
  error: undefined as string | undefined,
  isLoadingLogin: false,
  loginError: undefined as string | undefined
};

export const fetchUser = createAsyncThunk('user/fetch', getUserApi);
export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const loginUser = createAsyncThunk('user/login', loginUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthorized = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
        state.isAuthorized = false;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthorized = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
        state.isAuthorized = false;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loginError = undefined;
        state.isLoadingLogin = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoadingLogin = false;
        state.isAuthorized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.error.message;
        state.isLoadingLogin = false;
        state.isAuthorized = false;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {
          email: '',
          name: ''
        };
        state.isAuthorized = false;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    isLoading: (state) => state.isLoading,
    isAuthorized: (state) => state.isAuthorized,
    loginError: (state) => state.loginError,
    isLoadingLogin: (state) => state.isLoadingLogin
  }
});

export const userSelectors = userSlice.selectors;