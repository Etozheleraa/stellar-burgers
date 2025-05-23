import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlice } from './userSlice';
import { ingredientsSlice } from './ingredientSlice';
import { burgerConstructorSlice } from './constructorSlice';
import { feedsSlice } from './feedSlice';
import { orderSlice } from './orderSlice';

const rootReducer = {
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

