/*Проверяют редьюсер слайса constructor:
обработку экшена добавления ингредиента;
обработку экшена удаления ингредиента;
обработку экшена изменения порядка ингредиентов в начинке; */

import {
  orderConstructorSlice,
  addItem,
  removeItem,
  moveItem,
  initialState
} from './slice';

const constructorReducer = orderConstructorSlice.reducer;

const mockIngredient = {
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
};

const anotherMockIngredient = {
  _id: 'abc',
  name: 'Точно не биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

describe('Проверка редьюсера конструктора', () => {
  it('Экшн addItem добавляет ингредиент', () => {
    const action = { type: addItem.type, payload: mockIngredient };
    const result = constructorReducer(initialState, action);
    expect(result.constructorItems.ingredients[0].name).toBe(
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('Экшн removeItem удаляет ингредиент', () => {
    const actionAdd = { type: addItem.type, payload: mockIngredient };
    const stateWithIngredient = constructorReducer(initialState, actionAdd);
    expect(stateWithIngredient.constructorItems.ingredients[0].name).toBe(
      'Биокотлета из марсианской Магнолии'
    );

    const action = { type: removeItem.type, payload: mockIngredient };
    const result = constructorReducer(stateWithIngredient, action);
    expect(result.constructorItems.ingredients).toEqual([]);
  });

  it('Экшн moveItem перемещает ингредиент в списке', () => {
    //добавляем элементы, проверяем какой стоит первым
    const stateWithIngredient = constructorReducer(initialState, {
      type: addItem.type,
      payload: mockIngredient
    });
    const stateWithIngredient2 = constructorReducer(stateWithIngredient, {
      type: addItem.type,
      payload: anotherMockIngredient
    });
    expect(stateWithIngredient2.constructorItems.ingredients.length).toBe(2);
    expect(stateWithIngredient2.constructorItems.ingredients[0].name).toBe(
      'Биокотлета из марсианской Магнолии'
    );

    //двигаем второй элемент на первую позицию, должен подвинуться
    const action = {
      type: moveItem.type,
      payload: { ingredient: anotherMockIngredient, direction: 'moveDown' }
    };
    const result = constructorReducer(stateWithIngredient2, action);
    expect(result.constructorItems.ingredients.length).toBe(2);
    expect(result.constructorItems.ingredients[0].name).toBe(
      'Точно не биокотлета из марсианской Магнолии'
    );
  });
});
