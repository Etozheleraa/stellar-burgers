import { orderSlice, fetchOrderByNumber, fetchUserOrders, makeOrder } from './orderSlice';

const mockOrderData = {
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
};

const initialState = {
  orderByNumber: undefined,
  userOrders: [],
  constructorOrder: null,
  loading: {
    orderByNumber: true,
    userOrders: true,
    constructorOrder: false
  },
  error: {
    orderByNumber: undefined,
    userOrders: undefined,
    constructorOrder: undefined
  }
};

describe('orderSlice', () => {
  describe('fetchOrderByNumber', () => {
    it('should set loading.orderByNumber to true when pending', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.orderByNumber).toBe(true);
      expect(state.error.orderByNumber).toBeUndefined();
    });

    it('should set orderByNumber when fulfilled', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: { orders: [mockOrderData] }
      };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.orderByNumber).toBe(false);
      expect(state.orderByNumber).toEqual(mockOrderData);
      expect(state.error.orderByNumber).toBeUndefined();
    });

    it('should set an error when rejected', () => {
      const action = {
        type: fetchOrderByNumber.rejected.type,
        error: { message: 'Ошибка получения заказа' }
      };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.orderByNumber).toBe(false);
      expect(state.error.orderByNumber).toBe('Ошибка получения заказа');
    });
  });

  describe('fetchUserOrders', () => {
    it('should set loading.userOrders to true on pending', () => {
      const action = { type: fetchUserOrders.pending.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.userOrders).toBe(true);
      expect(state.error.userOrders).toBeUndefined();
    });

    it('should set an error when rejected', () => {
      const action = {
        type: fetchUserOrders.rejected.type,
        error: { message: 'Ошибка загрузки заказов пользователя' }
      };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.userOrders).toBe(false);
      expect(state.error.userOrders).toBe('Ошибка загрузки заказов пользователя');
    });
  });

  describe('makeOrder', () => {
    it('should set loading.constructorOrder to true on pending', () => {
      const action = { type: makeOrder.pending.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.constructorOrder).toBe(true);
      expect(state.error.constructorOrder).toBeUndefined();
    });

    it('should set constructorOrder when fulfilled', () => {
      const action = {
        type: makeOrder.fulfilled.type,
        payload: { order: mockOrderData }
      };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.constructorOrder).toBe(false);
      expect(state.constructorOrder).toEqual(mockOrderData);
      expect(state.error.constructorOrder).toBeUndefined();
    });

    it('should set an error when rejected', () => {
      const action = {
        type: makeOrder.rejected.type,
        error: { message: 'Ошибка при создании заказа' }
      };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.constructorOrder).toBe(false);
      expect(state.error.constructorOrder).toBe('Ошибка при создании заказа');
    });
  });

  describe('clearConstructorOrder', () => {
    it('should reset constructorOrder and loading.constructorOrder', () => {
      const stateBefore = {
        ...initialState,
        constructorOrder: mockOrderData,
        loading: {
          ...initialState.loading,
          constructorOrder: true
        }
      };

      const action = orderSlice.actions.clearConstructorOrder();
      const state = orderSlice.reducer(stateBefore, action);

      expect(state.constructorOrder).toBeNull();
      expect(state.loading.constructorOrder).toBe(false);
    });
  });

  describe('selectors', () => {
    const {
      getOrderByNumber,
      getUserOrders,
      getConstructorOrder,
      isLoadingByNumber,
      isLoadingUserOrders,
      isLoadingConstructorOrder,
      errorByNumber,
      userOrdersError
    } = orderSlice.selectors;

    const testState = {
      order: {
        orderByNumber: mockOrderData,
        userOrders: [mockOrderData],
        constructorOrder: mockOrderData,
        loading: {
          orderByNumber: false,
          userOrders: false,
          constructorOrder: true
        },
        error: {
          orderByNumber: 'error',
          userOrders: 'error',
          constructorOrder: undefined
        }
      }
    };

    it('getOrderByNumber should return orderByNumber', () => {
      expect(getOrderByNumber(testState)).toEqual(mockOrderData);
    });

    it('getUserOrders should return userOrders', () => {
      expect(getUserOrders(testState)).toEqual([mockOrderData]);
    });

    it('getConstructorOrder should return constructorOrder', () => {
      expect(getConstructorOrder(testState)).toEqual(mockOrderData);
    });

    it('isLoadingByNumber should return loading.orderByNumber', () => {
      expect(isLoadingByNumber(testState)).toBe(false);
    });

    it('isLoadingUserOrders should return loading.userOrders', () => {
      expect(isLoadingUserOrders(testState)).toBe(false);
    });

    it('isLoadingConstructorOrder should return loading.constructorOrder', () => {
      expect(isLoadingConstructorOrder(testState)).toBe(true);
    });

    it('errorByNumber should return error.orderByNumber', () => {
      expect(errorByNumber(testState)).toBe('error');
    });

    it('userOrdersError should return error.userOrders', () => {
      expect(userOrdersError(testState)).toBe('error');
    });
  });
});
