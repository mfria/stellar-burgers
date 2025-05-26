import { getIngredientsApi } from '../../../src/utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);
