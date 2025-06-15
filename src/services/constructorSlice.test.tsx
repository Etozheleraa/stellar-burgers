import { nanoid } from 'nanoid';
import { burgerConstructorActions, burgerConstructorSelectors } from './constructorSlice';
import { burgerConstructorSlice } from './constructorSlice';
import type { TConstructorIngredient, TIngredient } from '@utils-types';
import type { ConstructorState } from './constructorSlice';

jest.mock('nanoid', () => ({
  nanoid: jest.fn()
}));

const mockId = 'mocked-id';
(nanoid as jest.Mock).mockReturnValue(mockId);

const bunSample = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
};

const ingredientSample = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png"
};

const secondIngredient: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: 'second-id',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png"
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

describe('constructorSlice', () => {
  const reducer = burgerConstructorSlice.reducer;

  beforeEach(() => {
    (nanoid as jest.Mock).mockReturnValue(mockId);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initial state', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  test('selector: getConstructorState', () => {
    const rootState = { burgerConstructor: initialState };
    const result = burgerConstructorSelectors.getConstructorState(rootState);
    expect(result).toEqual(initialState);
  });

  test('add bun', () => {
    const action = burgerConstructorActions.addIngredient(bunSample);
    const state = reducer(initialState, action);
    expect(state.bun).toEqual({ ...bunSample, id: mockId });
  });

  test('add ingredient', () => {
    const action = burgerConstructorActions.addIngredient(ingredientSample);
    const state = reducer(initialState, action);
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toEqual({ ...ingredientSample, id: mockId });
  });

  test('remove ingredient by id', () => {
    const preState: ConstructorState = {
      bun: null,
      ingredients: [
        { ...ingredientSample, id: mockId },
        secondIngredient
      ]
    };
    const action = burgerConstructorActions.removeIngredient(mockId);
    const state = reducer(preState, action);
    expect(state.ingredients).toEqual([secondIngredient]);
  });

  test('swap ingredients', () => {
    const preState: ConstructorState = {
      bun: null,
      ingredients: [
        { ...ingredientSample, id: 'first' },
        { ...ingredientSample, id: 'second', name: 'Другой ингредиент' }
      ]
    };
 
    const action = burgerConstructorActions.swapIngredient([1, 0]);
    const state = reducer(preState, action);
    expect(state.ingredients[0].id).toBe('second');
    expect(state.ingredients[1].id).toBe('first');
  });

  test('reset constructor', () => {
    const filledState: ConstructorState = {
      bun: { ...bunSample, id: 'bun-id' },
      ingredients: [{ ...ingredientSample, id: mockId }]
    };
    const state = reducer(filledState, burgerConstructorActions.resetConstructor());
    expect(state).toEqual(initialState);
  });
});
