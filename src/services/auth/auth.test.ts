import * as actions from './actions';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { authSlice, setIsAuthChecked, setUser } from './slice';

const regData = {
  email: '1@a.com',
  name: 'Алексей',
  password: '123'
};

const userData = {
  email: '1@a.com',
  name: 'Алексей'
};

const newUserData = {
  email: '1@a.com',
  name: 'Иван'
};

const loginData = {
  email: '1@a.com',
  password: '123'
};

describe('Тест экшнов слайса auth', () => {
  let store: EnhancedStore;
  beforeEach(() => {
    store = configureStore({
      reducer: { auth: authSlice.reducer }
    });
  });

  it('Экшн setUser сохраняет пользователя', () => {
    store.dispatch(setUser(userData));
    const user = store.getState().auth.user;
    expect(user).toEqual(userData);

    store.dispatch(setUser(null));
    const userNull = store.getState().auth.user;
    expect(userNull).toBeNull();
  });

  it('Экшн setIsAuthChecked переключает статус проверки', () => {
    store.dispatch(setIsAuthChecked(true));
    const status = store.getState().auth.isAuthChecked;
    expect(status).toBeTruthy();
  });

  it('Экшн login переключает статус запроса', () => {
    store.dispatch(actions.login.pending('', loginData));
    const status = store.getState().auth.isLoading;
    expect(status).toBeTruthy();
  });

  it('Экшн login переключает статусы и сохраняет пользователя', () => {
    store.dispatch(
      actions.login.fulfilled(
        { user: userData, success: true, accessToken: '', refreshToken: '' },
        '',
        loginData
      )
    );
    const { isAuthChecked, isLoading, user, error } = store.getState().auth;
    expect(isAuthChecked).toBeTruthy();
    expect(isLoading).toBeFalsy();
    expect(user).toEqual(userData);
    expect(error).toBeNull();
  });

  it('Экшн login переключает статус запроса и сохраняет ошибку', () => {
    store.dispatch(actions.login.rejected(new Error(), '', loginData));
    const { isAuthChecked, isLoading, error } = store.getState().auth;
    expect(isLoading).toBeFalsy();
    expect(isAuthChecked).toBeTruthy();
    expect(error).toBe('Не удалось загрузить данные');
  });

  it('Экшн updateUserData обновляет данные', () => {
    store.dispatch(
      actions.login.fulfilled(
        { user: userData, success: true, accessToken: '', refreshToken: '' },
        '',
        loginData
      )
    );
    store.dispatch(
      actions.updateUserdata.fulfilled(
        { user: newUserData, success: true },
        '',
        regData
      )
    );
    const user = store.getState().auth.user;
    expect(user).toEqual(newUserData);
  });
});
