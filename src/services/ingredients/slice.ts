import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

type TIngredientsState = {
  ingredientsData: TIngredient[];
  dataLoading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredientsData: [],
  dataLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsData = action.payload;
        state.dataLoading = false;
        state.error = null;
      })
      .addCase(getIngredients.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.dataLoading = false;
        state.error = 'Не удалось загрузить данные';
      });
  }
});
