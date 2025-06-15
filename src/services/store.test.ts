import * as reactRedux from 'react-redux';
import store from './store';

import { userSlice } from './userSlice';
import { ingredientsSlice } from './ingredientSlice';
import { burgerConstructorSlice } from './constructorSlice';
import { feedsSlice } from './feedSlice';
import { orderSlice } from './orderSlice';

describe('store.ts', () => {
  test('Checking the initial state of the store', () => {
    const initialState = store.getState();

    expect(initialState).toEqual({
      [userSlice.name]: userSlice.getInitialState(),
      [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
      [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
      [feedsSlice.name]: feedsSlice.getInitialState(),
      [orderSlice.name]: orderSlice.getInitialState()
    });
  });

  test('userSlice: initial state', () => {
    const initialState = userSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(userSlice.getInitialState());
  });

  test('ingredientsSlice: initial state', () => {
    const initialState = ingredientsSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(ingredientsSlice.getInitialState());
  });

  test('burgerConstructorSlice: initial state', () => {
    const initialState = burgerConstructorSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(burgerConstructorSlice.getInitialState());
  });

  test('feedsSlice: initial state', () => {
    const initialState = feedsSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(feedsSlice.getInitialState());
  });

  test('orderSlice: initial state', () => {
    const initialState = orderSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(orderSlice.getInitialState());
  });
});
