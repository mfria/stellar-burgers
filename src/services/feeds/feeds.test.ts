import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { feedsSlice } from './slice';
import * as actions from './actions';

const mockedUserOrders = [
  {
    _id: '1',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0945'
    ],
    status: 'done',
    name: 'Бургер',
    createdAt: '2024-12-24T18:05:00',
    updatedAt: '2024-12-24T19:05:00',
    number: 60587
  },
  {
    _id: '2',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0945'
    ],
    status: 'done',
    name: 'Другой бургер',
    createdAt: '2024-12-24T18:05:00',
    updatedAt: '2024-12-24T19:05:00',
    number: 60587
  }
];

describe('Проверка асинхронных экшенов слайса feeds', () => {
  let store: EnhancedStore;
  beforeEach(() => {
    store = configureStore({
      reducer: { feeds: feedsSlice.reducer }
    });
  });

  it('Экшн getOrderByNumber сохраняет заказ', () => {
    store.dispatch(
      actions.getOrderByNumber.fulfilled(
        { orders: mockedUserOrders, success: true },
        '',
        1
      )
    );
    const order = store.getState().feeds;
    expect(order.orderByNumber).toEqual(mockedUserOrders[0]);
  });

  it('Экшн getFeeds переключает статус загрузки', () => {
    store.dispatch(actions.getFeeds.pending(''));
    const status = store.getState().feeds.isLoading;
    expect(status).toBeTruthy();
  });

  it('Экшн getFeeds сохраняет данные и меняет статус', () => {
    store.dispatch(
      actions.getFeeds.fulfilled(
        { orders: mockedUserOrders, total: 123, totalToday: 1, success: true },
        '',
        undefined
      )
    );
    const { orders, total, totalToday, isLoading } = store.getState().feeds;
    const expectedState = {
      orders: mockedUserOrders,
      total: 123,
      totalToday: 1,
      isLoading: false
    };
    expect({ orders, total, totalToday, isLoading }).toEqual(expectedState);
  });

  it('Ошибка getFeeds сохраняется в стор, статус меняется', () => {
    store.dispatch(actions.getFeeds.rejected(new Error(), ''));
    const status = store.getState().feeds.isLoading;
    const error = store.getState().feeds.error;
    expect(status).toBeFalsy();
    expect(error).toBe('Не удалось загрузить данные');
  });

  it('Экшн getUserOrders переключает статус загрузки', () => {
    store.dispatch(actions.getUserOrders.pending(''));
    const status = store.getState().feeds.orderRequest;
    expect(status).toBeTruthy();
  });

  it('Экшн getUserOrders сохраняет данные и меняет статус', () => {
    store.dispatch(
      actions.getUserOrders.fulfilled(mockedUserOrders, '', undefined)
    );
    const { userOrders, orderRequest } = store.getState().feeds;
    const expectedState = {
      userOrders: mockedUserOrders,
      orderRequest: false
    };
    expect({ userOrders, orderRequest }).toEqual(expectedState);
  });
});
