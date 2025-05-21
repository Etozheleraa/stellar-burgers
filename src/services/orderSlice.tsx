import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

const initialState = {
  orderByNumber: undefined as TOrder | undefined,
  userOrders: [] as TOrder[],
  constructorOrder: null as TOrder | null,
  loading: {
    orderByNumber: true,
    userOrders: true,
    constructorOrder: false
  },
  error: {
    orderByNumber: undefined as string | undefined,
    userOrders: undefined as string | undefined,
    constructorOrder: undefined as string | undefined
  }
};

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  getOrderByNumberApi
);

export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  getOrdersApi
);

export const makeOrder = createAsyncThunk('order/makeOrder', orderBurgerApi);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearConstructorOrder(state) {
      state.constructorOrder = null;
      state.loading.constructorOrder = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.error.orderByNumber = undefined;
        state.loading.orderByNumber = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload.orders[0];
        state.loading.orderByNumber = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.error.orderByNumber = action.error.message;
        state.loading.orderByNumber = false;
      });

    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.error.userOrders = undefined;
        state.loading.userOrders = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.loading.userOrders = false;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.error.userOrders = action.error.message;
        state.loading.userOrders = false;
      });

    builder
      .addCase(makeOrder.pending, (state) => {
        state.error.constructorOrder = undefined;
        state.loading.constructorOrder = true;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.constructorOrder = action.payload.order;
        state.loading.constructorOrder = false;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.error.constructorOrder = action.error.message;
        state.loading.constructorOrder = false;
      });
  },
  selectors: {
    getOrderByNumber: (state) => state.orderByNumber,
    getUserOrders: (state) => state.userOrders,
    getConstructorOrder: (state) => state.constructorOrder,
    isLoadingByNumber: (state) => state.loading.orderByNumber,
    isLoadingUserOrders: (state) => state.loading.userOrders,
    isLoadingConstructorOrder: (state) => state.loading.constructorOrder,
    errorByNumber: (state) => state.error.orderByNumber,
    userOrdersError: (state) => state.error.userOrders
  }
});

export const orderSelectors = orderSlice.selectors;
export const orderActions = orderSlice.actions;