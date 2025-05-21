import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

const initialState = {
  ingredients: [] as TIngredient[],
  isLoading: true,
  error: undefined as string | undefined
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
  selectors: {
    get: (state) => state.ingredients,
    getBuns: (state) => state.ingredients.filter((i) => i.type === 'bun'),
    getMains: (state) => state.ingredients.filter((i) => i.type === 'main'),
    getSauces: (state) => state.ingredients.filter((i) => i.type === 'sauce'),
    isLoading: (state) => state.isLoading,
    error: (state) => state.error
  }
});

export const ingredientsSelectors = ingredientsSlice.selectors;