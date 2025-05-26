import { getIngredients } from './actions';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slice';
import { getIngredientsApi } from '../../utils/burger-api';

const mockData = [
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
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

jest.mock('../../utils/burger-api');
(getIngredientsApi as jest.Mock).mockImplementation(() => {
  Promise.resolve(mockData);
});

describe('Проверка асинхронных экшенов слайса ingredients', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: { ingredients: ingredientsSlice.reducer }
    });
  });

  it('Статус изменяется при запросе', () => {
    store.dispatch(getIngredients.pending(''));
    const status = store.getState().ingredients.dataLoading;
    expect(status).toBeTruthy();
  });

  it('Ингредиенты получаются при успехе, статус меняется', () => {
    store.dispatch(getIngredients.fulfilled(mockData, ''));
    const data = store.getState().ingredients.ingredientsData;
    const status = store.getState().ingredients.dataLoading;
    expect(data).toEqual(mockData);
    expect(status).toBeFalsy();
  });

  it('Ошибка сохраняется в стор, статус меняется', () => {
    store.dispatch(getIngredients.rejected(new Error(), ''));
    const status = store.getState().ingredients.dataLoading;
    const error = store.getState().ingredients.error;
    expect(status).toBeFalsy();
    expect(error).toBe('Не удалось загрузить данные');
  });
});
