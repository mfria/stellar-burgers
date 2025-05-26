import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi
} from '../../../src/utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk(
  'feeds/all',
  async () => await getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'order/id',
  async (id: number) => await getOrderByNumberApi(id)
);

export const getUserOrders = createAsyncThunk(
  'feeds/userOrders',
  async () => await getOrdersApi()
);
