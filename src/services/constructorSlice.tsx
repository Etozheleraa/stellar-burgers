import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import type { TConstructorIngredient, TIngredient } from '@utils-types';

export type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;
      const ingredientWithId = { ...ingredient, id: nanoid() };

      if (ingredient.type === 'bun') {
        state.bun = ingredientWithId;
      } else {
        state.ingredients.push(ingredientWithId);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    swapIngredient: (state, action: PayloadAction<[number, number]>) => {
      const [fromIndex, toIndex] = action.payload;
      const items = [...state.ingredients];
      const [removed] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, removed);
      state.ingredients = items;
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const burgerConstructorActions = burgerConstructorSlice.actions;

export const burgerConstructorSelectors = {
  getConstructorState: (state: { burgerConstructor: ConstructorState }) =>
    state.burgerConstructor
};
