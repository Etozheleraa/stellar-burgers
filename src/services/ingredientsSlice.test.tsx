import { configureStore } from '@reduxjs/toolkit';
import { fetchIngredients, ingredientsSlice, ingredientsSelectors } from './ingredientSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsSlice.reducer
    }
  });

const mockIngredientsData = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  }
];

describe('ingredients slice', () => {
  test('initial state', () => {
    const store = createTestStore();
    expect(store.getState().ingredients).toEqual({
      ingredients: [],
      isLoading: true,
      error: undefined
    });
  });

  describe('selectors', () => {
    const state = {
      ingredients: {
        ingredients: mockIngredientsData,
        isLoading: false,
        error: undefined
      }
    };

    test('get should return the list of ingredients', () => {
      const result = ingredientsSelectors.get(state);
      expect(result).toEqual(mockIngredientsData);
    });

    test('getBuns should return bun ingredients only', () => {
      const bunIngredient = { ...mockIngredientsData[0], type: 'bun' };
      const bunState = {
        ingredients: {
          ingredients: [bunIngredient],
          isLoading: false,
          error: undefined
        }
      };
      const result = ingredientsSelectors.getBuns(bunState);
      expect(result).toEqual([bunIngredient]);
    });

    test('getMains should return main ingredients only', () => {
      const result = ingredientsSelectors.getMains(state);
      expect(result).toEqual(mockIngredientsData);
    });

    test('getSauces should return sauce ingredients only', () => {
      const sauceIngredient = { ...mockIngredientsData[0], type: 'sauce' };
      const sauceState = {
        ingredients: {
          ingredients: [sauceIngredient],
          isLoading: false,
          error: undefined
        }
      };
      const result = ingredientsSelectors.getSauces(sauceState);
      expect(result).toEqual([sauceIngredient]);
    });

    test('isLoading should return loading status', () => {
      const loadingState = {
        ingredients: {
          ingredients: [],
          isLoading: true,
          error: undefined
        }
      };
      const result = ingredientsSelectors.isLoading(loadingState);
      expect(result).toBe(true);
    });

    test('error should return error message', () => {
      const errorState = {
        ingredients: {
          ingredients: [],
          isLoading: false,
          error: 'Failed to fetch'
        }
      };
      const result = ingredientsSelectors.error(errorState);
      expect(result).toBe('Failed to fetch');
    });
  });

  describe('extraReducers', () => {
    test('handles fetchIngredients.pending', () => {
      const store = createTestStore();
      store.dispatch({ type: fetchIngredients.pending.type });
      const state = store.getState().ingredients;

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    test('handles fetchIngredients.fulfilled', () => {
      const store = createTestStore();
      store.dispatch({
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredientsData
      });
      const state = store.getState().ingredients;

      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredientsData);
    });

    test('handles fetchIngredients.rejected', () => {
      const store = createTestStore();
      const errorMessage = 'Request failed';
      store.dispatch({
        type: fetchIngredients.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState().ingredients;

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
