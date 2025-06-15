import { configureStore } from '@reduxjs/toolkit';
import {
  feedsReducer,
  fetchFeeds,
  selectOrders,
  selectFeedInfo,
  selectLoadingStatus,
  selectError
} from './feedSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      feeds: feedsReducer
    }
  });

const mockFeedsData = {
  orders: [
    {
      _id: '684d9185c2f30c001cb2c99e',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский люминесцентный бургер',
      createdAt: '2025-06-14T15:13:09.495Z',
      updatedAt: '2025-06-14T15:13:10.360Z',
      number: 81406
    }
  ],
  total: 1,
  totalToday: 1
};

describe('feeds slice', () => {
  describe('selectors', () => {
    const store = createTestStore();
    store.dispatch({
      type: fetchFeeds.fulfilled.type,
      payload: mockFeedsData
    });
    const state = store.getState();
    const sliceState = state.feeds;
  
    test('selectOrders should return the list of orders', () => {
      const result = selectOrders(state);
      expect(result).toEqual(mockFeedsData.orders);
    });
  
    test('selectFeedInfo should return feed info', () => {
      const result = selectFeedInfo(state);
      expect(result).toEqual({ total: 1, totalToday: 1 });
    });
  
    test('selectLoadingStatus should return loading status', () => {
      const result = selectLoadingStatus(state);
      expect(result).toBe(false);
    });
  
    test('selectError should return error (undefined)', () => {
      const result = selectError(state);
      expect(result).toBeUndefined();
    });
  });

  describe('extraReducers', () => {
    const store = createTestStore();

    test('handle pending state', () => {
      store.dispatch({
        type: fetchFeeds.pending.type
      });
      const state = store.getState();

      expect(state.feeds.isLoading).toBe(true);
      expect(state.feeds.error).toBeUndefined();
    });

    test('handle fulfilled state', () => {
      store.dispatch({
        type: fetchFeeds.fulfilled.type,
        payload: mockFeedsData
      });
      const state = store.getState();

      expect(state.feeds.isLoading).toBe(false);
      expect(state.feeds.feed.total).toBe(1);
      expect(state.feeds.feed.totalToday).toBe(1);
      expect(state.feeds.orders).toEqual(mockFeedsData.orders);
    });

    test('handle rejected state', () => {
      const errorMessage = 'rejected message';
      store.dispatch({
        type: fetchFeeds.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();

      expect(state.feeds.isLoading).toBe(false);
      expect(state.feeds.error).toEqual(errorMessage);
    });
  });
});
