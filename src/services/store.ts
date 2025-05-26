import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { authSlice } from './auth/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderConstructorSlice } from './orderConstructor/slice';
import { feedsSlice } from './feeds/slice';

export const rootReducer = combineSlices(
  authSlice,
  ingredientsSlice,
  orderConstructorSlice,
  feedsSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
