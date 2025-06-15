import { configureStore } from '@reduxjs/toolkit';
import {
  fetchUser,
  registerUser,
  loginUser,
  logout,
  updateUser,
  userSlice,
  userSelectors
} from './userSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      user: userSlice.reducer
    }
  });

const mockUserData = {
  name: 'Test User',
  email: 'test@example.com'
};

describe('user slice', () => {
  describe('fetchUser', () => {
    test('handles fetchUser.pending', () => {
      const store = createTestStore();
      store.dispatch({ type: fetchUser.pending.type });
      const state = store.getState().user;

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    test('handles fetchUser.fulfilled', () => {
      const store = createTestStore();
      store.dispatch({
        type: fetchUser.fulfilled.type,
        payload: { user: mockUserData }
      });
      const state = store.getState().user;

      expect(state.isLoading).toBe(false);
      expect(state.isAuthorized).toBe(true);
      expect(state.user).toEqual(mockUserData);
    });

    test('handles fetchUser.rejected', () => {
      const store = createTestStore();
      const errorMessage = 'Failed to fetch';
      store.dispatch({
        type: fetchUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState().user;

      expect(state.isLoading).toBe(false);
      expect(state.isAuthorized).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('registerUser', () => {
    test('handles registerUser.pending', () => {
      const store = createTestStore();
      store.dispatch({ type: registerUser.pending.type });
      const state = store.getState().user;

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    test('handles registerUser.fulfilled', () => {
      const store = createTestStore();
      store.dispatch({
        type: registerUser.fulfilled.type,
        payload: { user: mockUserData }
      });
      const state = store.getState().user;

      expect(state.isLoading).toBe(false);
      expect(state.isAuthorized).toBe(true);
      expect(state.user).toEqual(mockUserData);
    });

    test('handles registerUser.rejected', () => {
      const store = createTestStore();
      const errorMessage = 'Register failed';
      store.dispatch({
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState().user;

      expect(state.isLoading).toBe(false);
      expect(state.isAuthorized).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('loginUser', () => {
    test('handles loginUser.pending', () => {
      const store = createTestStore();
      store.dispatch({ type: loginUser.pending.type });
      const state = store.getState().user;

      expect(state.isLoadingLogin).toBe(true);
      expect(state.loginError).toBeUndefined();
    });

    test('handles loginUser.fulfilled', () => {
      const store = createTestStore();
      store.dispatch({
        type: loginUser.fulfilled.type,
        payload: { user: mockUserData }
      });
      const state = store.getState().user;

      expect(state.isLoadingLogin).toBe(false);
      expect(state.isAuthorized).toBe(true);
      expect(state.user).toEqual(mockUserData);
    });

    test('handles loginUser.rejected', () => {
      const store = createTestStore();
      const errorMessage = 'Login failed';
      store.dispatch({
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState().user;

      expect(state.isLoadingLogin).toBe(false);
      expect(state.isAuthorized).toBe(false);
      expect(state.loginError).toBe(errorMessage);
    });
  });

  describe('logout', () => {
    test('handles logout.fulfilled', () => {
      const store = createTestStore();
      store.dispatch({ type: logout.fulfilled.type });
      const state = store.getState().user;

      expect(state.user).toEqual({ name: '', email: '' });
      expect(state.isAuthorized).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('updateUser', () => {
    test('handles updateUser.fulfilled', () => {
      const store = createTestStore();
      store.dispatch({
        type: updateUser.fulfilled.type,
        payload: { user: mockUserData }
      });
      const state = store.getState().user;

      expect(state.user).toEqual(mockUserData);
      expect(state.isLoading).toBe(false);
    });

    test('handles updateUser.rejected', () => {
      const store = createTestStore();
      const errorMessage = 'Update failed';
      store.dispatch({
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState().user;

      expect(state.error).toBe(errorMessage);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('selectors', () => {
    const baseState = {
      user: {
        user: mockUserData,
        isAuthorized: true,
        isLoading: false,
        error: 'some error',
        isLoadingLogin: true,
        loginError: 'login failed'
      }
    };

    test('getUser selector', () => {
      expect(userSelectors.getUser(baseState)).toEqual(mockUserData);
    });

    test('isAuthorized selector', () => {
      expect(userSelectors.isAuthorized(baseState)).toBe(true);
    });

    test('isLoading selector', () => {
      expect(userSelectors.isLoading(baseState)).toBe(false);
    });

    test('isLoadingLogin selector', () => {
      expect(userSelectors.isLoadingLogin(baseState)).toBe(true);
    });

    test('loginError selector', () => {
      expect(userSelectors.loginError(baseState)).toBe('login failed');
    });
  });
});
