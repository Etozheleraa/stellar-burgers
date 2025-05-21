import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface ConstructorState {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
}

const initialState: ConstructorState = {
  ingredients: [],
  bun: null
};

interface SwapPayload {
  from: number;
  to: number;
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        payload.type === 'bun' 
          ? state.bun = payload 
          : state.ingredients.push(payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    swapIngredient: {
      reducer: (state, { payload }: PayloadAction<SwapPayload>) => {
        [state.ingredients[payload.from], state.ingredients[payload.to]] = 
          [state.ingredients[payload.to], state.ingredients[payload.from]];
      },
      prepare: (from: number, to: number) => ({
        payload: { from, to }
      })
    },
    removeIngredient: (state, { payload }: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(item => item.id !== payload);
    },
    resetConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    getFillings: (state) => state.ingredients,
    getSelectedBun: (state) => state.bun,
    getConstructorState: (state) => state
  }
});

export const { actions: burgerConstructorActions, selectors: burgerConstructorSelectors } = burgerConstructorSlice;