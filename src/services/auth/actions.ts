import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../../src/utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from './slice';
import { deleteCookie, getCookie, setCookie } from '../../../src/utils/cookie';

export const register = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: TLoginData) => {
    const res = await loginUserApi({ email, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .catch((err) => {
          console.log(err);
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const updateUserdata = createAsyncThunk(
  'auth/updateUserdata',
  async (data: TRegisterData) => await updateUserApi(data)
);
