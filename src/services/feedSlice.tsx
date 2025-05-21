import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

interface FeedState {
  orders: TOrder[];
  feed: {
    total: number;
    totalToday: number;
  };
  isLoading: boolean;
  error?: string;
}

const initialState: FeedState = {
  orders: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  isLoading: true,
  error: undefined
};

export const fetchFeeds = createAsyncThunk('feeds/fetch', getFeedsApi);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchFeeds.fulfilled, (state, { payload }) => {
        state.orders = payload.orders;
        state.feed.total = payload.total;
        state.feed.totalToday = payload.totalToday;
        state.isLoading = false;
      })
      .addCase(fetchFeeds.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectFeedInfo: (state) => state.feed,
    selectLoadingStatus: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});

export const feedsReducer = feedsSlice.reducer;
export const feedsActions = feedsSlice.actions;
export const { selectOrders, selectFeedInfo, selectLoadingStatus, selectError } = feedsSlice.selectors;