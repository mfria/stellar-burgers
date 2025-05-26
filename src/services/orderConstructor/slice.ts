import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurger } from './actions';

type TOrderConstructor = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const initialState: TOrderConstructor = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const orderConstructorSlice = createSlice({
  name: 'orderConstructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    resetModalData: (state) => {
      state.orderModalData = null;
    },
    clearOrder: (state) => {
      state = {
        ...initialState,
        constructorItems: initialState.constructorItems
      };
    },
    moveItem: (
      state,
      action: PayloadAction<{
        ingredient: TConstructorIngredient;
        direction: 'moveUp' | 'moveDown';
      }>
    ) => {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.ingredient.id
      );
      const ingredient = state.constructorItems.ingredients[index];
      switch (action.payload.direction) {
        case 'moveDown':
          if (index < state.constructorItems.ingredients.length - 1) {
            state.constructorItems.ingredients[index] =
              state.constructorItems.ingredients[index + 1];
            state.constructorItems.ingredients[index + 1] = ingredient;
          }
          break;
        case 'moveUp':
          if (index > 0) {
            state.constructorItems.ingredients[index] =
              state.constructorItems.ingredients[index - 1];
            state.constructorItems.ingredients[index - 1] = ingredient;
          }
          break;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      })
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      });
  },
  selectors: {
    getOrderState: (state) => state
  }
});

export const { getOrderState } = orderConstructorSlice.selectors;
export const { addItem, removeItem, resetModalData, clearOrder, moveItem } =
  orderConstructorSlice.actions;
