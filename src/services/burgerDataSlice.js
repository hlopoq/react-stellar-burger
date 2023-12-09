import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const burgerDataSlice = createSlice({
  name: "burgerData",
  initialState: {
    bun: null,
    ingredients: [],
  },
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredients) => {
        return { payload: { ...ingredients, key: uuidv4() } };
      },
    },
    addBun: {
      reducer: (state, action) => {
        state.bun = action.payload;
      },
      prepare: (bun) => {
        return { payload: { ...bun, key: uuidv4() } };
      },
    },
    deleteIngredient(state, action) {
      state.ingredients = state.ingredients.filter(
        (item) => item.key !== action.payload
      );
    },
    moveIngredients(state, action) {
      state.ingredients.splice(
        action.payload.hoverIndex,
        0,
        state.ingredients.splice(action.payload.dragIndex, 1)[0]
      );
    },
    reset(state) {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  addIngredient,
  addBun,
  deleteIngredient,
  moveIngredients,
  reset,
} = burgerDataSlice.actions;
export default burgerDataSlice.reducer;
